import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
            <CardTitle className="text-3xl">Termos de Serviço</CardTitle>
            <p className="text-muted-foreground">Última atualização: Janeiro 2025</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este serviço, você aceita e concorda em estar vinculado aos 
              termos e condições deste acordo.
            </p>

            <h2>2. Uso do Serviço</h2>
            <p>
              Você pode usar nosso serviço para fins legítimos e de acordo com estes termos. 
              Você concorda em não usar o serviço:
            </p>
            <ul>
              <li>Para qualquer finalidade ilegal ou não autorizada</li>
              <li>Para violar qualquer lei internacional, federal, provincial ou estadual</li>
              <li>Para transmitir ou obter o envio de qualquer material que seja assediante, abusivo, torturante, ameaçador, prejudicial, vulgar, obsceno ou censurável</li>
            </ul>

            <h2>3. Contas de Usuário</h2>
            <p>
              Quando você cria uma conta conosco, deve fornecer informações precisas, completas e atuais. 
              Você é responsável por proteger a senha que usa para acessar o serviço.
            </p>

            <h2>4. Privacidade</h2>
            <p>
              Sua privacidade é importante para nós. Nossa Política de Privacidade explica como 
              coletamos, usamos e protegemos suas informações quando você usa nosso serviço.
            </p>

            <h2>5. Modificações</h2>
            <p>
              Reservamos o direito, a nosso critério, de modificar ou substituir estes termos 
              a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso 
              de pelo menos 30 dias antes de qualquer novo termo entrar em vigor.
            </p>

            <h2>6. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}