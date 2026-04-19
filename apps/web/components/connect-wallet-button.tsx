'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';
import { WalletModal } from './wallet-modal';
import { cn } from '@/lib/utils';

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'rounded-[16px_18px_14px_20px] border-2 px-6 py-2 text-sm font-medium transition shadow-sm',
          isConnected
            ? 'border-accent bg-accent text-white hover:bg-accent-dark'
            : 'border-accent bg-transparent text-accent hover:bg-accent/10'
        )}
      >
        {isConnected ? displayAddress : 'Connect Wallet'}
      </button>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
