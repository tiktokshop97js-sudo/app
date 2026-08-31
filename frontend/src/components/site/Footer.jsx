import { Link } from "react-router-dom";
import { WhatsappLogo, InstagramLogo, MapPin } from "@phosphor-icons/react";
import { LogoWordmark } from "../Logo";
import { scrollToId } from "../../lib/media";
import { waLink, DEFAULT_WA_MESSAGE } from "../../lib/api";

export default function Footer({ settings }) {
  const wa = settings?.whatsapp;
  const instagram = settings?.instagram || "https://www.instagram.com/alfa.blindagem";
  const address = settings?.address || "Rua Augusto Becker, 1413 - São Ludgero - SC";

  return (
    <footer data-testid="main-footer" className="border-t border-white/5 bg-[#030303] px-5 pb-10 pt-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <LogoWordmark size={38} />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-zinc-500">
            "{settings?.slogan || "Proteção que você sente. Qualidade que você vê."}"
          </p>
          <div className="mt-8 flex gap-3">
            <a
              data-testid="footer-whatsapp"
              href={waLink(wa, DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="glass-lux rounded-full p-3 text-zinc-400 transition-colors duration-300 hover:text-[#25D366]"
            >
              <WhatsappLogo size={19} weight="fill" />
            </a>
            <a
              data-testid="footer-instagram"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="glass-lux rounded-full p-3 text-zinc-400 transition-colors duration-300 hover:text-[#D4AF37]"
            >
              <InstagramLogo size={19} weight="fill" />
            </a>
            <a
              data-testid="footer-location"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Localização"
              className="glass-lux rounded-full p-3 text-zinc-400 transition-colors duration-300 hover:text-[#D4AF37]"
            >
              <MapPin size={19} weight="fill" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Serviços</h4>
          <ul className="mt-6 space-y-3.5 text-sm text-zinc-400">
            {["Celular", "Relógio", "Tablet", "Óculos"].map((s) => (
              <li key={s}>
                <button
                  data-testid={`footer-service-${s.toLowerCase()}`}
                  onClick={() => scrollToId("servicos")}
                  className="transition-colors duration-300 hover:text-[#D4AF37]"
                >
                  Blindagem de {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Contato</h4>
          <ul className="mt-6 space-y-3.5 text-sm text-zinc-400">
            <li>WhatsApp: {settings?.whatsapp_display || "(98) 98478-4793"}</li>
            <li className="leading-relaxed">{address}</li>
            <li className="text-zinc-500">{settings?.hours || "Seg a Sáb: 08h às 11h | Sáb e Dom: 14h às 19h"}</li>
            <li className="text-[#D4AF37]/80">Atendemos a domicílio · 30 min</li>
            <li className="text-zinc-500">São Ludgero · Orleans · Braço do Norte</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Navegação</h4>
          <ul className="mt-6 space-y-3.5 text-sm text-zinc-400">
            <li><button data-testid="footer-nav-galeria" onClick={() => scrollToId("galeria")} className="transition-colors hover:text-[#D4AF37]">Galeria</button></li>
            <li><button data-testid="footer-nav-ofertas" onClick={() => scrollToId("ofertas")} className="transition-colors hover:text-[#D4AF37]">Ofertas</button></li>
            <li><button data-testid="footer-nav-orcamento" onClick={() => scrollToId("calculadora")} className="transition-colors hover:text-[#D4AF37]">Orçamento</button></li>
            <li>
              <Link data-testid="footer-admin-link" to="/admin" className="text-zinc-600 transition-colors hover:text-[#D4AF37]">
                Área administrativa
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
        <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Alfa Blindagem. Todos os direitos reservados.</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">São Ludgero · Santa Catarina</p>
      </div>
    </footer>
  );
}
