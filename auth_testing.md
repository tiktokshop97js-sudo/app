# Auth Testing Playbook

1. Login:
   curl -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@alfablindagem.com","password":"Alfa@2026"}'
   -> deve retornar {token, user}

2. Sessão:
   curl $API/api/auth/me -H "Authorization: Bearer $TOKEN"
   -> deve retornar o usuário admin

3. Proteção de rotas:
   curl $API/api/admin/leads (sem token) -> 401/403

4. Credenciais erradas -> 401. 5 tentativas erradas -> 429 (lockout 15 min).

5. Admin é semeado no startup a partir de ADMIN_EMAIL/ADMIN_PASSWORD (.env). Senha é ressincronizada se mudar no .env.
