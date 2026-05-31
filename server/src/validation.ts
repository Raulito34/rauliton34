import { z } from 'zod';
import type express from 'express';

/**
 * Zod schemas for every write endpoint.
 * Parsing with these schemas does double duty:
 *   1. Input validation (types, lengths, formats, enums) → rejects bad data with 400.
 *   2. Mass-assignment protection — unknown keys are stripped by default, so the
 *      parsed output is a safe whitelist to hand straight to Prisma `data`.
 */

const str = (max: number) => z.string().trim().min(1).max(max);
const optStr = (max: number) => z.string().trim().max(max).optional();
// Image URLs may be base64 data URLs, so allow large strings (json limit is 10mb).
const imageUrl = z.string().trim().min(1).max(10_000_000);
const dateStr = z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다');
const email = z.string().trim().email().max(320);
const phone = z.string().trim().max(40);

export const exhibitionStatus = z.enum(['current', 'upcoming', 'past']);
export const newsCategory = z.enum(['notice', 'news']);
export const rentalStatus = z.enum(['pending', 'approved', 'confirmed', 'rejected', 'cancelled']);

export const exhibitionCreate = z.object({
  title: str(200),
  artist: str(120),
  description: str(2000),
  startDate: dateStr,
  endDate: dateStr,
  floor: str(120),
  imageUrl,
  status: exhibitionStatus.optional(),
  details: optStr(20000),
});
export const exhibitionUpdate = exhibitionCreate.partial();

export const spaceCreate = z.object({
  name: str(120),
  floor: str(40),
  floorLabel: str(20),
  area: z.coerce.number().int().nonnegative(),
  height: z.coerce.number().nonnegative(),
  capacity: z.coerce.number().int().nonnegative(),
  description: str(2000),
  details: optStr(20000),
  imageUrl,
  // features may arrive as an array (we stringify) or an already-stringified array.
  features: z.union([z.array(z.string().max(200)), z.string().max(20000)]),
});
export const spaceUpdate = spaceCreate.partial();

export const pricingCreate = z.object({
  spaceName: str(120),
  floor: str(40),
  area: str(60),
  week1: z.coerce.number().int().nonnegative(),
  week2: z.coerce.number().int().nonnegative(),
  week3: z.coerce.number().int().nonnegative(),
  week4: z.coerce.number().int().nonnegative().optional(),
});

export const rentalCreate = z.object({
  spaceName: str(120),
  applicantName: str(80),
  organization: optStr(120),
  email,
  phone: phone.min(1),
  startDate: dateStr,
  endDate: dateStr,
  purpose: str(500),
  message: optStr(5000),
}).refine((d) => d.startDate <= d.endDate, {
  message: '종료일은 시작일 이후여야 합니다',
  path: ['endDate'],
});

export const rentalLookup = z.object({
  applicantName: str(80),
  email,
});

export const rentalReschedule = z.object({
  email,
  startDate: dateStr,
  endDate: dateStr,
}).refine((d) => d.startDate <= d.endDate, {
  message: '종료일은 시작일 이후여야 합니다',
  path: ['endDate'],
});

export const rentalCancel = z.object({ email });
export const rentalStatusUpdate = z.object({ status: rentalStatus });

export const newsCreate = z.object({
  title: str(200),
  content: str(20000),
  category: newsCategory,
});
export const newsUpdate = newsCreate.partial();

export const contactCreate = z.object({
  name: str(80),
  email,
  phone: optStr(40),
  subject: str(200),
  message: str(5000),
});

export const siteImageCreate = z.object({
  key: str(60),
  imageUrl,
  label: optStr(200),
});
export const siteImageUpdate = z.object({
  imageUrl: imageUrl.optional(),
  label: optStr(200),
});

export const adminVerify = z.object({ code: z.string().min(1).max(200) });

/** Validate req.body against a schema; throws ZodError (caught by global handler → 400). */
export function parseBody<T extends z.ZodTypeAny>(schema: T, body: unknown): z.infer<T> {
  return schema.parse(body);
}

/** Express async wrapper — forwards rejections to the global error handler. */
export function asyncHandler(
  fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<unknown>
) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
