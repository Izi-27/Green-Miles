# Green-Miles

# Green Miles — Proof-of-Commute Network

**Turn every step, ride, or bus trip into verifiable climate action.**

Green Miles is a privacy-first mobility tracking project that converts verified low-carbon commutes (walk, bike, EV, bus, carpool) into on-chain verifiable carbon savings and rewards (Green Miles Credits — GMC). It combines device identity (IoTeX ioID), ZK proofs (Quicksilver), scalable data + AI analytics (0G), and a user-facing web & mobile experience.

---

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [How it Works (high level)](#how-it-works-high-level)
- [Tech Stack](#tech-stack)
- [Quickstart (developer)](#quickstart-developer)
- [Configuration](#configuration)
- [APIs & Example Payloads](#apis--example-payloads)
- [Rewards & Economics](#rewards--economics)
- [Enterprise & City Integrations](#enterprise--city-integrations)
- [Privacy & Security](#privacy--security)
- [Roadmap](#roadmap)
- [Success Metrics](#success-metrics)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

## Overview

**Problem.** Transportation is the top source of urban CO₂ emissions. Existing carbon-tracking apps are either inaccurate, invade user privacy (raw GPS), or lack verifiable, auditable proof — making employer/city/carbon-market adoption difficult.

**Objective.** Build a privacy-first Proof-of-Commute network that:
- Verifies low-carbon trips without exposing raw GPS,
- Issues traceable rewards (GMC) that are usable in enterprise rewards, discounts, NFTs or pooled into offsets,
- Provides AI-driven insights for enterprises and cities to plan incentives and policy.

**Target users.**
1. Individuals / commuters — earn GMC for verified trips while protecting location privacy.  
2. Enterprises & universities — run sponsorships and reward programs.  
3. Cities & governments — ingest verified mobility data for planning and carbon targets.

---

## Core Features

- **Device & Transport Registration (IoTeX ioID)**  
  Register devices (bike sensors, OBD-II car modules, fitness trackers, EVs). Transport types map to emissions baselines.

- **Privacy-Preserving Tracking (Quicksilver + IoTeX)**  
  Commute is logged locally → zero-knowledge proof generated → proof verifies trip length, mode, and carbon saved on-chain without exposing raw GPS.

- **Rewards Engine (Green Miles Credits — GMC)**  
  Configurable conversion (e.g., `1 km bike → X GMC`). GMCs are redeemable for discounts, NFTs, or carbon pooling.

- **AI Optimization Layer (0G)**  
  Scalable storage + ML models for route suggestions, city CO₂ savings predictions, and enterprise dashboards.

- **Community & Gamification**  
  Challenges, leaderboards, and NFT badges for milestones (e.g., 100 km biked).

---

## How it Works (high level)

1. **Device registration.** Device (or user) receives an ioID; transport baseline assigned.  
2. **Trip capture (local).** Phone/device records a trip summary (distance, duration, mode) — raw GPS never leaves device.  
3. **ZK proof generation.** Quicksilver (or local ZK module) creates a proof that asserts trip properties (distance, mode, emissions saved) without revealing coordinates.  
4. **On-chain verification.** Proof is submitted to IoTeX smart contract; verified proofs trigger GMC issuance or reward events.  
5. **Data storage & AI.** Encrypted, privacy-preserving aggregates are stored on 0G for analytics and dashboards.  
6. **Redemption & APIs.** Users/enterprises redeem GMC or query dashboards via APIs/webhooks.

Device / Mobile] --(local trip summary + ZK proof)--> [Quicksilver ZK module]
└--(proof)--> [IoTeX L1: Proof verifier contract] --(events)--> [Rewards Engine]

--> [0G storage / AI analytics] --> [Enterprise dashboard / API]


---

## Tech Stack

- **Blockchain & Identity**
  - IoTeX (L1) — on-chain proof verification & tokenization
  - IoTeX ioID — device / user identity
- **ZK Proofs**
  - Quicksilver — ZK proof generation framework
- **Data & AI**
  - 0G Network — scalable storage and AI model integration for analytics
- **Frontend**
  - Web + Mobile (wallet integration, trip tracker, rewards dashboard)
- **Backend**
  - REST/GraphQL APIs, queue processors for proof verification, rewards & redemption subsystems

---

## Quickstart (developer)

### Prerequisites
- Node.js >= 16 / Yarn or npm  
- Docker & docker-compose (optional for local infra)  
- IoTeX testnet account & RPC URL  
- API keys for Quicksilver (or local ZK module) and 0G storage

### Clone & install
```bash
git clone https://github.com/<org>/green-miles.git
cd green-miles
yarn install

Environment (example)
Create a .env file (see Configuration).
Run locally
# Start backend
yarn workspace backend dev

# Start web frontend
yarn workspace web dev

# Mobile
# open mobile app project in Expo / Xcode / Android Studio

Run with Docker Compose
version: '3.7'
services:
  app:
    build: .
    environment:
      - DATABASE_URL=postgres://...
      - IOTEX_RPC_URL=https://testnet.iotex.io
      - QUICKSLVR_API_KEY=${QUICKSLVR_API_KEY}
    ports:
      - "3000:3000"
docker-compose up --build

Configuration
Example .env file:
# Blockchain / identity
IOTEX_RPC_URL=https://testnet.iotex.io
IOTEX_PRIVATE_KEY=0x...

# ZK / Proofs
QUICKSLVR_API_KEY=your_quicksilver_key
QUICKSLVR_ENDPOINT=https://api.quicksilver.example/proofs

# 0G storage & AI
ZERO_G_ENDPOINT=https://0g.example/api
ZERO_G_API_KEY=...

# App & DB
DATABASE_URL=postgres://user:pass@localhost:5432/greenmiles
JWT_SECRET=supersecret
PORT=3000
APIs & Example Payloads
Submit proof
POST /api/proofs
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "ioId": "ioid:abc123",
  "tripSummary": {
    "mode": "bike",
    "distance_m": 4200,
    "duration_s": 1200,
    "start_ts": 1690000000,
    "end_ts": 1690001200
  },
  "zkProof": "<base64-zk-proof>"
}
Example on-chain event
{
  "event": "ProofVerified",
  "ioId": "ioid:abc123",
  "mode": "bike",
  "distance_m": 4200,
  "co2_saved_g": 300,
  "gmc_issued": 12
}
Rewards & Economics
Green Miles Credits (GMC) are issued after proof verification.
Conversion (example):
1 km bike = 1.0 GMC
1 km bus = 0.5 GMC
walking = +0.1 GMC per km (bonus)
Redemption options:
Retailer discounts
NFT badges
Carbon offset pools
Enterprise & City Integrations
Sponsorship & challenges: Enterprise onboarding to sponsor rewards and run leaderboards.
Dashboards: Aggregated, anonymized analytics for commuting patterns and CO₂ savings.
APIs & Webhooks: Real-time events for proof verification and reward issuance.
Data exports: Privacy-preserving aggregates for planning and carbon market reporting.
Webhook example
{
  "event": "proof_verified",
  "org_id": "uni-123",
  "ioId": "ioid:abc123",
  "mode": "bus",
  "distance_m": 12500,
  "co2_saved_g": 4500,
  "gmc_awarded": 6
}
Privacy & Security
Zero-knowledge proofs verify trip attributes without transmitting raw GPS.
Device identity (ioID) ties actions to identity without exposing personal traces.
Minimal storage: only aggregates stored on 0G, encrypted.
On-chain auditability: proofs are verifiable without leaking PII.
Roadmap
Phase 1 (0–3 months) — MVP
Proof-of-Commute app (bike/walk)
Basic GMC issuance
Local ZK proof integration
Phase 2 (3–6 months) — Expansion
Enterprise dashboard
Bus/EV/OBD-II integrations
On-chain ZK verification
Phase 3 (6–12 months) — Scale
AI route optimization & city partners
Carbon market linkage
Gamification + NFTs + merchants
Success Metrics
User adoption: # of verified commuters
Carbon saved: cumulative CO₂ reduction
Enterprise adoption: companies / cities integrated
Ecosystem value: GMC usage in markets & programs
Contributing
We welcome contributions!
Fork the repo & create a feature branch.
Open PRs with clear descriptions & tests.
Follow the code style and update docs for new features.
Use issues for requests and bug reports.
Labels: area/frontend, area/backend, area/zk, area/integration
License & Contact
License: MIT (update if different).

---

## Contact
**Email:** olubusuyiisaiah27@gmail.com
**Discord:** big_izi

