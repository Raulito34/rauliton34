import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware';
import { asyncHandler, exhibitionCreate, exhibitionUpdate } from '../validation';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const { status } = req.query;
  const allowedStatuses = ['current', 'upcoming', 'past'];
  const where = typeof status === 'string' && allowedStatuses.includes(status) ? { status } : {};
  const exhibitions = await prisma.exhibition.findMany({ where, orderBy: { startDate: 'desc' } });
  res.json(exhibitions);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const exhibition = await prisma.exhibition.findUnique({ where: { id: Number(req.params.id) } });
  if (!exhibition) return res.status(404).json({ error: 'Not found' });
  res.json(exhibition);
}));

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const data = exhibitionCreate.parse(req.body);
  const exhibition = await prisma.exhibition.create({
    data: { ...data, status: data.status || 'upcoming', details: data.details || '' },
  });
  res.status(201).json(exhibition);
}));

router.patch('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const data = exhibitionUpdate.parse(req.body);
  const exhibition = await prisma.exhibition.update({ where: { id: Number(req.params.id) }, data });
  res.json(exhibition);
}));

router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.exhibition.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

export default router;
