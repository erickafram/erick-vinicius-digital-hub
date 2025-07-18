import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Users, Trophy } from "lucide-react";

export default function AboutSection() {
  const skills = [
    "PHP", "Laravel", "JavaScript", "React", "Android", "Kotlin",
    "MySQL", "PostgreSQL", "Git", "Docker", "AWS", "Node.js"
  ];

  const highlights = [
    {
      icon: Code,
      title: "Código Limpo",
      description: "Desenvolvimento seguindo as melhores práticas e padrões de mercado"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Soluções otimizadas para máxima velocidade e eficiência"
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalho em equipe e comunicação transparente em todos os projetos"
    },
    {
      icon: Trophy,
      title: "Resultados",
      description: "Foco em entregar valor real para o negócio dos clientes"
    }
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">
              Sobre <span className="text-gradient">Mim</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Sou um desenvolvedor fullstack apaixonado por criar soluções digitais que fazem a diferença. 
              Com mais de 15 anos de experiência, já desenvolvi dezenas de projetos para empresas de 
              diversos segmentos.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Minha abordagem combina expertise técnica com visão estratégica, garantindo que cada 
              projeto não apenas funcione perfeitamente, mas também gere resultados reais para o negócio.
            </p>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Anos de experiência</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projetos entregues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação dos clientes</div>
              </div>
            </div>
          </div>

          {/* Highlights Cards */}
          <div className="grid gap-6 animate-slide-up">
            {highlights.map((highlight, index) => (
              <Card key={index} className="card-hover border-0 shadow-[var(--shadow-soft)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <highlight.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{highlight.title}</h4>
                      <p className="text-muted-foreground">{highlight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}