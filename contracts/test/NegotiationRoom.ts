import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('NegotiationRoom', function () {
  it('settles with weighted midpoint when overlap exists', async function () {
    const [alice, bob] = await ethers.getSigners();

    const Room = await ethers.getContractFactory('NegotiationRoom');
    const room = await Room.deploy(alice.address, bob.address, 40);

    await room.connect(alice).submitEncryptedPrice(80);
    await room.connect(bob).submitEncryptedPrice(120);

    expect(await room.hasDeal()).to.eq(true);
    expect(await room.finalSettlement()).to.eq(104);
  });

  it('returns no-deal when overlap does not exist', async function () {
    const [alice, bob] = await ethers.getSigners();

    const Room = await ethers.getContractFactory('NegotiationRoom');
    const room = await Room.deploy(alice.address, bob.address, 50);

    await room.connect(alice).submitEncryptedPrice(150);
    await room.connect(bob).submitEncryptedPrice(90);

    expect(await room.hasDeal()).to.eq(false);
    expect(await room.finalSettlement()).to.eq(0);
  });
});
