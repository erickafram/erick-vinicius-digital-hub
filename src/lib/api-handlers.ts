import { prisma } from './db';
import { hashPassword, verifyPassword, generateToken } from './auth';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Type definitions
type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type ProductData = {
  name: string;
  description: string;
  url: string;
  imageUrl?: string | null;
  category: string;
  isActive: boolean;
};

export async function loginHandler(data: LoginCredentials) {
  try {
    const { email, password } = data;
    
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return {
        status: 401,
        body: { message: "Email ou senha inválidos" }
      };
    }
    
    const isValid = await verifyPassword(password, user.password);
    
    if (!isValid) {
      return {
        status: 401,
        body: { message: "Email ou senha inválidos" }
      };
    }
    
    // Create a safe user object without the password
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    const token = generateToken(user.id, user.role);
    
    return {
      status: 200,
      body: { 
        message: "Login realizado com sucesso",
        user: safeUser,
        token
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      status: 500,
      body: { message: "Erro ao processar login" }
    };
  }
}

export async function registerHandler(data: RegisterData) {
  try {
    const { name, email, password } = data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return {
        status: 409,
        body: { message: "Este email já está em uso" }
      };
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    });
    
    // Create a safe user object without the password
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    return {
      status: 201,
      body: {
        message: "Cadastro realizado com sucesso",
        user: safeUser
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      status: 500,
      body: { message: "Erro ao processar registro" }
    };
  }
}

export async function getProductsHandler() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return {
      status: 200,
      body: products
    };
  } catch (error) {
    console.error('Get products error:', error);
    return {
      status: 500,
      body: { message: "Erro ao buscar produtos" }
    };
  }
}

export async function getAllProductsHandler() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return {
      status: 200,
      body: products
    };
  } catch (error) {
    console.error('Get all products error:', error);
    return {
      status: 500,
      body: { message: "Erro ao buscar produtos" }
    };
  }
}

export async function createProductHandler(data: ProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        imageUrl: data.imageUrl || null,
        category: data.category,
        isActive: data.isActive
      }
    });
    
    return {
      status: 201,
      body: {
        message: "Produto criado com sucesso",
        product
      }
    };
  } catch (error) {
    console.error('Create product error:', error);
    return {
      status: 500,
      body: { message: "Erro ao criar produto" }
    };
  }
}

export async function updateProductHandler(id: string, data: ProductData) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        imageUrl: data.imageUrl || null,
        category: data.category,
        isActive: data.isActive
      }
    });
    
    return {
      status: 200,
      body: {
        message: "Produto atualizado com sucesso",
        product
      }
    };
  } catch (error) {
    console.error('Update product error:', error);
    
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          status: 404,
          body: { message: "Produto não encontrado" }
        };
      }
    }
    
    return {
      status: 500,
      body: { message: "Erro ao atualizar produto" }
    };
  }
}

export async function deleteProductHandler(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    
    return {
      status: 200,
      body: { message: "Produto removido com sucesso" }
    };
  } catch (error) {
    console.error('Delete product error:', error);
    
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          status: 404,
          body: { message: "Produto não encontrado" }
        };
      }
    }
    
    return {
      status: 500,
      body: { message: "Erro ao remover produto" }
    };
  }
}

export async function getStatsHandler() {
  try {
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    
    return {
      status: 200,
      body: {
        totalUsers,
        totalProducts
      }
    };
  } catch (error) {
    console.error('Get stats error:', error);
    return {
      status: 500,
      body: { message: "Erro ao buscar estatísticas" }
    };
  }
} 