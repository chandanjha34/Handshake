'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ConnectWalletButton } from '@/components/connect-wallet-button';
import { cn } from '@/lib/utils';

export function AnimatedNavbar() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setExpanded(window.scrollY > 32);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-3 z-50 mb-10 sm:mb-12">
      <div
        className={cn(
          'mx-auto transition-all duration-500 ease-out',
          expanded ? 'w-full max-w-none' : 'w-[min(860px,100%)]'
        )}
      >
        <div className="lux-shine flex flex-wrap items-center justify-between gap-4 rounded-[16px_20px_14px_18px] border border-border/80 bg-panel/95 px-3 py-2 text-text shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Handshake logo"
              width={42}
              height={42}
              className="h-9 w-9 shrink-0 rounded-[12px] border border-border object-cover sm:h-10 sm:w-10"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-[0.06em] text-text sm:text-lg">HANDSHAKE</span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-text-tertiary">
                Private Negotiation Rail
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/rooms" className="text-sm text-text-secondary transition hover:text-accent">
              Rooms
            </Link>
            <Link href="/revenue" className="text-sm text-text-secondary transition hover:text-accent">
              Revenue
            </Link>
            <Link href="/how-it-works" className="text-sm text-text-secondary transition hover:text-accent">
              How It Works
            </Link>
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
