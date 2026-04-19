'use client';

export function HeroVisual() {
  return (
    <div className="hero-grid cyber-panel relative overflow-hidden rounded-[32px_26px_30px_24px] border border-accent/45 bg-panel/80 p-4 shadow-[0_24px_80px_rgba(244,168,122,0.18)] md:p-6">
      <div className="absolute left-5 top-5 rounded-full border border-accent/35 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
        Live negotiation canvas
      </div>

      <div className="absolute right-5 top-5 rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
        Private / Onchain / Instant
      </div>

      <div className="grid gap-4 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:pt-12">
        <div className="space-y-4">
          <div className="rounded-[24px_18px_22px_20px] border border-border bg-white/80 p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span>Signal</span>
              <span className="rounded-full bg-accent/15 px-2 py-1 text-text-secondary">Encrypted</span>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="h-10 w-2 rounded-full bg-accent/45" />
              <div className="h-16 w-2 rounded-full bg-accent/60" />
              <div className="h-20 w-2 rounded-full bg-accent/80" />
              <div className="h-14 w-2 rounded-full bg-accent/55" />
              <div className="h-24 w-2 rounded-full bg-accent-dark" />
              <div className="h-12 w-2 rounded-full bg-accent/50" />
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              Negotiation intensity rises as both parties submit values. No raw price is exposed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Privacy Layer', value: 'FHE' },
              { title: 'Settlement', value: 'Auto' },
              { title: 'Wallets', value: 'Multi' },
              { title: 'Latency', value: '< 2s' }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[18px_22px_16px_20px] border border-border bg-bg-secondary/80 p-3 shadow-sm"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">{item.title}</p>
                <p className="mt-2 text-lg font-bold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] rounded-[28px_24px_30px_22px] border border-accent/25 bg-[radial-gradient(circle_at_center,rgba(244,168,122,0.22),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,248,240,0.9))] p-5 shadow-inner">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
            <span>Handshake Render</span>
            <span>Ethereum Sepolia</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px_16px_18px_22px] border border-accent/25 bg-white/78 px-4 py-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Offer A</p>
              <p className="mt-1 text-sm font-semibold text-text">Confidential bid</p>
              <div className="mt-3 h-2 rounded-full bg-accent/15">
                <div className="h-2 w-2/3 rounded-full bg-accent" />
              </div>
            </div>

            <div className="rounded-[18px_22px_16px_20px] border border-accent/25 bg-white/78 px-4 py-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Offer B</p>
              <p className="mt-1 text-sm font-semibold text-text">Encrypted counter</p>
              <div className="mt-3 h-2 rounded-full bg-accent/15">
                <div className="h-2 w-4/5 rounded-full bg-accent-dark" />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px_20px_26px_22px] border border-border bg-white/74 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Settlement engine</p>
                <p className="mt-1 text-lg font-bold text-text">Private midpoint</p>
              </div>
              <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                Handshake locked
              </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {[
                'Confidential',
                'Routing',
                'State',
                'Proof',
                'Final'
              ].map((label, index) => (
                <div
                  key={label}
                  className="rounded-[14px_16px_12px_18px] border border-border bg-bg-secondary/80 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-text-tertiary"
                >
                  <div className={index < 3 ? 'mx-auto mb-2 h-10 w-10 rounded-full border border-accent/30 bg-accent/10' : 'mx-auto mb-2 h-10 w-10 rounded-full border border-border bg-white'} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[18px_16px_20px_18px] border border-border bg-white/75 px-3 py-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Latency</p>
              <p className="mt-1 text-lg font-bold text-text">&lt; 2s</p>
            </div>
            <div className="rounded-[18px_16px_20px_18px] border border-border bg-white/75 px-3 py-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Privacy</p>
              <p className="mt-1 text-lg font-bold text-text">FHE</p>
            </div>
            <div className="rounded-[18px_16px_20px_18px] border border-border bg-white/75 px-3 py-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Wallets</p>
              <p className="mt-1 text-lg font-bold text-text">Multi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}