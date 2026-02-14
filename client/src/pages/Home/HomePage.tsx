import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { NewsItem } from '../../types';

const currentExhibitions = [
  {
    id: 1,
    title: '빛의 경계',
    artist: '김현수',
    floor: '1F 제1전시관',
    period: '2026.02.01 - 2026.03.15',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
  },
  {
    id: 2,
    title: '도시의 기억',
    artist: '이서연',
    floor: '2F 제2전시관',
    period: '2026.02.10 - 2026.03.20',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
  },
];

const spaces = [
  { floor: '1f', label: '1F', name: '제1전시관', area: '180㎡', capacity: 80 },
  { floor: '2f', label: '2F', name: '제2전시관', area: '160㎡', capacity: 60 },
  { floor: '3f', label: '3F', name: '제3전시관', area: '150㎡', capacity: 50 },
  { floor: '4f', label: '4F', name: '제4전시관', area: '200㎡', capacity: 150 },
  { floor: 'b1f', label: 'B1F', name: '제5전시관', area: '200㎡', capacity: 100 },
];

export default function HomePage() {
  const [notices, setNotices] = useState<NewsItem[]>([]);

  useEffect(() => {
    api.getNews('notice').then(setNotices).catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero: Framed Image + Bold Headline ── */}
      <section className="pt-12 px-6 pb-12 bg-white">
        {/* Hero image — replace src with /hero-building.jpg when available */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] lg:max-w-4xl lg:mx-auto p-4 bg-white border-[12px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
          <img
            alt="SUN ART CENTER"
            className="w-full h-full object-cover grayscale brightness-90 contrast-125"
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920"
          />
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:max-w-4xl lg:mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.85] uppercase">
            Art <br />
            <span className="ml-12">Meets</span> <br />
            Space.
          </h1>
          <div className="thin-divider" />
          <div className="flex gap-4">
            <Link
              to="/exhibition"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors"
            >
              전시 보기
            </Link>
            <Link
              to="/rental/status"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors"
            >
              대관 신청
            </Link>
          </div>
        </div>
      </section>

      {/* ── 01 The Gallery: Asymmetric Exhibition Layout ── */}
      <section className="py-12 bg-white">
        <div className="px-6 mb-16 lg:max-w-5xl lg:mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">01</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter">The Gallery</h2>
          </div>
          <div className="thin-divider mb-8" />

          <div className="space-y-20">
            {currentExhibitions.map((ex, i) => (
              <Link key={ex.id} to={`/exhibition`} className="block group">
                <div className="flex flex-col gap-6">
                  <div className={`${i % 2 === 0 ? 'w-4/5 lg:w-3/5 ml-auto' : 'w-4/5 lg:w-3/5 mr-auto'} img-frame`}>
                    <img
                      alt={ex.title}
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-500"
                      src={ex.imageUrl}
                    />
                  </div>
                  <div className={`${i % 2 === 0 ? 'w-2/3 pr-4' : 'w-2/3 ml-auto text-right pl-4'}`}>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">{ex.title}</h3>
                    <p className="text-[11px] leading-relaxed text-black/60 font-medium mb-1 uppercase">
                      {ex.artist} · {ex.floor}
                    </p>
                    <p className="text-[11px] leading-relaxed text-black/60 font-medium mb-4 uppercase">
                      {ex.period}
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1">
                      View Exhibition
                    </span>
                  </div>
                </div>
                {i < currentExhibitions.length - 1 && <div className="thin-divider mt-12" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Spaces: Dark Section ── */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 lg:max-w-5xl lg:mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">02</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Spaces</h2>
          </div>
          <div className="h-[1px] bg-white/10 mb-12" />

          <div className="space-y-0">
            {spaces.map((s, i) => (
              <Link key={s.floor} to={`/spaces/${s.floor}`} className="block group">
                <div className="flex items-start gap-4 py-6">
                  <span className="text-[10px] font-bold opacity-30 mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 group-hover:text-white/70 transition-colors">
                      {s.label} {s.name}
                    </h4>
                    <p className="text-[11px] font-light opacity-50 leading-relaxed uppercase">
                      면적 {s.area} · 수용 {s.capacity}명
                    </p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] border-b border-white/30 pb-0.5 opacity-0 group-hover:opacity-60 transition-opacity">
                    View
                  </span>
                </div>
                {i < spaces.length - 1 && <div className="h-[1px] bg-white/10" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Notice: Real Data from API ── */}
      {notices.length > 0 && (
        <section className="py-12 bg-white">
          <div className="px-6 lg:max-w-5xl lg:mx-auto">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">03</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Notice</h2>
            </div>
            <div className="thin-divider mb-8" />

            <div className="space-y-0">
              {notices.slice(0, 5).map((n, i) => (
                <Link key={n.id} to={`/news/${n.id}`} className="block group">
                  <div className="flex items-center justify-between py-5">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-black/20">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[13px] font-medium text-black/70 group-hover:text-black transition-colors">
                        {n.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-black/20 ml-4 shrink-0 uppercase tracking-wide">
                      {new Date(n.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric', month: '2-digit', day: '2-digit'
                      }).replace(/\. /g, '.').replace('.', '')}
                    </span>
                  </div>
                  <div className="thin-divider" />
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/news?category=notice"
                className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors"
              >
                전체 보기
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
