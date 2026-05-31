import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin, formLimiter, lookupLimiter } from '../middleware';
import {
  asyncHandler, rentalCreate, rentalLookup, rentalReschedule, rentalCancel, rentalStatusUpdate,
} from '../validation';

const router = Router();

// Public: submit a rental application
router.post('/', formLimiter, asyncHandler(async (req, res) => {
  const data = rentalCreate.parse(req.body);
  const rental = await prisma.rental.create({
    data: { ...data, organization: data.organization || '', message: data.message || '' },
  });
  res.status(201).json(rental);
}));

// Public: only booking status for availability calendar (no personal info)
router.get('/status', asyncHandler(async (_req, res) => {
  const rentals = await prisma.rental.findMany({
    select: { id: true, spaceName: true, startDate: true, endDate: true, status: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(rentals);
}));

// User: lookup own bookings by name + email (rate-limited against enumeration)
router.post('/lookup', lookupLimiter, asyncHandler(async (req, res) => {
  const { applicantName, email } = rentalLookup.parse(req.body);
  const rentals = await prisma.rental.findMany({ where: { applicantName, email }, orderBy: { createdAt: 'desc' } });
  res.json(rentals);
}));

// User: cancel own booking (verified by email)
router.post('/:id/cancel', lookupLimiter, asyncHandler(async (req, res) => {
  const { email } = rentalCancel.parse(req.body);
  const rental = await prisma.rental.findUnique({ where: { id: Number(req.params.id) } });
  if (!rental) return res.status(404).json({ error: 'Not found' });
  if (rental.email !== email) return res.status(403).json({ error: 'Email mismatch' });
  const updated = await prisma.rental.update({ where: { id: rental.id }, data: { status: 'cancelled' } });
  res.json(updated);
}));

// User: reschedule own booking (verified by email)
router.post('/:id/reschedule', lookupLimiter, asyncHandler(async (req, res) => {
  const { email, startDate, endDate } = rentalReschedule.parse(req.body);
  const rental = await prisma.rental.findUnique({ where: { id: Number(req.params.id) } });
  if (!rental) return res.status(404).json({ error: 'Not found' });
  if (rental.email !== email) return res.status(403).json({ error: 'Email mismatch' });
  const updated = await prisma.rental.update({ where: { id: rental.id }, data: { startDate, endDate, status: 'pending' } });
  res.json(updated);
}));

// Admin: full rental details
router.get('/', requireAdmin, asyncHandler(async (_req, res) => {
  const rentals = await prisma.rental.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(rentals);
}));

router.patch('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const { status } = rentalStatusUpdate.parse(req.body);
  const rental = await prisma.rental.update({ where: { id: Number(req.params.id) }, data: { status } });
  res.json(rental);
}));

router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.rental.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

export default router;
