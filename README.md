# Handshake — Confidential Negotiation dApp

Handshake is a full-stack decentralized app for private two-party negotiation using FHE-inspired encrypted flows.

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
