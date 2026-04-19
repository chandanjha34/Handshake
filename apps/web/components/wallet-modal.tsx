'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { cn } from '@/lib/utils';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConnect = async (connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId);
    if (connector) {
      setIsLoading(true);
      setSelectedConnector(connectorId);
      try {
        connect({ connector });
      } catch (error) {
        console.error('Connection failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="rounded-[28px_24px_26px_22px] border-2 border-accent bg-panel w-full max-w-sm shadow-2xl p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-text-secondary hover:text-text transition"
        >
          ✕
        </button>

        <div className="space-y-6">
          {isConnected && address ? (
            <>
              {/* Connected state */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-text">Connected</h2>
                <p className="text-sm text-text-secondary">{displayAddress}</p>
              </div>

              <div className="rounded-[20px_18px_22px_20px] bg-accent/10 p-4 border border-accent/30 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Network</span>
                  <span className="font-medium text-text">Arbitrum Sepolia</span>
                </div>
                <div className="h-px bg-accent/20" />
                <button
                  onClick={handleDisconnect}
                  className="w-full rounded-[16px_18px_14px_20px] bg-red-100 text-red-600 hover:bg-red-200 transition py-2 text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Connect state */}
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold text-text">Connect Wallet</h2>
                <p className="text-sm text-text-secondary">Choose a wallet to continue</p>
              </div>

              {/* Wallets list */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => handleConnect(connector.id)}
                    disabled={isLoading && selectedConnector === connector.id}
                    className={cn(
                      'w-full rounded-[18px_16px_20px_18px] border-2 p-4 text-left transition',
                      'hover:border-accent-light hover:bg-bg-secondary',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      selectedConnector === connector.id && isLoading
                        ? 'border-accent bg-accent/5'
                        : 'border-border'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-text capitalize">
                          {connector.id === 'walletConnect'
                            ? 'WalletConnect'
                            : connector.id === 'injected'
                              ? 'Browser Wallet'
                              : connector.id.charAt(0).toUpperCase() + connector.id.slice(1)}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {connector.id === 'walletConnect'
                            ? 'Connect via QR code'
                            : 'Auto-detected in browser'}
                        </p>
                      </div>
                      {selectedConnector === connector.id && isLoading && (
                        <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Info section */}
              <div className="rounded-[20px_22px_18px_24px] bg-accent/5 p-4 border border-accent/20">
                <p className="text-xs text-text-secondary leading-relaxed">
                  By connecting, you agree to share your wallet address and transaction history with Handshake.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
