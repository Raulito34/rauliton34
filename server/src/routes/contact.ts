import { Router } from 'express';
import { prisma } from '../db';
import { formLimiter } from '../middleware';
import { asyncHandler, contactCreate } from '../validation';

const router = Router();

router.post('/', formLimiter, asyncHandler(async (req, res) => {
  const data = contactCreate.parse(req.body);
  const contact = await prisma.contact.create({ data: { ...data, phone: data.phone || '' } });
  res.status(201).json(contact);
}));

export default router;
