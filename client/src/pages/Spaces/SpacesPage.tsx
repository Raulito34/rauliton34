import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const spaces = [
  {
    floor: 'b1f', label: 'B1', name: 'B1 전시관', nameEn: 'Underground Hall',
    area: '250㎡', pyeong: '75평', height: '2.6M',
    character: '완전 차광 블랙박스',
    tags: ['Media Art', 'Immersive', 'Video', 'Sound'],
    imageUrl: '/images/spaces/b1f.jpg',
  },
  {
    floor: '1f', label: '01', name: '1 전시관', nameEn: 'Street Level',
    area: '120㎡', pyeong: '35평', height: '3.0M',
    character: '인사동 유리 파사드',
    tags: ['Painting', 'Sculpture', 'Vitrine', '24H Street'],
    imageUrl: '/images/spaces/1f.jpg',
  },
  {
    floor: '2f', label: '02', name: '2 전시관', nameEn: 'White Cube',
    area: '250㎡', pyeong: '75평', height: '2.6M',
    character: '시멘트 · 화이트 월',
    tags: ['Painting', 'Photography', 'Contemporary'],
    imageUrl: '/images/spaces/2f.jpg',
  },
  {
    floor: '3f', label: '03', name: '3 전시관', nameEn: 'Divisible Studio',
    area: '250㎡', pyeong: '75평', height: '2.6M',
    character: '분할 가능',
    tags: ['Group Show', 'Installation', 'Large Scale'],
    imageUrl: '/images/spaces/3f.jpg',
  },
  {
    floor: '4f', label: '04', name: '4 전시관', nameEn: 'High Ceiling',
    area: '70㎡', pyeong: '20평', height: '4.3M',
    character: '4.3M 하이 실링',
    tags: ['Sculpture', 'Solo Show', 'Installation'],
    imageUrl: '/images/spaces/4f.jpg',
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-up ${className}`}>{children}</div>;
}

export default function SpacesPage() {
  return (
    <div className="bg-[var(--canvas)]">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-20 max-lg:pt-20 max-lg:pb-12">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <RevealDiv>
                <span className="text-section-num text-[var(--ink-mist)]">Spaces</span>
              </RevealDiv>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <RevealDiv>
                <h1 className="font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em] m-0">
                  다섯 개의 공간,<br />
                  <span className="text-[var(--ink-mist)]">다섯 개의 성격.</span>
                </h1>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Floor Rows ═══ */}
      <section className="pb-32 max-lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          {spaces.map((s) => (
            <RevealDiv key={s.floor}>
              <Link
                to={`/spaces/${s.floor}`}
                className="group block border-t border-[var(--line)] py-12 max-lg:py-8"
              >
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 max-lg:gap-6 items-center">
                  {/* Image */}
                  <div className="overflow-hidden aspect-[4/3] bg-[var(--canvas-warm)]">
                    <img
                      src={s.imageUrl}
                      alt={`${s.name} — ${s.nameEn}`}
                      loading="lazy"
                      className="w-full h-full object-cover img-grayscale group-hover:scale-[1.02] transition-transform duration-[1100ms]"
                      style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
                    />
                  </div>

                  {/* Detail */}
                  <div className="flex flex-col justify-center">
                    {/* Huge floor label */}
                    <span
                      className="font-display font-extralight leading-[0.85] tracking-[-0.04em] text-[var(--ink-faint)] block"
                      style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}
                    >
                      {s.label}
                    </span>

                    {/* Name + English */}
                    <div className="flex items-baseline gap-4 mt-4 flex-wrap">
                      <h2 className="font-display text-[clamp(1.5rem,2vw,2rem)] font-light m-0">
                        {s.name}
                      </h2>
                      <span className="text-[12px] tracking-[0.14em] uppercase text-[var(--ink-mist)]">
                        {s.nameEn}
                      </span>
                    </div>

                    {/* Specs */}
                    <div className="flex gap-6 mt-4 text-[13px] text-[var(--ink-soft)] tabular-nums flex-wrap">
                      <span>{s.area}</span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <span>{s.pyeong}</span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <span>H {s.height}</span>
                    </div>

                    {/* Character */}
                    <p className="mt-4 text-[15px] text-[var(--ink-soft)] m-0">
                      {s.character}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] tracking-[0.1em] uppercase text-[var(--ink-mist)] border border-[var(--line)] px-3 py-1.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase text-[var(--ink-mist)] group-hover:text-[var(--ink)] transition-colors">
                      <span>View detail</span>
                      <span
                        className="font-display text-[18px] transition-transform group-hover:translate-x-1"
                        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealDiv>
          ))}

          {/* Bottom line */}
          <div className="border-t border-[var(--line)]" />
        </div>
      </section>

      {/* ═══ Footer transition ═══ */}
      <div
        aria-hidden
        className="h-[140px] max-lg:h-[80px]"
        style={{ background: 'linear-gradient(to bottom, var(--canvas), var(--void))' }}
      />
    </div>
  );
}
