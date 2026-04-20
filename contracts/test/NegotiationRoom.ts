import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('NegotiationRoom', function () {
  it('settles at proposal when both parties accept', async function () {
    const [alice, bob] = await ethers.getSigners();

    const Room = await ethers.getContractFactory('NegotiationRoom');
    const room = await Room.deploy(alice.address, bob.address, 1000);

    await room.connect(bob).submitCounterpartyPrice(900, { value: 900 });
    expect(await room.proposedSettlement()).to.eq(950);

    await room.connect(alice).respondToProposal(true);
    await room.connect(bob).respondToProposal(true, { value: 50 });

    expect(await room.getStatusLabel()).to.eq('Resolved');
    expect(await room.hasDeal()).to.eq(true);
    expect(await room.finalSettlement()).to.eq(950);
  });

  it('settles lower midpoint when creator accepts and counterparty rejects', async function () {
    const [alice, bob] = await ethers.getSigners();

    const Room = await ethers.getContractFactory('NegotiationRoom');
    const room = await Room.deploy(alice.address, bob.address, 1000);

    await room.connect(bob).submitCounterpartyPrice(900, { value: 900 });

    await room.connect(alice).respondToProposal(true);
    await room.connect(bob).respondToProposal(false, { value: 25 });

    expect(await room.getStatusLabel()).to.eq('Resolved');
    expect(await room.hasDeal()).to.eq(true);
    expect(await room.finalSettlement()).to.eq(925);
  });

  it('closes room and refunds counterparty when both reject', async function () {
    const [alice, bob] = await ethers.getSigners();

    const Room = await ethers.getContractFactory('NegotiationRoom');
    const room = await Room.deploy(alice.address, bob.address, 1000);

    await room.connect(bob).submitCounterpartyPrice(900, { value: 900 });

    await room.connect(alice).respondToProposal(false);
    await room.connect(bob).respondToProposal(false);

    expect(await room.getStatusLabel()).to.eq('Closed');
    expect(await room.hasDeal()).to.eq(false);
    expect(await room.finalSettlement()).to.eq(0);
  });
});
