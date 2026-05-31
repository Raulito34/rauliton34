import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware';
import { asyncHandler, siteImageCreate, siteImageUpdate } from '../validation';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const images = await prisma.siteImage.findMany({ orderBy: { id: 'asc' } });
  res.json(images);
}));

router.patch('/:key', requireAdmin, asyncHandler(async (req, res) => {
  const parsed = siteImageUpdate.parse(req.body);
  const data: Record<string, string> = {};
  if (parsed.imageUrl !== undefined) data.imageUrl = parsed.imageUrl;
  if (parsed.label !== undefined) data.label = parsed.label;
  const image = await prisma.siteImage.update({ where: { key: String(req.params.key) }, data });
  res.json(image);
}));

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const data = siteImageCreate.parse(req.body);
  const image = await prisma.siteImage.create({ data: { ...data, label: data.label || '' } });
  res.status(201).json(image);
}));

router.delete('/:key', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.siteImage.delete({ where: { key: String(req.params.key) } });
  res.json({ success: true });
}));

export default router;
