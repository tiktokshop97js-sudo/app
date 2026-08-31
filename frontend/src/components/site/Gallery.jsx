import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { SectionHeading } from "./Reveal";

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "celulares", label: "Celulares" },
  { id: "iphone", label: "iPhone" },
  { id: "android", label: "Android" },
  { id: "relogios", label: "Relógios" },
  { id: "tablets", label: "Tablets" },
  { id: "oculos", label: "Óculos" },
  { id: "aplicacoes", label: "Aplicações" },
];

export default function Gallery({ items }) {
  const [filter, setFilter] = useState("todos");

  const visible = useMemo(() => {
    if (filter === "todos") return items;
    if (filter === "celulares") return items.filter((i) => ["celulares", "iphone", "android"].includes(i.category));
    return items.filter((i) => i.category === filter);
  }, [items, filter]);

  return (
    <section id="galeria" data-testid="gallery-section" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="06" kicker="Galeria" title="Conheça nosso trabalho" />

        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filtros da galeria">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                data-testid={`gallery-filter-${f.id}`}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === f.id
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-white/10 text-zinc-500 hover:border-[#D4AF37]/40 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.figure
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45 }}
                data-testid={`gallery-item-${item.id}`}
                className="group relative h-72 cursor-pointer overflow-hidden border border-white/10"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  style={{ objectPosition: item.category === "oculos" ? "center 78%" : "center" }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 border border-[#D4AF37]/0 transition-colors duration-500 group-hover:border-[#D4AF37]/50" />
                <figcaption className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    {FILTERS.find((f) => f.id === item.category)?.label || item.category}
                  </span>
                  <p className="font-display mt-1 text-lg font-medium text-white">{item.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
