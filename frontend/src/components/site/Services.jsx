import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";
import { IMG, scrollToId } from "../../lib/media";

const ServiceCard = ({ service, index }) => (
  <Reveal delay={index * 0.12}>
    <article
      data-testid={`service-card-${service.category}`}
      className="card-lux group relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/30 to-transparent" />
        <span className="font-display absolute left-5 top-5 text-5xl font-medium text-white/10">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-medium uppercase tracking-wide text-white">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{service.description}</p>
        <ul className="mt-5 space-y-2.5">
          {service.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-[13px] text-zinc-300">
              <Check size={15} weight="bold" className="shrink-0 text-[#D4AF37]" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
          <span className="text-sm font-bold text-[#D4AF37]">{service.price_label}</span>
          <button
            data-testid={`service-details-${service.category}`}
            onClick={() => scrollToId("calculadora")}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors duration-300 hover:text-[#D4AF37]"
          >
            Ver detalhes
            <ArrowUpRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    </article>
  </Reveal>
);

export default function Services({ services }) {
  return (
    <section id="servicos" data-testid="services-section" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" kicker="Serviços" title="Escolha o que você quer proteger" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <div className="mt-32 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -right-3 -top-3 h-16 w-16 border-r-2 border-t-2 border-[#D4AF37]" />
              <img
                src={IMG.iphoneDark}
                alt="Smartphone premium recebendo blindagem Alfa"
                loading="lazy"
                className="h-[420px] w-full border border-white/10 object-cover"
                data-testid="smartphone-section-image"
              />
              <div className="glass-lux absolute -bottom-5 left-5 flex gap-6 px-6 py-4">
                <div>
                  <p className="font-display text-lg font-medium text-white">iPhone</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Todas as gerações</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="font-display text-lg font-medium text-white">Android</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Todas as marcas</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:pl-10">
            <SectionHeading index="02" kicker="Smartphones" title="Blindagem para smartphones" />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
                Trabalhamos com <span className="text-white">iPhone</span> e{" "}
                <span className="text-white">Android</span>. A película de blindagem é aplicada
                com precisão milimétrica, reforçando a superfície sem alterar o design original
                do seu aparelho.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Proteção contra riscos do dia a dia",
                "Maior resistência da superfície",
                "Acabamento discreto e invisível",
                "Preserva o visual do aparelho",
                "Aplicação profissional",
                "Toque e sensibilidade originais",
              ].map((b, i) => (
                <Reveal key={b} delay={0.2 + i * 0.07}>
                  <div className="glass-lux flex items-center gap-3 px-5 py-4">
                    <Check size={17} weight="bold" className="shrink-0 text-[#D4AF37]" />
                    <span className="text-sm text-zinc-300">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ServicesMotion = motion;
