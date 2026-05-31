import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient, Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import {
  asyncHandler,
  exhibitionCreate, exhibitionUpdate,
  spaceCreate, spaceUpdate,
  pricingCreate,
  rentalCreate, rentalLookup, rentalReschedule, rentalCancel, rentalStatusUpdate,
  newsCreate, newsUpdate,
  contactCreate,
  siteImageCreate, siteImageUpdate,
  adminVerify,
} from './validation';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// --- Required config: fail fast instead of falling back to a guessable default ---
const ADMIN_CODE = process.env.ADMIN_CODE;
if (!ADMIN_CODE) {
  console.error('FATAL: ADMIN_CODE environment variable is required. Refusing to start.');
  process.exit(1);
}

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/+$/, ''))
  : ['http://localhost:3000'];

// --- Security headers ---
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10mb' }));

// --- Rate limiters ---
const adminVerifyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
const formLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });
const lookupLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
const readLimiter = rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });

app.use('/api', readLimiter);

// --- Admin auth middleware ---
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const code = req.headers['x-admin-code'];
  if (code !== ADMIN_CODE) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Admin code verification endpoint
app.post('/api/admin/verify', adminVerifyLimiter, (req, res) => {
  const { code } = adminVerify.parse(req.body);
  if (code === ADMIN_CODE) return res.json({ ok: true });
  res.status(401).json({ ok: false, error: 'Invalid code' });
});

// --- Exhibitions ---
app.get('/api/exhibitions', asyncHandler(async (req, res) => {
  const { status } = req.query;
  const where = status && status !== 'all' ? { status: String(status) } : {};
  const exhibitions = await prisma.exhibition.findMany({ where, orderBy: { startDate: 'desc' } });
  res.json(exhibitions);
}));

app.get('/api/exhibitions/:id', asyncHandler(async (req, res) => {
  const exhibition = await prisma.exhibition.findUnique({ where: { id: Number(req.params.id) } });
  if (!exhibition) return res.status(404).json({ error: 'Not found' });
  res.json(exhibition);
}));

app.post('/api/exhibitions', requireAdmin, asyncHandler(async (req, res) => {
  const data = exhibitionCreate.parse(req.body);
  const exhibition = await prisma.exhibition.create({
    data: { ...data, status: data.status || 'upcoming', details: data.details || '' },
  });
  res.status(201).json(exhibition);
}));

app.patch('/api/exhibitions/:id', requireAdmin, asyncHandler(async (req, res) => {
  const data = exhibitionUpdate.parse(req.body);
  const exhibition = await prisma.exhibition.update({ where: { id: Number(req.params.id) }, data });
  res.json(exhibition);
}));

app.delete('/api/exhibitions/:id', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.exhibition.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

// --- Spaces ---
app.get('/api/spaces', asyncHandler(async (_req, res) => {
  const spaces = await prisma.space.findMany({ orderBy: { id: 'asc' } });
  res.json(spaces.map((s) => ({ ...s, features: safeParseFeatures(s.features) })));
}));

app.get('/api/spaces/:floor', asyncHandler(async (req, res) => {
  const space = await prisma.space.findUnique({ where: { floor: String(req.params.floor) } });
  if (!space) return res.status(404).json({ error: 'Not found' });
  res.json({ ...space, features: safeParseFeatures(space.features) });
}));

// Normalize features (array | string) → JSON string for the DB column.
function featuresToString(features: string | string[]): string {
  return typeof features === 'string' ? features : JSON.stringify(features);
}

app.post('/api/spaces', requireAdmin, asyncHandler(async (req, res) => {
  const { features, details, ...rest } = spaceCreate.parse(req.body);
  const space = await prisma.space.create({
    data: { ...rest, details: details || '', features: featuresToString(features) },
  });
  res.status(201).json(space);
}));

app.patch('/api/spaces/:floor', requireAdmin, asyncHandler(async (req, res) => {
  const { features, ...rest } = spaceUpdate.parse(req.body);
  const data: Prisma.SpaceUpdateInput = { ...rest };
  if (features !== undefined) data.features = featuresToString(features);
  const space = await prisma.space.update({ where: { floor: String(req.params.floor) }, data });
  res.json(space);
}));

// --- Rental Pricing ---
app.get('/api/pricing', asyncHandler(async (_req, res) => {
  const pricing = await prisma.rentalPricing.findMany({ orderBy: { id: 'asc' } });
  res.json(pricing);
}));

app.post('/api/pricing', requireAdmin, asyncHandler(async (req, res) => {
  const data = pricingCreate.parse(req.body);
  const pricing = await prisma.rentalPricing.create({ data: { ...data, week4: data.week4 || 0 } });
  res.status(201).json(pricing);
}));

// --- Rental Applications ---
app.post('/api/rentals', formLimiter, asyncHandler(async (req, res) => {
  const data = rentalCreate.parse(req.body);
  const rental = await prisma.rental.create({ data: { ...data, organization: data.organization || '', message: data.message || '' } });
  res.status(201).json(rental);
}));

// Public: only booking status for availability calendar (no personal info)
app.get('/api/rentals/status', asyncHandler(async (_req, res) => {
  const rentals = await prisma.rental.findMany({
    select: { id: true, spaceName: true, startDate: true, endDate: true, status: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(rentals);
}));

// User: lookup own bookings by name + email (rate-limited against enumeration)
app.post('/api/rentals/lookup', lookupLimiter, asyncHandler(async (req, res) => {
  const { applicantName, email } = rentalLookup.parse(req.body);
  const rentals = await prisma.rental.findMany({
    where: { applicantName, email },
    orderBy: { createdAt: 'desc' },
  });
  res.json(rentals);
}));

// User: cancel own booking (verified by email)
app.post('/api/rentals/:id/cancel', lookupLimiter, asyncHandler(async (req, res) => {
  const { email } = rentalCancel.parse(req.body);
  const rental = await prisma.rental.findUnique({ where: { id: Number(req.params.id) } });
  if (!rental) return res.status(404).json({ error: 'Not found' });
  if (rental.email !== email) return res.status(403).json({ error: 'Email mismatch' });
  const updated = await prisma.rental.update({ where: { id: rental.id }, data: { status: 'cancelled' } });
  res.json(updated);
}));

// User: reschedule own booking (verified by email)
app.post('/api/rentals/:id/reschedule', lookupLimiter, asyncHandler(async (req, res) => {
  const { email, startDate, endDate } = rentalReschedule.parse(req.body);
  const rental = await prisma.rental.findUnique({ where: { id: Number(req.params.id) } });
  if (!rental) return res.status(404).json({ error: 'Not found' });
  if (rental.email !== email) return res.status(403).json({ error: 'Email mismatch' });
  const updated = await prisma.rental.update({ where: { id: rental.id }, data: { startDate, endDate, status: 'pending' } });
  res.json(updated);
}));

// Admin: full rental details
app.get('/api/rentals', requireAdmin, asyncHandler(async (_req, res) => {
  const rentals = await prisma.rental.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(rentals);
}));

app.patch('/api/rentals/:id', requireAdmin, asyncHandler(async (req, res) => {
  const { status } = rentalStatusUpdate.parse(req.body);
  const rental = await prisma.rental.update({ where: { id: Number(req.params.id) }, data: { status } });
  res.json(rental);
}));

app.delete('/api/rentals/:id', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.rental.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

// --- News ---
app.get('/api/news', asyncHandler(async (req, res) => {
  const { category } = req.query;
  const where = category && category !== 'all' ? { category: String(category) } : {};
  const news = await prisma.news.findMany({ where, orderBy: { createdAt: 'desc' } });
  res.json(news);
}));

app.get('/api/news/:id', asyncHandler(async (req, res) => {
  const item = await prisma.news.findUnique({ where: { id: Number(req.params.id) } });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}));

app.post('/api/news', requireAdmin, asyncHandler(async (req, res) => {
  const data = newsCreate.parse(req.body);
  const item = await prisma.news.create({ data });
  res.status(201).json(item);
}));

app.patch('/api/news/:id', requireAdmin, asyncHandler(async (req, res) => {
  const data = newsUpdate.parse(req.body);
  const item = await prisma.news.update({ where: { id: Number(req.params.id) }, data });
  res.json(item);
}));

app.delete('/api/news/:id', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.news.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

// --- Site Images (homepage) ---
app.get('/api/site-images', asyncHandler(async (_req, res) => {
  const images = await prisma.siteImage.findMany({ orderBy: { id: 'asc' } });
  res.json(images);
}));

app.patch('/api/site-images/:key', requireAdmin, asyncHandler(async (req, res) => {
  const parsed = siteImageUpdate.parse(req.body);
  const data: Record<string, string> = {};
  if (parsed.imageUrl !== undefined) data.imageUrl = parsed.imageUrl;
  if (parsed.label !== undefined) data.label = parsed.label;
  const image = await prisma.siteImage.update({ where: { key: String(req.params.key) }, data });
  res.json(image);
}));

app.post('/api/site-images', requireAdmin, asyncHandler(async (req, res) => {
  const data = siteImageCreate.parse(req.body);
  const image = await prisma.siteImage.create({ data: { ...data, label: data.label || '' } });
  res.status(201).json(image);
}));

app.delete('/api/site-images/:key', requireAdmin, asyncHandler(async (req, res) => {
  await prisma.siteImage.delete({ where: { key: String(req.params.key) } });
  res.json({ success: true });
}));

// --- Contact ---
app.post('/api/contact', formLimiter, asyncHandler(async (req, res) => {
  const data = contactCreate.parse(req.body);
  const contact = await prisma.contact.create({ data: { ...data, phone: data.phone || '' } });
  res.status(201).json(contact);
}));

// --- Seed endpoint (admin only) ---
app.post('/api/seed', requireAdmin, asyncHandler(async (_req, res) => {
  // Spaces
  const spaceCount = await prisma.space.count();
  if (spaceCount === 0) {
    await prisma.space.createMany({
      data: [
        { name: '제1전시관', floor: 'b1f', floorLabel: 'B1F', area: 250, height: 4.5, capacity: 100, description: '미디어아트와 설치미술에 최적화된 공간 (75평)', details: '지하 1층 제1전시관은 미디어아트, 설치미술, 영상 작품 전시를 위해 특별히 설계된 공간입니다.', imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=1200', features: JSON.stringify(['암실 구현 가능', '대형 프로젝션 4면', '전문 음향 시스템', '가변형 LED 조명', '방음 처리', '항온항습 시스템']) },
        { name: '제2전시관', floor: '1f', floorLabel: '1F', area: 120, height: 5.0, capacity: 80, description: '기획전시와 회화 전시의 중심 공간 (35평)', details: '1층 제2전시관은 아트센터의 대표 전시 공간으로, 5m의 높은 천장고와 남향 채광창을 통한 자연광 유입이 특징입니다.', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=1200', features: JSON.stringify(['남향 자연광 유입', '5m 천장고', '이동식 가벽 12패널', '트랙 조명 시스템', '대형 작품 반입구', '무장애 접근']) },
        { name: '제3전시관', floor: '2f', floorLabel: '2F', area: 250, height: 3.5, capacity: 60, description: '개인전 및 그룹전에 적합한 공간 (75평)', details: '2층 제3전시관은 개인전과 소규모 그룹전에 적합한 아늑한 규모의 전시 공간입니다.', imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1200', features: JSON.stringify(['자유 가벽 배치', '스팟/월워셔 조명', 'LED 월 조명', '별도 작품 보관실', '카페 인접', 'Wi-Fi']) },
        { name: '제4전시관', floor: '3f', floorLabel: '3F', area: 250, height: 3.2, capacity: 50, description: '사진, 공예 등 소규모 작품 전시에 최적화 (75평)', details: '3층 제4전시관은 사진, 공예, 판화 등 섬세한 작품의 전시에 최적화된 공간입니다.', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200', features: JSON.stringify(['정밀 디밍 조명', '유리 진열장 8대', '항온항습', '보안 시스템', '작품 핸들링 장비', 'UV 차단 조명']) },
        { name: '다목적홀', floor: '4f', floorLabel: '4F', area: 70, height: 6.0, capacity: 150, description: '세미나, 공연, 특별전시가 가능한 다목적 공간 (20평)', details: '4층 다목적홀은 전시뿐 아니라 세미나, 강연, 소규모 공연, 아트 토크 등 다양한 문화 행사를 진행할 수 있는 다목적 공간입니다.', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200', features: JSON.stringify(['가변형 무대', '4K 프로젝터/스크린', '무선 마이크 4채널', '접이식 좌석 150석', '동시통역 부스', '리셉션 공간']) },
      ],
    });
  }

  const pricingCount = await prisma.rentalPricing.count();
  if (pricingCount === 0) {
    await prisma.rentalPricing.createMany({
      data: [
        { spaceName: '제1전시관', floor: 'B1F', area: '250㎡ (75평)', week1: 300, week2: 350, week3: 400, week4: 0 },
        { spaceName: '제2전시관', floor: '1F', area: '120㎡ (35평)', week1: 500, week2: 550, week3: 600, week4: 0 },
        { spaceName: '제3전시관', floor: '2F', area: '250㎡ (75평)', week1: 450, week2: 500, week3: 550, week4: 0 },
        { spaceName: '제4전시관', floor: '3F', area: '250㎡ (75평)', week1: 350, week2: 400, week3: 450, week4: 0 },
        { spaceName: '다목적홀', floor: '4F', area: '70㎡ (20평)', week1: 150, week2: 200, week3: 200, week4: 0 },
      ],
    });
  }

  const exCount = await prisma.exhibition.count();
  if (exCount === 0) {
    await prisma.exhibition.createMany({
      data: [
        { title: '빛의 경계', artist: '김현수', floor: '1F 제2전시관', startDate: '2026-03-01', endDate: '2026-04-15', status: 'current', imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600', description: '빛과 그림자의 경계를 탐구하는 회화 작품 전시', details: '김현수 작가의 개인전 "빛의 경계"는 빛과 어둠의 경계에 대한 탐구를 담은 회화 작품 30여 점을 선보입니다.' },
        { title: '도시의 기억', artist: '이서연', floor: '2F 제3전시관', startDate: '2026-03-10', endDate: '2026-04-20', status: 'current', imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600', description: '도시 공간의 기억과 변화를 담은 사진 전시', details: '이서연 사진작가의 "도시의 기억"은 서울의 오래된 골목과 건축물이 재개발로 사라져가는 과정을 기록한 다큐멘터리 사진전입니다.' },
        { title: '디지털 자연', artist: '박민지', floor: 'B1F 제1전시관', startDate: '2026-03-20', endDate: '2026-05-01', status: 'current', imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600', description: '디지털 기술로 재해석한 자연의 아름다움', details: '박민지 작가의 미디어아트 전시 "디지털 자연"은 AI와 프로젝션 매핑 기술을 활용하여 자연의 아름다움을 디지털 공간으로 옮겨놓은 몰입형 전시입니다.' },
        { title: '흙과 불의 대화', artist: '정도윤', floor: '3F 제4전시관', startDate: '2026-04-15', endDate: '2026-05-30', status: 'upcoming', imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600', description: '전통 도예의 현대적 재해석', details: '정도윤 작가의 도예 전시로, 한국 전통 도자 기법을 현대적 감각으로 재해석한 작품 40여 점을 선보입니다.' },
      ],
    });
  }

  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        { title: '2026년 상반기 대관 접수 안내', content: '2026년 상반기(3월~8월) 대관 접수를 시작합니다. 자세한 사항은 대관 안내 페이지를 참고해 주세요.', category: 'notice' },
        { title: '김현수 작가 초대전 "빛의 경계" 개막', content: '1F 제2전시관에서 김현수 작가의 개인전 "빛의 경계"가 개막했습니다. 3월 1일부터 4월 15일까지 진행됩니다.', category: 'news' },
        { title: '2026년 연간 보고서 발간', content: '2025년 아트센터 연간 보고서가 발간되었습니다.', category: 'news' },
      ],
    });
  }

  const imgCount = await prisma.siteImage.count();
  if (imgCount === 0) {
    await prisma.siteImage.createMany({
      data: [
        { key: 'hero', imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920', label: '메인 히어로 이미지' },
        { key: 'exhibition_1', imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800', label: '전시 1 이미지' },
        { key: 'exhibition_2', imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800', label: '전시 2 이미지' },
      ],
    });
  }

  const counts = {
    spaces: await prisma.space.count(),
    pricing: await prisma.rentalPricing.count(),
    exhibitions: await prisma.exhibition.count(),
    news: await prisma.news.count(),
    siteImages: await prisma.siteImage.count(),
  };
  res.json({ success: true, counts });
}));

// Safely parse the JSON-stringified features column; never throw on bad data.
function safeParseFeatures(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// --- Global error handler (must be last) ---
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation failed', issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' });
    if (err.code === 'P2002') return res.status(409).json({ error: 'Already exists' });
    return res.status(400).json({ error: 'Database request error' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
