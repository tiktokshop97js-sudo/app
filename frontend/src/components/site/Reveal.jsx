import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Reveal({ children, delay = 0, className = "", y = 36 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, kicker, title, align = "left" }) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        {index && (
          <span className="font-display text-sm tracking-[0.3em] text-[#D4AF37]/70">{index}</span>
        )}
        <span className="hairline-gold h-px w-12" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
          {kicker}
        </span>
      </div>
      <h2 className="font-display mt-5 text-2xl font-medium uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
