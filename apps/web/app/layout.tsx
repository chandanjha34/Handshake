import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/providers';
import { AnimatedNavbar } from '@/components/animated-navbar';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono'
});

export const metadata: Metadata = {
  title: 'Handshake',
  description: 'Private negotiation, perfectly settled.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        <Providers>
          <div className="mx-auto min-h-screen max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
            <AnimatedNavbar />

            {children}

            <footer className="mt-16 border-t border-border/80 pt-8 pb-3">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text">Handshake</p>
                  <p className="max-w-xs text-sm leading-6 text-text-secondary">
                    Confidential negotiation with secure midpoint settlement and clean onchain state.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text">Navigation</p>
                  <div className="flex flex-col gap-1.5 text-sm text-text-secondary">
                    <Link href="/" className="transition hover:text-accent">Home</Link>
                    <Link href="/rooms" className="transition hover:text-accent">Rooms</Link>
                    <Link href="/revenue" className="transition hover:text-accent">Revenue</Link>
                    <Link href="/how-it-works" className="transition hover:text-accent">How It Works</Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text">Network</p>
                  <div className="flex flex-col gap-1.5 text-sm text-text-secondary">
                    <span>Ethereum Sepolia</span>
                    <span>Wallet-native flow</span>
                    <span>FHE assisted</span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.12em] text-text-tertiary">
                © 2026 Handshake. Built for private negotiation workflows.
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
