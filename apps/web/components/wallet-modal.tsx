'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { cn } from '@/lib/utils';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connectAsync, error, isPending } = useConnect();
  const { address, isConnected, chain } = useAccount();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const [connectingId, setConnectingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConnect = async (connectorId: string) => {
    const connector = connectors.find((c) => c.id === connectorId);
    if (connector) {
      try {
        setConnectingId(connectorId);
        await connectAsync({ connector });
        onClose();
      } catch (error) {
        console.error('Connection failed:', error);
      } finally {
        setConnectingId(null);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchChainAsync({ chainId: sepolia.id });
    } catch (switchError) {
      console.error('Could not switch network:', switchError);
    }
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      console.error('Could not copy wallet address');
    }
  };

  const labelForConnector = (id: string) => {
    if (id.includes('walletConnect')) return 'WalletConnect';
    if (id.includes('metaMask')) return 'MetaMask';
    if (id.includes('coinbase')) return 'Coinbase Wallet';
    if (id.includes('injected')) return 'Browser Wallet';
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  const connectorIcon = (id: string) => {
    if (id.includes('walletConnect')) return 'WC';
    if (id.includes('metaMask')) return 'MM';
    if (id.includes('coinbase')) return 'CB';
    if (id.includes('injected')) return 'BW';
    return 'W';
  };

  const walletHint = (id: string) => {
    if (id.includes('walletConnect')) return 'Scan QR with mobile wallet';
    if (id.includes('metaMask')) return 'Connect with MetaMask extension';
    if (id.includes('coinbase')) return 'Use Coinbase extension or app';
    if (id.includes('injected')) return 'Detected from your browser';
    return 'Connect securely';
  };

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/45 px-3 backdrop-blur-sm md:px-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="cyber-panel relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-[28px_0_0_28px] border-l-2 border-y-2 border-accent/80 bg-panel shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Wallet connection dialog"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full border border-border bg-panel-alt px-2.5 py-1 text-text-secondary transition hover:border-accent hover:text-text"
          aria-label="Close wallet dialog"
        >
          ✕
        </button>

        <div className="grid h-full gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-accent/15 bg-[linear-gradient(180deg,rgba(255,247,239,0.96),rgba(255,255,255,0.92))] p-6 lg:border-b-0 lg:border-r">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">Handshake Wallet</p>
              <h2 className="text-2xl font-bold text-text">Connect like a production app</h2>
              <p className="text-sm leading-7 text-text-secondary">
                Built for negotiation flows: network awareness, clear wallet options, and a clean connected state.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-[18px_16px_20px_18px] border border-border bg-white/75 p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Network</p>
                <p className="mt-1 text-sm font-semibold text-text">{chain?.name || 'Not connected'}</p>
              </div>
              <div className="rounded-[18px_16px_20px_18px] border border-border bg-white/75 p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Mode</p>
                <p className="mt-1 text-sm font-semibold text-text">Private negotiation</p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px_18px_24px_20px] border border-accent/20 bg-white/70 p-4 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Recent wallets</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {['metaMask', 'coinbaseWallet', 'walletConnect'].map((id) => {
                  const connector = connectors.find((item) => item.id.toLowerCase().includes(id.toLowerCase()));
                  if (!connector) return null;

                  return (
                    <button
                      key={connector.id}
                      onClick={() => handleConnect(connector.id)}
                      disabled={isPending}
                      className="flex items-center gap-3 rounded-[16px_18px_14px_18px] border border-border bg-panel px-3 py-3 text-left transition hover:border-accent hover:bg-bg-secondary disabled:opacity-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[14px_16px_12px_18px] bg-accent/15 text-xs font-bold text-accent-dark">
                        {connectorIcon(connector.id)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-text">{labelForConnector(connector.id)}</span>
                        <span className="block text-xs text-text-secondary">Instant access</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {isConnected && chain?.id !== sepolia.id && (
              <div className="mt-4 rounded-[18px_16px_20px_18px] border border-amber-300 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-900">Wrong network</p>
                <p className="mt-1 text-xs leading-6 text-amber-800">
                  Switch to Ethereum Sepolia to use room creation and escrow settlement.
                </p>
                <button
                  onClick={handleSwitchNetwork}
                  disabled={isSwitchingChain}
                  className="mt-3 rounded-[14px_18px_14px_18px] border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 disabled:opacity-60"
                >
                  {isSwitchingChain ? 'Switching...' : 'Switch network'}
                </button>
              </div>
            )}

            <div className="mt-5 rounded-[20px_18px_22px_20px] border border-accent/20 bg-accent/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Connection notes</p>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>• QR or extension-based connect</li>
                <li>• Clear address and network state</li>
                <li>• Escape and outside-click to close</li>
              </ul>
            </div>
          </div>

          <div className="space-y-5 bg-panel p-6">
            {isConnected && address ? (
              <>
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold text-text">Wallet Connected</h2>
                  <p className="text-sm text-text-secondary">You are ready to negotiate privately</p>
                </div>

                <div className="rounded-[20px_18px_22px_20px] border border-accent/35 bg-accent/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-secondary">Address</span>
                    <button
                      onClick={copyAddress}
                      className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-text transition hover:bg-accent/20"
                    >
                      {displayAddress}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-secondary">Network</span>
                    <span className="font-semibold text-text">{chain?.name || 'Unknown network'}</span>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="w-full rounded-[16px_18px_14px_20px] border border-red-300 bg-red-50 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold text-text">Connect Wallet</h2>
                  <p className="text-sm text-text-secondary">Select your wallet provider to start</p>
                </div>

                <div className="space-y-3 max-h-[38rem] overflow-y-auto pr-1">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => handleConnect(connector.id)}
                      disabled={isPending}
                      className={cn(
                        'w-full rounded-[18px_16px_20px_18px] border p-4 text-left transition',
                        'hover:border-accent hover:bg-bg-secondary',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        isPending && connectingId === connector.id
                          ? 'border-accent bg-accent/10'
                          : 'border-border'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold text-text">{labelForConnector(connector.id)}</p>
                          <p className="text-xs text-text-secondary">{walletHint(connector.id)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-[14px_16px_12px_18px] bg-accent/15 text-[10px] font-bold text-accent-dark">
                            {connectorIcon(connector.id)}
                          </span>
                          {isPending && connectingId === connector.id && (
                            <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="rounded-[18px_16px_20px_16px] border border-red-300 bg-red-50 px-4 py-3 text-xs text-red-700">
                    {error.message || 'Failed to connect wallet. Please try again.'}
                  </div>
                )}

                <div className="rounded-[20px_22px_18px_24px] border border-accent/20 bg-accent/5 p-4">
                  <p className="text-xs leading-relaxed text-text-secondary">
                      Use a wallet on Ethereum Sepolia. If your wallet is not listed, choose WalletConnect and scan
                    with your mobile wallet.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
