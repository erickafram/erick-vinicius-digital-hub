import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PortfolioSection() {
  const projects = [
    {
      title: "Infovisa",
      description: "Sistema de Gestão de Processos de Vigilância Sanitária com controle completo de documentos e processos administrativos.",
      image: "https://infovisa.gurupi.to.gov.br/visamunicipal/assets/img/logo.png",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap"],
      type: "Web System",
      status: "Concluído"
    },
    {
      title: "Portal Convictus",
      description: "Site de entretenimento com conteúdo dinâmico, sistema de usuários e área administrativa completa.",
      image: "https://portalconvictos.com.br/wp-content/uploads/2025/07/1.png",
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
      type: "Web Platform",
      status: "Concluído"
    },
    {
      title: "O Buxixo Gospel",
      description: "Site de entretenimento gospel com notícias, eventos e conteúdo religioso para a comunidade cristã.",
      image: "https://www.obuxixogospel.com.br/wp-content/uploads/2024/02/lOGO-12.png",
      technologies: ["WordPress", "PHP", "MySQL", "CSS"],
      type: "Web Platform",
      status: "Concluído"
    },
    {
      title: "Portal Vigilância Sanitária Tocantins",
      description: "Site institucional e sistema de gestão de documentos para órgão público com área restrita e controle de acesso.",
      image: "https://vigilancia-to.com.br/sitevisa/assets/img/logo.png",
      technologies: ["PHP", "Laravel", "MySQL", "Vue.js"],
      type: "Web System",
      status: "Concluído"
    },
    {
      title: "Plataforma de Cassino Top",
      description: "Plataforma completa de cassino online com jogos, sistema de pagamentos e painel administrativo avançado.",
      image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      type: "Web Platform",
      status: "Concluído"
    },
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
      title: "Sistema de Gestão ERP",
      description: "Sistema completo para gestão empresarial com módulos de vendas, estoque, financeiro e relatórios.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center&auto=format&q=80",
      technologies: ["PHP", "Laravel", "MySQL", "Vue.js"],
      type: "Web System",
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
    }
  ];

  const handleViewProject = (projectTitle: string) => {
    const message = `Olá! Gostaria de saber mais sobre o projeto "${projectTitle}".`;
    const whatsappUrl = `https://wa.me/63992410056?text=${encodeURIComponent(message)}`;
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
              className="card-hover border-0 shadow-lg hover:shadow-2xl bg-background overflow-hidden animate-slide-up group transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 shadow-inner">
                <div className="aspect-[4/3] w-full relative">
                  <img
                    src={project.image}
                    alt={`Screenshot do projeto ${project.title}`}
                    className="w-full h-full object-contain bg-white transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x300/f1f5f9/64748b?text=${encodeURIComponent(project.title)}`;
                      target.className = "w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110";
                    }}
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm">
                    {project.type}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-base font-semibold">{project.title}</h3>
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