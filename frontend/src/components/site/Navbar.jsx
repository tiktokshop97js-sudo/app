import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { LogoWordmark } from "../Logo";
import { NAV_ITEMS, scrollToId } from "../../lib/media";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        data-testid="main-navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled ? "glass-lux border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <button onClick={() => go("inicio")} aria-label="Ir para o início" data-testid="nav-logo-button">
            <LogoWordmark size={34} />
          </button>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-link-${item.id}`}
                onClick={() => go(item.id)}
                className="text-[13px] font-semibold tracking-[0.14em] text-zinc-400 transition-colors duration-300 hover:text-[#D4AF37]"
              >
                {item.label.toUpperCase()}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              data-testid="nav-budget-button"
              onClick={() => go("calculadora")}
              className="btn-gold hidden rounded-full px-6 py-2.5 text-[12px] font-extrabold tracking-[0.18em] text-[#050505] sm:block"
            >
              ORÇAMENTO
            </button>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              className="glass-lux rounded-full p-2.5 text-white lg:hidden"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#050505]/97 backdrop-blur-2xl"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <LogoWordmark size={32} />
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="glass-lux rounded-full p-2.5 text-white"
              >
                <X size={22} weight="bold" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Menu mobile">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  data-testid={`mobile-nav-${item.id}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.45 }}
                  onClick={() => go(item.id)}
                  className="group flex items-baseline gap-4 py-3 text-left"
                >
                  <span className="font-display text-xs text-[#D4AF37]/60">0{i + 1}</span>
                  <span className="font-display text-3xl font-medium uppercase tracking-tight text-white transition-colors group-hover:text-[#D4AF37]">
                    {item.label}
                  </span>
                </motion.button>
              ))}
              <motion.button
                data-testid="mobile-nav-orcamento"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => go("calculadora")}
                className="btn-gold mt-8 rounded-full py-4 text-sm font-extrabold tracking-[0.2em] text-[#050505]"
              >
                SOLICITAR ORÇAMENTO
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
