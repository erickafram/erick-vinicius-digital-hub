# Erick Vinícius Digital Hub

Um portal completo para apresentação profissional e ferramentas web gratuitas.

## Funcionalidades

- Site institucional com informações profissionais
- Sistema de autenticação com registro e login
- Painel de usuário para acesso às ferramentas
- Painel administrativo para gerenciamento de produtos e usuários
- API RESTful com Express e SQLite

## Tecnologias Utilizadas

- React 18 com TypeScript
- Vite para build rápida
- Tailwind CSS e Shadcn/UI para interface
- Prisma ORM para gerenciamento do banco de dados
- SQLite como banco de dados
- Express para servidor API

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/erick-vinicius-digital-hub.git
   cd erick-vinicius-digital-hub
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

## Uso

Para desenvolvimento, execute:

```bash
npm run dev:all
```

Isso irá iniciar:
- O servidor frontend em `http://localhost:5173`
- O servidor API em `http://localhost:4000`

Para acessar o painel administrativo, use as credenciais padrão:
- Email: admin@example.com
- Senha: admin123

## Estrutura do Projeto

- `/src` - Código frontend
  - `/components` - Componentes React
  - `/pages` - Páginas da aplicação
  - `/lib` - Utilitários e funções auxiliares
  - `/hooks` - Custom hooks
- `/prisma` - Esquema do banco de dados e migrações
- `server.ts` - API RESTful

## Rotas da API

### Autenticação
- `POST /api/login` - Login de usuário
- `POST /api/register` - Registro de novo usuário

### Produtos (Ferramentas)
- `GET /api/products` - Listar todas as ferramentas ativas (público)
- `GET /api/admin/products` - Listar todas as ferramentas (admin)
- `POST /api/admin/products` - Criar nova ferramenta (admin)
- `PUT /api/admin/products/:id` - Atualizar ferramenta (admin)
- `DELETE /api/admin/products/:id` - Remover ferramenta (admin)

### Estatísticas
- `GET /api/admin/stats` - Obter estatísticas do sistema (admin)

## Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
