import type express from 'express';
import rateLimit from 'express-rate-limit';

// Required config — fail fast instead of falling back to a guessable default.
export const ADMIN_CODE = process.env.ADMIN_CODE;
if (!ADMIN_CODE) {
  console.error('FATAL: ADMIN_CODE environment variable is required. Refusing to start.');
  process.exit(1);
}

export const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/+$/, ''))
  : ['http://localhost:3000'];

export function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const code = req.headers['x-admin-code'];
  if (code !== ADMIN_CODE) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// --- Rate limiters ---
export const adminVerifyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
export const formLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
export const lookupLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
export const readLimiter = rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });
