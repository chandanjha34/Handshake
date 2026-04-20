'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';
import { WalletModal } from './wallet-modal';
import { cn } from '@/lib/utils';

export function ConnectWalletButton() {
  const { address, isConnected, chain } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'rounded-[16px_18px_14px_20px] border px-4 py-2 text-sm font-semibold transition shadow-sm',
          isConnected
            ? 'border-accent bg-accent text-bg hover:bg-accent-dark'
            : 'border-border bg-panel text-text hover:border-accent hover:text-accent'
        )}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
      >
        {isConnected ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-bg" />
            {chain?.name || 'Connected'}
            <span className="text-bg/70">{displayAddress}</span>
          </span>
        ) : (
          'Connect Wallet'
        )}
      </button>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
