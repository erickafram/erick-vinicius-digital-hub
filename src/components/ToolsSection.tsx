import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Wrench } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string | null;
  category: string;
  isActive: boolean;
}

export default function ToolsSection() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setTools(data);
      }
    } catch (error) {
      console.error('Erro ao carregar ferramentas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: "all", label: "Todas" },
    { value: "design", label: "Design" },
    { value: "desenvolvimento", label: "Desenvolvimento" },
    { value: "marketing", label: "Marketing" },
    { value: "produtividade", label: "Produtividade" },
    { value: "analytics", label: "Analytics" },
    { value: "comunicacao", label: "Comunicação" },
    { value: "outros", label: "Outros" }
  ];

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  if (tools.length === 0 && !isLoading) {
    return null; // Não exibe a seção se não há ferramentas
  }

  return (
    <section id="tools" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Ferramentas <span className="text-gradient">Recomendadas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra as melhores ferramentas para impulsionar seus projetos e aumentar sua produtividade
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="transition-all duration-200"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <Card
                key={tool.id}
                className="card-hover border-0 shadow-lg hover:shadow-2xl bg-background overflow-hidden animate-slide-up group transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 shadow-inner">
                  <div className="aspect-[4/3] w-full relative">
                    <img
                      src={tool.imageUrl || `https://via.placeholder.com/400x300/f1f5f9/64748b?text=${encodeURIComponent(tool.name)}`}
                      alt={`Logo da ferramenta ${tool.name}`}
                      className="w-full h-full object-contain bg-white transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/f1f5f9/64748b?text=${encodeURIComponent(tool.name)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm capitalize">
                      {tool.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Wrench className="mr-2 h-4 w-4 text-primary" />
                      {tool.name}
                    </CardTitle>
                  </CardHeader>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  <Button
                    onClick={() => window.open(tool.url, '_blank')}
                    className="w-full btn-primary"
                    size="sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Acessar Ferramenta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredTools.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma ferramenta encontrada para esta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}