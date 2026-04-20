'use client';

export function HeroVisual() {
  return (
    <div className="hero-grid cyber-panel relative overflow-hidden rounded-[32px_26px_30px_24px] border border-border bg-panel/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-5 md:p-6">
      <div className="absolute left-4 top-4 rounded-full border border-border bg-bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary sm:left-5 sm:top-5">
        MVP preview
      </div>

      <div className="pt-10 sm:pt-12">
        <div className="lux-shine rounded-[26px_20px_28px_22px] border border-border bg-panel-alt p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
            <span className="truncate">Settlement flow</span>
            <span className="whitespace-nowrap">Ethereum Sepolia</span>
          </div>

          <div className="mt-4 space-y-2.5">
            {[
              ['1', 'Party B submits counter price with escrow'],
              ['2', 'Protocol computes midpoint proposal'],
              ['3', 'Both parties accept or reject to settle']
            ].map(([step, text]) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-[16px_14px_18px_12px] border border-border bg-bg-secondary px-3 py-2.5"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-panel text-xs font-bold text-text-secondary">
                  {step}
                </span>
                <p className="text-sm text-text-secondary">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[20px_16px_22px_18px] border border-border bg-panel px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-tertiary">Live example</p>
            <div className="mt-2 grid grid-cols-3 items-center gap-2 text-center">
              <div className="rounded-[12px_10px_14px_11px] border border-border bg-bg-secondary px-2 py-2">
                <p className="text-[10px] uppercase tracking-[0.12em] text-text-tertiary">A</p>
                <p className="text-lg font-bold text-text">1000</p>
              </div>
              <div className="rounded-[12px_10px_14px_11px] border border-accent/35 bg-accent/10 px-2 py-2">
                <p className="text-[10px] uppercase tracking-[0.12em] text-text-tertiary">Mid</p>
                <p className="text-lg font-bold text-accent">950</p>
              </div>
              <div className="rounded-[12px_10px_14px_11px] border border-border bg-bg-secondary px-2 py-2">
                <p className="text-[10px] uppercase tracking-[0.12em] text-text-tertiary">B</p>
                <p className="text-lg font-bold text-text">900</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              ['Privacy', 'FHE'],
              ['Latency', '<2s'],
              ['Chain', 'Sepolia'],
              ['Status', 'Live']
            ].map(([label, value]) => (
              <div key={label} className="rounded-[14px_12px_16px_10px] border border-border bg-panel px-2.5 py-2 text-center">
                <p className="text-[10px] uppercase tracking-[0.12em] text-text-tertiary">{label}</p>
                <p className="mt-1 text-sm font-bold text-text">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}