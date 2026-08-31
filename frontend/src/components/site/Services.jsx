import { Link } from "react-router-dom";
import { ArrowRight, DeviceMobile, Watch, DeviceTablet, Sunglasses } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";

const ICONS = {
  celular: DeviceMobile,
  relogio: Watch,
  tablet: DeviceTablet,
  oculos: Sunglasses,
};

const ServiceCard = ({ service, index }) => {
  const Icon = ICONS[service.category] || DeviceMobile;
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <Link
        to={`/servicos/${service.category}`}
        data-testid={`service-card-${service.category}`}
        aria-label={`Ver detalhes de ${service.title}`}
        className="card-lux group flex h-full flex-col overflow-hidden"
      >
        <div className="relative h-32 overflow-hidden sm:h-48">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              style={{ objectPosition: service.category === "oculos" ? "center 78%" : "center" }}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#0d0d0d]">
              <Icon size={44} weight="duotone" className="text-[#D4AF37]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent" />
          <div className="glass-lux absolute left-3 top-3 rounded-full p-2 sm:left-4 sm:top-4">
            <Icon size={18} weight="duotone" className="text-[#D4AF37]" />
          </div>
          <span className="font-display absolute bottom-2 right-3 text-3xl font-medium text-white/10 sm:text-4xl">
            0{index + 1}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h3 className="font-display text-base font-medium uppercase tracking-wide text-white sm:text-xl">
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-500 sm:text-sm sm:text-zinc-400">
            {service.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 sm:pt-4">
            <span className="text-[11px] font-bold text-[#D4AF37] sm:text-sm">{service.price_label}</span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-colors duration-300 group-hover:text-[#D4AF37] sm:text-[11px]">
              <span className="hidden sm:inline">Ver detalhes</span>
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
};

export default function Services({ services }) {
  return (
    <section id="servicos" data-testid="services-section" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" kicker="Serviços" title="Escolha o que você quer proteger" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-500 sm:text-base">
            Toque em um serviço para ver todos os detalhes, benefícios e valores.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
