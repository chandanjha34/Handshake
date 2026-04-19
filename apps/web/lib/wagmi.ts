'use client';

import { createConfig, http } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { sepolia } from 'wagmi/chains';

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim();

const connectors = [
  injected({ target: 'metaMask' }),
  injected({ target: 'coinbaseWallet' }),
  coinbaseWallet({ appName: 'Handshake' }),
  ...(walletConnectProjectId
    ? [
        walletConnect({
          projectId: walletConnectProjectId,
          metadata: {
            name: 'Handshake',
            description: 'Private negotiation, perfectly settled.',
            url: 'https://handshake.app',
            icons: ['https://avatars.githubusercontent.com/u/37784886']
          },
          showQrModal: true
        })
      ]
    : [])
];

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_SEPOLIA_RPC?.trim() || process.env.NEXT_PUBLIC_ARB_SEPOLIA_RPC?.trim() || undefined
    )
  },
  ssr: true
});
