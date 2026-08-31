import { Star, Quotes } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";

export default function Reviews({ reviews }) {
  return (
    <section data-testid="reviews-section" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="10" kicker="Avaliações" title="Clientes que confiam na Alfa" />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1} className="h-full">
              <figure data-testid={`review-card-${i}`} className="card-lux flex h-full flex-col p-8">
                <Quotes size={28} weight="fill" className="text-[#D4AF37]/50" />
                <div className="mt-4 flex gap-1" aria-label={`${r.stars} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      weight="fill"
                      className={s < r.stars ? "text-[#D4AF37]" : "text-zinc-700"}
                    />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-zinc-300">
                  "{r.comment}"
                </blockquote>
                <figcaption className="mt-6 border-t border-white/5 pt-5">
                  <span className="font-display text-sm font-medium uppercase tracking-[0.15em] text-white">
                    {r.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                    Cliente Alfa
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
