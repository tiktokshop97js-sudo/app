import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo, DeviceMobile, Watch, DeviceTablet, Sunglasses } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";
import { waLink } from "../../lib/api";

const PRODUCTS = [
  { id: "iphone", label: "iPhone", phone: true, icon: DeviceMobile },
  { id: "android", label: "Android", phone: true, icon: DeviceMobile },
  { id: "relogio", label: "Relógio", icon: Watch },
  { id: "tablet", label: "Tablet", icon: DeviceTablet },
  { id: "oculos", label: "Óculos", icon: Sunglasses },
];

export default function Calculator({ settings }) {
  const p = settings?.prices || { tela: 150, traseira: 150, combo: 250, relogio: 150, tablet: 250, oculos: 200 };
  const wa = settings?.whatsapp;
  const [product, setProduct] = useState(null);
  const [protection, setProtection] = useState(null);

  const options = useMemo(() => {
    if (!product) return [];
    if (product.phone) {
      return [
        { id: "tela", label: "Tela", price: p.tela },
        { id: "traseira", label: "Traseira", price: p.traseira },
        { id: "combo", label: "Combo Alfa", price: p.combo },
      ];
    }
    const priceMap = { relogio: p.relogio, tablet: p.tablet, oculos: p.oculos };
    return [{ id: "consulta", label: "Proteção completa", price: priceMap[product.id], from: true }];
  }, [product, p]);

  const selectProduct = (prod) => {
    setProduct(prod);
    setProtection(null);
  };

  const message = product
    ? protection
      ? `Olá! Vim pelo app Alfa Blindagem e gostaria de blindar meu ${product.label}. Opção escolhida: ${protection.label}${protection.from ? ` (a partir de R$ ${protection.price})` : ` — R$ ${protection.price}`}.`
      : `Olá! Vim pelo app Alfa Blindagem e gostaria de blindar meu ${product.label}.`
    : "Olá! Vim pelo app Alfa Blindagem e gostaria de solicitar um orçamento.";

  return (
    <section id="calculadora" data-testid="calculator-section" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[130px]" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading index="05" kicker="Orçamento" title="Monte sua proteção" align="center" />

        <Reveal className="mt-14">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            1 · Escolha o produto
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
            {PRODUCTS.map((prod) => {
              const Icon = prod.icon;
              const active = product?.id === prod.id;
              return (
                <button
                  key={prod.id}
                  data-testid={`calc-product-${prod.id}`}
                  onClick={() => selectProduct(prod)}
                  className={`flex flex-col items-center gap-3 border px-4 py-6 transition-colors duration-300 ${
                    active
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white"
                      : "border-white/10 bg-[#0d0d0d] text-zinc-400 hover:border-[#D4AF37]/40 hover:text-white"
                  }`}
                >
                  <Icon size={30} weight="duotone" className={active ? "text-[#D4AF37]" : ""} />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">{prod.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence>
          {product && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mt-12 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                2 · Escolha a proteção
              </p>
              <div className={`mt-6 grid grid-cols-1 gap-3 ${product.phone ? "sm:grid-cols-3" : ""} sm:gap-4`}>
                {options.map((opt) => {
                  const active = protection?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      data-testid={`calc-option-${opt.id}`}
                      onClick={() => setProtection(opt)}
                      className={`border px-6 py-6 text-center transition-colors duration-300 ${
                        active
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-white/10 bg-[#0d0d0d] hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <span className="font-display block text-lg font-medium uppercase text-white">{opt.label}</span>
                      <span className="mt-2 block text-sm font-bold text-[#D4AF37]">
                        {opt.from ? `A partir de R$ ${opt.price}` : `R$ ${opt.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {product && protection && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              data-testid="calc-result"
              className="glass-lux mx-auto mt-12 max-w-xl p-8 text-center sm:p-10"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Seu orçamento</p>
              <p className="font-display mt-4 text-xl uppercase text-white">
                {product.label} · {protection.label}
              </p>
              <p className="font-display gold-text mt-3 text-5xl font-medium sm:text-6xl">
                {protection.from ? `a partir de R$ ${protection.price}` : `R$ ${protection.price}`}
              </p>
              <a
                data-testid="calc-whatsapp-button"
                href={waLink(wa, message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-9 py-4 text-[13px] font-extrabold tracking-[0.15em] text-[#050505] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                <WhatsappLogo size={20} weight="fill" />
                SOLICITAR PELO WHATSAPP
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
