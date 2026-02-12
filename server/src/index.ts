import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ['http://localhost:3000'];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

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

app.get('/api/rentals', async (_req, res) => {
  const rentals = await prisma.rental.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(rentals);
});

app.patch('/api/rentals/:id', async (req, res) => {
  const { status } = req.body;
  const rental = await prisma.rental.update({
    where: { id: Number(req.params.id) },
    data: { status },
  });
  res.json(rental);
});

app.delete('/api/rentals/:id', async (req, res) => {
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
