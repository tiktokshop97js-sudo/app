import Reveal from "./Reveal";
import { IMG, scrollToId } from "../../lib/media";
import { waLink } from "../../lib/api";
import { ArrowUpRight } from "@phosphor-icons/react";

const Row = ({ reverse, image, kicker, title, copy, priceLabel, wa, message, testId, extra }) => (
  <div className={`grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12`}>
    <Reveal className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
      <div className="group relative overflow-hidden border border-white/10">
        <img
          src={image}
          alt={title}
          loading="lazy"
          data-testid={`${testId}-image`}
          className="h-[340px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[440px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
        {extra}
      </div>
    </Reveal>
    <div className={`lg:col-span-6 ${reverse ? "lg:order-1 lg:pr-10" : "lg:pl-10"}`}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="hairline-gold h-px w-12" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">{kicker}</span>
        </div>
        <h3 className="font-display mt-5 text-2xl font-medium uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h3>
        <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">{copy}</p>
        <p className="mt-6 text-sm font-bold text-[#D4AF37]">{priceLabel}</p>
        <a
          data-testid={`${testId}-cta`}
          href={waLink(wa, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[12px] font-extrabold tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        >
          SOLICITAR ORÇAMENTO <ArrowUpRight size={16} weight="bold" />
        </a>
      </Reveal>
    </div>
  </div>
);

export default function Devices({ settings }) {
  const p = settings?.prices || { relogio: 150, tablet: 250, oculos: 200 };
  const wa = settings?.whatsapp;

  return (
    <section data-testid="devices-section" className="mx-auto max-w-7xl px-5 sm:px-8">
      <Row
        testId="watches-row"
        image={IMG.watch}
        kicker="Relógios"
        title="Blindagem premium para relógios"
        copy="Proteja seu relógio sem comprometer o visual. Película de alta resistência aplicada com precisão em smartwatches e relógios premium."
        priceLabel={`A partir de R$ ${p.relogio}`}
        wa={wa}
        message="Olá! Vim pelo app Alfa Blindagem e gostaria de um orçamento para blindar meu relógio."
      />
      <Row
        reverse
        testId="tablets-row"
        image={IMG.tablet}
        kicker="Tablets"
        title="Proteção premium para tablets"
        copy="Telas grandes merecem cuidado redobrado. Blindagem com bordas alinhadas, sem bolhas, preservando toque e uso de caneta."
        priceLabel={`A partir de R$ ${p.tablet}`}
        wa={wa}
        message="Olá! Vim pelo app Alfa Blindagem e gostaria de um orçamento para blindar meu tablet."
      />
      <Row
        testId="glasses-row"
        image={IMG.glasses}
        kicker="Óculos"
        title="Proteção premium para óculos"
        copy="Lentes e armações protegidas contra micro-riscos do dia a dia, mantendo o visual sofisticado do seu óculos."
        priceLabel={`A partir de R$ ${p.oculos}`}
        wa={wa}
        message="Olá! Vim pelo app Alfa Blindagem e gostaria de um orçamento para blindar meus óculos."
        extra={
          <div className="glass-lux absolute bottom-5 left-5 right-5 flex items-center gap-4 px-5 py-4">
            <img src={IMG.application} alt="Demonstração da aplicação da proteção" className="h-14 w-14 rounded-full border border-[#D4AF37]/40 object-cover" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Aplicação demonstrada</p>
              <p className="mt-0.5 text-xs text-zinc-400">Camada invisível sobre lentes e armações</p>
            </div>
          </div>
        }
      />
      <div className="pb-8 text-center">
        <button
          data-testid="devices-budget-link"
          onClick={() => scrollToId("calculadora")}
          className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-[#D4AF37]"
        >
          Monte sua proteção na calculadora abaixo
        </button>
      </div>
    </section>
  );
}
