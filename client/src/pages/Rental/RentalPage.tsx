import { Link } from 'react-router-dom';

const sections = [
  {
    num: '01',
    title: 'Procedure',
    titleKo: '대관 절차',
    desc: '문의부터 오프닝까지',
    path: '/rental/procedure',
  },
  {
    num: '02',
    title: 'Pricing',
    titleKo: '대관료',
    desc: '공간별·기간별 요금',
    path: '/rental/pricing',
  },
  {
    num: '03',
    title: 'Availability',
    titleKo: '대관 현황',
    desc: '예약 가능 일정 확인',
    path: '/rental/status',
  },
  {
    num: '04',
    title: 'Bookings',
    titleKo: '신청 내역',
    desc: '내 대관 상태',
    path: '/rental/list',
  },
];

const quickFacts = [
  { label: 'Halls', value: '5' },
  { label: 'Total Area', value: '940㎡' },
  { label: 'Renovated', value: '2026' },
];

export default function RentalPage() {
  return (
    <div className="bg-[var(--canvas)]">
      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-24 max-lg:pt-20 max-lg:pb-16 overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <span className="text-section-num text-[var(--ink-mist)]">Rental</span>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="font-display font-extralight text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
                당신의 전시,<br />
                <span className="text-[var(--ink-mist)]">우리의 공간.</span>
              </h1>
              <p className="mt-10 max-lg:mt-6 text-lede text-[var(--ink-soft)] max-w-[52ch]">
                선아트센터는 다섯 개의 전시관을 운영합니다.<br />
                층별 개별 대관부터 전관 대관까지 가능합니다.
              </p>
            </div>
          </div>

          {/* Quick facts — inline */}
          <div className="mt-20 max-lg:mt-12 grid grid-cols-3 max-lg:grid-cols-3 gap-0 border-t border-b border-[var(--line)]">
            {quickFacts.map((f, i) => (
              <div
                key={f.label}
                className={`py-8 max-lg:py-6 px-8 max-lg:px-4 ${
                  i < quickFacts.length - 1 ? 'border-r border-[var(--line)]' : ''
                }`}
              >
                <div className="text-spec-label text-[var(--ink-mist)] mb-3">{f.label}</div>
                <div className="font-display text-[clamp(2rem,3vw,2.75rem)] font-light leading-none tabular-nums">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Sections Grid — minimal editorial ═══ */}
      <section className="pb-32 max-lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-0 border-t border-[var(--line)]">
            {sections.map((s, i) => (
              <Link
                key={s.path}
                to={s.path}
                className={`
                  group relative py-16 max-lg:py-10 px-0
                  border-b border-[var(--line)]
                  ${i % 2 === 0 ? 'lg:border-r lg:pr-16' : 'lg:pl-16'}
                  transition-colors duration-300
                  hover:bg-[var(--canvas-warm)]
                `}
                style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
              >
                <div className="flex items-start justify-between gap-8 max-lg:gap-4 px-8 max-lg:px-4">
                  <div className="flex-1">
                    <span className="text-section-num text-[var(--ink-faint)] block mb-8 max-lg:mb-5 transition-colors group-hover:text-[var(--ink-mist)]">
                      {s.num}
                    </span>
                    <h3 className="font-display text-[clamp(1.75rem,2.5vw,2.5rem)] font-light uppercase tracking-tight leading-[1.1]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[13px] tracking-[0.1em] uppercase text-[var(--ink-mist)]">
                      {s.titleKo}
                    </p>
                    <p className="mt-6 text-[15px] text-[var(--ink-soft)] leading-relaxed max-w-[36ch]">
                      {s.desc}
                    </p>
                  </div>
                  <span
                    className="mt-1 font-display text-[24px] text-[var(--ink-faint)] transition-all duration-300 group-hover:text-[var(--ink)] group-hover:translate-x-2"
                    style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — Direct Action ═══ */}
      <section className="relative py-24 max-lg:py-16 bg-[var(--void)] text-[var(--snow)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, oklch(30% 0.02 80 / 0.6), transparent)' }} />
        <div className="relative mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-8 max-lg:col-span-12">
              <p className="text-spec-label text-[rgba(250,250,248,0.5)] mb-4">Ready to begin?</p>
              <h2 className="font-display font-extralight text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.01em]">
                문의부터 시작됩니다.
              </h2>
            </div>
            <div className="col-span-4 max-lg:col-span-12 flex flex-wrap gap-3 max-lg:mt-6">
              <Link to="/rental/status" className="btn-ghost"><span>대관 신청</span></Link>
              <Link to="/contact" className="btn-ghost"><span>문의</span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
