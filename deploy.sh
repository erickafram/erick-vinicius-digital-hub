#!/bin/bash

echo "🚀 Deploy do Erick Digital Hub"
echo "================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado! Execute o script na raiz do projeto."
    exit 1
fi

print_status "Verificando dependências..."

# 2. Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependências..."
    npm install
fi

# 3. Build do frontend
print_status "Fazendo build do frontend..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Falha no build do frontend!"
    exit 1
fi

# 4. Configurar banco de dados
print_status "Configurando banco de dados..."
npx prisma generate
npx prisma migrate deploy

# 5. Criar diretório de logs
mkdir -p logs

# 6. Parar processo anterior se existir
print_status "Parando processos anteriores..."
pm2 stop erick-digital-hub 2>/dev/null || true
pm2 delete erick-digital-hub 2>/dev/null || true

# 7. Iniciar aplicação com PM2
print_status "Iniciando aplicação com PM2..."
pm2 start ecosystem.config.js --env production

# 8. Salvar configuração do PM2
pm2 save

# 9. Verificar se está rodando
sleep 3
if pm2 list | grep -q "erick-digital-hub"; then
    print_status "✅ Aplicação iniciada com sucesso!"
    print_status "📊 Status da aplicação:"
    pm2 list
    
    print_status "🔗 Testando API..."
    sleep 2
    
    # Testar se a API está respondendo
    if curl -s http://localhost:4000/api/products > /dev/null; then
        print_status "✅ API está funcionando!"
    else
        print_warning "⚠️  API pode não estar respondendo corretamente"
    fi
    
    print_status "🌐 Aplicação disponível em:"
    print_status "   Frontend + API: https://erickdev.online"
    print_status "   API direta: http://localhost:4000"
    
    print_status "📝 Para ver logs em tempo real:"
    echo "   pm2 logs erick-digital-hub"
    
else
    print_error "❌ Falha ao iniciar a aplicação!"
    print_status "Verificando logs de erro..."
    pm2 logs erick-digital-hub --lines 20
    exit 1
fi

print_status "🎉 Deploy concluído com sucesso!" 