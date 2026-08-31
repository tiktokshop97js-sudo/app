export default function Logo({ size = 40, className = "" }) {
  return (
    <img
      src="/logo-shield.png"
      alt="Alfa Blindagem Premium"
      width={size}
      height={size}
      className={`mix-blend-screen object-contain ${className}`}
      role="img"
    />
  );
}

export function LogoWordmark({ size = 36, compact = false }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="logo-wordmark">
      <Logo size={size} />
      {!compact && (
        <div className="leading-none">
          <span className="font-display block text-base font-semibold tracking-[0.24em] text-white sm:text-lg">
            ALFA
          </span>
          <span className="mt-0.5 block text-[8px] font-bold tracking-[0.34em] text-[#D4AF37] sm:text-[9px]">
            BLINDAGEM PREMIUM
          </span>
        </div>
      )}
    </div>
  );
}
