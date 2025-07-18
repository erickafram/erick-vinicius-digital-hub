import express from 'express';
import cors from 'cors';
import { prisma } from './src/lib/db';
import { 
  loginHandler, 
  registerHandler, 
  getProductsHandler,
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getStatsHandler 
} from './src/lib/api-handlers';
import { getUserFromToken, checkIsAdmin } from './src/lib/auth';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Autenticação necessária' });
    }
    
    const user = await getUserFromToken(token);
    
    if (!user) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
    
    // Add user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Erro de autenticação' });
  }
};

// Admin middleware
const adminMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const user = (req as any).user;
  
  if (!user || !checkIsAdmin(user.role)) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  
  next();
};

// Auth Routes
app.post('/api/login', async (req, res) => {
  const result = await loginHandler(req.body);
  res.status(result.status).json(result.body);
});

app.post('/api/register', async (req, res) => {
  const result = await registerHandler(req.body);
  res.status(result.status).json(result.body);
});

// Public Product Routes
app.get('/api/products', async (req, res) => {
  const result = await getProductsHandler();
  res.status(result.status).json(result.body);
});

// Protected Routes (require authentication)
app.get('/api/me', authMiddleware, async (req, res) => {
  res.status(200).json({ user: (req as any).user });
});

// Admin Routes (require admin role)
app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
  const result = await getStatsHandler();
  res.status(result.status).json(result.body);
});

app.get('/api/admin/products', authMiddleware, adminMiddleware, async (req, res) => {
  const result = await getAllProductsHandler();
  res.status(result.status).json(result.body);
});

app.post('/api/admin/products', authMiddleware, adminMiddleware, async (req, res) => {
  const result = await createProductHandler(req.body);
  res.status(result.status).json(result.body);
});

app.put('/api/admin/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const result = await updateProductHandler(req.params.id, req.body);
  res.status(result.status).json(result.body);
});

app.delete('/api/admin/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const result = await deleteProductHandler(req.params.id);
  res.status(result.status).json(result.body);
});

// User management routes
app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

app.post('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
  const result = await registerHandler(req.body);
  
  if (result.status === 201 && req.body.role === 'ADMIN') {
    // Update role to ADMIN if specified
    try {
      await prisma.user.update({
        where: { email: req.body.email },
        data: { role: 'ADMIN' }
      });
      
      // Fetch updated user
      const updatedUser = await prisma.user.findUnique({
        where: { email: req.body.email },
        select: { id: true, name: true, email: true, role: true }
      });
      
      result.body.user = updatedUser;
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  }
  
  res.status(result.status).json(result.body);
});

app.put('/api/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    
    const updateData: any = {
      name,
      email,
      role
    };
    
    // Only update password if provided
    if (password) {
      const { hashPassword } = await import('./src/lib/auth');
      updateData.password = await hashPassword(password);
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

app.delete('/api/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prevent deleting the current admin user
    const currentUser = (req as any).user;
    if (currentUser.id === id) {
      return res.status(400).json({ message: 'Você não pode excluir sua própria conta' });
    }
    
    await prisma.user.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

// Seed initial admin user if not exists
async function seedAdminUser() {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (!adminExists) {
      await registerHandler({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123'
      });
      
      // Update the role to ADMIN
      await prisma.user.update({
        where: { email: 'admin@example.com' },
        data: { role: 'ADMIN' }
      });
      
      console.log('Admin user created: admin@example.com / admin123');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

seedAdminUser(); 