import { useRef, useState, useCallback } from "react";
import Reveal, { SectionHeading } from "./Reveal";
import { IMG } from "../../lib/media";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function BeforeAfter() {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    update(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => dragging.current && update(e.clientX);
  const stop = () => (dragging.current = false);

  return (
    <section data-testid="before-after-section" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="07" kicker="Antes e depois" title="Veja a diferença" align="center" />
        <Reveal className="mt-14">
          <div
            ref={ref}
            data-testid="before-after-slider"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stop}
            onPointerLeave={stop}
            className="relative h-[380px] cursor-ew-resize touch-none select-none overflow-hidden border border-white/10 sm:h-[520px]"
          >
            <img
              src={IMG.pristine}
              alt="Depois: smartphone com blindagem Alfa aplicada"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img
                src={IMG.cracked}
                alt="Antes: tela sem proteção"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <span className="glass-lux absolute left-5 top-5 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-zinc-300">
              Antes
            </span>
            <span className="absolute right-5 top-5 border border-[#D4AF37]/50 bg-[#050505]/70 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D4AF37] backdrop-blur-md">
              Depois · Alfa
            </span>

            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2">
                <div className="h-full w-px bg-[#D4AF37]" />
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37] bg-[#050505]/90 backdrop-blur-md">
                  <CaretLeft size={16} weight="bold" className="text-[#D4AF37]" />
                  <CaretRight size={16} weight="bold" className="text-[#D4AF37]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Arraste o controle para comparar. A blindagem Alfa protege a superfície contra os riscos do dia a dia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
