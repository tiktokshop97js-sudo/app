import { useState } from "react";
import { toast } from "sonner";
import { MapPin, WhatsappLogo, Clock, PaperPlaneTilt, HouseLine } from "@phosphor-icons/react";
import Reveal, { SectionHeading } from "./Reveal";
import { api, waLink, formatApiErrorDetail } from "../../lib/api";

const PRODUCTS = ["iPhone", "Android", "Relógio", "Tablet", "Óculos"];
const SERVICE_OPTIONS = ["Proteção de Tela", "Proteção Traseira", "Combo Alfa", "Proteção completa", "Outro"];

const inputCls =
  "w-full border border-white/10 bg-[#0d0d0d] px-5 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-300 focus:border-[#D4AF37]/60";

export default function Contact({ settings }) {
  const [form, setForm] = useState({ name: "", whatsapp: "", product: "iPhone", model: "", service: "Combo Alfa", message: "" });
  const [sending, setSending] = useState(false);
  const wa = settings?.whatsapp;
  const address = settings?.address || "Rua Augusto Becker, 1413 - São Ludgero - SC";
  const hours = settings?.hours || "Seg a Sáb: 08h às 11h | Sáb e Dom: 14h às 19h";

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/leads", form);
      toast.success("Solicitação registrada! Abrindo o WhatsApp para confirmar.");
      const msg = `Olá! Sou ${form.name}. Vim pelo app Alfa Blindagem e gostaria de um orçamento: ${form.product}${form.model ? ` ${form.model}` : ""} — ${form.service}.${form.message ? ` Obs: ${form.message}` : ""}`;
      window.open(waLink(wa, msg), "_blank", "noopener");
      setForm({ name: "", whatsapp: "", product: "iPhone", model: "", service: "Combo Alfa", message: "" });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contato" data-testid="contact-section" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="11" kicker="Contato" title="Fale com a Alfa" />
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="card-lux flex h-full flex-col p-8 sm:p-10">
              <h3 className="font-display text-lg font-medium uppercase tracking-wide text-white">
                Venha conhecer a Alfa Blindagem
              </h3>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={22} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-semibold text-white">{address}</p>
                    <p className="mt-1 text-xs text-zinc-500">Atendimento presencial com agendamento</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HouseLine size={22} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-semibold text-white">Vamos até você</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Atendimento no conforto da sua casa. Processo de apenas 30 minutos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={22} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <p className="text-sm text-zinc-300">{hours}</p>
                </div>
                <div className="flex items-start gap-4">
                  <WhatsappLogo size={22} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <p className="text-sm text-zinc-300">{settings?.whatsapp_display || "(98) 98478-4793"}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                <a
                  data-testid="contact-map-button"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full border border-white/15 py-4 text-[12px] font-extrabold tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                >
                  <MapPin size={17} weight="bold" /> ABRIR NO MAPA
                </a>
                <a
                  data-testid="contact-whatsapp-button"
                  href={waLink(wa, "Olá! Vim pelo app Alfa Blindagem e gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-4 text-[12px] font-extrabold tracking-[0.2em] text-[#050505] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <WhatsappLogo size={17} weight="fill" /> FALAR NO WHATSAPP
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <form data-testid="budget-form" onSubmit={submit} className="glass-lux grid grid-cols-1 gap-5 p-8 sm:grid-cols-2 sm:p-10">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">Nome</label>
                <input data-testid="form-name" required minLength={2} value={form.name} onChange={set("name")} placeholder="Seu nome completo" className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">WhatsApp</label>
                <input data-testid="form-whatsapp" required minLength={8} value={form.whatsapp} onChange={set("whatsapp")} placeholder="(98) 9 9999-9999" className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">Produto</label>
                <select data-testid="form-product" value={form.product} onChange={set("product")} className={inputCls}>
                  {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">Modelo</label>
                <input data-testid="form-model" value={form.model} onChange={set("model")} placeholder="Ex: iPhone 15 Pro" className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">Serviço desejado</label>
                <select data-testid="form-service" value={form.service} onChange={set("service")} className={inputCls}>
                  {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">Mensagem</label>
                <textarea data-testid="form-message" rows={4} value={form.message} onChange={set("message")} placeholder="Conte um pouco sobre o que você precisa..." className={`${inputCls} resize-none`} />
              </div>
              <button
                data-testid="budget-submit-button"
                type="submit"
                disabled={sending}
                className="btn-gold flex items-center justify-center gap-3 rounded-full py-4 text-[13px] font-extrabold tracking-[0.2em] text-[#050505] disabled:opacity-60 sm:col-span-2"
              >
                <PaperPlaneTilt size={18} weight="fill" />
                {sending ? "ENVIANDO..." : "SOLICITAR ORÇAMENTO"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
