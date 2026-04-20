import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: 'contracts/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ETH_SEPOLIA_RPC = process.env.ETH_SEPOLIA_RPC || process.env.ARB_SEPOLIA_RPC || '';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  paths: {
    sources: path.resolve(__dirname, 'src'),
    tests: path.resolve(__dirname, 'test'),
    cache: path.resolve(__dirname, 'cache'),
    artifacts: path.resolve(__dirname, 'artifacts')
  },
  networks: {
    sepolia: {
      url: ETH_SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};

export default config;
