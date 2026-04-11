---
name: byreal
description: "Trade on Byreal DEX (Solana CLMM) — pool analytics, token prices, K-line charts, swap quotes, execute swaps, view positions, copy top farmers. Use when: user asks about Byreal pools, concentrated liquidity, LP positions, pool APR/TVL, or wants to swap via Byreal. Don't use when: user wants general crypto prices (use crypto-prices skill), wants Jupiter swaps (use solana_swap tool), or wants basic wallet balance (use solana_balance tool)."
version: "1.0.0"
emoji: "🌊"
image: "https://seekerclaw.xyz/assets/partner-skills/byreal.jpg"
requires:
  bins: []
  env: []
allowed-tools:
  - web_fetch
  - solana_address
  - solana_balance
  - solana_swap
---

# Byreal DEX — Concentrated Liquidity on Solana

> **Third-party service.** Byreal (byreal.io) is an independent DEX not affiliated with SeekerClaw. Swaps involve real funds on Solana mainnet. Pool APR/TVL figures are estimates and not guaranteed. Concentrated liquidity positions carry impermanent loss risk. Use at your own risk.

Trade and analyze concentrated liquidity pools on Solana via Byreal's public API. No API key required for read operations.

**Base URL:** `https://api2.byreal.io`

## Use when

- "Show me Byreal pools", "top pools by TVL", "highest APR pools"
- "What's the price of X on Byreal?", "token prices"
- "Get me a chart for SOL/USDC on Byreal", "K-line data"
- "Swap on Byreal", "get a Byreal swap quote"
- "My Byreal positions", "my LP positions"
- "Top farmers on this pool", "copy trade"
- "Byreal DEX stats", "Byreal volume"

## Don't use when

- General crypto prices without Byreal context → use crypto-prices skill
- Jupiter/Raydium swaps → use solana_swap tool directly
- Basic wallet balance → use solana_balance tool
- Token launches → use clawpump skill

---

## API Response Format

All Byreal API responses follow this structure:

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "success": true,
    "data": { /* actual payload */ }
  }
}
```

Paginated results include `data.total`, `data.pageNum`, `data.pageSize`, `data.records`.

Always check `retCode === 0` and `result.success === true` before using `result.data`.

---

## Flow 1: Global DEX Overview

Quick stats: TVL, 24h volume, 24h fees, total historical volume, pool count.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/overview/global"
})
```

**Key fields in `result.data`:**
- `tvl` — Total Value Locked (USD)
- `volume24h` — 24h trading volume (USD)
- `fees24h` — 24h fees collected (USD)
- `totalVolume` — All-time volume (USD)
- `totalFees` — All-time fees (USD)
- `poolCount` — Number of active pools

Present as a clean summary with USD formatting.

---

## Flow 2: List Pools

Browse and filter pools by TVL, volume, fees, or APR.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/pools/info/list?page=1&pageSize=10&sortField=tvl&sortType=desc"
})
```

### Parameters

| Param | Values | Default |
|-------|--------|---------|
| `page` | Page number (1-based) | 1 |
| `pageSize` | Results per page (max 100) | 20 |
| `sortField` | `tvl`, `volume24h`, `fees24h`, `apr24h` | `tvl` |
| `sortType` | `asc`, `desc` | `desc` |
| `category` | `stable`, `xStocks`, `launchpad`, `normal` | all |

### Key fields per pool record

- `poolAddress` — Pool address (use in other queries)
- `tokenA` / `tokenB` — Token pair info (symbol, mint, decimals, logo)
- `tvl` — Current TVL (USD)
- `volume24h` — 24h volume (USD)
- `fees24h` — 24h fees (USD)
- `apr24h` — Estimated 24h APR (%)
- `feeRate` — Pool fee tier

Present as a table: Pair | TVL | 24h Volume | APR.

---

## Flow 3: Pool Detail

Full analytics for a specific pool.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/pools/details?poolAddress=<POOL_ADDRESS>"
})
```

**Key fields in `result.data`:**
- All fields from pool listing (TVL, volume, fees, APR)
- `priceRange24h` — 24h price range
- `rewards` — Active reward programs
- `priceChange` — Price changes over various periods

Use this when the user asks for details on a specific pool or wants to analyze before entering a position.

---

## Flow 4: K-Line / Candlestick Data

OHLCV chart data for a pool's token.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/kline/query-ui?poolAddress=<POOL_ADDRESS>&tokenAddress=<TOKEN_MINT>&klineType=1h"
})
```

### Parameters

| Param | Values |
|-------|--------|
| `poolAddress` | Pool address |
| `tokenAddress` | Mint address of the token to chart |
| `klineType` | `1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `4h`, `12h`, `1d` |

**Key fields per candle:** `open`, `high`, `low`, `close`, `volume`, `timestamp`

Summarize recent candles (last 5-10). For longer history, mention the trend direction and range.

---

## Flow 5: List / Search Tokens

Browse tokens with prices and volume data.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/mint/list?page=1&pageSize=10&sortField=volumeUsd24h&sort=desc"
})
```

### Parameters

| Param | Values | Default |
|-------|--------|---------|
| `page` | Page number | 1 |
| `pageSize` | Results per page | 20 |
| `sortField` | `volumeUsd24h`, `tvl`, `priceUsd` | `volumeUsd24h` |
| `sort` | `asc`, `desc` | `desc` |
| `search` | Token mint address (exact match) | — |

**Key fields per token:**
- `symbol`, `name`, `mintAddress`, `logoUrl`
- `priceUsd` — Current price
- `priceChange24h` — 24h price change (%)
- `volumeUsd24h` — 24h volume (USD)
- `tvl` — Total liquidity (USD)

To look up a specific token by address, use `search=<mint_address>`.

---

## Flow 6: Batch Token Prices

Fast price lookup for multiple tokens at once.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/mint/price?mints=<MINT1>,<MINT2>,<MINT3>"
})
```

Pass comma-separated mint addresses. Returns price per token.

**Common Solana mints:**
- SOL: `So11111111111111111111111111111111111111112`
- USDC: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- USDT: `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB`

---

## Flow 7: Swap Quote (Preview Only)

Get a swap quote with route info. Does NOT execute.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/router/v1/router-service/swap",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    inputMint: "<INPUT_MINT>",
    outputMint: "<OUTPUT_MINT>",
    amount: "<AMOUNT_IN_SMALLEST_UNITS>",
    slippageBps: 100,
    userPublicKey: "<WALLET_ADDRESS>"
  })
})
```

### Parameters

| Param | Description |
|-------|-------------|
| `inputMint` | Mint address of token to sell |
| `outputMint` | Mint address of token to buy |
| `amount` | Amount in smallest units (lamports for SOL, 1e6 for USDC) |
| `slippageBps` | Slippage tolerance in basis points (100 = 1%) |
| `userPublicKey` | User's wallet address (get via `solana_address()`) |

**Key fields in response:**
- Input/output amounts and tokens
- Price impact (%)
- Route type and pool addresses used
- Unsigned transaction (for execution)

Present: "Swap X TOKEN_A → Y TOKEN_B, price impact Z%, via [route]"

---

## Flow 8: Execute Swap

Two-step: get quote, then confirm with user and execute.

### Step 1 — Get wallet address

```
solana_address({})
```

### Step 2 — Get swap quote (Flow 7)

Show the user:
- Input token and amount
- Output token and expected amount
- Price impact %
- Slippage tolerance
- "Execute this swap on Byreal? Your wallet will ask you to approve."

**Wait for explicit user approval. Never execute without it.**

### Step 3 — Execute

Use the `solana_swap` tool with the Byreal quote data, or submit the unsigned transaction from the quote response for MWA signing.

If using `solana_swap` directly:
```
solana_swap({
  inputMint: "<INPUT_MINT>",
  outputMint: "<OUTPUT_MINT>",
  amount: <AMOUNT>,
  slippageBps: 100
})
```

---

## Flow 9: View Positions

List a user's concentrated liquidity positions.

```javascript
solana_address({})
```

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/position/list?userAddress=<WALLET_ADDRESS>"
})
```

**Key fields per position:**
- Pool pair (token A / token B)
- Price range (lower / upper bounds)
- Liquidity amount
- Unclaimed fees
- In-range status (whether current price is within the position's range)

Present as a table: Pool | Range | Liquidity | Fees | Status (In/Out of Range).

---

## Flow 10: Top Farmers (Copy Trading Discovery)

Find the most profitable positions in a pool.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/copyfarmer/top-positions",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    poolAddress: "<POOL_ADDRESS>",
    page: 1,
    pageSize: 10,
    sortField: "pnl",
    sortType: "desc"
  })
})
```

### Sort options

| sortField | Description |
|-----------|-------------|
| `pnl` | Profit & loss |
| `fees` | Fees earned |
| `liquidity` | Position size |

Present: top farmers' positions with PnL, fees earned, price range, and liquidity.

**Note:** Opening a copy position (Phase 2) requires the `@byreal-io/byreal-clmm-sdk`. For now, present the data for the user's own analysis.

---

## Flow 11: Priority Fee Rates

Get current Solana priority fee recommendations.

```javascript
web_fetch({
  url: "https://api2.byreal.io/byreal/api/dex/v2/main/auto-fee"
})
```

Returns fee rates for different priority levels (high, medium, extreme). Useful when advising users on transaction speed vs cost.

---

## Mobile Optimization Rules

1. **Default to small pages** — use `pageSize=10` unless user asks for more
2. **Summarize, don't dump** — format as clean tables and summaries, not raw JSON
3. **Format USD values** — use `$1.2M`, `$456K`, not raw numbers
4. **Format percentages** — APR, price change, price impact as `X.XX%`
5. **Mention data source** — "Data from Byreal DEX" at the bottom

## Safety Rules

1. **Always confirm before swapping.** Never execute a swap without explicit user approval.
2. **Show price impact.** If price impact > 1%, warn the user. If > 5%, strongly advise caution.
3. **Check balance first.** Before any swap, verify the user has sufficient balance.
4. **No private keys.** Only public wallet addresses are sent to Byreal APIs.
5. **Quote first.** Always show a quote before executing. Let the user decide.
6. **Position risk.** When showing pool data, mention that concentrated liquidity carries impermanent loss risk if the user seems unfamiliar.

## Error Handling

| retCode | Meaning | Action |
|---------|---------|--------|
| 0 | Success | Process `result.data` normally |
| Non-zero | API error | Show `retMsg` to user, suggest retrying |
| Network error | API unreachable | Tell user "Byreal API is currently unavailable, try again shortly" |
| Empty `records` | No results | Tell user no pools/tokens/positions found matching their query |

## Examples

**User:** "Show me the top Byreal pools"
**Action:** Flow 2 — list pools sorted by TVL, present top 10 as table

**User:** "What's the APR on SOL/USDC on Byreal?"
**Action:** Flow 2 — search pools, find SOL/USDC pair, show APR + TVL + volume

**User:** "Swap 1 SOL to USDC on Byreal"
**Action:** Flow 8 — get address, get quote, show preview, wait for approval, execute

**User:** "My Byreal positions"
**Action:** Flow 9 — get wallet address, list positions, show table

**User:** "Who are the top farmers on pool X?"
**Action:** Flow 10 — top positions sorted by PnL, present top 10

**User:** "Byreal stats"
**Action:** Flow 1 — global overview, present TVL, volume, fees, pool count

**User:** "Chart SOL/USDC 4h on Byreal"
**Action:** Flow 4 — K-line data with 4h interval, summarize recent candles + trend
