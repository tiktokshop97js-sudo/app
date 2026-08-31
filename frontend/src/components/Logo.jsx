export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      aria-label="Alfa Blindagem"
      role="img"
    >
      <defs>
        <linearGradient id="alfa-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6d1f" />
          <stop offset="0.5" stopColor="#F3E5AB" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <path
        d="M256 56 L404 122 V258 C404 356 338 420 256 452 C174 420 108 356 108 258 V122 Z"
        fill="none"
        stroke="url(#alfa-gold)"
        strokeWidth="16"
      />
      <path
        d="M172 344 L256 156 L340 344 M204 284 H308"
        fill="none"
        stroke="url(#alfa-gold)"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoWordmark({ size = 36, compact = false }) {
  return (
    <div className="flex items-center gap-3" data-testid="logo-wordmark">
      <Logo size={size} />
      {!compact && (
        <div className="leading-none">
          <span className="font-display block text-lg font-semibold tracking-[0.28em] text-white">
            ALFA
          </span>
          <span className="block text-[10px] font-bold tracking-[0.52em] text-[#D4AF37]">
            BLINDAGEM
          </span>
        </div>
      )}
    </div>
  );
}
