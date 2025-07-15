import { prisma } from './db';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

export function generateToken(userId: string, role: string) {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
  } catch (error) {
    return null;
  }
}

export async function getUserFromToken(token: string) {
  const payload = verifyToken(token);
  
  if (!payload) return null;
  
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, role: true }
  });
  
  return user;
}

export function checkIsAdmin(role: string) {
  return role === 'ADMIN';
} 