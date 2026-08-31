import { WhatsappLogo } from "@phosphor-icons/react";
import { waLink, DEFAULT_WA_MESSAGE } from "../lib/api";

export default function WhatsAppFloat({ number }) {
  return (
    <a
      data-testid="whatsapp-float"
      href={waLink(number, DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#04240f] shadow-[0_10px_36px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30" />
      <WhatsappLogo size={27} weight="fill" className="relative" />
    </a>
  );
}
