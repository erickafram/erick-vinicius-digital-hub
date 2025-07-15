import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ecommerceImg from "@/assets/project-ecommerce.jpg";
import mobileImg from "@/assets/project-mobile.jpg";
import landingImg from "@/assets/project-landing.jpg";

export default function PortfolioSection() {
  const projects = [
    {
      title: "E-commerce Completo",
      description: "Plataforma de vendas online com sistema de pagamento integrado, gestão de estoque e painel administrativo.",
      image: ecommerceImg,
      technologies: ["Laravel", "Vue.js", "MySQL", "Stripe"],
      type: "Web Application",
      status: "Concluído"
    },
    {
      title: "App de Produtividade",
      description: "Aplicativo mobile para gerenciamento de tarefas e projetos com sincronização em tempo real.",
      image: mobileImg,
      technologies: ["Android", "Kotlin", "Firebase", "Material Design"],
      type: "Mobile App",
      status: "Concluído"
    },
    {
      title: "Landing Page Corporativa",
      description: "Página institucional responsiva com foco em conversão e otimização para motores de busca.",
      image: landingImg,
      technologies: ["React", "Tailwind CSS", "Next.js", "SEO"],
      type: "Landing Page",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProject(project.title)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Ver Mais
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProject(project.title)}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
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