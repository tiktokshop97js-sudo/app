import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  SignOut, Plus, Trash, PencilSimple, WhatsappLogo, ArrowLeft, ImageSquare,
} from "@phosphor-icons/react";
import { api, formatApiErrorDetail, waLink } from "../lib/api";
import { LogoWordmark } from "../components/Logo";
import { Switch } from "../components/ui/switch";

const inputCls =
  "w-full border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#D4AF37]/60";

const Field = ({ label, children }) => (
  <div>
    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</label>
    {children}
  </div>
);

const TABS = [
  { id: "leads", label: "Orçamentos" },
  { id: "settings", label: "Configurações" },
  { id: "services", label: "Serviços" },
  { id: "promos", label: "Promoções" },
  { id: "gallery", label: "Galeria" },
  { id: "reviews", label: "Avaliações" },
];

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("alfa_token", data.token);
      onSuccess(data.token);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5" data-testid="admin-login">
      <form onSubmit={submit} className="glass-lux w-full max-w-sm p-8 sm:p-10">
        <div className="flex justify-center"><LogoWordmark size={40} /></div>
        <h1 className="font-display mt-8 text-center text-lg font-medium uppercase tracking-[0.2em] text-white">
          Painel Administrativo
        </h1>
        <div className="mt-8 space-y-5">
          <Field label="E-mail">
            <input data-testid="admin-email-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="admin@alfablindagem.com" />
          </Field>
          <Field label="Senha">
            <input data-testid="admin-password-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
          </Field>
        </div>
        {error && <p data-testid="admin-login-error" className="mt-4 text-center text-xs font-semibold text-red-400">{error}</p>}
        <button data-testid="admin-login-submit" type="submit" disabled={loading} className="btn-gold mt-8 w-full rounded-full py-3.5 text-[12px] font-extrabold tracking-[0.2em] text-[#050505] disabled:opacity-60">
          {loading ? "ENTRANDO..." : "ENTRAR"}
        </button>
        <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500 transition-colors hover:text-[#D4AF37]">
          <ArrowLeft size={14} /> Voltar ao site
        </Link>
      </form>
    </div>
  );
}

function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const load = useCallback(() => api.get("/admin/leads").then((r) => setLeads(r.data)).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await api.delete(`/admin/leads/${id}`);
    toast.success("Orçamento removido");
    load();
  };

  const setLeadStatus = async (id, status) => {
    await api.put(`/admin/leads/${id}`, { status });
    load();
  };

  const STATUS_STYLE = {
    novo: "border-zinc-500/50 text-zinc-300 bg-zinc-500/10",
    contatado: "border-amber-500/50 text-amber-300 bg-amber-500/10",
    fechado: "border-emerald-500/50 text-emerald-300 bg-emerald-500/10",
  };

  return (
    <div data-testid="admin-leads-tab">
      <h2 className="font-display text-xl font-medium uppercase text-white">Solicitações de orçamento</h2>
      <p className="mt-1 text-sm text-zinc-500">{leads.length} solicitação(ões) recebida(s)</p>
      <div className="mt-8 space-y-4">
        {leads.length === 0 && <p className="text-sm text-zinc-600">Nenhuma solicitação ainda.</p>}
        {leads.map((l) => (
          <div key={l.id} data-testid={`lead-item-${l.id}`} className="card-lux flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">{l.name} <span className="ml-2 text-xs font-normal text-zinc-500">{l.whatsapp}</span></p>
              <p className="mt-1 text-sm text-zinc-400">{l.product}{l.model ? ` · ${l.model}` : ""} · {l.service}</p>
              {l.message && <p className="mt-1 text-xs text-zinc-500">"{l.message}"</p>}
              <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-600">{new Date(l.created_at).toLocaleString("pt-BR")}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {["novo", "contatado", "fechado"].map((st) => (
                  <button
                    key={st}
                    data-testid={`lead-status-${st}-${l.id}`}
                    onClick={() => setLeadStatus(l.id, st)}
                    className={`rounded-full border px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] transition-colors ${
                      (l.status || "novo") === st
                        ? STATUS_STYLE[st]
                        : "border-white/10 text-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <a data-testid={`lead-wa-${l.id}`} href={waLink(l.whatsapp.replace(/\D/g, ""), `Olá ${l.name}! Aqui é da Alfa Blindagem, sobre seu orçamento de ${l.product}.`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366]/15 p-3 text-[#25D366] transition-colors hover:bg-[#25D366]/30" aria-label="Responder no WhatsApp">
                <WhatsappLogo size={18} weight="fill" />
              </a>
              <button data-testid={`lead-delete-${l.id}`} onClick={() => remove(l.id)} className="rounded-full bg-red-500/10 p-3 text-red-400 transition-colors hover:bg-red-500/25" aria-label="Excluir">
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PRICE_FIELDS = [
  ["celular", "Celular (a partir de)"],
  ["tela", "Proteção de Tela"],
  ["traseira", "Proteção Traseira"],
  ["combo", "Combo Alfa"],
  ["camera", "Lentes da Câmera (avulso)"],
  ["relogio", "Relógio (a partir de)"],
  ["tablet", "Tablet (a partir de)"],
  ["oculos", "Óculos (a partir de)"],
];

function SettingsTab() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get("/settings").then((r) => setS(r.data)).catch(() => {}); }, []);
  if (!s) return <p className="text-sm text-zinc-500">Carregando...</p>;
  const set = (k) => (e) => setS({ ...s, [k]: e.target.value });
  const setPrice = (k) => (e) => setS({ ...s, prices: { ...s.prices, [k]: Number(e.target.value) || 0 } });

  const save = async () => {
    try {
      await api.put("/admin/settings", s);
      toast.success("Configurações salvas");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  return (
    <div data-testid="admin-settings-tab" className="max-w-2xl">
      <h2 className="font-display text-xl font-medium uppercase text-white">Configurações do site</h2>
      <div className="mt-8 space-y-5">
        <Field label="Slogan"><input data-testid="settings-slogan" value={s.slogan} onChange={set("slogan")} className={inputCls} /></Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="WhatsApp (só números, com DDI)"><input data-testid="settings-whatsapp" value={s.whatsapp} onChange={set("whatsapp")} className={inputCls} /></Field>
          <Field label="WhatsApp (exibição)"><input data-testid="settings-whatsapp-display" value={s.whatsapp_display} onChange={set("whatsapp_display")} className={inputCls} /></Field>
        </div>
        <Field label="Instagram (URL)"><input data-testid="settings-instagram" value={s.instagram} onChange={set("instagram")} className={inputCls} /></Field>
        <Field label="Endereço"><input data-testid="settings-address" value={s.address} onChange={set("address")} className={inputCls} /></Field>
        <Field label="Horários"><input data-testid="settings-hours" value={s.hours} onChange={set("hours")} className={inputCls} /></Field>
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Preços (R$)</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRICE_FIELDS.map(([k, label]) => (
              <Field key={k} label={label}>
                <input data-testid={`settings-price-${k}`} type="number" min="0" value={s.prices?.[k] ?? 0} onChange={setPrice(k)} className={inputCls} />
              </Field>
            ))}
          </div>
        </div>
        <button data-testid="settings-save" onClick={save} className="btn-gold rounded-full px-10 py-3.5 text-[12px] font-extrabold tracking-[0.2em] text-[#050505]">
          SALVAR ALTERAÇÕES
        </button>
      </div>
    </div>
  );
}

const emptyService = { title: "", category: "", description: "", benefits: [], price_label: "", image: "", active: true, order: 0 };

function ServicesTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [benefitsText, setBenefitsText] = useState("");
  const load = useCallback(() => api.get("/admin/services").then((r) => setItems(r.data)).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  const startEdit = (item) => { setForm({ ...item }); setBenefitsText((item.benefits || []).join("\n")); };
  const save = async () => {
    const payload = { ...form, benefits: benefitsText.split("\n").map((b) => b.trim()).filter(Boolean), order: Number(form.order) || 0 };
    try {
      if (form.id) await api.put(`/admin/services/${form.id}`, payload);
      else await api.post("/admin/services", payload);
      toast.success("Serviço salvo");
      setForm(null);
      load();
    } catch (err) { toast.error(formatApiErrorDetail(err.response?.data?.detail)); }
  };
  const remove = async (id) => { await api.delete(`/admin/services/${id}`); toast.success("Serviço excluído"); load(); };
  const toggle = async (item) => { await api.put(`/admin/services/${item.id}`, { ...item, active: !item.active }); load(); };

  return (
    <div data-testid="admin-services-tab">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-medium uppercase text-white">Serviços</h2>
        <button data-testid="service-new" onClick={() => { setForm({ ...emptyService }); setBenefitsText(""); }} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]">
          <Plus size={15} weight="bold" /> NOVO
        </button>
      </div>
      {form && (
        <div className="glass-lux mt-6 space-y-4 p-6" data-testid="service-form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Título"><input data-testid="service-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></Field>
            <Field label="Categoria (slug)"><input data-testid="service-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} placeholder="celular, relogio, tablet, oculos" /></Field>
          </div>
          <Field label="Descrição"><textarea data-testid="service-description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} resize-none`} /></Field>
          <Field label="Benefícios (um por linha)"><textarea data-testid="service-benefits" rows={3} value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} className={`${inputCls} resize-none`} /></Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Preço (texto)"><input data-testid="service-price" value={form.price_label} onChange={(e) => setForm({ ...form, price_label: e.target.value })} className={inputCls} placeholder="A partir de R$ 150" /></Field>
            <Field label="Ordem"><input data-testid="service-order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} /></Field>
            <Field label="Ativo"><Switch data-testid="service-active" checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} /></Field>
          </div>
          <Field label="URL da imagem"><input data-testid="service-image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} /></Field>
          <div className="flex gap-3">
            <button data-testid="service-save" onClick={save} className="btn-gold rounded-full px-8 py-3 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]">SALVAR</button>
            <button data-testid="service-cancel" onClick={() => setForm(null)} className="rounded-full border border-white/15 px-8 py-3 text-[11px] font-bold tracking-[0.15em] text-zinc-400">CANCELAR</button>
          </div>
        </div>
      )}
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item.id} data-testid={`service-row-${item.id}`} className="card-lux flex items-center gap-4 p-4">
            {item.image && <img src={item.image} alt="" className="h-14 w-20 shrink-0 border border-white/10 object-cover" />}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{item.title} <span className="ml-2 text-xs font-normal text-[#D4AF37]">{item.price_label}</span></p>
              <p className="truncate text-xs text-zinc-500">{item.category} · {item.active ? "ativo" : "inativo"}</p>
            </div>
            <button data-testid={`service-toggle-${item.id}`} onClick={() => toggle(item)} className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#D4AF37]">{item.active ? "Desativar" : "Ativar"}</button>
            <button data-testid={`service-edit-${item.id}`} onClick={() => startEdit(item)} className="rounded-full bg-white/5 p-2.5 text-zinc-300 hover:text-[#D4AF37]" aria-label="Editar"><PencilSimple size={16} /></button>
            <button data-testid={`service-delete-${item.id}`} onClick={() => remove(item.id)} className="rounded-full bg-red-500/10 p-2.5 text-red-400 hover:bg-red-500/25" aria-label="Excluir"><Trash size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

const emptyPromo = { title: "", subtitle: "", price_label: "", tag: "", active: true };

function PromosTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const load = useCallback(() => api.get("/admin/promotions").then((r) => setItems(r.data)).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    try {
      if (form.id) await api.put(`/admin/promotions/${form.id}`, form);
      else await api.post("/admin/promotions", form);
      toast.success("Promoção salva"); setForm(null); load();
    } catch (err) { toast.error(formatApiErrorDetail(err.response?.data?.detail)); }
  };
  const remove = async (id) => { await api.delete(`/admin/promotions/${id}`); toast.success("Promoção excluída"); load(); };

  return (
    <div data-testid="admin-promos-tab">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-medium uppercase text-white">Promoções</h2>
        <button data-testid="promo-new" onClick={() => setForm({ ...emptyPromo })} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]">
          <Plus size={15} weight="bold" /> NOVA
        </button>
      </div>
      {form && (
        <div className="glass-lux mt-6 space-y-4 p-6" data-testid="promo-form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Título"><input data-testid="promo-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></Field>
            <Field label="Subtítulo"><input data-testid="promo-subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className={inputCls} /></Field>
            <Field label="Preço (texto)"><input data-testid="promo-price" value={form.price_label} onChange={(e) => setForm({ ...form, price_label: e.target.value })} className={inputCls} placeholder="R$ 250" /></Field>
            <Field label="Etiqueta"><input data-testid="promo-tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputCls} placeholder="MAIS VENDIDO" /></Field>
          </div>
          <Field label="Ativa"><Switch data-testid="promo-active" checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} /></Field>
          <div className="flex gap-3">
            <button data-testid="promo-save" onClick={save} className="btn-gold rounded-full px-8 py-3 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]">SALVAR</button>
            <button data-testid="promo-cancel" onClick={() => setForm(null)} className="rounded-full border border-white/15 px-8 py-3 text-[11px] font-bold tracking-[0.15em] text-zinc-400">CANCELAR</button>
          </div>
        </div>
      )}
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item.id} data-testid={`promo-row-${item.id}`} className="card-lux flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-white">{item.title} <span className="ml-2 text-xs text-[#D4AF37]">{item.price_label}</span></p>
              <p className="text-xs text-zinc-500">{item.subtitle} {item.tag && `· ${item.tag}`} · {item.active ? "ativa" : "inativa"}</p>
            </div>
            <div className="flex gap-2">
              <button data-testid={`promo-edit-${item.id}`} onClick={() => setForm({ ...item })} className="rounded-full bg-white/5 p-2.5 text-zinc-300 hover:text-[#D4AF37]" aria-label="Editar"><PencilSimple size={16} /></button>
              <button data-testid={`promo-delete-${item.id}`} onClick={() => remove(item.id)} className="rounded-full bg-red-500/10 p-2.5 text-red-400 hover:bg-red-500/25" aria-label="Excluir"><Trash size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GALLERY_CATEGORIES = ["iphone", "android", "celulares", "relogios", "tablets", "oculos", "aplicacoes"];

function GalleryTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ url: "", category: "iphone", title: "" });
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", form.category);
      fd.append("title", form.title || file.name.replace(/\.[^.]+$/, ""));
      await api.post("/admin/gallery/upload", fd);
      toast.success("Foto real adicionada à galeria");
      setForm({ url: "", category: form.category, title: "" });
      load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };
  const load = useCallback(() => api.get("/gallery").then((r) => setItems(r.data)).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  const add = async () => {
    if (!form.url) return toast.error("Informe a URL da imagem");
    try {
      await api.post("/admin/gallery", form);
      toast.success("Imagem adicionada"); setForm({ url: "", category: "iphone", title: "" }); load();
    } catch (err) { toast.error(formatApiErrorDetail(err.response?.data?.detail)); }
  };
  const remove = async (id) => { await api.delete(`/admin/gallery/${id}`); toast.success("Imagem removida"); load(); };

  return (
    <div data-testid="admin-gallery-tab">
      <h2 className="font-display text-xl font-medium uppercase text-white">Galeria</h2>
      <div className="glass-lux mt-6 grid grid-cols-1 gap-4 p-6 sm:grid-cols-[1fr_180px_1fr_auto]">
        <input data-testid="gallery-url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL da imagem" className={inputCls} />
        <select data-testid="gallery-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
          {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input data-testid="gallery-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" className={inputCls} />
        <button data-testid="gallery-add" onClick={add} className="btn-gold flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]"><Plus size={15} weight="bold" /> ADICIONAR</button>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label data-testid="gallery-upload-label" className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-dashed border-[#D4AF37]/50 px-6 py-3.5 text-[11px] font-extrabold tracking-[0.15em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10">
          <ImageSquare size={16} weight="bold" />
          {uploading ? "ENVIANDO..." : "ENVIAR FOTO REAL DO TRABALHO"}
          <input data-testid="gallery-upload-input" type="file" accept="image/*" className="hidden" onChange={uploadFile} disabled={uploading} />
        </label>
        <p className="text-xs text-zinc-600">A foto entra na galeria com a categoria e o título escolhidos acima.</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} data-testid={`gallery-row-${item.id}`} className="group relative overflow-hidden border border-white/10">
            <img src={item.url} alt={item.title} className="h-36 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#050505]/85 px-3 py-2">
              <span className="truncate text-[10px] uppercase tracking-widest text-zinc-400">{item.category}</span>
              <button data-testid={`gallery-delete-${item.id}`} onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300" aria-label="Excluir"><Trash size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const emptyReview = { name: "", stars: 5, comment: "" };

function ReviewsTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const load = useCallback(() => api.get("/reviews").then((r) => setItems(r.data)).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const payload = { ...form, stars: Number(form.stars) || 5 };
    try {
      if (form.id) await api.put(`/admin/reviews/${form.id}`, payload);
      else await api.post("/admin/reviews", payload);
      toast.success("Avaliação salva"); setForm(null); load();
    } catch (err) { toast.error(formatApiErrorDetail(err.response?.data?.detail)); }
  };
  const remove = async (id) => { await api.delete(`/admin/reviews/${id}`); toast.success("Avaliação excluída"); load(); };

  return (
    <div data-testid="admin-reviews-tab">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-medium uppercase text-white">Avaliações</h2>
        <button data-testid="review-new" onClick={() => setForm({ ...emptyReview })} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]">
          <Plus size={15} weight="bold" /> NOVA
        </button>
      </div>
      {form && (
        <div className="glass-lux mt-6 space-y-4 p-6" data-testid="review-form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nome do cliente"><input data-testid="review-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></Field>
            <Field label="Estrelas">
              <select data-testid="review-stars" value={form.stars} onChange={(e) => setForm({ ...form, stars: e.target.value })} className={inputCls}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} estrela{n > 1 ? "s" : ""}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Comentário"><textarea data-testid="review-comment" rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className={`${inputCls} resize-none`} /></Field>
          <div className="flex gap-3">
            <button data-testid="review-save" onClick={save} className="btn-gold rounded-full px-8 py-3 text-[11px] font-extrabold tracking-[0.15em] text-[#050505]">SALVAR</button>
            <button data-testid="review-cancel" onClick={() => setForm(null)} className="rounded-full border border-white/15 px-8 py-3 text-[11px] font-bold tracking-[0.15em] text-zinc-400">CANCELAR</button>
          </div>
        </div>
      )}
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item.id} data-testid={`review-row-${item.id}`} className="card-lux flex items-start justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-white">{item.name} <span className="ml-2 text-xs text-[#D4AF37]">{"★".repeat(item.stars)}</span></p>
              <p className="mt-1 text-sm text-zinc-400">"{item.comment}"</p>
            </div>
            <div className="flex gap-2">
              <button data-testid={`review-edit-${item.id}`} onClick={() => setForm({ ...item })} className="rounded-full bg-white/5 p-2.5 text-zinc-300 hover:text-[#D4AF37]" aria-label="Editar"><PencilSimple size={16} /></button>
              <button data-testid={`review-delete-${item.id}`} onClick={() => remove(item.id)} className="rounded-full bg-red-500/10 p-2.5 text-red-400 hover:bg-red-500/25" aria-label="Excluir"><Trash size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("alfa_token"));
  const [tab, setTab] = useState("leads");

  const logout = () => {
    localStorage.removeItem("alfa_token");
    setToken(null);
  };

  if (!token) return <Login onSuccess={setToken} />;

  return (
    <div className="min-h-screen bg-[#050505] text-white" data-testid="admin-dashboard">
      <header className="glass-lux sticky top-0 z-40 border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" aria-label="Voltar ao site"><LogoWordmark size={30} /></Link>
          <button data-testid="admin-logout" onClick={logout} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-red-400">
            <SignOut size={16} /> Sair
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <nav className="flex flex-wrap gap-2" aria-label="Abas do painel">
          {TABS.map((t) => (
            <button
              key={t.id}
              data-testid={`admin-tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                tab === t.id ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/10 text-zinc-500 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="mt-10">
          {tab === "leads" && <LeadsTab />}
          {tab === "settings" && <SettingsTab />}
          {tab === "services" && <ServicesTab />}
          {tab === "promos" && <PromosTab />}
          {tab === "gallery" && <GalleryTab />}
          {tab === "reviews" && <ReviewsTab />}
        </div>
      </div>
    </div>
  );
}
