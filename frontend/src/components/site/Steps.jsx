import { DeviceMobile, ShieldCheck, ClipboardText, PaintBrush, CheckCircle, Sparkle, Wrench, ChatsCircle, Devices, HouseLine } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";

const STEPS = [
  { icon: DeviceMobile, title: "Escolha o dispositivo", desc: "Celular, relógio, tablet ou óculos." },
  { icon: ShieldCheck, title: "Escolha a proteção", desc: "Tela, traseira ou o Combo Alfa." },
  { icon: ClipboardText, title: "Solicite seu orçamento", desc: "Direto pelo WhatsApp, sem burocracia." },
  { icon: PaintBrush, title: "Faça a aplicação", desc: "Serviço profissional, com cuidado total." },
  { icon: CheckCircle, title: "Saia protegido", desc: "Seu dispositivo blindado e impecável." },
];

const PILLARS = [
  { icon: ShieldCheck, title: "Proteção premium", desc: "Aplicação focada em qualidade e acabamento." },
  { icon: Sparkle, title: "Acabamento sofisticado", desc: "Proteção sem comprometer a aparência do dispositivo." },
  { icon: Wrench, title: "Aplicação profissional", desc: "Serviço realizado com cuidado e atenção aos detalhes." },
  { icon: Devices, title: "Para diversos dispositivos", desc: "iPhone, Android, relógios, tablets e óculos." },
  { icon: HouseLine, title: "Vamos até você", desc: "Atendimento no conforto da sua casa. Processo de apenas 30 minutos." },
  { icon: ChatsCircle, title: "Atendimento personalizado", desc: "Fale diretamente com a Alfa Blindagem." },
];

export default function Steps() {
  return (
    <>
      <section data-testid="how-it-works-section" className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading index="08" kicker="Processo" title="Como funciona?" />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1} className="h-full">
                <div data-testid={`step-card-${i + 1}`} className="card-lux relative flex h-full flex-col p-7">
                  <span className="font-display absolute right-5 top-5 text-4xl font-medium text-white/[0.07]">
                    0{i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
                    <Icon size={22} weight="duotone" className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-display mt-6 text-base font-medium uppercase tracking-wide text-white">
                    Passo {i + 1}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-zinc-200">{title}</p>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" data-testid="differentials-section" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/[0.06] blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading index="09" kicker="Diferenciais" title="Por que escolher a Alfa?" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div data-testid={`pillar-card-${i}`} className="glass-lux group h-full p-8 transition-colors duration-500 hover:border-[#D4AF37]/40">
                  <Icon size={34} weight="duotone" className="text-[#D4AF37] transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="font-display mt-6 text-lg font-medium uppercase tracking-wide text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <div className="card-lux flex h-full flex-col justify-between border-[#D4AF37]/30 p-8">
                <p className="font-display text-2xl font-medium leading-snug text-white">
                  "Proteção que você sente. <span className="gold-text">Qualidade que você vê.</span>"
                </p>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Alfa Blindagem · São Ludgero SC
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
