import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Handshake',
  description: 'Private negotiation, perfectly settled.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <div className="mx-auto min-h-screen max-w-6xl px-6 py-6">
            <header className="mb-12 flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold tracking-wide text-white">
                Handshake
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/rooms" className="text-sm text-gray-300 hover:text-white">
                  Rooms
                </Link>
                <ConnectButton showBalance={false} />
              </div>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
