const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMG = {
  heroPhone: u("photo-1601784551446-20c9e07cdbdb", 1600),
  goldTexture: u("photo-1645290099737-23f17b0b7dd8", 1600),
  iphone: u("photo-1605236453806-6ff36851218e", 1400),
  iphoneDark: u("photo-1556656793-08538906a9f8", 1400),
  android: u("photo-1511707171634-5f897ff02aa9", 1400),
  watch: u("photo-1522312346375-d1a52e2b99b3", 1400),
  watchAlt: u("photo-1508057198894-247b23fe5ade", 1400),
  tablet: u("photo-1544244015-0df4b3ffc6b0", 1400),
  glasses: u("photo-1572635196237-14b3f281503f", 1400),
  glassesAlt: u("photo-1511499767150-a48a237f0083", 1400),
  application: u("photo-1580910051074-3eb694886505", 1400),
  cracked: u("photo-1733590634512-66186b83ad07", 1400),
  pristine: u("photo-1616348436168-de43ad0db179", 1400),
  appleSet: u("photo-1596558450268-9c27524ba856", 1400),
};

export const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "precos", label: "Preços" },
  { id: "galeria", label: "Galeria" },
  { id: "ofertas", label: "Ofertas" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
