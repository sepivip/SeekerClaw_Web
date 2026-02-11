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
      info: {
        label: "How to get your Claude credential",
        what: "Defines how SeekerClaw authenticates with your AI provider.",
        how: "Use your provider API key or setup token from your provider dashboard or SeekerClaw app setup flow.",
      },
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
          help: "Choose the credential mode used by your SeekerClaw app.",
        },
        {
          path: "auth.credential",
          label: "Auth Credential",
          type: "password",
          required: true,
          secret: true,
          fullWidth: true,
          placeholder: "sk-ant-… or setup token",
        },
      ],
    },
    {
      title: "Agent",
      info: {
        label: "About model and agent name",
        what: "Sets your assistant model and display name in SeekerClaw.",
        how: "Use the model you plan to run in the app (for example claude-opus-4-6) and any name you prefer.",
      },
      fields: [
        {
          path: "agent.model",
          label: "Model",
          type: "text",
          required: true,
          placeholder: "claude-opus-4-6",
        },
        {
          path: "agent.name",
          label: "Name",
          type: "text",
          required: true,
          placeholder: "SeekerClaw",
        },
      ],
    },
    {
      title: "Telegram",
      info: {
        label: "How to get your Telegram bot token",
        what: "Connects SeekerClaw to your Telegram bot and owner account.",
        how: "Create a bot with @BotFather to get Bot Token. Owner ID is optional and can be found via @userinfobot.",
      },
      fields: [
        {
          path: "telegram.botToken",
          label: "Bot Token",
          type: "password",
          required: true,
          secret: true,
          placeholder: "123456:ABC…",
        },
        {
          path: "telegram.ownerId",
          label: "Owner ID",
          type: "text",
          required: false,
          placeholder: "Optional",
        },
      ],
    },
    {
      title: "Integrations",
      info: {
        label: "How to get your Brave API key",
        what: "Optional external service keys used by specific tools.",
        how: "Brave API key is optional. Add one only if you want Brave-powered web search in supported tools.",
      },
      fields: [
        {
          path: "integrations.braveApiKey",
          label: "Brave API Key",
          type: "password",
          required: false,
          secret: true,
          fullWidth: true,
          placeholder: "Optional",
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

    function renderFields() {
      fieldsRoot.innerHTML = "";
      controlsByPath.clear();
      errorsByPath.clear();

      for (const group of QUICK_SETUP_SCHEMA) {
        const groupEl = createElements("section", "qs-group");
        const titleEl = createElements("h3", "qs-group__title", group.title);
        const headerEl = createElements("div", "qs-group__header");
        const gridEl = createElements("div", "qs-group__grid");
        headerEl.appendChild(titleEl);
        if (isPlainObject(group.info)) {
          const infoEl = createElements("details", "qs-group__info");
          const summaryEl = createElements(
            "summary",
            "qs-group__info-summary",
            normalizeString(group.info.label) || "Section help"
          );
          const bodyEl = createElements("div", "qs-group__info-body");

          if (group.info.what) {
            const whatLineEl = createElements("p", "qs-group__info-line");
            const whatLabelEl = createElements("span", "qs-group__info-label", "What:");
            const whatTextEl = createElements("span", "qs-group__info-text", group.info.what);
            whatLineEl.appendChild(whatLabelEl);
            whatLineEl.appendChild(whatTextEl);
            bodyEl.appendChild(whatLineEl);
          }

          if (group.info.how) {
            const howLineEl = createElements("p", "qs-group__info-line");
            const howLabelEl = createElements("span", "qs-group__info-label", "How:");
            const howTextEl = createElements("span", "qs-group__info-text", group.info.how);
            howLineEl.appendChild(howLabelEl);
            howLineEl.appendChild(howTextEl);
            bodyEl.appendChild(howLineEl);
          }

          const docsLineEl = createElements(
            "p",
            "qs-group__info-note",
            "Detailed docs page will be added soon."
          );
          bodyEl.appendChild(docsLineEl);

          infoEl.appendChild(summaryEl);
          infoEl.appendChild(bodyEl);
          headerEl.appendChild(infoEl);
        }
        groupEl.appendChild(headerEl);
        groupEl.appendChild(gridEl);

        for (const field of group.fields) {
          const fieldEl = createElements(
            "div",
            "qs-field" + (field.fullWidth ? " qs-field--full" : "")
          );

          const labelEl = createElements("label", "qs-label");
          const labelText = field.label + (field.required ? " *" : "");
          labelEl.textContent = labelText;

          let control;
          if (field.type === "select") {
            control = createElements("select", "qs-control");
            for (const option of field.options) {
              const optionEl = createElements("option");
              optionEl.value = option.value;
              optionEl.textContent = option.label;
              if (option.value === getByPath(state, field.path)) {
                optionEl.selected = true;
              }
              control.appendChild(optionEl);
            }
          } else if (field.type === "toggle") {
            const toggleLabel = createElements("label", "qs-toggle");
            control = createElements("input");
            control.type = "checkbox";
            control.checked = Boolean(getByPath(state, field.path));
            const toggleText = createElements("span", "qs-toggle__text", field.label);
            toggleLabel.appendChild(control);
            toggleLabel.appendChild(toggleText);
            fieldEl.appendChild(toggleLabel);
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
            fieldEl.appendChild(labelEl);
            fieldEl.appendChild(control);
          } else if (field.help) {
            const hiddenLabel = createElements("span", "qs-label");
            hiddenLabel.textContent = field.label;
            hiddenLabel.hidden = true;
            fieldEl.appendChild(hiddenLabel);
          }

          if (field.help) {
            const helpEl = createElements("p", "qs-help", field.help);
            fieldEl.appendChild(helpEl);
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
