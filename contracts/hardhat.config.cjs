require('@nomicfoundation/hardhat-toolbox');
require('ts-node/register/transpile-only');
const dotenv = require('dotenv');
const path = require('node:path');

dotenv.config({ path: path.join(__dirname, '.env') });

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ETH_SEPOLIA_RPC = process.env.ETH_SEPOLIA_RPC || process.env.ARB_SEPOLIA_RPC || '';

/** @type {import('hardhat/config').HardhatUserConfig} */
module.exports = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  paths: {
    sources: path.join(__dirname, 'src'),
    tests: path.join(__dirname, 'test'),
    cache: path.join(__dirname, 'cache'),
    artifacts: path.join(__dirname, 'artifacts')
  },
  networks: {
    sepolia: {
      url: ETH_SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};
