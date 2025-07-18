import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LogOut, BarChart2, Users, Wrench, Plus, TrendingUp, Activity, Settings, Eye } from "lucide-react";

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
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Admin</h1>
                <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                  Bem-vindo, <span className="font-medium">{user?.name || 'Administrador'}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">ADMIN</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Site
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Usuários Totais</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <p className="text-blue-100 text-xs mt-1">+12% este mês</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Ferramentas</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                  <p className="text-green-100 text-xs mt-1">+3 esta semana</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Wrench className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Visualizações</p>
                  <p className="text-3xl font-bold">2.4k</p>
                  <p className="text-purple-100 text-xs mt-1">+18% este mês</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <BarChart2 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Atividade</p>
                  <p className="text-3xl font-bold">98%</p>
                  <p className="text-orange-100 text-xs mt-1">Sistema online</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white dark:bg-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Wrench className="mr-2 h-5 w-5 text-primary" />
                    Gerenciar Ferramentas
                  </CardTitle>
                  <CardDescription>Adicione, edite ou remova ferramentas da plataforma</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate('/admin/products/new')} className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Ferramenta
                </Button>
                <Button variant="outline" onClick={() => navigate('/admin/products')} className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Todas
                </Button>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Ferramentas ativas:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{stats.totalProducts}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white dark:bg-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Gerenciar Usuários
                  </CardTitle>
                  <CardDescription>Visualize e gerencie usuários da plataforma</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate('/admin/users/new')} className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
                <Button variant="outline" onClick={() => navigate('/admin/users')} className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Todos
                </Button>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Usuários registrados:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.totalUsers}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0 bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Atividade Recente
            </CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova ferramenta adicionada</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Há 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo usuário registrado</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Há 5 horas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Settings className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Configurações atualizadas</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ontem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 