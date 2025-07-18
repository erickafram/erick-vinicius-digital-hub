# 🚀 Instruções de Deploy para Produção

## 📋 Problema Identificado
O frontend está rodando em `https://erickdev.online`, mas a API não está configurada, causando erro 404 nas requisições.

## ✅ Solução: Deploy Fullstack

### 1. **Build do Projeto Completo**
```bash
# No servidor local
npm run build
npm run build:full
```

### 2. **Arquivos para Upload no Servidor**
Faça upload dos seguintes arquivos/pastas:
```
📁 projeto/
├── dist/                    # Frontend buildado
├── server.ts               # Servidor Express
├── src/                    # Código da API
├── prisma/                 # Banco de dados
├── package.json           # Dependências
├── node_modules/          # Dependências instaladas
└── .env                   # Variáveis de ambiente
```

### 3. **No Servidor de Produção**
```bash
# Instalar dependências
npm install

# Executar migrações do banco
npx prisma migrate deploy
npx prisma generate

# Iniciar servidor de produção
npm start
```

### 4. **Configuração do Servidor Web (Apache/Nginx)**

#### Para Apache (.htaccess):
```apache
# Redirecionar tudo para o servidor Node.js
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:4000/$1 [P,L]
```

#### Para Nginx:
```nginx
server {
    listen 80;
    server_name erickdev.online;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. **Variáveis de Ambiente (.env)**
Crie um arquivo `.env` no servidor:
```env
NODE_ENV=production
PORT=4000
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
DATABASE_URL="file:./prisma/prod.db"
```

### 6. **Manter Servidor Rodando (PM2)**
```bash
# Instalar PM2
npm install -g pm2

# Iniciar aplicação
pm2 start npm --name "erick-app" -- start

# Salvar configuração
pm2 save
pm2 startup
```

## 🔧 Alternativa Rápida: Apenas API

Se você quiser manter o frontend separado, apenas suba a API:

1. **Crie subdomínio**: `api.erickdev.online`
2. **Faça deploy apenas do servidor Express**
3. **Modifique as requisições no frontend** para apontar para a API

### Modificar requisições (se usar subdomínio):
```javascript
// Em src/pages/Login.tsx e outros
const response = await fetch('https://api.erickdev.online/api/login', {
  // resto do código...
});
```

## 🎯 Recomendação
Use a **Solução Fullstack** - é mais simples e eficiente! 