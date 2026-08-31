import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, WhatsappLogo, HouseLine, Calculator, ShieldCheck } from "@phosphor-icons/react";
import { api, waLink } from "../lib/api";
import { LogoWordmark } from "../components/Logo";
import WhatsAppFloat from "../components/WhatsAppFloat";

const EXTRA = {
  celular: {
    tagline: "iPhone e Android",
    long: "A blindagem Alfa para smartphones reforça tela e traseira contra os riscos do dia a dia, com película de alta resistência aplicada de forma invisível. Trabalhamos com iPhone e Android de todas as marcas, preservando toque, brilho e o design original do seu aparelho.",
    important: [
      "Compatível com iPhone e Android, todas as gerações",
      "Opções: proteção de tela, traseira ou Combo Alfa",
      "Toque, brilho e sensibilidade 100% preservados",
      "Acabamento discreto — ninguém percebe que tem proteção",
    ],
    phonePrices: true,
  },
  relogio: {
    tagline: "Smartwatches e relógios premium",
    long: "Proteja seu relógio sem comprometer o visual. Aplicamos película de alta resistência na tela e na caixa de smartwatches e relógios premium, com precisão milimétrica e acabamento invisível.",
    important: [
      "Smartwatches e relógios analógicos de luxo",
      "Proteção para tela e caixa",
      "Acabamento invisível, sem alterar o design",
      "Ideal para uso diário e esportivo",
    ],
  },
  tablet: {
    tagline: "Todas as marcas e tamanhos",
    long: "Telas grandes merecem cuidado redobrado. A blindagem Alfa para tablets é aplicada com bordas perfeitamente alinhadas, sem bolhas, preservando a sensibilidade do toque e o uso de canetas.",
    important: [
      "iPad e tablets Android de todas as marcas",
      "Toque e caneta (stylus) totalmente preservados",
      "Aplicação sem bolhas, bordas alinhadas",
      "Proteção contra riscos do uso diário",
    ],
  },
  oculos: {
    tagline: "Lentes e armações",
    long: "Seus óculos de grau ou solares premium protegidos contra os micro-riscos do dia a dia. Aplicamos uma camada de proteção invisível sobre lentes e armações, mantendo o visual sofisticado intacto.",
    important: [
      "Óculos de grau e solares",
      "Proteção para lentes e armações",
      "Camada invisível contra micro-riscos",
      "Não altera cor, brilho ou transparência",
    ],
  },
};

const ease = [0.22, 1, 0.36, 1];

export default function ServiceDetail() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [settings, setSettings] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([api.get("/services"), api.get("/settings")])
      .then(([srv, st]) => {
        const found = srv.data.find((s) => s.category === category);
        if (found) setService(found);
        else setNotFound(true);
        setSettings(st.data);
      })
      .catch(() => setNotFound(true));
  }, [category]);

  const extra = EXTRA[category] || {};
  const wa = settings?.whatsapp;
  const p = settings?.prices || {};

  return (
    <div className="min-h-screen bg-[#050505] text-white" data-testid="service-detail-page">
      <div className="noise-overlay" aria-hidden />
      <header className="glass-lux sticky top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <button
            data-testid="service-back-button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft size={17} weight="bold" /> Voltar
          </button>
          <Link to="/" aria-label="Ir para a página inicial">
            <LogoWordmark size={30} compact />
          </Link>
        </div>
      </header>

      {notFound && (
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-32 text-center">
          <ShieldCheck size={48} weight="duotone" className="text-[#D4AF37]/60" />
          <h1 className="font-display mt-6 text-2xl font-medium uppercase text-white">Serviço não encontrado</h1>
          <p className="mt-3 text-sm text-zinc-500">Este serviço não está disponível no momento.</p>
          <Link
            to="/"
            data-testid="service-notfound-home"
            className="btn-gold mt-8 rounded-full px-8 py-3.5 text-[12px] font-extrabold tracking-[0.2em] text-[#050505]"
          >
            VOLTAR PARA O INÍCIO
          </Link>
        </div>
      )}

      {!service && !notFound && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-600">Carregando...</p>
        </div>
      )}

      {service && (
        <main className="mx-auto max-w-5xl px-5 pb-28 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative mt-10"
          >
            <div className="absolute -left-3 -top-3 z-10 h-14 w-14 border-l-2 border-t-2 border-[#D4AF37]" />
            <div className="absolute -bottom-3 -right-3 z-10 h-14 w-14 border-b-2 border-r-2 border-[#D4AF37]" />
            <div className="relative overflow-hidden border border-white/10">
              <img
                src={service.image}
                alt={service.title}
                data-testid="service-detail-image"
                className="h-[300px] w-full object-cover sm:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
                  {extra.tagline || "Alfa Blindagem"}
                </span>
                <h1
                  data-testid="service-detail-title"
                  className="font-display mt-3 text-3xl font-medium uppercase tracking-tight text-white sm:text-5xl"
                >
                  Blindagem para {service.title}
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease }}
              className="lg:col-span-7"
            >
              <p data-testid="service-detail-description" className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                {extra.long || service.description}
              </p>

              {extra.important && (
                <div className="mt-10">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Informações importantes
                  </h2>
                  <ul className="mt-5 space-y-3.5">
                    {extra.important.map((info) => (
                      <li key={info} className="glass-lux flex items-center gap-3 px-5 py-4">
                        <Check size={16} weight="bold" className="shrink-0 text-[#D4AF37]" />
                        <span className="text-sm text-zinc-300">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.benefits?.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Benefícios</h2>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-3 border border-white/10 bg-[#0d0d0d] px-5 py-4">
                        <Check size={16} weight="bold" className="shrink-0 text-[#D4AF37]" />
                        <span className="text-sm text-zinc-300">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-lux mt-10 flex items-start gap-4 p-6">
                <HouseLine size={24} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                <p className="text-sm leading-relaxed text-zinc-300">
                  <span className="font-semibold text-white">Vamos até você:</span> atendimento no conforto
                  da sua casa, com processo de apenas 30 minutos.
                </p>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease }}
              className="lg:col-span-5"
            >
              <div className="card-lux sticky top-24 border-[#D4AF37]/25 p-7 sm:p-9">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Investimento</p>
                {extra.phonePrices ? (
                  <div className="mt-6 space-y-4" data-testid="service-detail-prices">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-sm text-zinc-400">Proteção de Tela</span>
                      <span className="font-display text-xl font-medium text-white">R$ {p.tela ?? 150}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-sm text-zinc-400">Proteção Traseira</span>
                      <span className="font-display text-xl font-medium text-white">R$ {p.traseira ?? 150}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#D4AF37]">Combo Alfa · tela + traseira</span>
                      <span className="font-display gold-text text-2xl font-medium">R$ {p.combo ?? 250}</span>
                    </div>
                  </div>
                ) : (
                  <p data-testid="service-detail-price" className="font-display gold-text mt-5 text-4xl font-medium sm:text-5xl">
                    {service.price_label}
                  </p>
                )}

                <a
                  data-testid="service-detail-whatsapp"
                  href={waLink(wa, `Olá! Vim pelo app Alfa Blindagem e gostaria de um orçamento para blindar: ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 flex items-center justify-center gap-3 rounded-full bg-[#25D366] py-4 text-[13px] font-extrabold tracking-[0.18em] text-[#050505] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <WhatsappLogo size={19} weight="fill" /> SOLICITAR ORÇAMENTO
                </a>
                <Link
                  to="/#calculadora"
                  data-testid="service-detail-calculator"
                  className="mt-3 flex items-center justify-center gap-2.5 rounded-full border border-white/15 py-4 text-[12px] font-bold tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                >
                  <Calculator size={17} weight="bold" /> MONTAR MINHA PROTEÇÃO
                </Link>
                <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-600">
                  Atendimento em São Ludgero - SC e região · a domicílio em 30 minutos
                </p>
              </div>
            </motion.aside>
          </div>
        </main>
      )}
      <WhatsAppFloat number={wa} />
    </div>
  );
}
