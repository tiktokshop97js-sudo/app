import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, WhatsappLogo, HouseLine, Calculator, ShieldCheck, Drop, HandSoap, Info, Warning } from "@phosphor-icons/react";
import { api, waLink } from "../lib/api";
import { LogoWordmark } from "../components/Logo";
import WhatsAppFloat from "../components/WhatsAppFloat";

const CONTENT = {
  celular: {
    tagline: "iPhone e Android",
    description: [
      "Proteção premium desenvolvida para preservar o celular contra riscos, arranhões, marcas e desgastes causados pelo uso diário. Ajuda a proteger a superfície contra pequenos impactos e quedas leves, mantendo o aparelho com aparência nova por mais tempo. Com a blindagem Alfa, a superfície fica até 50x mais resistente contra riscos e o desgaste do uso diário.",
      "A proteção também possui efeito hidrofóbico, ajudando a repelir água e líquidos da superfície. A oleosidade das mãos não é facilmente absorvida, facilitando a limpeza e reduzindo marcas de dedos. Também blindamos as lentes da câmera do celular, protegendo o conjunto fotográfico contra riscos e arranhões.",
    ],
    steps: [
      "Avaliação do aparelho e verificação do estado da tela e da traseira.",
      "Limpeza e preparação completa da superfície.",
      "Aplicação cuidadosa da proteção na tela e/ou traseira.",
      "Ajuste de bordas e acabamento para uma aplicação uniforme.",
      "Inspeção final e teste de toque e sensibilidade.",
    ],
    benefits: [
      "Proteção contra riscos e arranhões",
      "Ajuda contra pequenos impactos",
      "Proteção adicional em quedas leves",
      "Repelência à água",
      "Redução de marcas de oleosidade",
      "Facilita a limpeza da tela",
      "Mantém o toque e a sensibilidade",
      "Blindagem das lentes da câmera",
      "Acabamento transparente e discreto",
    ],
    important: [
      "Compatível com iPhone e Android, todas as gerações",
      "Também blindamos as lentes da câmera do celular",
      "Opções: tela, traseira ou Combo Alfa",
      "Aplicação em até 30 minutos, também a domicílio",
    ],
    warning: "A blindagem não pode ser aplicada em celulares com a tela trincada ou quebrada. Como o processo utiliza aplicação de produto líquido, ele pode entrar em contato com a placa e danificar o aparelho.",
    phonePrices: true,
  },
  tablet: {
    tagline: "Todas as marcas e tamanhos",
    description: [
      "Proteção premium para tablets, desenvolvida para reduzir riscos, arranhões e marcas provocadas pelo uso cotidiano. Ajuda a proteger a superfície contra pequenos impactos e quedas leves, proporcionando maior segurança durante o uso e o transporte.",
      "Possui efeito hidrofóbico que ajuda a repelir água e líquidos, além de dificultar a aderência e absorção de oleosidade na superfície. Isso facilita a limpeza e mantém o tablet com aparência mais limpa e conservada.",
    ],
    steps: [
      "Avaliação do tablet e verificação do estado da tela.",
      "Limpeza e preparação completa da superfície.",
      "Aplicação cuidadosa da proteção na tela.",
      "Ajuste de bordas e acabamento para uma aplicação uniforme.",
      "Inspeção final e teste de toque e uso de caneta (stylus).",
    ],
    benefits: [
      "Proteção contra riscos e arranhões",
      "Ajuda contra pequenos impactos",
      "Proteção adicional contra quedas leves",
      "Repelência à água",
      "Menor aderência de oleosidade",
      "Facilita a limpeza",
      "Mantém a sensibilidade ao toque",
      "Acabamento transparente",
    ],
    important: [
      "iPad e tablets Android de todas as marcas",
      "Toque e caneta (stylus) totalmente preservados",
      "Aplicação em até 30 minutos, também a domicílio",
    ],
  },
  relogio: {
    tagline: "Smartwatches e relógios premium",
    description: [
      "Proteção desenvolvida especialmente para preservar a superfície de relógios e smartwatches contra riscos, arranhões e marcas do uso diário. Ajuda a reduzir danos causados por pequenos impactos e quedas leves, mantendo o acabamento do relógio protegido por mais tempo.",
      "A proteção também ajuda a repelir água e dificulta a aderência de oleosidade, suor e marcas de dedos, facilitando a limpeza e a conservação da superfície.",
    ],
    steps: [
      "Avaliação do relógio, verificando tela e caixa.",
      "Limpeza detalhada e preparação da superfície.",
      "Aplicação precisa da proteção na tela e na caixa.",
      "Ajuste e acabamento nos contornos para aplicação uniforme.",
      "Inspeção final do resultado e do funcionamento.",
    ],
    benefits: [
      "Proteção contra riscos",
      "Proteção contra arranhões",
      "Ajuda contra pequenos impactos",
      "Proteção adicional em quedas leves",
      "Repelência à água",
      "Redução de marcas de suor e oleosidade",
      "Facilita a limpeza",
      "Mantém a aparência original do relógio",
    ],
    important: [
      "Smartwatches e relógios analógicos de luxo",
      "Proteção para tela e caixa",
      "Aplicação em até 30 minutos, também a domicílio",
    ],
  },
  oculos: {
    tagline: "Lentes e armações",
    description: [
      "Proteção premium desenvolvida para ajudar a preservar as lentes dos óculos contra riscos, arranhões, marcas e desgastes provocados pelo uso diário. Ajuda a manter as lentes mais protegidas durante o transporte, o armazenamento e a utilização cotidiana.",
      "A superfície protegida também facilita a limpeza e ajuda a repelir água, oleosidade e marcas de dedos, contribuindo para uma aparência mais limpa e conservada.",
    ],
    steps: [
      "Avaliação das lentes e da armação do óculos.",
      "Limpeza e preparação completa das lentes.",
      "Aplicação cuidadosa da proteção sobre as lentes.",
      "Ajuste e acabamento, verificando a transparência total.",
      "Inspeção final do resultado e do conforto visual.",
    ],
    benefits: [
      "Ajuda contra riscos e arranhões",
      "Proteção contra marcas do uso diário",
      "Ajuda contra pequenos impactos",
      "Repelência à água",
      "Menor aderência de oleosidade",
      "Facilita a limpeza das lentes",
      "Mantém o acabamento das lentes",
      "Proteção discreta e transparente",
    ],
    important: [
      "Óculos de grau e solares",
      "Não altera cor, brilho ou transparência",
      "Aplicação em até 30 minutos, também a domicílio",
    ],
  },
};

const DISCLAIMER =
  "A proteção foi desenvolvida para ajudar a preservar o produto contra riscos, arranhões, pequenos impactos e desgastes do uso diário. Ela não torna o aparelho ou objeto indestrutível e não garante proteção contra danos em quedas fortes, impactos severos ou acidentes.";

const ease = [0.22, 1, 0.36, 1];

const SectionTitle = ({ children }) => (
  <h2 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
    <span className="hairline-gold h-px w-8" />
    {children}
  </h2>
);

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

  const extra = CONTENT[category] || {};
  const wa = settings?.whatsapp;
  const p = settings?.prices || {};

  return (
    <div className="min-h-screen bg-[#050505] text-white" data-testid="service-detail-page">
      <div className="noise-overlay" aria-hidden />
      <header className="glass-lux sticky top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-8">
          <button
            data-testid="service-back-button"
            onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"))}
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft size={17} weight="bold" /> Voltar
          </button>
          <Link to="/" aria-label="Ir para a página inicial">
            <LogoWordmark size={28} compact />
          </Link>
        </div>
      </header>

      {notFound && (
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-28 text-center">
          <ShieldCheck size={44} weight="duotone" className="text-[#D4AF37]/60" />
          <h1 className="font-display mt-5 text-2xl font-medium uppercase text-white">Serviço não encontrado</h1>
          <p className="mt-2 text-sm text-zinc-500">Este serviço não está disponível no momento.</p>
          <Link
            to="/"
            data-testid="service-notfound-home"
            className="btn-gold mt-7 rounded-full px-8 py-3.5 text-[12px] font-extrabold tracking-[0.2em] text-[#050505]"
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
        <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative mt-6"
          >
            <div className="absolute -left-2.5 -top-2.5 z-10 h-12 w-12 border-l-2 border-t-2 border-[#D4AF37]" />
            <div className="absolute -bottom-2.5 -right-2.5 z-10 h-12 w-12 border-b-2 border-r-2 border-[#D4AF37]" />
            <div className="relative overflow-hidden border border-white/10">
              <img
                src={service.image}
                alt={service.title}
                data-testid="service-detail-image"
                style={{ objectPosition: category === "oculos" ? "center 72%" : "center" }}
                className="h-52 w-full object-cover sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
                  {extra.tagline || "Alfa Blindagem"}
                </span>
                <h1
                  data-testid="service-detail-title"
                  className="font-display mt-1.5 text-2xl font-medium uppercase tracking-tight text-white sm:text-4xl"
                >
                  Blindagem para {service.title}
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease }}
              className="space-y-8 lg:col-span-7"
            >
              <section data-testid="service-detail-description">
                <SectionTitle>Descrição do serviço</SectionTitle>
                <div className="card-lux mt-4 space-y-3 p-5 sm:p-6">
                  {(extra.description || [service.description]).map((par, i) => (
                    <p key={i} className="text-sm leading-[1.75] tracking-[0.015em] text-zinc-300 sm:text-[15px]">
                      {par}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                      <Drop size={12} weight="fill" /> Hidrofóbico
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                      <HandSoap size={12} weight="fill" /> Anti-oleosidade
                    </span>
                  </div>
                </div>
              </section>

              {extra.steps && (
                <section data-testid="service-detail-steps">
                  <SectionTitle>Como é feito</SectionTitle>
                  <ol className="mt-4 space-y-2">
                    {extra.steps.map((step, i) => (
                      <li key={i} className="glass-lux flex items-center gap-4 px-4 py-3">
                        <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-sm font-medium text-[#D4AF37]">
                          {i + 1}
                        </span>
                        <span className="text-[13px] leading-snug tracking-[0.01em] text-zinc-300 sm:text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {extra.benefits && (
                <section data-testid="service-detail-benefits">
                  <SectionTitle>Benefícios</SectionTitle>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {extra.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2.5 border border-white/10 bg-[#0d0d0d] px-3.5 py-3">
                        <Check size={15} weight="bold" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                        <span className="text-[12px] leading-snug tracking-[0.01em] text-zinc-300 sm:text-[13px]">{b}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {extra.important && (
                <section data-testid="service-detail-important">
                  <SectionTitle>Informações importantes</SectionTitle>
                  <ul className="mt-4 space-y-2">
                    {extra.important.map((info) => (
                      <li key={info} className="flex items-center gap-3 border border-white/5 bg-[#0a0a0a] px-4 py-3">
                        <Info size={15} weight="duotone" className="shrink-0 text-[#D4AF37]" />
                        <span className="text-[13px] tracking-[0.01em] text-zinc-300 sm:text-sm">{info}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-start gap-3 border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] px-4 py-3.5">
                    <HouseLine size={18} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                    <p className="text-[12px] leading-snug tracking-[0.01em] text-zinc-300 sm:text-[13px]">
                      <span className="font-semibold text-white">Vamos até você:</span> atendimento no conforto
                      da sua casa, com processo de apenas 30 minutos.
                    </p>
                  </div>
                  {extra.warning && (
                    <div data-testid="service-detail-warning" className="mt-3 flex items-start gap-3 border border-red-500/30 bg-red-500/[0.07] px-4 py-3.5">
                      <Warning size={18} weight="duotone" className="mt-0.5 shrink-0 text-red-400" />
                      <p className="text-[12px] leading-snug tracking-[0.01em] text-red-200/90 sm:text-[13px]">
                        <span className="font-semibold text-red-300">Atenção:</span> {extra.warning}
                      </p>
                    </div>
                  )}
                </section>
              )}
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7, ease }}
              className="lg:col-span-5"
            >
              <div className="space-y-4 lg:sticky lg:top-20">
                <div className="card-lux border-[#D4AF37]/25 p-6 sm:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">Investimento</p>
                  {extra.phonePrices ? (
                    <div className="mt-5 space-y-3.5" data-testid="service-detail-prices">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                        <span className="text-[13px] text-zinc-400">Proteção de Tela</span>
                        <span className="font-display text-lg font-medium text-white">R$ {p.tela ?? 180}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                        <span className="text-[13px] text-zinc-400">Traseira de Vidro</span>
                        <span className="font-display text-lg font-medium text-white">R$ {p.traseira ?? 180}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                        <span className="text-[13px] text-zinc-400">Lentes da Câmera (avulso)</span>
                        <span className="font-display text-lg font-medium text-white">R$ {p.camera ?? 80}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-[#D4AF37]">Combo Alfa · tela + traseira + câmeras</span>
                        <span className="font-display gold-text text-xl font-medium">R$ {p.combo ?? 320}</span>
                      </div>
                    </div>
                  ) : (
                    <p data-testid="service-detail-price" className="font-display gold-text mt-4 text-3xl font-medium sm:text-4xl">
                      {service.price_label}
                    </p>
                  )}

                  <a
                    data-testid="service-detail-whatsapp"
                    href={waLink(wa, `Olá! Vim pelo app Alfa Blindagem e gostaria de um orçamento para blindar: ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 flex items-center justify-center gap-3 rounded-full bg-[#25D366] py-3.5 text-[12px] font-extrabold tracking-[0.18em] text-[#050505] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    <WhatsappLogo size={18} weight="fill" /> SOLICITAR ORÇAMENTO
                  </a>
                  <Link
                    to="/#calculadora"
                    data-testid="service-detail-calculator"
                    className="mt-2.5 flex items-center justify-center gap-2.5 rounded-full border border-white/15 py-3.5 text-[11px] font-bold tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                  >
                    <Calculator size={16} weight="bold" /> MONTAR MINHA PROTEÇÃO
                  </Link>
                  <p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-600">
                    Atendimento em São Ludgero - SC e região · a domicílio em 30 minutos
                  </p>
                </div>

                <div className="flex items-start gap-3 border border-white/10 bg-[#0a0a0a] p-4" data-testid="service-detail-disclaimer">
                  <Info size={16} weight="duotone" className="mt-0.5 shrink-0 text-zinc-500" />
                  <p className="text-[11px] leading-relaxed tracking-[0.01em] text-zinc-500">{DISCLAIMER}</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </main>
      )}
      <WhatsAppFloat number={wa} />
    </div>
  );
}
