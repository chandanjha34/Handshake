export function AnimatedHandshake() {
  return (
    <div className="hero-grid cyber-panel handshake-pulse relative mt-6 w-full rounded-[28px_22px_26px_20px] border border-accent/60 bg-panel-alt/80 p-6">
      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.26em] text-text-tertiary">
        <span>Secure Session Link</span>
        <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 tracking-[0.2em]">Active</span>
      </div>

      <div className="relative h-44 overflow-hidden rounded-[20px_14px_18px_22px] border border-accent/30 bg-white/55 p-4">
        <svg viewBox="0 0 580 220" className="h-full w-full" aria-label="Animated handshake visualization">
          <defs>
            <linearGradient id="arm" x1="0" x2="1">
              <stop offset="0%" stopColor="#F4A87A" />
              <stop offset="100%" stopColor="#FFB996" />
            </linearGradient>
          </defs>

          <g className="shake-left">
            <rect x="58" y="84" width="178" height="58" rx="22" fill="url(#arm)" fillOpacity="0.55" stroke="#E8965A" />
            <circle cx="78" cy="112" r="7" fill="#E8965A" fillOpacity="0.8" />
          </g>

          <g className="shake-right">
            <rect x="344" y="84" width="178" height="58" rx="22" fill="url(#arm)" fillOpacity="0.55" stroke="#E8965A" />
            <circle cx="502" cy="112" r="7" fill="#E8965A" fillOpacity="0.8" />
          </g>

          <rect x="238" y="77" width="104" height="72" rx="18" fill="#F4A87A" fillOpacity="0.88" stroke="#E8965A" />
          <rect x="252" y="94" width="76" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.55" />
          <rect x="258" y="106" width="64" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.45" />
          <rect x="264" y="118" width="52" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.4" />

          <circle className="float-node" cx="190" cy="44" r="8" fill="#F4A87A" fillOpacity="0.75" />
          <circle className="float-node delay" cx="390" cy="48" r="8" fill="#F4A87A" fillOpacity="0.75" />
          <path d="M198 44 L284 92" stroke="#E8965A" strokeOpacity="0.5" strokeDasharray="5 4" />
          <path d="M382 48 L296 92" stroke="#E8965A" strokeOpacity="0.5" strokeDasharray="5 4" />
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-text-secondary">
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
        Encrypted handshake channel active
      </div>
    </div>
  );
}
