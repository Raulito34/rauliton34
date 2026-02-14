import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { NewsItem } from '../../types';

const currentExhibitions = [
  {
    id: 1,
    title: '빛의 경계',
    artist: '김현수',
    floor: '1F 제2전시관',
    period: '2026.02.01 - 2026.03.15',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
  },
  {
    id: 2,
    title: '도시의 기억',
    artist: '이서연',
    floor: '2F 제3전시관',
    period: '2026.02.10 - 2026.03.20',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600',
  },
  {
    id: 3,
    title: '디지털 자연',
    artist: '박민지',
    floor: 'B1F 제1전시관',
    period: '2026.01.20 - 2026.03.01',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600',
  },
];

const spaces = [
  {
    floor: 'b1f', label: 'B1F', name: '제1전시관', tag: '미디어아트', area: '200㎡', capacity: 100,
    desc: '미디어아트와 설치미술에 최적화된 공간으로, 암실 구현 및 대형 프로젝션 설치가 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=800',
  },
  {
    floor: '1f', label: '1F', name: '제2전시관', tag: '기획전시', area: '180㎡', capacity: 80,
    desc: '기획전시와 회화 전시의 중심 공간으로, 높은 천장고와 자연광 유입이 특징입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=800',
  },
  {
    floor: '2f', label: '2F', name: '제3전시관', tag: '개인전/그룹전', area: '160㎡', capacity: 60,
    desc: '개인전 및 그룹전에 적합한 공간으로, 자유로운 가벽 설치로 다양한 전시 구성이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800',
  },
  {
    floor: '3f', label: '3F', name: '제4전시관', tag: '사진/공예', area: '150㎡', capacity: 50,
    desc: '사진, 공예 등 소규모 작품 전시에 최적화되어 있으며, 섬세한 조명 컨트롤이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  },
  {
    floor: '4f', label: '4F', name: '다목적홀', tag: '세미나/공연', area: '200㎡', capacity: 150,
    desc: '세미나, 공연, 특별전시가 가능한 다목적 공간으로, 가변형 무대와 조명 시스템을 갖추고 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
];

export default function HomePage() {
  const [notices, setNotices] = useState<NewsItem[]>([]);

  useEffect(() => {
    api.getNews('notice').then(setNotices).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero — Current Exhibition Highlight */}
      <section className="p-6 bg-white">
        <div className="aspect-[16/10] overflow-hidden bg-neutral-light mb-6">
          <img
            alt="Sun Art Center"
            className="w-full h-full object-cover contrast-[1.1]"
            src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-baseline border-b border-black pb-2">
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight">SUN ART CENTER</h2>
            <span className="text-[10px] tracking-widest uppercase text-black/50">Est. 2026</span>
          </div>
          <p className="text-[13px] leading-relaxed font-light text-black/80 max-w-md">
            B1F부터 4F까지 5개의 전시 공간을 갖추고 있습니다. 예술과 건축이 만나는 선아트센터에서 여러분의 전시를 시작하세요.
          </p>
          <div className="flex gap-3">
            <Link
              to="/exhibition"
              className="flex-1 sm:flex-none border border-black py-3 px-6 text-[11px] font-bold tracking-[0.2em] uppercase text-center hover:bg-black hover:text-white transition-colors duration-300"
            >
              전시 보기
            </Link>
            <Link
              to="/rental/status"
              className="flex-1 sm:flex-none border border-black/20 py-3 px-6 text-[11px] font-bold tracking-[0.2em] uppercase text-center text-black/50 hover:border-black hover:text-black transition-colors duration-300"
            >
              대관 신청
            </Link>
          </div>
        </div>
      </section>

      {/* Current Exhibition — Color Thumbnails */}
      <section className="divide-y divide-black/5">
        <div className="px-6 py-6">
          <div className="flex justify-between items-baseline border-b border-black pb-2 mb-6">
            <h2 className="text-lg font-medium tracking-tight">현재 전시</h2>
            <span className="text-[10px] tracking-widest uppercase text-black/50">Current</span>
          </div>
        </div>

        {currentExhibitions.map((ex, i) => (
          <Link key={ex.id} to={`/exhibition/${ex.id}`} className="block group card-hover-transition hover:bg-neutral-light/50">
            <div className="p-6">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-light mb-5">
                <img
                  src={ex.imageUrl}
                  alt={ex.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-baseline border-b border-black pb-2">
                  <h3 className="text-lg font-medium tracking-tight">
                    {String(i + 1).padStart(2, '0')}. {ex.title}
                  </h3>
                  <span className="text-[10px] tracking-widest uppercase text-black/50">{ex.floor}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-widest font-semibold py-1">
                  <div className="flex items-center border-l border-black/10 pl-3">
                    <span>작가: {ex.artist}</span>
                  </div>
                  <div className="flex items-center border-l border-black/10 pl-3">
                    <span>{ex.period}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className="px-6 py-6">
          <Link
            to="/exhibition"
            className="block w-full border border-black py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-center hover:bg-black hover:text-white transition-colors duration-300"
          >
            전체 전시 보기
          </Link>
        </div>
      </section>

      {/* Spaces — Catalog Style Cards */}
      <section className="bg-black text-white">
        <div className="px-6 py-6">
          <div className="flex justify-between items-baseline border-b border-white/20 pb-2 mb-2">
            <h2 className="text-lg font-medium tracking-tight">공간 안내</h2>
            <span className="text-[10px] tracking-widest uppercase text-white/50">Spaces</span>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {spaces.map((s, i) => (
            <Link key={s.floor} to={`/spaces/${s.floor}`} className="block group">
              <div className="px-6 py-5">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">
                    {String(i + 1).padStart(2, '0')}. {s.label} {s.name}
                  </h4>
                  <span className="text-[10px] font-medium text-white/30 tracking-widest uppercase">{s.tag}</span>
                </div>
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-medium text-white/40 mt-2">
                  <span>면적: {s.area}</span>
                  <span>수용: {s.capacity}명</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-6 py-6">
          <Link
            to="/spaces"
            className="block w-full border border-white/30 py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-center text-white/70 hover:border-white hover:text-white transition-colors duration-300"
          >
            전체 공간 보기
          </Link>
        </div>
      </section>

      {/* Notice — Real Data from API */}
      {notices.length > 0 && (
        <section className="py-12 bg-white">
          <div className="px-6">
            <div className="flex justify-between items-baseline border-b border-black pb-2 mb-6">
              <h2 className="text-lg font-medium tracking-tight">공지사항</h2>
              <span className="text-[10px] tracking-widest uppercase text-black/50">Notice</span>
            </div>

            <div className="divide-y divide-black/5">
              {notices.slice(0, 5).map((n) => (
                <Link key={n.id} to={`/news/${n.id}`} className="block py-4 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-light text-black/80 group-hover:text-black transition-colors">
                      {n.title}
                    </span>
                    <span className="text-[10px] font-medium text-black/20 ml-4 shrink-0 uppercase tracking-wide">
                      {new Date(n.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', '')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                to="/news?category=notice"
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
              >
                더보기 →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
