'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Card, Button, Input } from '@/components/ui';
import { FACTORY_ADDRESS, factoryAbi } from '@/lib/contracts';

export default function RoomsPage() {
  const { address } = useAccount();
  const [counterparty, setCounterparty] = useState('');
  const [creatorPrice, setCreatorPrice] = useState('1000');
  const { writeContractAsync, isPending } = useWriteContract();

  const { data: rooms } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryAbi,
    functionName: 'allRooms',
    query: { enabled: Boolean(FACTORY_ADDRESS) }
  });

  async function createRoom() {
    if (!FACTORY_ADDRESS || !counterparty || !creatorPrice) return;

    await writeContractAsync({
      address: FACTORY_ADDRESS,
      abi: factoryAbi,
      functionName: 'createRoom',
      args: [counterparty as `0x${string}`, BigInt(Math.max(0, Math.floor(Number(creatorPrice))))]
    });

    setCounterparty('');
    setCreatorPrice('1000');
  }

  return (
    <main className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
        <Card className="cyber-panel space-y-5 bg-white/80">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Rooms overview</p>
              <h2 className="text-2xl font-bold text-text">Create negotiation room</h2>
              <p className="max-w-xl text-sm leading-7 text-text-secondary">
                Create a private room and invite a counterparty to submit encrypted prices against a weighted split.
              </p>
            </div>
            <div className="handshake-pulse hidden rounded-[18px_16px_20px_18px] border border-accent/30 bg-accent/10 px-4 py-3 text-right text-xs uppercase tracking-[0.18em] text-text-secondary sm:block">
              Ready to settle
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Counterparty address" value={counterparty} onChange={(e) => setCounterparty(e.target.value)} />
            <Input placeholder="Creator price (escrow units)" type="number" value={creatorPrice} onChange={(e) => setCreatorPrice(e.target.value)} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={createRoom} disabled={!address || isPending}>
              {isPending ? 'Creating...' : 'Create Room'}
            </Button>
            <div className="rounded-full border border-border bg-bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              Onchain room generator
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="cyber-panel space-y-2 bg-white/75">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Connected wallet</p>
            <p className="break-all text-sm font-mono text-text">{address || 'Connect to continue'}</p>
          </Card>
          <Card className="cyber-panel space-y-2 bg-white/75">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Flow</p>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>1. Invite a counterparty</p>
              <p>2. Submit encrypted prices</p>
              <p>3. Review private settlement outcome</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold text-text">Negotiation Rooms</h2>
          <div className="hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary md:block">
            Live status stream
          </div>
        </div>

        <div className="grid gap-3">
          {(rooms || []).map((room, index) => (
            <Link key={room} href={`/rooms/${room}`}>
              <Card className="cyber-panel transition hover:-translate-y-0.5 hover:border-accent hover:bg-bg-secondary">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Room {index + 1}</p>
                    <p className="font-mono text-sm text-text-secondary">{room}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
                    Open room
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {(!rooms || rooms.length === 0) && (
            <Card className="cyber-panel text-text-secondary">No rooms yet. Create the first private negotiation.</Card>
          )}
        </div>
      </section>
    </main>
  );
}
