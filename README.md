# Handshake — Confidential Negotiation dApp

Handshake is a full-stack decentralized app for private two-party negotiation and escrow-based settlement on Ethereum Sepolia. It helps two parties converge on a deal without exposing sensitive pricing strategy in the UI flow.

## Project description

Handshake is designed as a protocol-first negotiation product: one party opens a room with a target price, the counterparty submits a bid with escrow, the app computes a proposed midpoint, and both sides accept/reject to finalize settlement logic onchain. The product goal is to make high-trust negotiation possible with low information leakage.

### Revenue streams

Potential monetization paths for Handshake include:

- **Per-settlement protocol fee**: charge a small basis-point fee on successful settlements.
- **Premium enterprise workflows**: branded/private workspaces, custom negotiation templates, and role-based access control.
- **API and SDK licensing**: offer negotiation/settlement primitives for other apps or marketplaces.
- **Analytics subscriptions**: paid dashboards for negotiation performance, conversion rates, and settlement velocity.
- **Partner integrations**: referral or integration revenue from wallets, custody providers, and compliant KYC providers.

### Technologies used

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, wagmi v2, ethers.js.
- **Smart contracts**: Solidity 0.8.24, Hardhat, TypeChain.
- **Web3 UX**: wallet connectors (injected, WalletConnect, Coinbase), network-aware wallet modal.
- **Testing and deployment**: Hardhat tests, scripted deployment to Ethereum Sepolia.
- **Architecture**: room factory pattern (`NegotiationFactory`) and per-room escrow/decision lifecycle (`NegotiationRoom`).

### Benefits

- **Privacy-oriented negotiation flow**: minimizes unnecessary pricing disclosure during deal-making.
- **Transparent settlement state**: room status, acceptance decisions, and final outcome are verifiable onchain.
- **Fast MVP UX**: room creation, counterparty submission, and settlement decisions in a wallet-native interface.
- **Composable contract model**: factory + room architecture is extensible for future policy and compliance modules.
- **Production direction ready**: clear upgrade path from Sepolia MVP to hardened deployment.

### Current problems and gaps

- **Testnet stage only**: currently deployed/tested on Ethereum Sepolia, not production mainnet.
- **No formal security audit yet**: contract logic needs external audit before handling real value.
- **Limited dispute handling**: current lifecycle focuses on direct accept/reject outcomes, without advanced arbitration flows.
- **Operational polish pending**: indexer-backed analytics, observability, and protocol telemetry are still lightweight.
- **Build noise in dependencies**: optional wallet ecosystem warnings (`@react-native-async-storage/async-storage`, `pino-pretty`) are non-blocking but still present in build output.

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind, shadcn-style components, wagmi v2, RainbowKit, ethers.js
- **Contracts**: Solidity 0.8.24, Hardhat
- **Encryption flow**: CoFHE SDK client wrapper (stubbed adapter in this repo so you can wire the real Fhenix client)
- **Chain target**: Arbitrum Sepolia

## Repository layout

- `contracts/` — Solidity contracts + tests
- `apps/web/` — Next.js frontend

## Smart contracts

- `NegotiationFactory.sol`
  - creates rooms
  - tracks room addresses
- `NegotiationRoom.sol`
  - stores encrypted offers from party A/B
  - overlap check via `FHE.lte`
  - weighted midpoint settlement with `FHE.add`, `FHE.mul`, `FHE.div`
  - silent failure selection with `FHE.select`
  - emits final decrypted-like result via `publishDecryptResult`

> Note: the `MockFHE.sol` library is a local stand-in for integration testing and API shape. Replace with Fhenix CoFHE primitives for production.

## Quick start

### 1) Install dependencies

```bash
npm install
npm --prefix apps/web install
```

### 2) Run contracts tests

```bash
npm run test:contracts
```

### 3) Run frontend

```bash
npm run dev:web
```

Open `http://localhost:3000`.

## Environment variables

Create `apps/web/.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<walletconnect-project-id>
NEXT_PUBLIC_FACTORY_ADDRESS=<deployed-factory-address>
NEXT_PUBLIC_ARB_SEPOLIA_RPC=<https-rpc-url>
```

## Deploying contracts

1. Configure private key + RPC in `contracts/.env`
2. Run:

```bash
npm run deploy:factory
```

## Security notes

- Client encrypts price before contract submission (`apps/web/lib/cofhe.ts`)
- Contract path avoids branching-based reverts for deal/no-deal conditions
- Success/failure paths are homogenized via `FHE.select`

## Product vision

> “A secure handshake between two parties — where trust is enforced by cryptography, not disclosure.”
