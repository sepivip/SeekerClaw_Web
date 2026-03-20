/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Quick Setup QR Builder V2 (Multi-Provider)
   ───────────────────────────────────────────────────────────
   BAT-472: Support Anthropic, OpenAI, OpenRouter providers.
   Builds a versioned config envelope (v2), encodes base64url
   payload, and renders seekerclaw:// deep-link QR.
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const ENVELOPE_VERSION = 2;
  const TELEGRAM_BOT_TOKEN_REGEX = /^\d{6,12}:[A-Za-z0-9_-]{20,}$/;
  const OWNER_ID_REGEX = /^\d+$/;

  /* ══════════════════════════════════════════════════════════
     PROVIDER DEFINITIONS
     ══════════════════════════════════════════════════════════ */
  const PROVIDERS = {
    claude: {
      id: 'claude',
      label: 'Anthropic',
      authTypes: [
        { value: 'api_key', label: 'api_key' },
        { value: 'setup_token', label: 'setup_token' },
      ],
      credentialPlaceholder: 'sk-ant-api03-…',
      credentialTooltip: '<strong>API Key</strong> — Get from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a> → API Keys → Create Key.<br><br><strong>Setup Token</strong> — Run <code>claude</code> CLI and authenticate with your Claude.ai subscription. Token starts with <code>sk-ant-oat-</code>.',
      consoleUrl: 'https://console.anthropic.com',
      consoleName: 'Anthropic Console',
      models: [
        { value: 'claude-sonnet-4-6', label: 'Sonnet 4.6 — balanced' },
        { value: 'claude-opus-4-6', label: 'Opus 4.6 — smartest' },
        { value: 'claude-haiku-4-5', label: 'Haiku 4.5 — fast' },
      ],
      modelType: 'select',
      defaultModel: 'claude-sonnet-4-6',
      defaultAuthType: 'api_key',
    },
    openai: {
      id: 'openai',
      label: 'OpenAI',
      authTypes: [
        { value: 'api_key', label: 'api_key' },
      ],
      credentialPlaceholder: 'sk-proj-…',
      credentialTooltip: '<strong>API Key</strong> — Get from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a> → Create new secret key.',
      consoleUrl: 'https://platform.openai.com/api-keys',
      consoleName: 'OpenAI Dashboard',
      models: [
        { value: 'gpt-5.4', label: 'GPT-5.4 — balanced' },
        { value: 'gpt-5.2', label: 'GPT-5.2 — fast' },
        { value: 'gpt-5.3-codex', label: 'GPT-5.3 Codex — code' },
      ],
      modelType: 'select',
      defaultModel: 'gpt-5.4',
      defaultAuthType: 'api_key',
    },
    openrouter: {
      id: 'openrouter',
      label: 'OpenRouter',
      authTypes: [
        { value: 'api_key', label: 'api_key' },
      ],
      credentialPlaceholder: 'sk-or-v1-…',
      credentialTooltip: '<strong>API Key</strong> — Get from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">openrouter.ai/keys</a> → Create Key.<br><br>OpenRouter gives you access to hundreds of models from all providers through a single API key.',
      consoleUrl: 'https://openrouter.ai/keys',
      consoleName: 'OpenRouter Dashboard',
      models: [],
      modelType: 'text',
      defaultModel: '',
      defaultAuthType: 'api_key',
    },
  };

  const PROVIDER_OPTIONS = [
    { value: 'claude', label: 'Anthropic' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'openrouter', label: 'OpenRouter' },
  ];

  /* ══════════════════════════════════════════════════════════
     SCHEMA BUILDER (dynamic per provider)
     ══════════════════════════════════════════════════════════ */
  function buildSchema(providerId) {
    var p = PROVIDERS[providerId] || PROVIDERS.claude;

    var modelField;
    if (p.modelType === 'text') {
      modelField = {
        path: 'agent.model',
        label: 'Model',
        type: 'text',
        required: true,
        placeholder: 'e.g. anthropic/claude-sonnet-4-6',
        tooltip: 'Enter any model identifier from <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer">openrouter.ai/models</a>. Freeform — type the full model slug.',
      };
    } else {
      modelField = {
        path: 'agent.model',
        label: 'Model',
        type: 'select',
        required: true,
        options: p.models,
        tooltip: p.models.map(function (m) {
          return '<strong>' + m.label.split(' — ')[0] + '</strong> — ' + (m.label.split(' — ')[1] || '');
        }).join('<br>') + '<br><br>Changeable later in the app.',
      };
    }

    return [
      {
        title: 'Provider',
        fields: [
          {
            path: 'provider',
            label: 'AI Provider',
            type: 'select',
            required: true,
            options: PROVIDER_OPTIONS,
            tooltip: 'Choose your AI provider. This determines which API key format and models are available.<br><br><strong>Anthropic</strong> — Claude models, supports setup tokens.<br><strong>OpenAI</strong> — GPT models.<br><strong>OpenRouter</strong> — Any model from any provider via a single key.',
          },
        ],
      },
      {
        title: 'Authentication',
        fields: [
          {
            path: 'auth.type',
            label: 'Auth Type',
            type: 'select',
            required: true,
            options: p.authTypes,
            tooltip: p.credentialTooltip,
          },
          {
            path: 'auth.credential',
            label: 'Auth Credential',
            type: 'password',
            required: true,
            secret: true,
            fullWidth: true,
            placeholder: p.credentialPlaceholder,
            tooltip: 'Paste your API key or setup token here. This stays on your device — never sent to our servers.',
            tooltipLink: { label: 'Open ' + p.consoleName, url: p.consoleUrl },
          },
        ],
      },
      {
        title: 'Agent',
        fields: [
          modelField,
          {
            path: 'agent.name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'SeekerClaw',
            tooltip: 'Your agent\'s display name in Telegram conversations. Pick something fun — this is who you\'ll be chatting with daily.',
          },
        ],
      },
      {
        title: 'Telegram',
        fields: [
          {
            path: 'telegram.botToken',
            label: 'Bot Token',
            type: 'password',
            required: true,
            secret: true,
            placeholder: '123456:ABC…',
            tooltip: 'Create your Telegram bot in 60 seconds:<br>1️⃣ Open Telegram → search <strong>@BotFather</strong> → tap Start<br>2️⃣ Send <code>/newbot</code><br>3️⃣ Pick a name (e.g. "My SeekerClaw")<br>4️⃣ Pick a username (must end in <code>bot</code>)<br>5️⃣ BotFather replies with your token — copy & paste here<br><br>⚠️ Never share this token. It gives full control of your bot.',
            tooltipLink: { label: 'Open @BotFather', url: 'https://t.me/BotFather' },
          },
          {
            path: 'telegram.ownerId',
            label: 'Owner ID',
            type: 'text',
            required: false,
            placeholder: 'Optional',
            tooltip: 'Find your Telegram ID:<br>1️⃣ Open Telegram → search <strong>@userinfobot</strong><br>2️⃣ Tap Start<br>3️⃣ It instantly replies with your ID (a number like <code>7561373860</code>)<br>4️⃣ Copy & paste here<br><br>This locks your agent so only <strong>you</strong> can talk to it.',
            tooltipLink: { label: 'Open @userinfobot', url: 'https://t.me/userinfobot' },
          },
        ],
      },
      {
        title: 'Integrations',
        fields: [
          {
            path: 'integrations.braveApiKey',
            label: 'Brave API Key',
            type: 'password',
            required: false,
            secret: true,
            fullWidth: true,
            placeholder: 'Optional',
            tooltip: 'Optional. Enables web search for your agent. Free plan = 2,000 queries/month.<br><br>Get yours at <a href="https://brave.com/search/api" target="_blank" rel="noopener noreferrer">brave.com/search/api</a> → Sign up → Copy key.',
            tooltipLink: { label: 'Get Brave API Key', url: 'https://brave.com/search/api' },
          },
        ],
      },
    ];
  }

  function flatFields(schema) {
    return schema.reduce(function (acc, group) {
      return acc.concat(group.fields);
    }, []);
  }

  /* ══════════════════════════════════════════════════════════
     HELPERS
     ══════════════════════════════════════════════════════════ */
  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isPlainObject(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
  }

  function normalizeString(value) {
    if (value == null) return "";
    return String(value).trim();
  }

  function getByPath(source, path) {
    var parts = path.split(".");
    var current = source;
    for (var i = 0; i < parts.length; i++) {
      if (!current || typeof current !== "object") return undefined;
      current = current[parts[i]];
    }
    return current;
  }

  function setByPath(target, path, value) {
    var parts = path.split(".");
    var current = target;
    for (var i = 0; i < parts.length - 1; i++) {
      var part = parts[i];
      if (!isPlainObject(current[part])) current[part] = {};
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }

  /* ══════════════════════════════════════════════════════════
     CONFIG ENVELOPE (v2)
     ══════════════════════════════════════════════════════════ */
  function buildConfigEnvelope(formState) {
    var baseConfig = isPlainObject(formState && formState._rawConfig)
      ? clone(formState._rawConfig)
      : {};

    var config = {
      ...baseConfig,
      provider: normalizeString(formState.provider) || 'claude',
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
        model: normalizeString(getByPath(formState, "agent.model")),
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

    return { v: ENVELOPE_VERSION, config: config };
  }

  function minifyEnvelope(envelope) {
    var out = clone(envelope);
    if (isPlainObject(out.config)) {
      (function strip(obj) {
        Object.keys(obj).forEach(function (k) {
          var v = obj[k];
          if (v === "") { delete obj[k]; return; }
          if (isPlainObject(v)) {
            strip(v);
            if (Object.keys(v).length === 0) delete obj[k];
          }
        });
      })(out.config);
    }
    return out;
  }

  function encodeBase64Url(jsonString) {
    var bytes = new TextEncoder().encode(jsonString);
    var binary = "";
    for (var i = 0; i < bytes.length; i++) {
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

  /* ══════════════════════════════════════════════════════════
     DEFAULT STATE
     ══════════════════════════════════════════════════════════ */
  function createDefaultState(providerId) {
    var p = PROVIDERS[providerId] || PROVIDERS.claude;
    return {
      provider: p.id,
      auth: {
        type: p.defaultAuthType,
        credential: "",
      },
      telegram: {
        botToken: "",
        ownerId: "",
      },
      agent: {
        model: p.defaultModel,
        name: "SeekerClaw",
      },
      integrations: {
        braveApiKey: "",
      },
      extensions: {},
      _rawConfig: null,
    };
  }

  /* ══════════════════════════════════════════════════════════
     DOM HELPERS
     ══════════════════════════════════════════════════════════ */
  function createElements(type, className, textContent) {
    var el = document.createElement(type);
    if (className) el.className = className;
    if (textContent != null) el.textContent = textContent;
    return el;
  }

  /* ══════════════════════════════════════════════════════════
     VALIDATION (provider-aware)
     ══════════════════════════════════════════════════════════ */
  function validateQuickSetup(formState, schema) {
    var errors = {};
    var fields = flatFields(schema);
    var providerId = normalizeString(formState.provider) || 'claude';
    var provider = PROVIDERS[providerId] || PROVIDERS.claude;

    var authType = normalizeString(getByPath(formState, "auth.type"));
    var credential = normalizeString(getByPath(formState, "auth.credential"));
    var botToken = normalizeString(getByPath(formState, "telegram.botToken"));
    var ownerId = normalizeString(getByPath(formState, "telegram.ownerId"));

    // Auth type validation — setup_token only for Anthropic
    var allowedAuthTypes = provider.authTypes.map(function (a) { return a.value; });
    if (allowedAuthTypes.indexOf(authType) === -1) {
      errors["auth.type"] = "Invalid auth type for " + provider.label + ".";
    }

    if (credential === "") {
      errors["auth.credential"] = "Auth credential is required.";
    } else if (/\s/.test(credential)) {
      errors["auth.credential"] = "Credential cannot contain spaces.";
    } else if (credential.length < 20) {
      if (authType === "setup_token") {
        errors["auth.credential"] = "Setup token must be at least 20 characters.";
      } else {
        errors["auth.credential"] = "API key must be at least 20 characters.";
      }
    }

    if (botToken === "") {
      errors["telegram.botToken"] = "Telegram bot token is required.";
    } else if (!TELEGRAM_BOT_TOKEN_REGEX.test(botToken)) {
      errors["telegram.botToken"] = "Bot token must start with 6-12 digits, a colon, then at least 20 characters (letters, digits, '_' or '-').";
    }

    if (ownerId !== "" && !OWNER_ID_REGEX.test(ownerId)) {
      errors["telegram.ownerId"] = "Owner ID must contain digits only.";
    }

    // Model validation — skip option check for OpenRouter (freeform)
    var model = normalizeString(getByPath(formState, "agent.model"));
    if (provider.modelType === 'text') {
      if (model === "") {
        errors["agent.model"] = "Model is required.";
      }
    }

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (errors[field.path]) continue;
      if (field.path === 'provider') continue; // provider always valid from dropdown

      if (field.type === "select") {
        var value = getByPath(formState, field.path);
        var allowed = new Set();
        (field.options || []).forEach(function (o) { allowed.add(o.value); });
        if (!allowed.has(value)) {
          errors[field.path] = "Please choose a valid option.";
        }
        continue;
      }
      if (!field.required || field.type === "toggle") continue;
      if (normalizeString(getByPath(formState, field.path)) === "") {
        errors[field.path] = "This field is required.";
      }
    }

    return errors;
  }

  /* ══════════════════════════════════════════════════════════
     CANVAS
     ══════════════════════════════════════════════════════════ */
  function clearCanvas(canvas) {
    var canvasWrap = canvas && canvas.parentElement;
    if (canvasWrap) {
      var children = Array.from(canvasWrap.children);
      for (var i = 0; i < children.length; i++) {
        if (children[i] !== canvas) children[i].remove();
      }
    }
    canvas.style.display = "block";
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#e0e0e0";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  function initQuickSetup() {
    var fieldsRoot = document.getElementById("quickSetupFields");
    if (!fieldsRoot) return;

    var canvas = document.getElementById("quickSetupQrCanvas");
    var statusEl = document.getElementById("quickSetupStatus");
    var captionEl = document.getElementById("quickSetupQrCaption");
    var generateBtn = document.getElementById("quickSetupGenerateBtn");
    var clearBtn = document.getElementById("quickSetupClearBtn");
    var copyBtn = document.getElementById("quickSetupCopyBtn");
    if (!canvas || !statusEl || !captionEl || !generateBtn || !clearBtn) return;

    var lastDeepLink = "";
    var currentProvider = 'claude';
    var currentSchema = buildSchema(currentProvider);
    var state = createDefaultState(currentProvider);
    var touched = new Set();
    var submitAttempted = false;
    var controlsByPath = new Map();
    var errorsByPath = new Map();

    function setStatus(message, kind) {
      statusEl.textContent = message || "";
      statusEl.className = "quick-setup__status" + (kind ? " " + kind : "");
    }

    function renderValidation(errors) {
      var fields = flatFields(currentSchema);
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var input = controlsByPath.get(field.path);
        var errorEl = errorsByPath.get(field.path);
        if (!input || !errorEl) continue;
        var showError = submitAttempted || touched.has(field.path);
        var message = showError && errors[field.path] ? errors[field.path] : "";
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

    function closeAllTooltips(returnFocus) {
      fieldsRoot.querySelectorAll(".qs-tooltip.is-open").forEach(function (el) {
        el.classList.remove("is-open");
        el.hidden = true;
        el.setAttribute("aria-hidden", "true");
        var wrap = el.closest(".qs-tooltip-wrap");
        if (wrap) {
          var btn = wrap.querySelector(".qs-tooltip-trigger");
          if (btn) {
            btn.setAttribute("aria-expanded", "false");
            if (returnFocus) btn.focus();
          }
        }
      });
    }

    function buildTooltipEl(field) {
      if (!field.tooltip) return null;

      var tooltipId = "qs-tip-" + field.path.replace(/\./g, "-");
      var wrap = createElements("div", "qs-tooltip-wrap");

      var btn = createElements("button", "qs-tooltip-trigger");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Help for " + field.label);
      btn.setAttribute("aria-controls", tooltipId);
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

      var card = createElements("div", "qs-tooltip");
      card.id = tooltipId;
      card.setAttribute("role", "region");
      card.setAttribute("aria-label", "Help for " + field.label);
      card.hidden = true;
      card.setAttribute("aria-hidden", "true");

      var body = createElements("div", "qs-tooltip__body");
      /* Safe: tooltip HTML is static content from schema, not user input */
      body.innerHTML = field.tooltip;
      card.appendChild(body);

      if (field.tooltipLink) {
        var linkEl = document.createElement("a");
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
          var focusTarget = card.querySelector("a, button") || card;
          if (focusTarget === card) card.setAttribute("tabindex", "-1");
          focusTarget.focus();
        }
      });

      wrap.appendChild(btn);
      wrap.appendChild(card);
      return wrap;
    }

    function switchProvider(newProviderId) {
      if (newProviderId === currentProvider) return;

      // Preserve telegram + integrations + agent name across provider switch
      var savedTelegram = clone(state.telegram || {});
      var savedIntegrations = clone(state.integrations || {});
      var savedName = normalizeString(getByPath(state, "agent.name")) || "SeekerClaw";

      currentProvider = newProviderId;
      currentSchema = buildSchema(newProviderId);

      state = createDefaultState(newProviderId);
      state.telegram = savedTelegram;
      state.integrations = savedIntegrations;
      state.agent.name = savedName;

      // Reset touched for provider-specific fields
      touched.delete("auth.type");
      touched.delete("auth.credential");
      touched.delete("agent.model");

      // Invalidate stale QR from previous provider
      lastDeepLink = "";
      captionEl.textContent = "Generate a QR to preview your SeekerClaw config import link.";
      setStatus("", "");
      clearCanvas(canvas);
      var canvasWrap = canvas.parentElement;
      if (canvasWrap) canvasWrap.classList.remove("has-qr");
      if (copyBtn) copyBtn.hidden = true;

      renderFields();
    }

    function renderFields() {
      fieldsRoot.innerHTML = "";
      controlsByPath.clear();
      errorsByPath.clear();

      for (var g = 0; g < currentSchema.length; g++) {
        var group = currentSchema[g];
        var groupEl = createElements("section", "qs-group");
        var headerEl = createElements("div", "qs-group__header");
        var titleEl = createElements("h3", "qs-group__title", group.title);
        headerEl.appendChild(titleEl);
        var gridEl = createElements("div", "qs-group__grid");
        groupEl.appendChild(headerEl);
        groupEl.appendChild(gridEl);

        for (var f = 0; f < group.fields.length; f++) {
          var field = group.fields[f];
          var fieldEl = createElements(
            "div",
            "qs-field" + (field.fullWidth ? " qs-field--full" : "")
          );

          var control;
          var labelRow, labelEl;
          if (field.type !== "toggle") {
            labelRow = createElements("div", "qs-label-row");
            labelEl = createElements("label", "qs-label");
            labelEl.textContent = field.label + (field.required ? " *" : "");
            labelRow.appendChild(labelEl);
            var tooltipEl = buildTooltipEl(field);
            if (tooltipEl) labelRow.appendChild(tooltipEl);
          }

          if (field.type === "select") {
            var currentVal = getByPath(state, field.path) || "";
            var currentLabel = ((field.options || []).find(function (o) { return o.value === currentVal; }) || (field.options || [])[0] || {}).label || "";

            var selectLabelId = "qs-label-" + field.path.replace(/\./g, "-");
            labelEl.id = selectLabelId;

            var wrap = createElements("div", "qs-select-wrap");
            var trigger = createElements("button", "qs-select-trigger");
            trigger.type = "button";
            trigger.setAttribute("role", "combobox");
            trigger.setAttribute("aria-expanded", "false");
            trigger.setAttribute("aria-haspopup", "listbox");
            trigger.setAttribute("aria-labelledby", selectLabelId);

            var triggerText = createElements("span", "qs-select-value", currentLabel);
            var triggerArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

            var dropdown = createElements("div", "qs-select-dropdown");
            dropdown.setAttribute("role", "listbox");

            (function (field, triggerText, wrap, trigger, dropdown) {
              for (var o = 0; o < field.options.length; o++) {
                var option = field.options[o];
                var optBtn = createElements("button", "qs-select-option", option.label);
                optBtn.type = "button";
                optBtn.dataset.value = option.value;
                optBtn.setAttribute("role", "option");
                if (option.value === currentVal) {
                  optBtn.classList.add("is-selected");
                  optBtn.setAttribute("aria-selected", "true");
                }
                (function (option) {
                  optBtn.addEventListener("click", function () {
                    triggerText.textContent = option.label;
                    dropdown.querySelectorAll(".qs-select-option").forEach(function (b) {
                      b.classList.remove("is-selected");
                      b.setAttribute("aria-selected", "false");
                    });
                    this.classList.add("is-selected");
                    this.setAttribute("aria-selected", "true");
                    wrap.classList.remove("is-open");
                    trigger.setAttribute("aria-expanded", "false");

                    touched.add(field.path);
                    setByPath(state, field.path, option.value);

                    // Provider switch triggers full re-render
                    if (field.path === 'provider') {
                      switchProvider(option.value);
                      return;
                    }

                    renderValidation(validateQuickSetup(state, currentSchema));
                  });
                })(option);
                dropdown.appendChild(optBtn);
              }
            })(field, triggerText, wrap, trigger, dropdown);

            trigger.addEventListener("click", function (e) {
              e.stopPropagation();
              closeAllTooltips();
              closeAllSelects();
              var isOpen = wrap.classList.toggle("is-open");
              trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
            });

            wrap.appendChild(trigger);
            wrap.appendChild(dropdown);

            control = trigger;
            control.dataset.path = field.path;
            controlsByPath.set(field.path, control);

            fieldEl.appendChild(labelRow);
            fieldEl.appendChild(wrap);

            var errorEl = createElements("p", "qs-error");
            errorEl.dataset.errorFor = field.path;
            fieldEl.appendChild(errorEl);
            errorsByPath.set(field.path, errorEl);

            gridEl.appendChild(fieldEl);
            continue;
          } else if (field.type === "toggle") {
            var toggleRow = createElements("div", "qs-label-row");
            var toggleLabel = createElements("label", "qs-toggle");
            control = createElements("input");
            control.type = "checkbox";
            control.checked = Boolean(getByPath(state, field.path));
            var toggleText = createElements("span", "qs-toggle__text", field.label);
            toggleLabel.appendChild(control);
            toggleLabel.appendChild(toggleText);
            toggleRow.appendChild(toggleLabel);
            var toggleTip = buildTooltipEl(field);
            if (toggleTip) toggleRow.appendChild(toggleTip);
            fieldEl.appendChild(toggleRow);
          } else {
            control = createElements("input", "qs-control");
            var baseType = field.type || "text";
            control.type = field.secret ? "password" : baseType;
            control.value = normalizeString(getByPath(state, field.path));
            if (field.placeholder) control.placeholder = field.placeholder;
            if (field.secret) control.dataset.secret = "1";
          }

          control.dataset.path = field.path;
          controlsByPath.set(field.path, control);

          if (field.type !== "toggle") {
            labelEl.htmlFor = "qs-" + field.path.replace(/\./g, "-");
            control.id = labelEl.htmlFor;
            fieldEl.appendChild(labelRow);
            fieldEl.appendChild(control);
          }

          var errorEl2 = createElements("p", "qs-error");
          errorEl2.dataset.errorFor = field.path;
          fieldEl.appendChild(errorEl2);
          errorsByPath.set(field.path, errorEl2);

          var inputEvent = field.type === "toggle" ? "change" : "input";
          (function (field, control) {
            control.addEventListener(inputEvent, function () {
              touched.add(field.path);
              var nextValue = field.type === "toggle" ? control.checked : normalizeString(control.value);
              setByPath(state, field.path, nextValue);
              renderValidation(validateQuickSetup(state, currentSchema));
            });
          })(field, control);

          gridEl.appendChild(fieldEl);
        }

        fieldsRoot.appendChild(groupEl);
      }

      renderValidation(validateQuickSetup(state, currentSchema));
    }

    async function renderQr(deepLink) {
      clearCanvas(canvas);
      if (!window.QRCode) {
        setStatus("QR library failed to load. Check your connection and retry.", "error");
        return false;
      }

      if (typeof window.QRCode.toCanvas === "function") {
        return new Promise(function (resolve) {
          window.QRCode.toCanvas(
            canvas,
            deepLink,
            {
              width: 400,
              margin: 1,
              errorCorrectionLevel: "L",
              color: { dark: "#000000", light: "#ffffff" },
            },
            function (error) {
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
          var canvasWrap = canvas.parentElement;
          if (!canvasWrap) {
            setStatus("QR surface failed to initialize. Reload and try again.", "error");
            return false;
          }
          canvas.style.display = "none";
          var hostEl = createElements("div", "quick-setup__qr-fallback-host");
          canvasWrap.appendChild(hostEl);
          new window.QRCode(hostEl, {
            text: deepLink,
            width: 400,
            height: 400,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: window.QRCode.CorrectLevel ? window.QRCode.CorrectLevel.L : undefined,
          });
          return true;
        } catch (e) {
          setStatus("Failed to render QR. Try shorter field values and generate again.", "error");
          return false;
        }
      }

      setStatus("QR library failed to load. Check your connection and retry.", "error");
      return false;
    }

    async function generateDeepLink() {
      submitAttempted = true;
      var errors = validateQuickSetup(state, currentSchema);
      renderValidation(errors);

      if (Object.keys(errors).length > 0) {
        setStatus("Fix the highlighted fields before generating the QR.", "error");
        return;
      }

      var envelope = buildConfigEnvelope(state);
      var json = JSON.stringify(minifyEnvelope(envelope));
      var payload = encodeBase64Url(json);
      var deepLink = buildSeekerConfigLink(payload);
      var qrOk = await renderQr(deepLink);
      if (!qrOk) return;

      lastDeepLink = deepLink;
      var canvasWrap = canvas.parentElement;
      if (canvasWrap) canvasWrap.classList.add("has-qr");
      captionEl.textContent = "Scan with SeekerClaw app to import this configuration.";
      if (copyBtn) copyBtn.hidden = false;
      setStatus("QR ready. Payload size: " + payload.length.toLocaleString() + " chars.", "success");
    }

    function clearAll() {
      currentProvider = 'claude';
      currentSchema = buildSchema(currentProvider);
      state = createDefaultState(currentProvider);
      touched.clear();
      submitAttempted = false;
      lastDeepLink = "";
      renderFields();
      captionEl.textContent = "Generate a QR to preview your SeekerClaw config import link.";
      setStatus("", "");
      clearCanvas(canvas);
      var canvasWrap = canvas.parentElement;
      if (canvasWrap) canvasWrap.classList.remove("has-qr");
      if (copyBtn) copyBtn.hidden = true;
    }

    clearCanvas(canvas);

    generateBtn.addEventListener("click", generateDeepLink);
    clearBtn.addEventListener("click", clearAll);

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        if (!lastDeepLink) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(lastDeepLink).then(function () {
            copyBtn.textContent = "Copied!";
            setTimeout(function () {
              copyBtn.innerHTML =
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Deep Link';
            }, 1500);
          }).catch(function () {
            setStatus("Copy failed — try manually.", "error");
          });
        } else {
          setStatus("Clipboard API not available in this browser.", "error");
        }
      });
    }

    /* Close custom selects and tooltips on outside click */
    document.addEventListener("click", function (e) {
      fieldsRoot.querySelectorAll(".qs-select-wrap.is-open").forEach(function (wrap) {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove("is-open");
          var trig = wrap.querySelector(".qs-select-trigger");
          if (trig) trig.setAttribute("aria-expanded", "false");
        }
      });
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

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeAllTooltips(true);
        closeAllSelects();
      }
    });

    renderFields();
  }

  window.SeekerQuickSetup = {
    buildConfigEnvelope: buildConfigEnvelope,
    encodeBase64Url: encodeBase64Url,
    buildSeekerConfigLink: buildSeekerConfigLink,
    validateQuickSetup: validateQuickSetup,
    buildSeekerLink: buildSeekerLink,
    initQuickSetup: initQuickSetup,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuickSetup, { once: true });
  } else {
    initQuickSetup();
  }
})();
