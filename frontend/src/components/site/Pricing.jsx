import { Crown, Fire, ArrowUpRight } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";
import { IMG, scrollToId } from "../../lib/media";
import { waLink } from "../../lib/api";

const PriceCard = ({ title, subtitle, price, featured, message, whatsapp, testId, delay }) => (
  <Reveal delay={delay} className="h-full">
    <article
      data-testid={testId}
      className={`relative flex h-full flex-col p-8 sm:p-10 ${
        featured
          ? "border border-[#D4AF37]/60 bg-gradient-to-b from-[#1a150a] to-[#0b0b0b] shadow-[0_0_60px_rgba(212,175,55,0.12)]"
          : "card-lux"
      }`}
    >
      {featured && (
        <span
          data-testid="combo-badge"
          className="btn-gold absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-1.5 text-[10px] font-extrabold tracking-[0.22em] text-[#050505]"
        >
          <Crown size={13} weight="fill" /> MAIS VENDIDO
        </span>
      )}
      <h3 className="font-display text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">{title}</h3>
      {subtitle && <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-600">{subtitle}</p>}
      <div className="mt-8 flex items-end gap-2">
        <span className={`font-display text-5xl font-medium sm:text-6xl ${featured ? "gold-text" : "text-white"}`}>
          R$ {price}
        </span>
      </div>
      <div className="hairline-gold mt-8 h-px w-full opacity-40" />
      <a
        data-testid={`${testId}-cta`}
        href={waLink(whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 rounded-full py-4 text-center text-[12px] font-extrabold tracking-[0.2em] ${
          featured
            ? "btn-gold text-[#050505]"
            : "border border-white/15 text-white transition-colors duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        }`}
      >
        QUERO ESSE SERVIÇO
      </a>
    </article>
  </Reveal>
);

export default function Pricing({ settings, promotions }) {
  const p = settings?.prices || { tela: 180, traseira: 180, combo: 320 };
  const wa = settings?.whatsapp;

  return (
    <>
      <section id="precos" data-testid="pricing-section" className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.05] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading index="03" kicker="Investimento" title="Escolha sua proteção" align="center" />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            <PriceCard
              title="Proteção de Tela"
              price={p.tela}
              delay={0}
              testId="price-card-tela"
              whatsapp={wa}
              message={`Olá! Vim pelo app Alfa Blindagem e tenho interesse na Proteção de Tela (a partir de R$ ${p.tela}).`}
            />
            <PriceCard
              title="Combo Alfa"
              subtitle="Tela + Traseira"
              price={p.combo}
              featured
              delay={0.12}
              testId="price-card-combo"
              whatsapp={wa}
              message={`Olá! Vim pelo app Alfa Blindagem e quero o Combo Alfa (tela + traseira) por R$ ${p.combo}.`}
            />
            <PriceCard
              title="Traseira de Vidro"
              price={p.traseira}
              delay={0.24}
              testId="price-card-traseira"
              whatsapp={wa}
              message={`Olá! Vim pelo app Alfa Blindagem e tenho interesse na Proteção Traseira (R$ ${p.traseira}).`}
            />
          </div>
        </div>
      </section>

      <section data-testid="combo-section" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0">
          <img src={IMG.goldTexture} alt="" aria-hidden className="h-full w-full object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-4">
                <Crown size={22} weight="duotone" className="text-[#D4AF37]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
                  Proteção completa
                </span>
              </div>
              <h2 className="font-display mt-6 text-3xl font-medium uppercase tracking-tight text-white sm:text-5xl">
                Combo <span className="gold-text">Alfa</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
                Tela + traseira. Proteção completa para o seu aparelho em uma única aplicação,
                com o acabamento premium que só a Alfa entrega.
              </p>
              <div className="mt-8 flex items-end gap-4">
                <span className="font-display gold-text text-6xl font-medium sm:text-7xl">R$ {p.combo}</span>
                <span className="pb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">tela + traseira</span>
              </div>
              <a
                data-testid="combo-cta"
                href={waLink(wa, `Olá! Vim pelo app Alfa Blindagem e quero o Combo Alfa (tela + traseira) por R$ ${p.combo}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-10 inline-block rounded-full px-10 py-4 text-[13px] font-extrabold tracking-[0.2em] text-[#050505]"
              >
                QUERO O COMBO ALFA
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden border border-white/10">
                  <img src={IMG.iphone} alt="Frente do smartphone protegido" loading="lazy" className="h-72 w-full object-cover sm:h-96" />
                </div>
                <div className="mt-10 overflow-hidden border border-[#D4AF37]/30">
                  <img src={IMG.iphoneDark} alt="Traseira do smartphone protegida" loading="lazy" className="h-72 w-full object-cover sm:h-96" />
                </div>
              </div>
              <div className="glass-lux absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-6 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Frente + Traseira</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ofertas" data-testid="offers-section" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading index="04" kicker="Ofertas" title="Ofertas Alfa" />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promo, i) => (
              <Reveal key={promo.id} delay={i * 0.1}>
                <article
                  data-testid={`offer-card-${i}`}
                  className="card-lux group relative overflow-hidden p-8 sm:p-10"
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#D4AF37]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  {promo.tag && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 px-4 py-1.5 text-[10px] font-extrabold tracking-[0.22em] text-[#D4AF37]">
                      <Fire size={12} weight="fill" /> {promo.tag}
                    </span>
                  )}
                  <h3 className="font-display mt-6 text-2xl font-medium uppercase text-white">{promo.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{promo.subtitle}</p>
                  <p className="font-display gold-text mt-6 text-4xl font-medium">{promo.price_label}</p>
                  <button
                    data-testid={`offer-cta-${i}`}
                    onClick={() => scrollToId("calculadora")}
                    className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-[#D4AF37]"
                  >
                    Aproveitar oferta <ArrowUpRight size={15} weight="bold" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
