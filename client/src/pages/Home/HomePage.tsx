import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useReveal } from '../../hooks/useReveal';
import type { NewsItem, SiteImage } from '../../types';

const DEFAULT_HERO = '/images/building/hero.jpg';

const defaultExhibitions = [
  { id: 1, title: '빛의 경계', artist: '김현수', floor: '1F 1전시관', period: '2026.02.01 — 2026.03.15', status: '진행중', imageUrl: '' },
  { id: 2, title: '도시의 기억', artist: '이서연', floor: '2F 2전시관', period: '2026.02.10 — 2026.03.20', status: '진행중', imageUrl: '' },
  { id: 3, title: '종이의 숨', artist: '박지훈', floor: '3F 3전시관', period: '2026.02.20 — 2026.04.05', status: '진행중', imageUrl: '' },
];

const spaces = [
  { floor: 'b1f', label: 'B1', name: 'B1 전시관', area: '250㎡', pyeong: '75평', height: '2.6M' },
  { floor: '1f',  label: '01', name: '1 전시관',  area: '120㎡', pyeong: '35평', height: '3.0M' },
  { floor: '2f',  label: '02', name: '2 전시관',  area: '250㎡', pyeong: '75평', height: '2.6M' },
  { floor: '3f',  label: '03', name: '3 전시관',  area: '250㎡', pyeong: '75평', height: '2.6M' },
  { floor: '4f',  label: '04', name: '4 전시관',  area: '70㎡',  pyeong: '20평', height: '4.3M' },
];

/* ══════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════ */

/** Live "OPEN NOW / CLOSED" indicator based on Seoul hours. */
function useOpenStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const seoul = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      const hour = seoul.getHours();
      const minute = seoul.getMinutes();
      setIsOpen(hour >= 10 && hour < 18);
      setClock(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return { isOpen, clock };
}

/* ══════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════ */

function RevealSection({ children, className = '', variant = 'reveal-up' }: {
  children?: React.ReactNode; className?: string; variant?: string;
}) {
  const ref = useReveal();
  return <div ref={ref} className={`${variant} ${className}`}>{children}</div>;
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */

export default function HomePage() {
  const [notices, setNotices] = useState<NewsItem[]>([]);
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO);
  const [currentExhibitions, setCurrentExhibitions] = useState(defaultExhibitions);
  const [activeFloor, setActiveFloor] = useState(2); // default 2F as a balanced starting point
  const { isOpen, clock } = useOpenStatus();

  useEffect(() => {
    let cancelled = false;
    api.getNews('notice').then((items) => { if (!cancelled) setNotices(items); }).catch(() => {});
    api.getSiteImages().then((images: SiteImage[]) => {
      if (cancelled) return;
      const imageMap: Record<string, string> = {};
      images.forEach((img) => { imageMap[img.key] = img.imageUrl; });
      if (imageMap.hero) setHeroImage(imageMap.hero);
      setCurrentExhibitions((prev) =>
        prev.map((ex, i) => {
          const key = `exhibition_${i + 1}`;
          return imageMap[key] ? { ...ex, imageUrl: imageMap[key] } : ex;
        })
      );
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const todayLine = useMemo(() => {
    const d = new Date();
    const ko = d.toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    });
    return ko;
  }, []);

  return (
    <div className="relative">
      {/* ══════════════════════════════════════════════════════
          01 · HERO — KINETIC EDITORIAL
          ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[78vh] max-lg:min-h-[72vh] flex flex-col overflow-hidden">
        {/* Background image */}
        <img
          alt="Sun Art Center"
          src={heroImage}
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover object-[center_28%]"
          fetchPriority="high"
        />
        {/* Layered overlay — gallery ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

        {/* Top meta strip */}
        <div className="relative z-10 px-12 max-lg:px-6 pt-10 max-lg:pt-6">
          <div className="mx-auto max-w-[1320px] flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[rgba(250,250,248,0.55)]">
            <span className="animate-fade-up" style={{ '--delay': '800ms' } as React.CSSProperties}>
              {todayLine}
            </span>
            <span className="animate-fade-up flex items-center gap-2" style={{ '--delay': '900ms' } as React.CSSProperties}>
              <span className={isOpen ? 'live-dot' : 'live-dot'} style={isOpen ? {} : { backgroundColor: 'oklch(60% 0.15 30)' }} />
              {isOpen ? `Open · ${clock}` : `Closed · ${clock}`}
            </span>
          </div>
        </div>

        {/* Kinetic headline */}
        <div className="relative z-10 flex-1 flex items-end px-12 max-lg:px-6 pb-14 max-lg:pb-10">
          <div className="mx-auto max-w-[1320px] w-full">
            <h1 className="text-mega text-[#FAFAF8] leading-[0.88]">
              <span className="hero-word-mask"><span style={{ '--delay': '100ms' } as React.CSSProperties}>Art</span></span>{' '}
              <span className="hero-word-mask"><span style={{ '--delay': '250ms' } as React.CSSProperties}>Meets</span></span>
              <br />
              <span className="hero-word-mask"><span style={{ '--delay': '400ms' } as React.CSSProperties}>Space</span></span>
              <span className="hero-word-mask"><span style={{ '--delay': '500ms' } as React.CSSProperties}>.</span></span>
            </h1>

            <div
              className="mt-10 max-lg:mt-8 flex flex-wrap gap-3 animate-fade-up"
              style={{ '--delay': '800ms' } as React.CSSProperties}
            >
              <Link to="/exhibition" className="btn-ghost"><span>전시 보기</span></Link>
              <Link to="/rental/status" className="btn-ghost"><span>대관 신청</span></Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-3 text-[rgba(250,250,248,0.5)] animate-fade-up"
          style={{ '--delay': '1200ms' } as React.CSSProperties}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="scroll-hint-line" />
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          03 · FLOOR NAVIGATOR — SIGNATURE
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 max-lg:py-14 bg-[var(--void)] text-[var(--snow)] overflow-hidden">
        {/* Ambient gradient accent */}
        <div className="absolute inset-0 pointer-events-none opacity-40"
             style={{ background: 'radial-gradient(ellipse 50% 40% at 75% 30%, oklch(30% 0.02 80 / 0.7), transparent)' }} />

        <div className="relative mx-auto max-w-[1320px] px-12 max-lg:px-6">
          {/* Section header */}
          <div className="grid grid-cols-12 gap-8 mb-10 max-lg:mb-8">
            <div className="col-span-1 max-lg:col-span-12">
              <RevealSection variant="reveal-up">
                <span className="text-section-num" style={{ color: 'var(--snow-soft)' }}>01</span>
              </RevealSection>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <RevealSection variant="reveal-up">
                <h2 className="text-page-title text-[var(--snow)]">
                  The Five Halls
                </h2>
              </RevealSection>
            </div>
          </div>

          <RevealSection variant="line-draw-light" className="mb-8" />

          {/* Floor split view */}
          <div className="grid grid-cols-12 gap-0 lg:gap-10 lg:h-[480px] max-lg:gap-6">
            {/* Image panel */}
            <div className="col-span-5 max-lg:col-span-12 relative overflow-hidden max-lg:aspect-[4/3] max-lg:mb-8">
              {spaces.map((s, i) => (
                <img
                  key={s.floor}
                  alt={s.name}
                  src={`/images/spaces/${s.floor}.jpg`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: i === activeFloor ? 1 : 0,
                    transform: i === activeFloor ? 'scale(1)' : 'scale(1.05)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: 'var(--dur-cinematic)',
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                />
              ))}
              {/* Image overlay with floor context */}
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: 'linear-gradient(to top, oklch(10% 0.005 80 / 0.6), transparent 35%)' }} />
              {/* Huge floor label */}
              <div className="absolute top-4 right-5 pointer-events-none select-none">
                <span className="font-display font-extralight text-[clamp(5rem,8vw,8rem)] leading-none text-[rgba(250,250,248,0.08)]">
                  {spaces[activeFloor].label}
                </span>
              </div>
            </div>

            {/* List panel */}
            <div className="col-span-7 max-lg:col-span-12 flex flex-col">
              {spaces.map((s, i) => {
                const active = i === activeFloor;
                return (
                  <div
                    key={s.floor}
                    className="floor-row"
                    data-active={active}
                    onMouseEnter={() => setActiveFloor(i)}
                    onFocus={() => setActiveFloor(i)}
                  >
                    <Link to={`/spaces/${s.floor}`} className="block group focus:outline-none">
                      <div className="flex items-center gap-8 max-lg:gap-4 py-6 max-lg:py-4 pl-6 max-lg:pl-4 transition-colors duration-300"
                           style={{ backgroundColor: active ? 'oklch(97% 0.004 80 / 0.03)' : 'transparent' }}>
                        {/* Floor label */}
                        <div className="shrink-0 w-[120px] max-lg:w-[72px]">
                          <span
                            className="floor-label-huge"
                            style={{
                              color: active ? 'var(--snow)' : 'oklch(97% 0.004 80 / 0.16)',
                              transform: active ? 'translateX(6px)' : 'translateX(0)',
                              display: 'inline-block',
                            }}
                          >
                            {s.label}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-[clamp(1.25rem,1.5vw,1.625rem)] font-light tracking-tight mb-2"
                              style={{ color: active ? 'var(--snow)' : 'oklch(97% 0.004 80 / 0.48)' }}>
                            {s.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] tracking-wide"
                               style={{ color: active ? 'rgba(250,250,248,0.55)' : 'rgba(250,250,248,0.3)' }}>
                            <span className="tabular-nums">{s.area} · {s.pyeong}</span>
                            <span className="tabular-nums">H {s.height}</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="shrink-0 pr-6 max-lg:pr-4">
                          <span className="inline-block font-display text-[20px] transition-transform duration-300"
                                style={{
                                  color: active ? 'var(--snow)' : 'oklch(97% 0.004 80 / 0.3)',
                                  transform: active ? 'translateX(6px)' : 'translateX(0)',
                                }}>
                            →
                          </span>
                        </div>
                      </div>
                      {i < spaces.length - 1 && <div className="thin-divider-light" />}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 max-lg:mt-8 flex justify-end">
            <Link to="/spaces" className="btn-ghost"><span>공간 전체 보기</span></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          04 · EXHIBITIONS — HORIZONTAL SCROLL
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 max-lg:py-14 bg-[var(--canvas)] overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 mb-8 items-end">
            <div className="col-span-8 max-lg:col-span-12">
              <RevealSection variant="reveal-up">
                <span className="text-section-num text-[var(--ink-mist)]">02</span>
              </RevealSection>
              <RevealSection variant="reveal-up">
                <h2 className="text-page-title mt-4">
                  Current Exhibitions
                </h2>
              </RevealSection>
            </div>
            <div className="col-span-4 max-lg:col-span-12 text-right max-lg:text-left">
              <RevealSection variant="reveal-up">
                <Link to="/exhibition" className="link-underline text-[13px] tracking-[0.1em] uppercase">
                  View all exhibitions
                </Link>
              </RevealSection>
            </div>
          </div>
          <RevealSection variant="line-draw" className="mb-10" />
        </div>

        {/* Horizontal scroll */}
        <div className="relative">
          <div className="flex gap-8 max-lg:gap-5 overflow-x-auto hide-scrollbar px-12 max-lg:px-6 snap-x snap-mandatory pb-4">
            {currentExhibitions.map((ex, i) => (
              <Link
                key={ex.id}
                to="/exhibition"
                className="flex-shrink-0 w-[440px] max-lg:w-[300px] group snap-start reveal-up"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative overflow-hidden bg-[var(--canvas-warm)]">
                  {ex.imageUrl ? (
                    <img
                      alt={ex.title}
                      src={ex.imageUrl}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover img-grayscale group-hover:scale-[1.04] transition-transform duration-[1100ms]"
                      style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="font-display text-[clamp(3rem,5vw,4.5rem)] font-extralight text-[var(--ink-faint)] leading-none">
                          {String(ex.id).padStart(2, '0')}
                        </div>
                        <div className="text-spec-label text-[var(--ink-mist)]">Coming Soon</div>
                      </div>
                    </div>
                  )}
                  {/* Floor tag */}
                  <div className="absolute top-4 left-4 text-spec-label text-[var(--canvas)]"
                       style={{ background: 'oklch(16% 0.008 80 / 0.88)', padding: '6px 10px' }}>
                    {ex.floor}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--ink)]">
                      {ex.status}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-[var(--ink-mist)]" aria-hidden />
                    <span className="text-[12px] text-[var(--ink-mist)]">{ex.floor}</span>
                  </div>
                  <h3 className="font-display text-[clamp(1.375rem,1.6vw,1.75rem)] font-light leading-[1.1] tracking-[-0.005em]">
                    {ex.title}
                  </h3>
                  <p className="text-[14px] text-[var(--ink-soft)] mt-2">{ex.artist}</p>
                  <p className="text-[12px] text-[var(--ink-mist)] mt-1 tabular-nums tracking-wide">{ex.period}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          05 · BENTO GRID — LIVE INFO MOSAIC
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 max-lg:py-14 bg-[var(--canvas-warm)]">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 mb-8 items-end">
            <div className="col-span-8 max-lg:col-span-12">
              <RevealSection variant="reveal-up">
                <span className="text-section-num text-[var(--ink-mist)]">03</span>
              </RevealSection>
              <RevealSection variant="reveal-up">
                <h2 className="text-page-title mt-4">Visit &amp; Connect</h2>
              </RevealSection>
            </div>
          </div>
          <RevealSection variant="line-draw" className="mb-8" />

          {/* Bento */}
          <div className="grid grid-cols-12 grid-rows-[auto] gap-4 max-lg:gap-3">

            {/* 1. Hours + Live status — large */}
            <div className="bento-card col-span-6 max-lg:col-span-12 p-8 max-lg:p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center gap-2 text-spec-label text-[var(--ink-mist)] mb-6">
                  <span className="live-dot" style={isOpen ? {} : { backgroundColor: 'oklch(60% 0.15 30)' }} />
                  {isOpen ? 'Open now' : 'Closed now'}
                </div>
                <div className="font-display text-[clamp(2rem,3vw,2.75rem)] font-light leading-[1.15]">
                  매일<br />
                  <span className="tabular-nums">10:00 — 18:00</span>
                </div>
              </div>
              <div className="flex items-center justify-end pt-8">
                <span className="font-display text-[clamp(1.5rem,2vw,2rem)] font-extralight text-[var(--ink-mist)] tabular-nums">{clock}</span>
              </div>
            </div>

            {/* 2. Location */}
            <div className="bento-card col-span-6 max-lg:col-span-12 p-8 max-lg:p-6 min-h-[220px] flex flex-col justify-between">
              <div>
                <div className="text-spec-label text-[var(--ink-mist)] mb-6">Location</div>
                <div className="font-display text-[clamp(1.5rem,2vw,2rem)] font-light leading-[1.3]">
                  서울 종로구 인사동<br />
                  5길 8
                </div>
              </div>
              <div className="space-y-1 pt-8 text-[13px] text-[var(--ink-soft)]">
                <div>종각역 도보 5분</div>
                <div>안국역 도보 5분</div>
              </div>
            </div>

            {/* 3. Contact */}
            <div className="bento-card col-span-4 max-lg:col-span-12 p-8 max-lg:p-6 min-h-[180px] flex flex-col justify-between">
              <div className="text-spec-label text-[var(--ink-mist)]">Contact</div>
              <div className="space-y-3">
                <a href="tel:02-734-0458" className="block font-display text-[clamp(1.25rem,1.6vw,1.75rem)] font-light tabular-nums hover:text-[var(--ink-soft)] transition-colors">
                  02 · 734 · 0458
                </a>
                <a href="mailto:info@sunartcenter.co.kr" className="block text-[14px] text-[var(--ink-soft)] link-underline">
                  info@sunartcenter.co.kr
                </a>
              </div>
            </div>

            {/* 4. Rental CTA — dark */}
            <div className="bento-card col-span-4 max-lg:col-span-12 min-h-[180px] relative overflow-hidden"
                 style={{ backgroundColor: 'var(--void)', borderColor: 'transparent' }}>
              <Link to="/rental" className="block h-full p-8 max-lg:p-6 group">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-spec-label text-[rgba(250,250,248,0.5)]">Rental</div>
                  <div>
                    <div className="font-display text-[clamp(1.5rem,2vw,2rem)] font-light text-[var(--snow)] leading-tight mb-4">
                      대관 안내
                    </div>
                    <span className="inline-flex items-center gap-2 text-[13px] text-[rgba(250,250,248,0.7)] group-hover:text-[var(--snow)] transition-colors">
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* 5. Instagram */}
            <div className="bento-card col-span-4 max-lg:col-span-12 p-8 max-lg:p-6 min-h-[180px] flex flex-col justify-between">
              <div className="text-spec-label text-[var(--ink-mist)]">Instagram</div>
              <div className="font-display text-[clamp(1.25rem,1.6vw,1.75rem)] font-light">
                @sunartcenter
              </div>
            </div>

            {/* 6. Notice list — wide */}
            {notices.length > 0 && (
              <div className="bento-card col-span-12 p-8 max-lg:p-6">
                <div className="flex items-baseline justify-between mb-6">
                  <div className="text-spec-label text-[var(--ink-mist)]">Notice</div>
                  <Link to="/news?category=notice" className="link-underline text-[12px] tracking-[0.1em] uppercase">
                    All notices
                  </Link>
                </div>
                <ul className="divide-y divide-[var(--line)]">
                  {notices.slice(0, 4).map((n) => (
                    <li key={n.id} className="py-4 max-lg:py-3 flex items-start max-lg:flex-col gap-4 max-lg:gap-1 group">
                      <span className="text-[12px] text-[var(--ink-mist)] tabular-nums w-[120px] shrink-0 font-display tracking-wider">
                        {new Date(n.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric', month: '2-digit', day: '2-digit'
                        }).replace(/\. /g, '.').replace(/\.$/, '')}
                      </span>
                      <span className="text-[15px] text-[var(--ink)] group-hover:text-[var(--ink-soft)] transition-colors leading-relaxed max-w-[65ch]">
                        {n.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          06 · MARQUEE — EDITORIAL CLOSER
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-14 max-lg:py-10 bg-[var(--canvas)] border-t border-b overflow-hidden"
               style={{ borderColor: 'var(--line)' }}>
        <div
          className="whitespace-nowrap font-display font-extralight uppercase tracking-[0.08em] select-none"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 8rem)',
            color: 'oklch(16% 0.008 80 / 0.06)',
            lineHeight: 1,
          }}
        >
          ART MEETS SPACE &nbsp;·&nbsp; ART MEETS SPACE &nbsp;·&nbsp; ART MEETS SPACE &nbsp;·&nbsp;
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          07 · FAREWELL — BEFORE FOOTER
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 max-lg:py-14 bg-[var(--canvas)]">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <RevealSection variant="reveal-up">
              <h2 className="font-display font-extralight text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
                  style={{ color: 'var(--ink)' }}>
                <span className="text-[var(--ink-mist)]">— </span>
                Next.
              </h2>
            </RevealSection>
            <div className="flex flex-wrap gap-3">
              <Link to="/rental" className="btn-primary"><span>대관 안내</span></Link>
              <Link to="/contact" className="btn-outline">문의</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dark transition to footer */}
      <div
        aria-hidden
        className="h-[100px] max-lg:h-[64px]"
        style={{ background: 'linear-gradient(to bottom, var(--canvas), var(--void))' }}
      />
    </div>
  );
}
