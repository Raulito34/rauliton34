import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/+$/, ''))
  : ['http://localhost:3000'];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10mb' }));

// --- Admin auth middleware ---
const ADMIN_CODE = process.env.ADMIN_CODE || 'admin1234';

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const code = req.headers['x-admin-code'];
  if (code !== ADMIN_CODE) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Admin code verification endpoint
app.post('/api/admin/verify', (req, res) => {
  const { code } = req.body;
  if (code === ADMIN_CODE) {
    return res.json({ ok: true });
  }
  res.status(401).json({ ok: false, error: 'Invalid code' });
});

// --- Exhibitions ---
app.get('/api/exhibitions', async (req, res) => {
  const { status } = req.query;
  const where = status && status !== 'all' ? { status: String(status) } : {};
  const exhibitions = await prisma.exhibition.findMany({
    where,
    orderBy: { startDate: 'desc' },
  });
  res.json(exhibitions);
});

app.get('/api/exhibitions/:id', async (req, res) => {
  const exhibition = await prisma.exhibition.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!exhibition) return res.status(404).json({ error: 'Not found' });
  res.json(exhibition);
});

app.post('/api/exhibitions', requireAdmin, async (req, res) => {
  const { title, artist, description, startDate, endDate, floor, imageUrl, status, details } = req.body;
  const exhibition = await prisma.exhibition.create({
    data: { title, artist, description, startDate, endDate, floor, imageUrl, status: status || 'upcoming', details: details || '' },
  });
  res.status(201).json(exhibition);
});

app.patch('/api/exhibitions/:id', requireAdmin, async (req, res) => {
  const exhibition = await prisma.exhibition.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(exhibition);
});

app.delete('/api/exhibitions/:id', requireAdmin, async (req, res) => {
  await prisma.exhibition.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ success: true });
});

// --- Spaces ---
app.get('/api/spaces', async (_req, res) => {
  const spaces = await prisma.space.findMany({
    orderBy: { id: 'asc' },
  });
  const parsed = spaces.map((s) => ({
    ...s,
    features: JSON.parse(s.features),
  }));
  res.json(parsed);
});

app.get('/api/spaces/:floor', async (req, res) => {
  const space = await prisma.space.findUnique({
    where: { floor: req.params.floor },
  });
  if (!space) return res.status(404).json({ error: 'Not found' });
  res.json({ ...space, features: JSON.parse(space.features) });
});

// --- Rental Pricing ---
app.get('/api/pricing', async (_req, res) => {
  const pricing = await prisma.rentalPricing.findMany({
    orderBy: { id: 'asc' },
  });
  res.json(pricing);
});

// --- Rental Applications ---
app.post('/api/rentals', async (req, res) => {
  const { spaceName, applicantName, organization, email, phone, startDate, endDate, purpose, message } = req.body;
  const rental = await prisma.rental.create({
    data: { spaceName, applicantName, organization, email, phone, startDate, endDate, purpose, message },
  });
  res.status(201).json(rental);
});

// Public: only booking status for availability calendar (no personal info)
app.get('/api/rentals/status', async (_req, res) => {
  const rentals = await prisma.rental.findMany({
    select: { id: true, spaceName: true, startDate: true, endDate: true, status: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(rentals);
});

// Admin: full rental details
app.get('/api/rentals', requireAdmin, async (_req, res) => {
  const rentals = await prisma.rental.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(rentals);
});

app.patch('/api/rentals/:id', requireAdmin, async (req, res) => {
  const { status } = req.body;
  const rental = await prisma.rental.update({
    where: { id: Number(req.params.id) },
    data: { status },
  });
  res.json(rental);
});

app.delete('/api/rentals/:id', requireAdmin, async (req, res) => {
  await prisma.rental.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ success: true });
});

// --- News ---
app.get('/api/news', async (req, res) => {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category: String(category) } : {};
  const news = await prisma.news.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  res.json(news);
});

app.get('/api/news/:id', async (req, res) => {
  const item = await prisma.news.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/news', requireAdmin, async (req, res) => {
  const { title, content, category } = req.body;
  const item = await prisma.news.create({
    data: { title, content, category },
  });
  res.status(201).json(item);
});

app.patch('/api/news/:id', requireAdmin, async (req, res) => {
  const item = await prisma.news.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(item);
});

app.delete('/api/news/:id', requireAdmin, async (req, res) => {
  await prisma.news.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ success: true });
});

// --- Contact ---
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const contact = await prisma.contact.create({
    data: { name, email, phone, subject, message },
  });
  res.status(201).json(contact);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
