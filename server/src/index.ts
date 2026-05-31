import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { allowedOrigins, readLimiter } from './middleware';
import exhibitionsRouter from './routes/exhibitions';
import spacesRouter from './routes/spaces';
import pricingRouter from './routes/pricing';
import rentalsRouter from './routes/rentals';
import newsRouter from './routes/news';
import siteImagesRouter from './routes/siteImages';
import contactRouter from './routes/contact';
import adminRouter from './routes/admin';

const app = express();
const PORT = process.env.PORT || 4000;

// --- Security & parsing ---
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('tiny'));
app.use('/api', readLimiter);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// --- Routes ---
app.use('/api/admin', adminRouter);
app.use('/api/exhibitions', exhibitionsRouter);
app.use('/api/spaces', spacesRouter);
app.use('/api/pricing', pricingRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/news', newsRouter);
app.use('/api/site-images', siteImagesRouter);
app.use('/api/contact', contactRouter);

// --- Global error handler (must be last) ---
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation failed', issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    if (err.code === 'P2002') return res.status(409).json({ error: 'Already exists' });
    return res.status(400).json({ error: 'Database request error' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
