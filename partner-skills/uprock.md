---
name: uprock
description: "Crawl web pages through UpRock's distributed device network — JS-rendered page capture, geo-validated sweeps across NA/EU/APAC/LATAM/MEA, sticky sessions, and Solana RPC. Use when: user wants to fetch a JS-heavy page the default web_fetch can't handle, check how a site renders from multiple regions, or scrape behind anti-bot walls. Don't use when: the user just wants a plain HTML or JSON URL (use web_fetch), or a search query with ranked results (use web_search)."
version: "1.0.0"
emoji: "🛰️"
image: "https://seekerclaw.xyz/assets/partner-skills/uprock.jpg"
requires:
  bins: []
  env: ["UPROCK_API_KEY"]
allowed-tools:
  - web_fetch
  - file_read
  - file_write
---

# UpRock Distributed Crawl

> **Third-party service.** UpRock (uprock.ai) is an independent distributed-crawl network not affiliated with SeekerClaw. Each crawl is executed by a real device somewhere in UpRock's network — response content and metadata (device_id, device_location) come from that device. Crawl jobs consume plan credits. Use at your own discretion; don't crawl sites you don't have permission to crawl.

---

## When to Use

Reach for UpRock instead of the default `web_fetch` tool when:

- A page is **JS-rendered** and `web_fetch` returns an empty shell (React/Vue/Next SPAs, product pages that hydrate from APIs)
- A site **blocks or rate-limits** SeekerClaw's direct requests (Cloudflare challenge, datacenter IP block) — UpRock crawls from residential-style devices
- The user wants to know **how a page looks from a specific region** (geo-validation, "does my landing page render in EU?")
- A multi-step flow needs a **sticky identity** (same device, same cookies) across several requests
- The user is probing a **Solana RPC endpoint** and wants it fetched through UpRock's `SOLANA_JSON_RPC` path

Do NOT use UpRock when:
- A plain HTTP GET with JSON/HTML already works (`web_fetch` is faster and free)
- User asks a question that needs SERP results — that's `web_search`
- User wants onchain analytics — that's the `dune-analytics` skill

## Authentication

Requires an UpRock API key from [uprock.ai](https://uprock.ai) → sign up → API section → **Create new key**.

The key is read from the `UPROCK_API_KEY` environment variable. To check if it's already configured, read `agent_settings.json` and look for `apiKeys.uprock`.

If not found, ask the user:
1. Go to https://uprock.ai and sign up (email verification)
2. Open the API section, click **Create new key**
3. Share the key

Save to `agent_settings.json`:
```javascript
file_write({
  path: "agent_settings.json",
  // Read existing settings first, then merge:
  // settings.apiKeys.uprock = "<key>"
})
```

**NEVER save API keys to memory files (MEMORY.md, daily notes). Keys go ONLY in agent_settings.json or env vars.**

## API Overview

Base URL: `https://edge.uprock.com`
Auth header: `Authorization: Bearer {UPROCK_API_KEY}`

Async job model — every crawl returns a `job_id`, and the result is fetched in a second call. Typical flow:

```
POST /crawl/v1/new        → { job_id }
GET  /crawl/v1/jobs/{id}/download
  → 200 { mainResult, fullPage, readerContent, ... }  (done)
  → 202 / 409 "Job is not yet completed"              (retry after 2-3s)
```

| Endpoint | Method | Purpose |
|---|---|---|
| `/crawl/v1/new` | POST | Create a single crawl job |
| `/crawl/v1/status/{job_id}` | GET | Lightweight status probe |
| `/crawl/v1/jobs/{job_id}/detail` | GET | Full job metadata (headers, cookies, TLS, timing) |
| `/crawl/v1/jobs/{job_id}/download` | GET | Full result (body, fullPage, screenshot, readerContent, performanceMetrics) |
| `/crawl/v1/jobs/batch/status` | POST | Status for up to 1000 job_ids at once |
| `/crawl/v1/sweep/new` | POST | Multi-region sweep (same URL × many regions) |
| `/crawl/v1/sweep/{sweep_id}` | GET | Sweep status + results |
| `/crawl/v1/session/new` | POST | Create sticky session (same device across jobs) |
| `/crawl/v1/session/{id}` | GET | Session details |
| `/crawl/v1/session/{id}/jobs` | GET | List jobs in a session |
| `/crawl/v1/session/{id}/close` | POST | Close a session |

## Workflow 1: Simple Crawl (Preferred)

Use for: a single URL, get the final rendered content. Three steps.

### Step 1: Create Job

```javascript
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/new",
  method: "POST",
  headers: {
    "Authorization": "Bearer {UPROCK_API_KEY}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://example.com",
    method: "GET",
    timeout_sec: 30
  })
})
```

Response:
```json
{
  "job_id": "f2bf9f8b-10ee-4c61-9633-4eacc3e8aac8",
  "status": "completed",
  "url": "https://example.com/"
}
```

### Step 2: Poll + Download

Go straight to download — it returns 202/409 if not ready, 200 when done. Poll every 2-3 seconds, max 10 tries.

```javascript
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/jobs/{job_id}/download",
  headers: { "Authorization": "Bearer {UPROCK_API_KEY}" }
})
```

Key response fields:
- `mainResult.status_code` — upstream HTTP status (200, 404, 500, …)
- `mainResult.body` — raw response body
- `mainResult.headers` — response headers from the target site
- `mainResult.time_ms` — round-trip time from the device
- `readerContent` — **use this first for long articles** — extracted reader-mode text
- `fullPage` — full rendered HTML (only for `CRAWL_FULL_PAGE` method)
- `metadata.device_location` — `{country, region, city}` of the device that crawled

**Mobile rule:** prefer `readerContent` over `body`/`fullPage` when summarizing — drops 5-10× the tokens.

## Workflow 2: JS-Rendered Full Page (The Big One)

Use for: SPAs, pages that hydrate client-side, pages where `web_fetch` returns `<div id="root"></div>`.

```javascript
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/new",
  method: "POST",
  headers: {
    "Authorization": "Bearer {UPROCK_API_KEY}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://spa.example.com/product/123",
    method: "CRAWL_FULL_PAGE",   // ← JS-rendered capture
    timeout_sec: 60              // bump — SPAs take longer
  })
})
```

Then download as in Workflow 1. The result will include:
- `fullPage` — fully-hydrated HTML
- `readerContent` — extracted article text
- `performanceMetrics` — LCP, FCP, CLS, load times, viewport, network type
- `screenshot` — PNG (optional, large payload)

## Workflow 3: Geo Sweep

Use for: "does my page render correctly in Europe?", "what do APAC users see?", one-shot geo-validation.

```javascript
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/sweep/new",
  method: "POST",
  headers: {
    "Authorization": "Bearer {UPROCK_API_KEY}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://example.com",
    regions: ["NA", "EU", "APAC"],   // pick from: NA, EU, APAC, LATAM, MEA
    tries_per_region: 1,              // 1-10, default 3 — keep low to save credits
    timeout_sec: 60,                  // 1-120, default 60
    device_type: "mobile"             // "mobile" or "desktop"
  })
})
```

Response:
```json
{
  "sweep_id": "5cb37d22-...",
  "total_jobs": 3,
  "job_ids": ["...", "...", "..."]
}
```

Fetch results:
```javascript
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/sweep/{sweep_id}",
  headers: { "Authorization": "Bearer {UPROCK_API_KEY}" }
})
```

**Credit cost:** `regions.length × tries_per_region` jobs — a 5-region × 3-try sweep = 15 jobs. Always default `tries_per_region: 1` unless the user specifically wants redundancy.

## Workflow 4: Sticky Session (Advanced)

Use for: multi-step flows where you need the same device/IP across requests (login → navigate → action).

```javascript
// 1. Create session
const session = web_fetch({
  url: "https://edge.uprock.com/crawl/v1/session/new",
  method: "POST",
  headers: { "Authorization": "Bearer {UPROCK_API_KEY}", "Content-Type": "application/json" },
  body: JSON.stringify({ duration_seconds: 300 })  // 1-3600, default 60
})
// → { id: "session-uuid", ... }

// 2. Submit jobs with session_id
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/new",
  method: "POST",
  headers: { "Authorization": "Bearer {UPROCK_API_KEY}", "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "https://example.com/step-1",
    session_id: "session-uuid",
    method: "GET"
  })
})

// 3. (Optional) Close session when done
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/session/{id}/close",
  method: "POST",
  headers: { "Authorization": "Bearer {UPROCK_API_KEY}" }
})
```

Sessions auto-expire after `duration_seconds` — closing is good hygiene but not required.

## Workflow 5: Solana JSON-RPC (Niche)

UpRock can proxy Solana RPC calls from its device network. Use when the user wants a Solana RPC query routed through a specific geo, or the default RPC is rate-limiting.

```javascript
web_fetch({
  url: "https://edge.uprock.com/crawl/v1/new",
  method: "POST",
  headers: { "Authorization": "Bearer {UPROCK_API_KEY}", "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "https://api.mainnet-beta.solana.com",
    method: "SOLANA_JSON_RPC",
    body: btoa(JSON.stringify({
      jsonrpc: "2.0", id: 1,
      method: "getBalance",
      params: ["So11111111111111111111111111111111111111112"]
    })),
    timeout_sec: 30
  })
})
```

The `body` field is base64-encoded (POST/PUT convention). Prefer SeekerClaw's native `solana_balance` / `solana_price` tools over this — only use the Solana RPC path if the user explicitly wants UpRock in the loop.

## Request Body Fields (Reference)

For `/crawl/v1/new`:

| Field | Type | Default | Notes |
|---|---|---|---|
| `url` | string | — | **Required.** |
| `method` | string | `GET` | `GET` \| `POST` \| `PUT` \| `DELETE` \| `HEAD` \| `OPTIONS` \| `SOLANA_JSON_RPC` \| `CRAWL_FULL_PAGE` |
| `timeout_sec` | integer | 30 | 1-300 |
| `headers` | object | — | `{name: [value1, value2]}` — values are arrays |
| `body` | string | — | **base64-encoded** (POST/PUT) |
| `cookies` | array | — | Alternative to `Cookie` header |
| `session_id` | uuid | — | Join a session (Workflow 4) |
| `placement` | object | — | Device-selection constraints |
| `storage_type` | string | `local` | `local` or `s3` |

## Mobile Optimization Rules

1. **Prefer `readerContent`** over `body` / `fullPage` for articles — a 500KB HTML blob becomes a 5KB summary.
2. **Start with `method: "GET"`** — only escalate to `CRAWL_FULL_PAGE` if the first result has empty/skeleton content.
3. **Keep sweeps small** — `tries_per_region: 1` unless the user explicitly wants redundancy. A 5-region sweep already costs 5 credits.
4. **Don't poll forever** — max 10 poll attempts at 2-3s each = 30s ceiling. Timeout → tell the user, don't loop.
5. **Never dump `fullPage` raw** — summarize or extract specific elements; `fullPage` can be >1MB.
6. **Skip `screenshot`** unless the user specifically wants a visual — it's a large base64 payload that eats context.

## Response Format

For a single crawl:
```
🛰️ **Fetched via UpRock** (device: FR-Paris)

[2-4 sentence summary of the page, drawn from readerContent]

Source: {url} · Status: 200 · 1.2s via UpRock
```

For a sweep:
```
🛰️ **Geo Sweep: {url}**

| Region | Status | Time | Notes |
|--------|--------|------|-------|
| NA     | 200    | 820ms | OK    |
| EU     | 200    | 940ms | OK    |
| APAC   | 503    | 12s   | upstream error from Singapore |

Sweep ran on 3 regions, 1 try each.
```

## Error Handling

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Proceed |
| 201 | Job / sweep / session created | Proceed to polling |
| 202 | Accepted, not yet complete | Wait 2-3s, retry download |
| 204 | Session closed | Proceed |
| 400 | Bad request (invalid URL, reserved field) | Fix request, show the field that failed |
| 401 | Invalid API key | Ask user to re-enter key |
| 404 | Job/session not found, or not authorized | Fail — resource doesn't exist |
| 409 | Job not yet completed | Same handling as 202 |
| 410 | Job archived, content gone | Fail — tell user the result expired |
| 5xx | Server error | Retry with backoff, max 3 attempts |

## Examples

**User:** "Fetch the React docs homepage, I keep getting an empty page"
**Action:** Workflow 2 (`method: "CRAWL_FULL_PAGE"`) on https://react.dev, return `readerContent`.

**User:** "Does my landing page load correctly in Europe and APAC?"
**Action:** Workflow 3 sweep with `regions: ["EU", "APAC"]`, `tries_per_region: 1`, device_type matched to user hint (mobile default).

**User:** "This page blocks me — can you try through UpRock?"
**Action:** Workflow 1 simple crawl. If result is still blocked (403, Cloudflare challenge in body), escalate to `CRAWL_FULL_PAGE` and retry once.

**User:** "Crawl these 3 product URLs from the same session"
**Action:** Workflow 4 — create session, submit 3 jobs with the `session_id`, download each, close session.

**User:** "What's the LCP / performance of example.com?"
**Action:** Workflow 2, return `performanceMetrics` (LCP, FCP, CLS, load times) formatted as a short vitals table.

**User:** "Where does UpRock think I'm crawling from?"
**Action:** Workflow 1 on any URL, return `metadata.device_location` (country/region/city).
