import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config({ path: 'contracts/.env' });

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ARB_SEPOLIA_RPC = process.env.ARB_SEPOLIA_RPC || '';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  paths: {
    sources: 'contracts/src',
    tests: 'contracts/test',
    cache: 'contracts/cache',
    artifacts: 'contracts/artifacts'
  },
  networks: {
    arbitrumSepolia: {
      url: ARB_SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};

export default config;
