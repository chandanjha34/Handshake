'use client';

import { useState } from 'react';
import { useAccount, useReadContracts, useWriteContract } from 'wagmi';
import { Card, Button, Input } from '@/components/ui';
import { roomAbi } from '@/lib/contracts';
import { encryptPrice } from '@/lib/cofhe';

export default function RoomPage({ params }: { params: { room: string } }) {
  const room = params.room as `0x${string}`;
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [price, setPrice] = useState('');

  const { data, refetch } = useReadContracts({
    contracts: [
      { address: room, abi: roomAbi, functionName: 'getStatusLabel' },
      { address: room, abi: roomAbi, functionName: 'partyA' },
      { address: room, abi: roomAbi, functionName: 'partyB' },
      { address: room, abi: roomAbi, functionName: 'hasDeal' },
      { address: room, abi: roomAbi, functionName: 'finalSettlement' }
    ]
  });

  async function submit() {
    if (!address || !price) return;
    const encrypted = await encryptPrice(Number(price));

    await writeContractAsync({
      address: room,
      abi: roomAbi,
      functionName: 'submitEncryptedPrice',
      args: [encrypted]
    });

    setPrice('');
    refetch();
  }

  const status = data?.[0]?.result as string | undefined;
  const partyA = data?.[1]?.result as string | undefined;
  const partyB = data?.[2]?.result as string | undefined;
  const hasDeal = data?.[3]?.result as boolean | undefined;
  const settlement = data?.[4]?.result as bigint | undefined;

  return (
    <main className="space-y-6">
      <Card className="space-y-2">
        <p className="text-sm text-text-secondary">Room</p>
        <p className="font-mono text-sm text-text">{room}</p>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-bold text-text">Submit Encrypted Price</h2>
          <Input type="number" placeholder="Your reservation price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Button onClick={submit} disabled={isPending || !address}>
            {isPending ? 'Submitting...' : 'Encrypt & Submit'}
          </Button>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm text-text-secondary">Status</p>
          <p className="text-lg font-semibold text-text">{status || 'Loading...'}</p>
          <div className="space-y-1 text-sm text-text-secondary">
            <p>Party A: {partyA || '-'}</p>
            <p>Party B: {partyB || '-'}</p>
          </div>
        </Card>
      </section>

      <Card className="space-y-2">
        <p className="text-sm text-text-secondary">Result</p>
        {status === 'Settled' ? (
          hasDeal ? (
            <p className="text-2xl font-bold text-accent">Settlement: {settlement?.toString()}</p>
          ) : (
            <p className="text-2xl font-bold text-text-secondary">No Deal</p>
          )
        ) : (
          <p className="text-text-secondary">Final output appears only after both encrypted submissions.</p>
        )}
      </Card>
    </main>
  );
}
