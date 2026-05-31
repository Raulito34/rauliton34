import { Router } from 'express';
import { prisma } from '../db';
import { ADMIN_CODE, requireAdmin, adminVerifyLimiter } from '../middleware';
import { asyncHandler, adminVerify } from '../validation';

const router = Router();

// Admin code verification endpoint
router.post('/verify', adminVerifyLimiter, (req, res) => {
  const { code } = adminVerify.parse(req.body);
  if (code === ADMIN_CODE) return res.json({ ok: true });
  res.status(401).json({ ok: false, error: 'Invalid code' });
});

// Seed endpoint (admin only) — idempotent: only inserts when a table is empty.
router.post('/seed', requireAdmin, asyncHandler(async (_req, res) => {
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

export default router;
