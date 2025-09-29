# Green Miles MVP Project Structure

## Project Overview
Green Miles is a privacy-first blockchain-based platform that converts sustainable commuting into verifiable Green Miles Credits (GMC).

## Components

### 1. Smart Contracts
- **GMCToken**: ERC20 token with staking functionality
- **TripVerification**: Handles trip submission, verification, and rewards
- **DeviceRegistry**: Manages user devices for trip tracking
- **EnterpriseRewards**: Corporate reward campaigns and employee management

### 2. Backend API
- Node.js with Express
- PostgreSQL with Prisma ORM
- Authentication with JWT and Web3 signatures
- Trip verification and reward distribution

### 3. Frontend Dashboard
- Next.js with TypeScript and App Router
- Tailwind CSS for styling
- Web3 integration with Wagmi + Viem
- Premium UI components and visualizations

## Implementation Plan
1. Set up development environments for each component
2. Implement smart contracts on IoTeX testnet
3. Develop backend API with database integration
4. Create frontend dashboard with Web3 connectivity
5. Test and deploy the integrated system