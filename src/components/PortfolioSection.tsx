import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PortfolioSection() {
  const projects = [
    {
      title: "E-commerce Completo",
      description: "Plataforma de vendas online com sistema de pagamento integrado, gestão de estoque e painel administrativo completo.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["Laravel", "Vue.js", "MySQL", "Stripe"],
      type: "Web Application",
      status: "Concluído"
    },
    {
      title: "App de Produtividade",
      description: "Aplicativo mobile para gerenciamento de tarefas e projetos com sincronização em tempo real e interface intuitiva.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["React Native", "Firebase", "TypeScript"],
      type: "Mobile App",
      status: "Concluído"
    },
    {
      title: "Landing Page Corporativa",
      description: "Página institucional responsiva com foco em conversão e otimização para motores de busca (SEO).",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["React", "Tailwind CSS", "Next.js", "SEO"],
      type: "Landing Page",
      status: "Concluído"
    },
    {
      title: "Sistema de Gestão ERP",
      description: "Sistema completo para gestão empresarial com módulos de vendas, estoque, financeiro e relatórios.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["PHP", "Laravel", "MySQL", "Vue.js"],
      type: "Web System",
      status: "Concluído"
    },
    {
      title: "App de Delivery",
      description: "Aplicativo para entrega de comida com sistema de pedidos, pagamentos e rastreamento em tempo real.",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      type: "Mobile App",
      status: "Concluído"
    },
    {
      title: "Dashboard Analytics",
      description: "Painel de controle com gráficos interativos e métricas em tempo real para análise de dados empresariais.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["React", "Chart.js", "PostgreSQL", "API REST"],
      type: "Dashboard",
      status: "Concluído"
    },
    {
      title: "Sistema de Reservas",
      description: "Plataforma para agendamento de serviços com calendário integrado, notificações automáticas e gestão de clientes.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      type: "Web Application",
      status: "Concluído"
    },
    {
      title: "App de Fitness",
      description: "Aplicativo para acompanhamento de exercícios com planos personalizados, métricas de progresso e comunidade.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["Flutter", "Firebase", "Dart", "Health Kit"],
      type: "Mobile App",
      status: "Concluído"
    },
    {
      title: "Portal Imobiliário",
      description: "Plataforma para compra e venda de imóveis com busca avançada, tour virtual e sistema de favoritos.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["Angular", "Spring Boot", "MySQL", "AWS S3"],
      type: "Web Platform",
      status: "Concluído"
    },
    {
      title: "Sistema de CRM",
      description: "Plataforma de relacionamento com cliente incluindo pipeline de vendas, automação de marketing e relatórios.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Redis"],
      type: "Web System",
      status: "Concluído"
    }
  ];

  const handleViewProject = (projectTitle: string) => {
    const message = `Olá! Gostaria de saber mais sobre o projeto "${projectTitle}".`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Meu <span className="text-gradient">Portfólio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi para clientes de diferentes segmentos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="card-hover border-0 shadow-[var(--shadow-soft)] bg-background overflow-hidden animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {project.type}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-6">
            Quer ver mais projetos ou discutir o seu?
          </p>
          <Button
            size="lg"
            onClick={() => handleViewProject("um novo projeto")}
            className="btn-primary"
          >
            Vamos conversar sobre seu projeto
          </Button>
        </div>
      </div>
    </section>
  );
}