'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Handshake',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [arbitrumSepolia],
  ssr: true
});
