'use client';

import { useState } from 'react';
import { useAccount, useReadContracts, useWriteContract } from 'wagmi';
import { Card, Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { roomAbi } from '@/lib/contracts';

export default function RoomPage({ params }: { params: { room: string } }) {
  const room = params.room as `0x${string}`;
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [price, setPrice] = useState('900');

  const { data, refetch } = useReadContracts({
    contracts: [
      { address: room, abi: roomAbi, functionName: 'getStatusLabel' },
      { address: room, abi: roomAbi, functionName: 'partyA' },
      { address: room, abi: roomAbi, functionName: 'partyB' },
      { address: room, abi: roomAbi, functionName: 'creatorPrice' },
      { address: room, abi: roomAbi, functionName: 'counterpartyPrice' },
      { address: room, abi: roomAbi, functionName: 'proposedSettlement' },
      { address: room, abi: roomAbi, functionName: 'hasDeal' },
      { address: room, abi: roomAbi, functionName: 'finalSettlement' },
      { address: room, abi: roomAbi, functionName: 'decidedA' },
      { address: room, abi: roomAbi, functionName: 'decidedB' },
      { address: room, abi: roomAbi, functionName: 'acceptedA' },
      { address: room, abi: roomAbi, functionName: 'acceptedB' }
    ]
  });

  async function submitCounterpartyPrice() {
    if (!address || !price) return;
    const numericPrice = BigInt(Math.max(0, Math.floor(Number(price))));

    await writeContractAsync({
      address: room,
      abi: roomAbi,
      functionName: 'submitCounterpartyPrice',
      args: [numericPrice],
      value: numericPrice
    });

    setPrice('');
    refetch();
  }

  async function respond(accept: boolean) {
    if (!address) return;

    const callerIsB = address.toLowerCase() === partyB?.toLowerCase();
    let topUpValue = 0n;

    if (callerIsB && accept && proposed > bid) {
      topUpValue = proposed - bid;
    }

    await writeContractAsync({
      address: room,
      abi: roomAbi,
      functionName: 'respondToProposal',
      args: [accept],
      value: topUpValue
    });

    refetch();
  }

  const status = data?.[0]?.result as string | undefined;
  const partyA = data?.[1]?.result as string | undefined;
  const partyB = data?.[2]?.result as string | undefined;
  const ask = (data?.[3]?.result as bigint | undefined) || 0n;
  const bid = (data?.[4]?.result as bigint | undefined) || 0n;
  const proposed = (data?.[5]?.result as bigint | undefined) || 0n;
  const hasDeal = data?.[6]?.result as boolean | undefined;
  const settlement = data?.[7]?.result as bigint | undefined;
  const decidedA = data?.[8]?.result as boolean | undefined;
  const decidedB = data?.[9]?.result as boolean | undefined;
  const acceptedA = data?.[10]?.result as boolean | undefined;
  const acceptedB = data?.[11]?.result as boolean | undefined;

  const isPartyA = Boolean(address && partyA && address.toLowerCase() === partyA.toLowerCase());
  const isPartyB = Boolean(address && partyB && address.toLowerCase() === partyB.toLowerCase());
  const canSubmitBid = status === 'Waiting' && isPartyB;
  const canRespond =
    status === 'Proposed' && ((isPartyA && !decidedA) || (isPartyB && !decidedB));

  return (
    <main className="space-y-6">
      <Card className="cyber-panel space-y-3 bg-white/80">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Room identity</p>
            <p className="font-mono text-sm text-text">{room}</p>
          </div>
          <div className="handshake-pulse rounded-[18px_16px_20px_18px] border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
            Negotiation live
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="cyber-panel space-y-4 bg-white/80">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Participant action</p>
            <h2 className="text-xl font-bold text-text">Escrow + decision flow</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-[16px_18px_14px_20px] border border-border bg-bg-secondary px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Creator ask</p>
              <p className="mt-1 font-semibold text-text">{ask.toString()}</p>
            </div>
            <div className="rounded-[16px_18px_14px_20px] border border-border bg-bg-secondary px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Counter bid</p>
              <p className="mt-1 font-semibold text-text">{bid.toString()}</p>
            </div>
            <div className="rounded-[16px_18px_14px_20px] border border-border bg-bg-secondary px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Proposal</p>
              <p className="mt-1 font-semibold text-text">{proposed.toString()}</p>
            </div>
          </div>

          {canSubmitBid && (
            <>
              <Input
                type="number"
                placeholder="Counterparty price (escrow units)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button onClick={submitCounterpartyPrice} disabled={isPending || !address}>
                {isPending ? 'Submitting...' : 'Submit Bid + Escrow'}
              </Button>
            </>
          )}

          {canRespond && (
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => respond(true)} disabled={isPending}>
                {isPending ? 'Sending...' : 'Accept'}
              </Button>
              <Button className="bg-red-500 hover:bg-red-600" onClick={() => respond(false)} disabled={isPending}>
                {isPending ? 'Sending...' : 'Reject'}
              </Button>
            </div>
          )}

          <div className="rounded-[18px_16px_20px_18px] border border-border bg-bg-secondary px-4 py-3 text-xs leading-6 text-text-secondary">
            Counterparty escrows the bid amount. Proposal is midpoint. Accept/reject decisions then resolve,
            refund, or close the room.
          </div>
        </Card>

        <Card className="cyber-panel space-y-4 bg-white/80">
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Status</p>
            <p className="text-lg font-semibold text-text">{status || 'Loading...'}</p>
          </div>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>Party A: {partyA || '-'}</p>
            <p>Party B: {partyB || '-'}</p>
            <p>A decision: {decidedA ? (acceptedA ? 'Accepted' : 'Rejected') : 'Pending'}</p>
            <p>B decision: {decidedB ? (acceptedB ? 'Accepted' : 'Rejected') : 'Pending'}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['Private', 'Live', 'Settled'].map((item, index) => (
              <div
                key={item}
                className={cn(
                  'rounded-[16px_18px_14px_20px] border px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em]',
                  index === 1 ? 'border-accent bg-accent/10 text-text-secondary' : 'border-border bg-bg-secondary text-text-tertiary'
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card className="cyber-panel space-y-2 bg-white/80">
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
