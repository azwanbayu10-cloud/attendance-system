import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
export async function authenticate(req, res, next) {
  try { const token = req.headers.authorization?.replace('Bearer ', ''); if (!token) return res.status(401).json({ message: 'Missing token' }); const payload = jwt.verify(token, env.jwtSecret); const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) }, include: { employee: true } }); if (!user?.isActive) return res.status(401).json({ message: 'Unauthorized' }); req.user = user; next(); } catch { res.status(401).json({ message: 'Invalid token' }); }
}
export const authorize = (...roles) => (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Forbidden' });
