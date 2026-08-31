import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Sparkle, Fingerprint, House, ArrowDown } from "@phosphor-icons/react";
import { IMG, scrollToId } from "../../lib/media";
import { waLink, DEFAULT_WA_MESSAGE } from "../../lib/api";

const ease = [0.22, 1, 0.36, 1];

const Line = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ delay, duration: 1, ease }}
    >
      {children}
    </motion.span>
  </span>
);

const INDICATORS = [
  { icon: ShieldCheck, label: "Aplicação profissional" },
  { icon: Sparkle, label: "Acabamento premium" },
  { icon: Fingerprint, label: "Proteção contra riscos" },
  { icon: House, label: "Vamos até você · 30 min" },
];

export default function Hero({ settings }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-screen overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-[-15%] h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="hairline-gold h-px w-14" />
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              Blindagem Premium · São Ludgero SC
            </span>
          </motion.div>

          <h1 className="font-display text-[13vw] font-medium uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.6rem]">
            <Line delay={0.35}>Proteja</Line>
            <Line delay={0.47}>o que</Line>
            <Line delay={0.59}>
              <span className="gold-text">é seu.</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-8 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Blindagem premium para celulares, relógios, tablets e óculos.
            Proteção que você sente. Qualidade que você vê.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              data-testid="hero-cta-blindar"
              href={waLink(settings?.whatsapp, DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-full px-9 py-4 text-center text-[13px] font-extrabold tracking-[0.18em] text-[#050505]"
            >
              QUERO BLINDAR AGORA
            </a>
            <button
              data-testid="hero-cta-servicos"
              onClick={() => scrollToId("servicos")}
              className="rounded-full border border-white/15 px-9 py-4 text-[13px] font-bold tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              VER SERVIÇOS
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4"
            data-testid="hero-indicators"
          >
            {INDICATORS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-[13px] text-zinc-400">
                <Icon size={18} weight="duotone" className="shrink-0 text-[#D4AF37]" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.1, ease }}
          className="relative lg:col-span-5"
        >
          <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[70%] w-[70%] rounded-full bg-[#D4AF37]/15 blur-[100px]" />
          </motion.div>
          <div className="relative mx-auto max-w-[380px]">
            <div className="absolute -left-3 -top-3 h-16 w-16 border-l-2 border-t-2 border-[#D4AF37]" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-[#D4AF37]" />
            <div className="overflow-hidden border border-white/10">
              <motion.img
                style={{ y: imgY }}
                src={IMG.heroPhone}
                alt="Smartphone premium protegido pela Alfa Blindagem"
                className="h-[440px] w-full scale-110 object-cover sm:h-[520px]"
                loading="eager"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
            <div className="glass-lux absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Combo Alfa</p>
              <p className="mt-1 text-sm text-zinc-300">Tela + traseira · proteção completa</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => scrollToId("servicos")}
        aria-label="Rolar para serviços"
        data-testid="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-zinc-600 transition-colors hover:text-[#D4AF37] lg:block"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <ArrowDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  );
}
