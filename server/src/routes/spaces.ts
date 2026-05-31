import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../db';
import { requireAdmin } from '../middleware';
import { asyncHandler, spaceCreate, spaceUpdate } from '../validation';

const router = Router();

// Safely parse the JSON-stringified features column; never throw on bad data.
function safeParseFeatures(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Normalize features (array | string) → JSON string for the DB column.
function featuresToString(features: string | string[]): string {
  return typeof features === 'string' ? features : JSON.stringify(features);
}

router.get('/', asyncHandler(async (_req, res) => {
  const spaces = await prisma.space.findMany({ orderBy: { id: 'asc' } });
  res.json(spaces.map((s) => ({ ...s, features: safeParseFeatures(s.features) })));
}));

router.get('/:floor', asyncHandler(async (req, res) => {
  const space = await prisma.space.findUnique({ where: { floor: String(req.params.floor) } });
  if (!space) return res.status(404).json({ error: 'Not found' });
  res.json({ ...space, features: safeParseFeatures(space.features) });
}));

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const { features, details, ...rest } = spaceCreate.parse(req.body);
  const space = await prisma.space.create({
    data: { ...rest, details: details || '', features: featuresToString(features) },
  });
  res.status(201).json(space);
}));

router.patch('/:floor', requireAdmin, asyncHandler(async (req, res) => {
  const { features, ...rest } = spaceUpdate.parse(req.body);
  const data: Prisma.SpaceUpdateInput = { ...rest };
  if (features !== undefined) data.features = featuresToString(features);
  const space = await prisma.space.update({ where: { floor: String(req.params.floor) }, data });
  res.json(space);
}));

export default router;
