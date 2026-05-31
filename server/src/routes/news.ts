import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware';
import { asyncHandler, newsCreate, newsUpdate } from '../validation';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category: String(category) } : {};
  const news = await prisma.news.findMany({ where, orderBy: { createdAt: 'desc' } });
  res.json(news);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const item = await prisma.news.findUnique({ where: { id: Number(req.params.id) } });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}));

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const data = newsCreate.parse(req.body);
  const item = await prisma.news.create({ data });
  res.status(201).json(item);
}));

router.patch('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const data = newsUpdate.parse(req.body);
  const item = await prisma.news.update({ where: { id: Number(req.params.id) }, data });
  res.json(item);
}));

router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.news.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

export default router;
