import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, Globe, Database, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description: "Sistemas web modernos e escaláveis",
      features: ["PHP", "Laravel", "Python", "Django", "APIs RESTful"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Database,
      title: "Backend & APIs",
      description: "Soluções robustas para servidor e integração",
      features: ["Node.js", "C#", ".NET", "PostgreSQL", "MongoDB"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Smartphone,
      title: "Aplicativos Mobile",
      description: "Apps nativos e híbridos para Android e iOS",
      features: ["React Native", "Kotlin", "Flutter", "Android Studio"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Globe,
      title: "Frontend & Landing Pages",
      description: "Interfaces modernas e páginas de alta conversão",
      features: ["React", "TypeScript", "Tailwind", "SEO", "Analytics"],
      color: "from-orange-500 to-red-600"
    }
  ];

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Meus <span className="text-gradient">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em diversas tecnologias para seus projetos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="card-hover border-0 shadow-[var(--shadow-soft)] bg-background/80 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color}`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    onClick={handleWhatsAppClick}
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-6">
            Precisa de algo específico? Vamos conversar sobre suas necessidades.
          </p>
          <Button 
            size="lg"
            onClick={handleWhatsAppClick}
            className="btn-primary"
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}