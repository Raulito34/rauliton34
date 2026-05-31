import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';

const spaces = [
  { floor: 'b1f', label: 'B1', name: 'B1 전시관', area: '250㎡', pyeong: '75평', height: '2.6M', imageUrl: '/images/spaces/b1f.jpg' },
  { floor: '1f',  label: '01', name: '1 전시관',  area: '120㎡', pyeong: '35평', height: '3.0M', imageUrl: '/images/spaces/1f.jpg'  },
  { floor: '2f',  label: '02', name: '2 전시관',  area: '250㎡', pyeong: '75평', height: '2.6M', imageUrl: '/images/spaces/2f.jpg'  },
  { floor: '3f',  label: '03', name: '3 전시관',  area: '250㎡', pyeong: '75평', height: '2.6M', imageUrl: '/images/spaces/3f.jpg'  },
  { floor: '4f',  label: '04', name: '4 전시관',  area: '70㎡',  pyeong: '20평', height: '4.3M', imageUrl: '/images/spaces/4f.jpg'  },
];

function RevealDiv({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-up ${className}`}>{children}</div>;
}

export default function SpacesPage() {
  return (
    <div className="bg-[var(--canvas)]">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-16 max-lg:pt-20 max-lg:pb-10">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <span className="text-section-num text-[var(--ink-mist)]">Spaces</span>
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
                      alt={s.name}
                      loading="lazy"
                      className="w-full h-full object-cover img-grayscale group-hover:scale-[1.02] transition-transform duration-[1100ms]"
                      style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
                    />
                  </div>

                  {/* Detail — minimal */}
                  <div className="flex flex-col justify-center">
                    <span
                      className="font-display font-extralight leading-[0.85] tracking-[-0.04em] text-[var(--ink-faint)] block"
                      style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}
                    >
                      {s.label}
                    </span>

                    <h2 className="font-display text-[clamp(1.5rem,2vw,2rem)] font-light m-0 mt-4">
                      {s.name}
                    </h2>

                    <div className="flex gap-6 mt-4 text-[13px] text-[var(--ink-soft)] tabular-nums flex-wrap">
                      <span>{s.area}</span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <span>{s.pyeong}</span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <span>H {s.height}</span>
                    </div>

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
