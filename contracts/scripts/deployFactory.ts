import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error('No deployer signer found. Set PRIVATE_KEY and ETH_SEPOLIA_RPC in contracts/.env');
  }

  const network = await ethers.provider.getNetwork();
  console.log(`Deploying on chainId=${network.chainId} with deployer=${deployer.address}`);

  const Factory = await ethers.getContractFactory('NegotiationFactory');
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  console.log('NegotiationFactory deployed:', await factory.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
