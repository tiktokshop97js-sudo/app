const ITEMS = [
  "BLINDAGEM PREMIUM",
  "IPHONE",
  "ANDROID",
  "RELÓGIOS",
  "TABLETS",
  "ÓCULOS",
  "APLICAÇÃO PROFISSIONAL",
  "ACABAMENTO IMPECÁVEL",
  "ATENDIMENTO EM CASA",
  "APLICAÇÃO EM 30 MINUTOS",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div data-testid="editorial-marquee" className="overflow-hidden border-y border-white/5 bg-[#070707] py-6">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-8 text-sm font-medium uppercase tracking-[0.4em] text-zinc-600">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
