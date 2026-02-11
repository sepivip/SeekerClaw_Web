# SeekerClaw Web

Static marketing site for SeekerClaw, including a GitHub Pages-compatible Quick Setup QR builder.

## Quick Setup QR (Schema v1)

The browser-only builder generates a deep link in this format:

`seekerclaw://config?payload=<base64url(JSON)>`

Encoding flow:

1. Build envelope object with `v: 1` and `config`.
2. `json = JSON.stringify(envelope)`.
3. UTF-8 encode + base64url encode `json`.
4. Build deep link `seekerclaw://config?payload=<base64url>`.
5. Render QR from the full deep link string.

### Quick Setup UI

- Actions shown in UI: `Generate QR` and `Clear` only.
- `Generate QR` always validates current form values and regenerates the QR from latest state.
- `Clear` resets form values, clears QR canvas preview, and clears status text.
- Deep link is internal transport for QR generation and is not shown in UI.
- Security warning remains visible: anyone who scans the QR can import credentials.

Envelope shape:

```json
{
  "v": 1,
  "config": {
    "auth": {
      "type": "api_key",
      "credential": "..."
    },
    "telegram": {
      "botToken": "...",
      "ownerId": ""
    },
    "agent": {
      "model": "claude-opus-4-6",
      "name": "SeekerClaw"
    },
    "integrations": {
      "braveApiKey": ""
    },
    "extensions": {}
  }
}
```

Device behavior preferences are configured inside the SeekerClaw Android app, not in Quick Setup web QR.

## Quick Setup Helper API

`js/quick-setup.js` exports on `window.SeekerQuickSetup`:

- `buildConfigEnvelope(formState)` (required)
- `encodeBase64Url(jsonString)` (required)
- `buildSeekerConfigLink(payloadB64Url)` (required)
- `validateQuickSetup(formState)` (required)

Backward-compat wrappers are also kept:

- `buildSeekerLink(payload)` -> calls `buildSeekerConfigLink(payload)`
- `validateState(formState)` -> calls `validateQuickSetup(formState)`

## Adding Fields (v2+ ready)

1. Add field metadata to `QUICK_SETUP_SCHEMA` in `js/quick-setup.js`.
2. Add default value in `DEFAULT_STATE`.
3. Merge and normalize the new value in `buildConfigEnvelope(formState)`.
4. Add validation rules in `validateQuickSetup(formState)` if needed.
5. Keep new keys additive when possible, and prefer `config.extensions` for experimental/future keys.

When shipping a true schema version upgrade:

1. Bump `ENVELOPE_VERSION`.
2. Keep v1 compatibility until old app versions are dropped.
3. Remove deprecated fields only after compatibility window closes.

## Security Caveat

Quick Setup QR is plaintext transport of credentials encoded as base64url (not encrypted), with no signature and no trust proof. Anyone who can read the QR/deep link can import the same credentials.
