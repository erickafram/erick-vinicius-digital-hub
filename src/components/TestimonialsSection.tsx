import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Diretora de Marketing",
      company: "TechCorp",
      content: "Erick desenvolveu nossa landing page e o resultado foi excepcional. Tivemos um aumento de 300% nas conversões em apenas 2 meses!",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "CEO",
      company: "StartupBrasil",
      content: "Profissional extremamente competente e pontual. Nosso app Android foi entregue antes do prazo e com qualidade superior ao esperado.",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Gerente de TI",
      company: "LogisticaMax",
      content: "O sistema PHP que o Erick desenvolveu revolucionou nossa operação. Código limpo, documentação perfeita e suporte excelente.",
      rating: 5,
      avatar: "AC"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            O que dizem os <span className="text-gradient">Clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de clientes satisfeitos que confiaram em nossos serviços
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="card-hover border-0 shadow-[var(--shadow-soft)] bg-background/80 backdrop-blur-sm animate-slide-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-primary-foreground" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-4">
            Junte-se aos nossos clientes satisfeitos
          </p>
          <div className="flex justify-center items-center gap-4">
            <div className="flex -space-x-2">
              {testimonials.map((_, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center"
                >
                  <span className="text-primary-foreground text-xs font-medium">
                    {testimonials[index].avatar}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">50+</span> projetos entregues com sucesso
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}