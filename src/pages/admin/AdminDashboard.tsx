import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, BarChart2, Users, Wrench } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0
  });
  
  useEffect(() => {
    // Check if user is logged in and is admin
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'ADMIN') {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
      });
      navigate('/dashboard');
      return;
    }
    
    setUser(parsedUser);
    
    // Fetch stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar estatísticas');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar estatísticas",
          description: "Não foi possível carregar os dados do dashboard.",
        });
      }
    };
    
    fetchStats();
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
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Bem-vindo(a), {user?.name || 'Administrador'}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Usuários Registrados</CardTitle>
              <CardDescription>Total de usuários na plataforma</CardDescription>
            </div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Ferramentas Disponíveis</CardTitle>
              <CardDescription>Total de ferramentas cadastradas</CardDescription>
            </div>
            <Wrench className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <CardDescription>Total de acessos este mês</CardDescription>
            </div>
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">--</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="produtos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="produtos">
            <Wrench className="mr-2 h-4 w-4" />
            Gerenciar Ferramentas
          </TabsTrigger>
          <TabsTrigger value="usuarios">
            <Users className="mr-2 h-4 w-4" />
            Gerenciar Usuários
          </TabsTrigger>
        </TabsList>
        <TabsContent value="produtos" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Ferramentas</h2>
            <Button onClick={() => navigate('/admin/products/new')}>
              Nova Ferramenta
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Aqui você poderá gerenciar todas as ferramentas disponíveis na plataforma.
                </p>
                <Button className="mt-4" onClick={() => navigate('/admin/products')}>
                  Ver Todas as Ferramentas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usuarios" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Usuários</h2>
            <Button onClick={() => navigate('/admin/users/new')}>
              Novo Usuário
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Aqui você poderá gerenciar todos os usuários da plataforma.
                </p>
                <Button className="mt-4" onClick={() => navigate('/admin/users')}>
                  Ver Todos os Usuários
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 