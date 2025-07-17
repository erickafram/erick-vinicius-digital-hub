import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/register" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Voltar ao Cadastro
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Política de Privacidade</CardTitle>
            <p className="text-muted-foreground">Última atualização: Janeiro 2025</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Informações que Coletamos</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, 
              preenche um formulário ou entra em contato conosco.
            </p>
            <ul>
              <li><strong>Informações de Conta:</strong> Nome, endereço de e-mail, senha</li>
              <li><strong>Informações de Contato:</strong> Quando você nos envia mensagens</li>
              <li><strong>Informações de Uso:</strong> Como você interage com nosso serviço</li>
            </ul>

            <h2>2. Como Usamos Suas Informações</h2>
            <p>Usamos as informações coletadas para:</p>
            <ul>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar transações e enviar confirmações</li>
              <li>Enviar comunicações técnicas e atualizações</li>
              <li>Responder a comentários e perguntas</li>
              <li>Proteger contra fraudes e abusos</li>
            </ul>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, 
              exceto conforme descrito nesta política.
            </p>

            <h2>4. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança apropriadas para proteger suas informações pessoais 
              contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Retirar seu consentimento</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              Usamos cookies e tecnologias similares para melhorar sua experiência, 
              analisar o uso do site e personalizar conteúdo.
            </p>

            <h2>7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos você sobre 
              mudanças significativas publicando a nova política em nosso site.
            </p>

            <h2>8. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}