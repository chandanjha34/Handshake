'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Card, Button, Input } from '@/components/ui';
import { FACTORY_ADDRESS, factoryAbi } from '@/lib/contracts';

export default function RoomsPage() {
  const { address } = useAccount();
  const [counterparty, setCounterparty] = useState('');
  const [weight, setWeight] = useState('50');
  const { writeContractAsync, isPending } = useWriteContract();

  const { data: rooms } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryAbi,
    functionName: 'allRooms',
    query: { enabled: Boolean(FACTORY_ADDRESS) }
  });

  async function createRoom() {
    if (!FACTORY_ADDRESS || !counterparty) return;

    await writeContractAsync({
      address: FACTORY_ADDRESS,
      abi: factoryAbi,
      functionName: 'createRoom',
      args: [counterparty as `0x${string}`, Number(weight)]
    });

    setCounterparty('');
    setWeight('50');
  }

  return (
    <main className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-bold text-text">Create Negotiation Room</h2>
          <Input placeholder="Counterparty address" value={counterparty} onChange={(e) => setCounterparty(e.target.value)} />
          <Input placeholder="Weight (0-100)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Button onClick={createRoom} disabled={!address || isPending}>
            {isPending ? 'Creating...' : 'Create Room'}
          </Button>
        </Card>

        <Card className="space-y-2">
          <p className="text-sm text-text-secondary">Connected wallet</p>
          <p className="break-all text-sm font-mono text-text">{address || 'Connect to continue'}</p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-text">Negotiation Rooms</h2>
        <div className="grid gap-3">
          {(rooms || []).map((room) => (
            <Link key={room} href={`/rooms/${room}`}>
              <Card className="transition hover:border-accent hover:bg-bg-secondary">
                <p className="font-mono text-sm text-text-secondary">{room}</p>
              </Card>
            </Link>
          ))}
          {(!rooms || rooms.length === 0) && <Card className="text-text-secondary">No rooms yet.</Card>}
        </div>
      </section>
    </main>
  );
}
