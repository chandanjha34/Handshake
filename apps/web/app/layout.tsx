import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Providers } from '@/components/providers';
import { ConnectWalletButton } from '@/components/connect-wallet-button';

export const metadata: Metadata = {
  title: 'Handshake',
  description: 'Private negotiation, perfectly settled.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="mx-auto min-h-screen max-w-6xl px-6 py-6">
            <header className="mb-12 flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold tracking-wide text-text">
                Handshake
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/rooms" className="text-sm text-text-secondary hover:text-text">
                  Rooms
                </Link>
                <ConnectWalletButton />
              </div>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
