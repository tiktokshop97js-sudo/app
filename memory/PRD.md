# PRD — ALFA BLINDAGEM

## Problem statement original
Web app premium/luxo (preto + dourado) para empresa de blindagem de eletrônicos (celulares, relógios, tablets, óculos) em São Ludgero - SC. Splash cinematográfica, home impactante, serviços, preços (Tela R$150 / Traseira R$150 / Combo R$250), combo em destaque, calculadora de orçamento, integração WhatsApp (98) 98478-4793, galeria com filtros, antes/depois com slider, como funciona, diferenciais, ofertas, localização, contato com formulário, avaliações, painel admin completo (preços, serviços, promoções, galeria, avaliações, configurações, leads), segurança JWT, PWA, SEO, mobile-first. Instagram: https://www.instagram.com/alfa.blindagem

## Personas
- Cliente final (mobile): quer blindar o aparelho, vê preços, monta orçamento e chama no WhatsApp.
- Admin (dono): edita preços/serviços/promoções/galeria/avaliações/configurações e acompanha leads.

## Arquitetura
- FastAPI + MongoDB (motor). Coleções: users, settings, services, promotions, reviews, gallery, leads, login_attempts.
- Auth: bcrypt + JWT (Bearer), seed de admin via env (ADMIN_EMAIL/ADMIN_PASSWORD/JWT_SECRET), lockout 5 tentativas/15min.
- Frontend: React 19 + Tailwind + framer-motion + lenis + @phosphor-icons. SPA single-page com âncoras + rota /admin. PWA (manifest + icon.svg).

## Implementado (31/08/2026)
- Splash cinematográfica (escudo+A dourado, ALFA BLINDAGEM, slogan).
- Hero kinetic com reveal mascarado linha a linha, parallax, CTAs WhatsApp, indicadores (inclui "Vamos até você · 30 min").
- Marquee editorial lento (com "Atendimento em casa" / "Aplicação em 30 minutos").
- Serviços: 4 cards premium (Celular/Relógio/Tablet/Óculos) + seção Smartphones iPhone/Android.
- Preços: Tela R$150, Traseira R$150, Combo Alfa R$250 (MAIS VENDIDO, card dourado). Seção especial Combo Alfa com frente+traseira. Ofertas via API.
- Preços "a partir de": celular 150, relógio 150, óculos 200, tablet 250 (pedido do usuário, editáveis no admin).
- Calculadora "Monte sua proteção" com orçamento dinâmico e botão WhatsApp com mensagem contextual.
- Galeria com 8 categorias de filtro, hover premium. Antes/Depois com slider arrastável.
- Como funciona (5 passos) + Diferenciais (inclui atendimento a domicílio 30 min).
- Avaliações (3 seeds), Contato (formulário -> /api/leads + abre WhatsApp; mapa; horários), Footer completo, botão flutuante WhatsApp.
- Painel /admin: login JWT, abas Orçamentos (leads), Configurações (slogan, whatsapp, instagram, endereço, horários, 7 preços), Serviços CRUD + ativar/desativar, Promoções CRUD, Galeria (add/remover), Avaliações CRUD.
- SEO meta tags pt-BR, PWA manifest, ícone SVG dourado.
- Atualização: usuário adicionou diferencial "vamos até você no conforto da sua casa, processo de apenas 30 minutos" — incluído no hero, marquee, diferenciais, contato e footer.
- Atualização (navegação): serviços viraram cards clicáveis em grade 2 colunas (mobile) / 4 (desktop). Cada card abre página de detalhes real em /servicos/:category (celular, relogio, tablet, oculos) com botão Voltar, imagem grande, descrição completa, informações importantes, benefícios, preços e CTA WhatsApp. Seção longa de dispositivos removida da home (conteúdo migrado para as páginas de detalhes).
- Horários corrigidos: "Seg a Sáb: 08h às 11h | Sáb e Dom: 14h às 19h" (DB + fallbacks + seed).
- Atualização (páginas de detalhes): layout compacto (menos rolagem), letter-spacing sutil na descrição, seções em cards: Descrição (2 parágrafos profissionais por serviço, com selos Hidrofóbico/Anti-oleosidade), Como é feito (5 passos adaptados por serviço), Benefícios (8 cards com check por serviço), Informações importantes, card de preço + CTAs, e aviso legal ("não torna o aparelho indestrutível..."). Conteúdo completo fornecido pelo usuário para celular/tablet/relógio/óculos. Bug corrigido: botão Voltar caía em página em branco ao abrir link direto — agora usa navigate("/") quando não há histórico.
- Atualização (óculos + câmera): imagem do serviço Óculos trocada para óculos de grau premium (photo-1591076482161-42ce6da69f67, com object-position custom no card/detalhe); galeria gal-7 atualizada. Celular agora inclui blindagem das lentes da câmera (descrição, benefício, info importante e benefícios do card na home — DB + seeds).
- Atualização (preços + aviso): celular agora Tela R$180 / Traseira de Vidro R$180 / Combo Alfa R$320 (DB, seeds, fallbacks, calculadora, promoção). Aviso vermelho na página do celular: não aplicar em tela trincada/quebrada (líquido pode atingir a placa e danificar o aparelho).
- Atualização (combo + flagships): Combo Alfa = tela + traseira + lentes das câmeras por R$320 (textos no hero, pricing, detalhe, promoção e mensagens de WhatsApp). Galeria ganhou "iPhone 17 Pro Max" (gal-9) e "Galaxy S26 Ultra" (gal-10); gal-3 Android corrigida (era foto de iPhone) para Galaxy S21 Ultra.

## Verificado
- API: login/me/leads/settings PUT/serviços/galeria/reviews/promos + 401 sem token e senha errada.
- UI: splash, hero, serviços, preços, calculadora (iPhone+Combo -> R$250 -> wa.me), galeria filtrada, contato, menu mobile, admin login + 3 abas.

## Backlog
- P0: nada bloqueante.
- P1: imagens exclusivas geradas por IA (hero/banners), galeria com lightbox, status do lead (novo/contatado/fechado).
- P2: Google Maps embed, depoimentos com foto, blog/SEO pages por dispositivo, GitHub push (pedido do usuário — pendente de credenciais do repo).
