import { ethers } from 'hardhat';

async function main() {
  const Factory = await ethers.getContractFactory('NegotiationFactory');
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  console.log('NegotiationFactory deployed:', await factory.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
