import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Wrench } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Define product type
interface Product {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  category: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("perfil");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar produtos');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar ferramentas",
          description: "Não foi possível carregar a lista de ferramentas.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logout realizado com sucesso!",
      description: "Você saiu do sistema.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo(a) de volta, {user?.name || 'Usuário'}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="perfil">
            <User className="mr-2 h-4 w-4" />
            Meu Perfil
          </TabsTrigger>
          <TabsTrigger value="ferramentas">
            <Wrench className="mr-2 h-4 w-4" />
            Ferramentas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Nome completo</p>
                  <p className="text-foreground/80">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-foreground/80">{user?.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium mb-2">Ações da conta</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Alterar senha
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ferramentas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Show loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-[200px] bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 w-3/4 bg-muted rounded"></div>
                    <div className="h-4 w-full bg-muted rounded mt-2"></div>
                  </CardHeader>
                  <CardFooter>
                    <div className="h-10 w-full bg-muted rounded"></div>
                  </CardFooter>
                </Card>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id}>
                  {product.imageUrl && (
                    <div className="relative h-[200px] overflow-hidden rounded-t-lg">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-12"></div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href={product.url} target="_blank" rel="noopener noreferrer">
                        Acessar Ferramenta
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-2xl font-semibold mb-2">Nenhuma ferramenta disponível</h3>
                <p className="text-muted-foreground">
                  Novas ferramentas serão adicionadas em breve.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 