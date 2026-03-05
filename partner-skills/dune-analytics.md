---
name: dune-analytics
version: "1.0.0"
description: "Query onchain data from Dune Analytics — Solana DEX trades, token stats, wallet activity, protocol metrics, and custom SQL"
metadata:
  openclaw:
    emoji: "🔮"
    requires:
      bins: []
      env: ["DUNE_API_KEY"]
---

# Dune Analytics

Query blockchain data via the Dune API. Optimized for Solana but supports all chains Dune covers (Ethereum, Base, Arbitrum, etc.).

## When to Use

User asks about:
- Onchain analytics ("Top Solana DEX volume today", "Jupiter trades last 24h")
- Wallet activity ("What has wallet X been doing?")
- Token stats ("BONK holders", "Token transfer volume")
- Protocol metrics ("Raydium TVL", "Marinade staking stats")
- Custom SQL queries against Dune's data warehouse
- Running or fetching results from saved Dune queries

## Authentication

Requires a Dune API key. Check memory first:

```javascript
memory_search({ query: "DUNE_API_KEY" })
```

If not found, ask the user to:
1. Go to https://dune.com → Settings → API → Create New API Key
2. Share the key (you'll save it securely)

Save:
```javascript
memory_save({ content: "DUNE_API_KEY: <key>", section: "credentials" })
```

## API Overview

Base URL: `https://api.dune.com/api/v1`
Auth header: `X-DUNE-API-KEY: <key>`

Two main workflows:
1. **Saved query results** — instant, cached, lightweight (preferred for mobile)
2. **Inline SQL** — flexible, runs custom SQL, requires polling for results

## Workflow 1: Get Saved Query Results (Preferred)

Fetches the latest cached result of a saved Dune query. **No execution cost, instant response.**

```javascript
web_fetch({
  url: "https://api.dune.com/api/v1/query/{query_id}/results?limit=10&columns=column1,column2",
  headers: { "X-DUNE-API-KEY": "{DUNE_API_KEY}" }
})
```

### Key Parameters

| Param | Description |
|-------|-------------|
| `limit` | Max rows (use 5-20 for mobile — keep responses small) |
| `offset` | Pagination start row |
| `columns` | Comma-separated column names to return (reduces payload) |
| `filters` | SQL WHERE clause, e.g. `blockchain = 'solana'` |
| `sort_by` | SQL ORDER BY, e.g. `volume desc` |

### Response Shape

```json
{
  "execution_id": "01HKZJ...",
  "state": "QUERY_STATE_COMPLETED",
  "result": {
    "rows": [{"project": "Jupiter", "volume_usd": 1234567}],
    "metadata": {
      "column_names": ["project", "volume_usd"],
      "row_count": 10,
      "total_row_count": 500
    }
  }
}
```

## Workflow 2: Execute Inline SQL

For custom queries. Two steps: execute → poll → get results.

### Step 1: Execute

```javascript
web_fetch({
  url: "https://api.dune.com/api/v1/sql/execute",
  method: "POST",
  headers: {
    "X-DUNE-API-KEY": "{DUNE_API_KEY}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sql: "SELECT * FROM solana.transactions LIMIT 5",
    performance: "medium"
  })
})
```

Response: `{ "execution_id": "01HK...", "state": "QUERY_STATE_PENDING" }`

### Step 2: Poll Status (if needed)

```javascript
web_fetch({
  url: "https://api.dune.com/api/v1/execution/{execution_id}/status",
  headers: { "X-DUNE-API-KEY": "{DUNE_API_KEY}" }
})
```

States: `QUERY_STATE_PENDING` → `QUERY_STATE_EXECUTING` → `QUERY_STATE_COMPLETED`
Wait 2-3 seconds between polls. Most queries complete in 5-30 seconds.

### Step 3: Get Results

```javascript
web_fetch({
  url: "https://api.dune.com/api/v1/execution/{execution_id}/results?limit=10",
  headers: { "X-DUNE-API-KEY": "{DUNE_API_KEY}" }
})
```

## Workflow 3: Execute Saved Query (Fresh Run)

Re-executes a saved query with optional parameters. Use when cached results are stale.

```javascript
web_fetch({
  url: "https://api.dune.com/api/v1/query/{query_id}/execute",
  method: "POST",
  headers: {
    "X-DUNE-API-KEY": "{DUNE_API_KEY}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query_parameters: { "wallet_address": "So11111111111111111111111111111111111111112" },
    performance: "medium"
  })
})
```

Then poll + get results same as Workflow 2.

## Popular Saved Query IDs (Solana)

Use these with Workflow 1 for instant results:

| Query ID | Description | Key Columns |
|----------|-------------|-------------|
| 3296263 | Solana DEX volume (24h, by project) | project, volume_usd, trades |
| 3210943 | Top Solana tokens by volume | token_symbol, volume_usd, trades_count |
| 3360532 | Solana daily active addresses | day, active_addresses |
| 2808961 | Jupiter aggregator stats | date, volume_usd, num_trades, unique_users |
| 3567088 | Solana stablecoin transfers | date, token, volume, transfers |

**Note:** Query IDs can change if authors delete/recreate them. If a query returns 404, fall back to inline SQL.

## Useful SQL Snippets (Solana)

### Top DEX trades (last 24h)
```sql
SELECT project, SUM(amount_usd) as volume_usd, COUNT(*) as trades
FROM dex_solana.trades
WHERE block_time > NOW() - INTERVAL '24' HOUR
GROUP BY project
ORDER BY volume_usd DESC
LIMIT 10
```

### Wallet token transfers
```sql
SELECT token_mint_address, SUM(amount) as total_amount, COUNT(*) as txns
FROM tokens_solana.transfers
WHERE (from_owner = '{{wallet}}' OR to_owner = '{{wallet}}')
  AND block_time > NOW() - INTERVAL '7' DAY
GROUP BY token_mint_address
ORDER BY txns DESC
LIMIT 15
```

### Token holder count
```sql
SELECT COUNT(DISTINCT owner) as holders
FROM tokens_solana.fungible_token_accounts
WHERE mint = '{{token_mint}}'
  AND amount > 0
```

### Daily transaction count
```sql
SELECT DATE_TRUNC('day', block_time) as day, COUNT(*) as txns
FROM solana.transactions
WHERE block_time > NOW() - INTERVAL '7' DAY
GROUP BY 1
ORDER BY 1 DESC
```

### Jupiter swap volume
```sql
SELECT DATE_TRUNC('day', block_time) as day,
       SUM(amount_usd) as volume_usd,
       COUNT(*) as swaps
FROM dex_solana.trades
WHERE project = 'jupiter'
  AND block_time > NOW() - INTERVAL '7' DAY
GROUP BY 1
ORDER BY 1 DESC
```

### NFT sales on Solana
```sql
SELECT project, SUM(amount_usd) as volume, COUNT(*) as sales
FROM nft_solana.trades
WHERE block_time > NOW() - INTERVAL '24' HOUR
GROUP BY project
ORDER BY volume DESC
LIMIT 10
```

## Dune Table Reference (Solana)

| Table | Description |
|-------|-------------|
| `solana.transactions` | Raw transactions |
| `solana.account_activity` | Account-level activity |
| `dex_solana.trades` | DEX trades (Jupiter, Raydium, Orca, etc.) |
| `tokens_solana.transfers` | SPL token transfers |
| `tokens_solana.fungible_token_accounts` | Token account balances |
| `nft_solana.trades` | NFT marketplace trades |
| `prices.usd` | Token prices (cross-chain) |
| `prices.usd_latest` | Latest token prices |
| `stablecoins.transfers` | Stablecoin transfers |

For EVM chains, replace `solana` with chain name (e.g., `dex.trades`, `ethereum.transactions`).

## Rate Limits

| Plan | Low-limit (writes) | High-limit (reads) |
|------|--------------------|--------------------|
| Free | 15 rpm | 40 rpm |
| Plus | 70 rpm | 200 rpm |
| Enterprise | 350+ rpm | 1000+ rpm |

- Getting saved results = high-limit (read)
- Executing queries = low-limit (write)
- **Always prefer Workflow 1** (cached results) over Workflow 2 (execute) to conserve rate limits

## Mobile Optimization Rules

1. **Always use `limit`** — default to 10 rows, max 20 for tables
2. **Always use `columns`** — only request columns you'll display
3. **Prefer saved query results** over inline SQL (instant, no polling)
4. **Cache awareness** — saved query results may be minutes/hours old, mention freshness
5. **Summarize, don't dump** — format results as a concise summary, not raw JSON
6. **Avoid wide tables** — pick 3-4 most relevant columns max

## Response Format

Present data clearly and concisely:

```
🔮 **Solana DEX Volume (24h)**

| Project     | Volume       | Trades  |
|-------------|------------- |---------|
| Jupiter     | $245.3M      | 1.2M    |
| Raydium     | $89.7M       | 456K    |
| Orca        | $34.2M       | 178K    |

Total: $412.5M across 2.1M trades
Data from Dune · Updated 15 min ago
```

For single values:
```
🔮 BONK holders: 1,245,678 wallets
Source: Dune Analytics
```

## Error Handling

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad SQL or params | Check query syntax |
| 401 | Invalid API key | Ask user to re-enter key |
| 402 | Billing limit hit | Switch to cached results or wait |
| 404 | Query not found | Query ID may be deleted; use inline SQL instead |
| 429 | Rate limited | Wait 60s, then retry |

## Examples

**User:** "What's the DEX volume on Solana today?"
**Action:** Fetch saved query 3296263 with limit=10, format as table

**User:** "How many BONK holders are there?"
**Action:** Run inline SQL on tokens_solana.fungible_token_accounts, return count

**User:** "Show me Jupiter stats for the last week"
**Action:** Run Jupiter swap volume SQL snippet, format as daily breakdown

**User:** "What tokens has wallet ABC... been trading?"
**Action:** Run wallet token transfers SQL with the wallet address, show top tokens

**User:** "Run Dune query 12345"
**Action:** Fetch results for query ID 12345 with limit=10

**User:** "Compare Raydium vs Orca volume"
**Action:** Run DEX volume SQL filtered by project, show comparison
