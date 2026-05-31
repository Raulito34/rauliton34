import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware';
import { asyncHandler, pricingCreate } from '../validation';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const pricing = await prisma.rentalPricing.findMany({ orderBy: { id: 'asc' } });
  res.json(pricing);
}));

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const data = pricingCreate.parse(req.body);
  const pricing = await prisma.rentalPricing.create({ data: { ...data, week4: data.week4 || 0 } });
  res.status(201).json(pricing);
}));

export default router;
