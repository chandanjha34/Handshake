type BrandLogoProps = {
  className?: string;
  variant?: 'minimal' | 'futuristic' | 'premium';
};

export function BrandLogo({ className, variant = 'premium' }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={className}
      role="img"
      aria-label="Handshake logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="handshake-logo-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4A87A" />
          <stop offset="100%" stopColor="#E8965A" />
        </linearGradient>
        <linearGradient id="handshake-logo-future" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8B88F" />
          <stop offset="100%" stopColor="#DA7D3F" />
        </linearGradient>
        <linearGradient id="handshake-logo-fill-soft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF2E7" />
          <stop offset="100%" stopColor="#FFE6D2" />
        </linearGradient>
        <clipPath id="handshake-logo-clip">
          <rect x="6" y="6" width="44" height="44" rx="13" />
        </clipPath>
      </defs>

      <rect x="3" y="3" width="50" height="50" rx="16" fill="url(#handshake-logo-fill-soft)" stroke="#F4A87A" strokeWidth="2" />

      {variant === 'minimal' && (
        <>
          <g clipPath="url(#handshake-logo-clip)">
            <path d="M12.5 33 C15 27.5 20 24.8 24.6 24.8 H29.2 C33.7 24.8 38.7 27.5 41.5 33" fill="none" stroke="#6B4423" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M16.2 31.3 L21.2 26.9 C22.4 25.9 24.2 26 25.2 27.2 L26.4 28.5" fill="none" stroke="#6B4423" strokeWidth="2.1" strokeLinecap="round" />
            <path d="M39 31.3 L34 26.9 C32.8 25.9 31 26 30 27.2 L28.8 28.5" fill="none" stroke="#6B4423" strokeWidth="2.1" strokeLinecap="round" />
            <rect x="24.8" y="26.8" width="6.4" height="3.8" rx="1.9" fill="url(#handshake-logo-fill)" />
          </g>
        </>
      )}

      {variant === 'futuristic' && (
        <>
          <g clipPath="url(#handshake-logo-clip)">
            <path d="M10.5 35.5 C14.4 28.8 20.2 25.4 25.2 25.4 H30.8 C35.8 25.4 41.6 28.8 45.5 35.5" fill="none" stroke="url(#handshake-logo-future)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M15.2 32.8 L22.3 26.7 C23.2 25.9 24.6 25.8 25.7 26.4 L29 28.3" fill="none" stroke="#6B4423" strokeWidth="2.1" strokeLinecap="round" />
            <path d="M40.8 32.8 L33.7 26.7 C32.8 25.9 31.4 25.8 30.3 26.4 L27 28.3" fill="none" stroke="#6B4423" strokeWidth="2.1" strokeLinecap="round" />
            <rect x="24.3" y="27.1" width="7.4" height="4.2" rx="2.1" fill="url(#handshake-logo-future)" />
            <circle cx="28" cy="28.9" r="11.2" fill="none" stroke="#F4A87A" strokeWidth="1.4" strokeDasharray="2.5 2.8" opacity="0.85" />
          </g>
        </>
      )}

      {variant === 'premium' && (
        <>
          <g clipPath="url(#handshake-logo-clip)">
            <path d="M13 34 C16.3 27.8 20.7 25 24.8 25 H31.2 C35.3 25 39.7 27.8 43 34" fill="none" stroke="#6B4423" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M16.3 32.4 L22.5 27 C23.8 25.9 25.7 26 26.8 27.3 L28 28.7" fill="none" stroke="#6B4423" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M39.7 32.4 L33.5 27 C32.2 25.9 30.3 26 29.2 27.3 L28 28.7" fill="none" stroke="#6B4423" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M24.7 27.1 H31.3" stroke="url(#handshake-logo-fill)" strokeWidth="4.3" strokeLinecap="round" />
            <circle cx="25.9" cy="28.1" r="2.2" fill="#E8965A" />
            <circle cx="30.1" cy="28.1" r="2.2" fill="#F4A87A" />
          </g>

          <path
            d="M28 10 L29.6 13.8 L34 15.4 L29.6 17 L28 21 L26.4 17 L22 15.4 L26.4 13.8 Z"
            fill="#E8965A"
            opacity="0.9"
          />

          <circle cx="43" cy="43" r="2.2" fill="#F4A87A" opacity="0.7" />
          <circle cx="13" cy="43" r="1.8" fill="#E8965A" opacity="0.55" />
        </>
      )}

      <rect
        x="3"
        y="3"
        width="50"
        height="50"
        rx="16"
        strokeLinecap="round"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}
