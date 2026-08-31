import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Logo";

const ease = [0.22, 1, 0.36, 1];

export default function Splash({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="splash-screen"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <img
              src="/logo-a-clean.png"
              alt="Alfa Blindagem Premium"
              className="mix-blend-screen w-36 object-contain sm:w-44"
            />
          </motion.div>
          <div className="mt-8 overflow-hidden">
            <motion.h1
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55, duration: 0.75, ease }}
              className="font-display text-4xl font-medium tracking-[0.4em] text-white sm:text-5xl"
            >
              ALFA
            </motion.h1>
          </div>
          <div className="mt-1 overflow-hidden">
            <motion.p
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.75, duration: 0.75, ease }}
              className="font-display text-[10px] font-medium tracking-[0.5em] text-[#D4AF37] sm:text-xs"
            >
              BLINDAGEM PREMIUM
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 max-w-[260px] text-center text-[11px] tracking-[0.18em] text-zinc-500"
          >
            Proteção que você sente. Qualidade que você vê.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1.3, ease }}
            className="hairline-gold absolute bottom-20 h-px w-44"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
