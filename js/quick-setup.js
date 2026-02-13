/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Quick Setup QR Builder (Static / Browser-only)
   ───────────────────────────────────────────────────────────
   Builds a versioned config envelope, encodes base64url payload,
   and renders seekerclaw:// deep-link QR without any backend.
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const ENVELOPE_VERSION = 1;
  const TELEGRAM_BOT_TOKEN_REGEX = /^\d{6,12}:[A-Za-z0-9_-]{20,}$/;
  const OWNER_ID_REGEX = /^\d+$/;

  const QUICK_SETUP_SCHEMA = [
    {
      title: "Claude Authentication",
      fields: [
        {
          path: "auth.type",
          label: "Auth Type",
          type: "select",
          required: true,
          options: [
            { value: "api_key", label: "api_key" },
            { value: "setup_token", label: "setup_token" },
          ],
          tooltip: '<strong>API Key</strong> — Direct access. Get from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a> → API Keys → Create Key.<br><br><strong>Setup Token</strong> — Temporary. Run <code>openclaw setup-token</code> on any machine with OpenClaw.',
        },
        {
          path: "auth.credential",
          label: "Auth Credential",
          type: "password",
          required: true,
          secret: true,
          fullWidth: true,
          placeholder: "sk-ant-… or setup token",
          tooltip: 'Paste your API key (starts with <code>sk-ant-...</code>) or setup token here. This stays on your device — never sent to our servers.',
        },
      ],
    },
    {
      title: "Agent",
      fields: [
        {
          path: "agent.model",
          label: "Model",
          type: "text",
          required: true,
          placeholder: "claude-opus-4-6",
          tooltip: 'Recommended: <code>claude-sonnet-4-20250514</code> (fast + affordable) for daily use, <code>claude-opus-4-6</code> (smartest) for complex tasks. Changeable later in the app settings.',
        },
        {
          path: "agent.name",
          label: "Name",
          type: "text",
          required: true,
          placeholder: "SeekerClaw",
          tooltip: 'Your agent\'s display name in Telegram conversations. Pick something fun — this is who you\'ll be chatting with daily.',
        },
      ],
    },
    {
      title: "Telegram",
      fields: [
        {
          path: "telegram.botToken",
          label: "Bot Token",
          type: "password",
          required: true,
          secret: true,
          placeholder: "123456:ABC…",
          tooltip: 'Create your Telegram bot in 60 seconds:<br>1️⃣ Open Telegram → search <strong>@BotFather</strong> → tap Start<br>2️⃣ Send <code>/newbot</code><br>3️⃣ Pick a name (e.g. "My SeekerClaw")<br>4️⃣ Pick a username (must end in <code>bot</code>)<br>5️⃣ BotFather replies with your token — copy & paste here<br><br>⚠️ Never share this token. It gives full control of your bot.',
          tooltipLink: { label: "Open @BotFather", url: "https://t.me/BotFather" },
        },
        {
          path: "telegram.ownerId",
          label: "Owner ID",
          type: "text",
          required: false,
          placeholder: "Optional",
          tooltip: 'Find your Telegram ID:<br>1️⃣ Open Telegram → search <strong>@userinfobot</strong><br>2️⃣ Tap Start<br>3️⃣ It instantly replies with your ID (a number like <code>7561373860</code>)<br>4️⃣ Copy & paste here<br><br>This locks your agent so only <strong>you</strong> can talk to it.',
          tooltipLink: { label: "Open @userinfobot", url: "https://t.me/userinfobot" },
        },
      ],
    },
    {
      title: "Integrations",
      fields: [
        {
          path: "integrations.braveApiKey",
          label: "Brave API Key",
          type: "password",
          required: false,
          secret: true,
          fullWidth: true,
          placeholder: "Optional",
          tooltip: 'Optional. Enables web search for your agent. Free plan = 2,000 queries/month.<br><br>Get yours at <a href="https://brave.com/search/api" target="_blank" rel="noopener noreferrer">brave.com/search/api</a> → Sign up → Copy key.',
          tooltipLink: { label: "Get Brave API Key", url: "https://brave.com/search/api" },
        },
      ],
    },
  ];

  const DEFAULT_STATE = {
    auth: {
      type: "api_key",
      credential: "",
    },
    telegram: {
      botToken: "",
      ownerId: "",
    },
    agent: {
      model: "claude-opus-4-6",
      name: "SeekerClaw",
    },
    integrations: {
      braveApiKey: "",
    },
    extensions: {},
    _rawConfig: null,
  };

  const FLAT_FIELDS = QUICK_SETUP_SCHEMA.flatMap((group) => group.fields);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isPlainObject(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
  }

  function normalizeString(value) {
    if (value == null) {
      return "";
    }
    return String(value).trim();
  }

  function getByPath(source, path) {
    const parts = path.split(".");
    let current = source;
    for (const part of parts) {
      if (!current || typeof current !== "object") {
        return undefined;
      }
      current = current[part];
    }
    return current;
  }

  function setByPath(target, path, value) {
    const parts = path.split(".");
    let current = target;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const part = parts[i];
      if (!isPlainObject(current[part])) {
        current[part] = {};
      }
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }

  function buildConfigEnvelope(formState) {
    const baseConfig = isPlainObject(formState && formState._rawConfig)
      ? clone(formState._rawConfig)
      : {};

    const config = {
      ...baseConfig,
      auth: {
        ...(isPlainObject(baseConfig.auth) ? baseConfig.auth : {}),
        type: normalizeString(getByPath(formState, "auth.type")) || "api_key",
        credential: normalizeString(getByPath(formState, "auth.credential")),
      },
      telegram: {
        ...(isPlainObject(baseConfig.telegram) ? baseConfig.telegram : {}),
        botToken: normalizeString(getByPath(formState, "telegram.botToken")),
        ownerId: normalizeString(getByPath(formState, "telegram.ownerId")),
      },
      agent: {
        ...(isPlainObject(baseConfig.agent) ? baseConfig.agent : {}),
        model: normalizeString(getByPath(formState, "agent.model")) || "claude-opus-4-6",
        name: normalizeString(getByPath(formState, "agent.name")) || "SeekerClaw",
      },
      integrations: {
        ...(isPlainObject(baseConfig.integrations) ? baseConfig.integrations : {}),
        braveApiKey: normalizeString(getByPath(formState, "integrations.braveApiKey")),
      },
      extensions: {
        ...(isPlainObject(baseConfig.extensions) ? baseConfig.extensions : {}),
        ...(isPlainObject(formState && formState.extensions) ? formState.extensions : {}),
      },
    };

    return {
      v: ENVELOPE_VERSION,
      config,
    };
  }

  function encodeBase64Url(jsonString) {
    const bytes = new TextEncoder().encode(jsonString);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function buildSeekerConfigLink(payloadB64Url) {
    return "seekerclaw://config?payload=" + payloadB64Url;
  }

  function buildSeekerLink(payload) {
    return buildSeekerConfigLink(payload);
  }

  function createDefaultState() {
    return clone(DEFAULT_STATE);
  }

  function createElements(type, className, textContent) {
    const el = document.createElement(type);
    if (className) {
      el.className = className;
    }
    if (textContent != null) {
      el.textContent = textContent;
    }
    return el;
  }

  function validateQuickSetup(formState) {
    const errors = {};

    const authType = normalizeString(getByPath(formState, "auth.type"));
    const credential = normalizeString(getByPath(formState, "auth.credential"));
    const botToken = normalizeString(getByPath(formState, "telegram.botToken"));
    const ownerId = normalizeString(getByPath(formState, "telegram.ownerId"));

    if (authType !== "api_key" && authType !== "setup_token") {
      errors["auth.type"] = "Auth type must be api_key or setup_token.";
    }

    if (credential === "") {
      errors["auth.credential"] = "Auth credential is required.";
    } else if (/\s/.test(credential)) {
      errors["auth.credential"] = "Credential cannot contain spaces.";
    } else if (credential.length < 20) {
      if (authType === "setup_token") {
        errors["auth.credential"] = "Setup token must be at least 20 characters.";
      } else {
        errors["auth.credential"] = "API key must be at least 20 characters (for example sk-ant-...).";
      }
    }

    if (botToken === "") {
      errors["telegram.botToken"] = "Telegram bot token is required.";
    } else if (!TELEGRAM_BOT_TOKEN_REGEX.test(botToken)) {
      errors["telegram.botToken"] =
        "Bot token must match 123456:ABCDEFGHIJKLMNOPQRSTUVWXYZ format.";
    }

    if (ownerId !== "" && !OWNER_ID_REGEX.test(ownerId)) {
      errors["telegram.ownerId"] = "Owner ID must contain digits only.";
    }

    for (const field of FLAT_FIELDS) {
      if (errors[field.path]) {
        continue;
      }
      if (field.type === "select") {
        const value = getByPath(formState, field.path);
        const allowed = new Set(field.options.map((option) => option.value));
        if (!allowed.has(value)) {
          errors[field.path] = "Please choose a valid option.";
        }
        continue;
      }
      if (!field.required || field.type === "toggle") {
        continue;
      }
      if (normalizeString(getByPath(formState, field.path)) === "") {
        errors[field.path] = "This field is required.";
      }
    }

    return errors;
  }

  function validateState(formState) {
    return validateQuickSetup(formState);
  }

  function clearCanvas(canvas) {
    const canvasWrap = canvas && canvas.parentElement;
    if (canvasWrap) {
      const children = Array.from(canvasWrap.children);
      for (const child of children) {
        if (child !== canvas) {
          child.remove();
        }
      }
    }
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f1420";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1a2235";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  function initQuickSetup() {
    const fieldsRoot = document.getElementById("quickSetupFields");
    if (!fieldsRoot) {
      return;
    }

    const canvas = document.getElementById("quickSetupQrCanvas");
    const statusEl = document.getElementById("quickSetupStatus");
    const captionEl = document.getElementById("quickSetupQrCaption");
    const generateBtn = document.getElementById("quickSetupGenerateBtn");
    const clearBtn = document.getElementById("quickSetupClearBtn");
    const copyBtn = document.getElementById("quickSetupCopyBtn");
    if (
      !canvas ||
      !statusEl ||
      !captionEl ||
      !generateBtn ||
      !clearBtn
    ) {
      return;
    }

    let lastDeepLink = "";

    let state = createDefaultState();
    const touched = new Set();
    let submitAttempted = false;

    const controlsByPath = new Map();
    const errorsByPath = new Map();

    function setStatus(message, kind) {
      if (!statusEl) {
        return;
      }
      statusEl.textContent = message || "";
      statusEl.className = "quick-setup__status" + (kind ? " " + kind : "");
    }

    function renderValidation(errors) {
      for (const field of FLAT_FIELDS) {
        const input = controlsByPath.get(field.path);
        const errorEl = errorsByPath.get(field.path);
        if (!input || !errorEl) {
          continue;
        }

        const showError = submitAttempted || touched.has(field.path);
        const message = showError && errors[field.path] ? errors[field.path] : "";
        errorEl.textContent = message;
        input.classList.toggle("is-invalid", Boolean(message));
      }
    }

    function closeAllSelects() {
      fieldsRoot.querySelectorAll(".qs-select-wrap.is-open").forEach(function (wrap) {
        wrap.classList.remove("is-open");
        var trig = wrap.querySelector(".qs-select-trigger");
        if (trig) trig.setAttribute("aria-expanded", "false");
      });
    }

    function closeAllTooltips() {
      fieldsRoot.querySelectorAll(".qs-tooltip.is-open").forEach(function (el) {
        el.classList.remove("is-open");
        el.hidden = true;
        el.setAttribute("aria-hidden", "true");
        var btn = el.previousElementSibling;
        if (btn && btn.classList.contains("qs-tooltip-trigger")) {
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }

    function buildTooltipEl(field) {
      if (!field.tooltip) return null;

      var tooltipId = "qs-tip-" + field.path.replace(/\./g, "-");
      const wrap = createElements("span", "qs-tooltip-wrap");

      const btn = createElements("button", "qs-tooltip-trigger");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Help for " + field.label);
      btn.setAttribute("aria-describedby", tooltipId);
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

      const card = createElements("div", "qs-tooltip");
      card.id = tooltipId;
      card.setAttribute("role", "tooltip");
      card.hidden = true;
      card.setAttribute("aria-hidden", "true");

      const body = createElements("div", "qs-tooltip__body");
      body.innerHTML = field.tooltip;
      card.appendChild(body);

      if (field.tooltipLink) {
        const linkEl = document.createElement("a");
        linkEl.className = "qs-tooltip__link";
        linkEl.href = field.tooltipLink.url;
        linkEl.target = "_blank";
        linkEl.rel = "noopener noreferrer";
        linkEl.textContent = field.tooltipLink.label + " ↗";
        card.appendChild(linkEl);
      }

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var wasOpen = card.classList.contains("is-open");
        closeAllTooltips();
        closeAllSelects();
        if (!wasOpen) {
          card.hidden = false;
          card.setAttribute("aria-hidden", "false");
          card.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });

      wrap.appendChild(btn);
      wrap.appendChild(card);
      return wrap;
    }

    function renderFields() {
      fieldsRoot.innerHTML = "";
      controlsByPath.clear();
      errorsByPath.clear();

      for (const group of QUICK_SETUP_SCHEMA) {
        const groupEl = createElements("section", "qs-group");
        const headerEl = createElements("div", "qs-group__header");
        const titleEl = createElements("h3", "qs-group__title", group.title);
        headerEl.appendChild(titleEl);
        const gridEl = createElements("div", "qs-group__grid");
        groupEl.appendChild(headerEl);
        groupEl.appendChild(gridEl);

        for (const field of group.fields) {
          const fieldEl = createElements(
            "div",
            "qs-field" + (field.fullWidth ? " qs-field--full" : "")
          );

          const labelRow = createElements("div", "qs-label-row");
          const labelEl = createElements("label", "qs-label");
          const labelText = field.label + (field.required ? " *" : "");
          labelEl.textContent = labelText;
          labelRow.appendChild(labelEl);

          const tooltipEl = buildTooltipEl(field);
          if (tooltipEl) {
            labelRow.appendChild(tooltipEl);
          }

          let control;
          if (field.type === "select") {
            /* Custom styled select dropdown */
            const currentVal = getByPath(state, field.path) || "";
            const currentLabel = (field.options.find(function (o) { return o.value === currentVal; }) || field.options[0] || {}).label || "";

            const selectLabelId = "qs-label-" + field.path.replace(/\./g, "-");
            labelEl.id = selectLabelId;

            const wrap = createElements("div", "qs-select-wrap");
            const trigger = createElements("button", "qs-select-trigger");
            trigger.type = "button";
            trigger.setAttribute("role", "combobox");
            trigger.setAttribute("aria-expanded", "false");
            trigger.setAttribute("aria-haspopup", "listbox");
            trigger.setAttribute("aria-labelledby", selectLabelId);

            const triggerText = createElements("span", "qs-select-value", currentLabel);
            const triggerArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            triggerArrow.setAttribute("class", "qs-select-arrow");
            triggerArrow.setAttribute("viewBox", "0 0 24 24");
            triggerArrow.setAttribute("fill", "none");
            triggerArrow.setAttribute("stroke", "currentColor");
            triggerArrow.setAttribute("stroke-width", "2");
            triggerArrow.setAttribute("stroke-linecap", "round");
            triggerArrow.setAttribute("stroke-linejoin", "round");
            var chevron = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            chevron.setAttribute("points", "6 9 12 15 18 9");
            triggerArrow.appendChild(chevron);

            trigger.appendChild(triggerText);
            trigger.appendChild(triggerArrow);

            const dropdown = createElements("div", "qs-select-dropdown");
            dropdown.setAttribute("role", "listbox");

            for (const option of field.options) {
              const optBtn = createElements("button", "qs-select-option", option.label);
              optBtn.type = "button";
              optBtn.dataset.value = option.value;
              optBtn.setAttribute("role", "option");
              if (option.value === currentVal) {
                optBtn.classList.add("is-selected");
                optBtn.setAttribute("aria-selected", "true");
              }
              optBtn.addEventListener("click", function () {
                triggerText.textContent = option.label;
                dropdown.querySelectorAll(".qs-select-option").forEach(function (b) {
                  b.classList.remove("is-selected");
                  b.setAttribute("aria-selected", "false");
                });
                optBtn.classList.add("is-selected");
                optBtn.setAttribute("aria-selected", "true");
                wrap.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                /* Fire change */
                touched.add(field.path);
                setByPath(state, field.path, option.value);
                renderValidation(validateQuickSetup(state));
              });
              dropdown.appendChild(optBtn);
            }

            trigger.addEventListener("click", function (e) {
              e.stopPropagation();
              closeAllTooltips();
              var isOpen = wrap.classList.toggle("is-open");
              trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
            });

            wrap.appendChild(trigger);
            wrap.appendChild(dropdown);

            /* Use trigger as the "control" for validation toggling */
            control = trigger;
            control.dataset.path = field.path;
            controlsByPath.set(field.path, control);

            fieldEl.appendChild(labelRow);
            fieldEl.appendChild(wrap);

            const errorEl = createElements("p", "qs-error");
            errorEl.dataset.errorFor = field.path;
            fieldEl.appendChild(errorEl);
            errorsByPath.set(field.path, errorEl);

            gridEl.appendChild(fieldEl);
            continue;
          } else if (field.type === "toggle") {
            const toggleRow = createElements("div", "qs-label-row");
            const toggleLabel = createElements("label", "qs-toggle");
            control = createElements("input");
            control.type = "checkbox";
            control.checked = Boolean(getByPath(state, field.path));
            const toggleText = createElements("span", "qs-toggle__text", field.label);
            toggleLabel.appendChild(control);
            toggleLabel.appendChild(toggleText);
            toggleRow.appendChild(toggleLabel);
            const toggleTip = buildTooltipEl(field);
            if (toggleTip) toggleRow.appendChild(toggleTip);
            fieldEl.appendChild(toggleRow);
          } else {
            control = createElements("input", "qs-control");
            const baseType = field.type || "text";
            control.type = field.secret ? "password" : baseType;
            control.value = normalizeString(getByPath(state, field.path));
            if (field.placeholder) {
              control.placeholder = field.placeholder;
            }
            if (field.secret) {
              control.dataset.secret = "1";
            }
          }

          control.dataset.path = field.path;
          controlsByPath.set(field.path, control);

          if (field.type !== "toggle") {
            labelEl.htmlFor = "qs-" + field.path.replace(/\./g, "-");
            control.id = labelEl.htmlFor;
            fieldEl.appendChild(labelRow);
            fieldEl.appendChild(control);
          }

          const errorEl = createElements("p", "qs-error");
          errorEl.dataset.errorFor = field.path;
          fieldEl.appendChild(errorEl);
          errorsByPath.set(field.path, errorEl);

          const inputEvent = field.type === "toggle" ? "change" : "input";
          control.addEventListener(inputEvent, () => {
            touched.add(field.path);
            const nextValue =
              field.type === "toggle" ? control.checked : normalizeString(control.value);
            setByPath(state, field.path, nextValue);
            renderValidation(validateQuickSetup(state));
          });

          gridEl.appendChild(fieldEl);
        }

        fieldsRoot.appendChild(groupEl);
      }

      renderValidation(validateQuickSetup(state));
    }

    async function renderQr(deepLink) {
      clearCanvas(canvas);
      if (!window.QRCode) {
        setStatus("QR library failed to load. Check your connection and retry.", "error");
        return false;
      }

      if (typeof window.QRCode.toCanvas === "function") {
        return new Promise((resolve) => {
          window.QRCode.toCanvas(
            canvas,
            deepLink,
            {
              width: 320,
              margin: 1,
              errorCorrectionLevel: "M",
              color: {
                dark: "#eaf0ff",
                light: "#0f1420",
              },
            },
            (error) => {
              if (error) {
                setStatus("Failed to render QR. Try shorter field values and generate again.", "error");
                resolve(false);
                return;
              }
              resolve(true);
            }
          );
        });
      }

      if (typeof window.QRCode === "function") {
        try {
          const canvasWrap = canvas.parentElement;
          if (!canvasWrap) {
            setStatus("QR surface failed to initialize. Reload and try again.", "error");
            return false;
          }

          canvas.style.display = "none";
          const hostEl = createElements("div", "quick-setup__qr-fallback-host");
          canvasWrap.appendChild(hostEl);

          new window.QRCode(hostEl, {
            text: deepLink,
            width: 320,
            height: 320,
            colorDark: "#eaf0ff",
            colorLight: "#0f1420",
            correctLevel: window.QRCode.CorrectLevel
              ? window.QRCode.CorrectLevel.M
              : undefined,
          });

          return true;
        } catch {
          setStatus("Failed to render QR. Try shorter field values and generate again.", "error");
          return false;
        }
      }

      setStatus("QR library failed to load. Check your connection and retry.", "error");
      return false;
    }

    async function generateDeepLink() {
      submitAttempted = true;
      const errors = validateQuickSetup(state);
      renderValidation(errors);

      if (Object.keys(errors).length > 0) {
        setStatus("Fix the highlighted fields before generating the QR.", "error");
        return;
      }

      const envelope = buildConfigEnvelope(state);
      const json = JSON.stringify(envelope);
      const payload = encodeBase64Url(json);
      const deepLink = buildSeekerConfigLink(payload);
      const qrOk = await renderQr(deepLink);
      if (!qrOk) {
        return;
      }

      lastDeepLink = deepLink;
      var canvasWrap = canvas.parentElement;
      if (canvasWrap) {
        canvasWrap.classList.add("has-qr");
      }
      captionEl.textContent = "Scan with SeekerClaw app to import this configuration.";
      if (copyBtn) {
        copyBtn.hidden = false;
      }
      setStatus(
        "QR ready. Payload size: " + payload.length.toLocaleString() + " chars.",
        "success"
      );
    }

    function clearAll() {
      state = createDefaultState();
      touched.clear();
      submitAttempted = false;
      lastDeepLink = "";
      renderFields();
      captionEl.textContent = "Generate a QR to preview your SeekerClaw config import link.";
      setStatus("", "");
      clearCanvas(canvas);
      var canvasWrap = canvas.parentElement;
      if (canvasWrap) {
        canvasWrap.classList.remove("has-qr");
      }
      if (copyBtn) {
        copyBtn.hidden = true;
      }
    }

    clearCanvas(canvas);

    generateBtn.addEventListener("click", generateDeepLink);
    clearBtn.addEventListener("click", clearAll);

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        if (!lastDeepLink) {
          return;
        }
        navigator.clipboard.writeText(lastDeepLink).then(function () {
          var original = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(function () {
            copyBtn.innerHTML =
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Deep Link';
          }, 1500);
        });
      });
    }

    /* Close custom selects and tooltips on outside click */
    document.addEventListener("click", function (e) {
      /* Close custom selects not containing the click target */
      fieldsRoot.querySelectorAll(".qs-select-wrap.is-open").forEach(function (wrap) {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove("is-open");
          var trig = wrap.querySelector(".qs-select-trigger");
          if (trig) trig.setAttribute("aria-expanded", "false");
        }
      });
      /* Close tooltips not containing the click target */
      fieldsRoot.querySelectorAll(".qs-tooltip.is-open").forEach(function (tip) {
        var tipWrap = tip.closest(".qs-tooltip-wrap");
        if (tipWrap && !tipWrap.contains(e.target)) {
          tip.classList.remove("is-open");
          tip.hidden = true;
          tip.setAttribute("aria-hidden", "true");
          var btn = tipWrap.querySelector(".qs-tooltip-trigger");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });
    });

    renderFields();
  }

  window.SeekerQuickSetup = {
    buildConfigEnvelope,
    encodeBase64Url,
    buildSeekerConfigLink,
    validateQuickSetup,
    buildSeekerLink,
    validateState,
    initQuickSetup,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuickSetup, { once: true });
  } else {
    initQuickSetup();
  }
})();
