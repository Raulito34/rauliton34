import { Link } from 'react-router-dom';

const halls = [
  { label: 'B1', area: '250㎡' },
  { label: '01', area: '120㎡' },
  { label: '02', area: '250㎡' },
  { label: '03', area: '250㎡' },
  { label: '04', area: '70㎡' },
];

const seasons = [
  { key: 'offpeak', label: 'Off-peak', labelKo: '비성수기', period: 'JAN · FEB · JUL · AUG', prices: [300, 500, 450, 350, 150] },
  { key: 'regular', label: 'Regular',  labelKo: '일반',    period: 'MAR — JUN · DEC',     prices: [350, 550, 500, 400, 200] },
  { key: 'peak',    label: 'Peak',     labelKo: '성수기',   period: 'SEP · OCT · NOV',      prices: [400, 600, 550, 450, 200] },
];

const notes = [
  '1주 기준, VAT 별도',
  '2주 이상 대관 시 할인 적용',
  '복수 전시관 동시 대관 시 10% 할인',
  '신진 작가 · 비영리 별도 협의',
  '기본 조명 · 전기 · 냉난방 포함',
  '설치 · 철수 기간은 대관 기간에 포함',
];

export default function PricingPage() {
  return (
    <div className="bg-[var(--canvas)]">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-16 max-lg:pt-20 max-lg:pb-10">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <span className="text-section-num text-[var(--ink-mist)]">Pricing</span>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
                시즌 · 공간별<br />
                <span className="text-[var(--ink-mist)]">주 단위 요금.</span>
              </h1>
              <p className="mt-8 max-lg:mt-5 text-[15px] text-[var(--ink-soft)] max-w-[52ch]">
                단위: 만원 · 1주 기준 · VAT 별도
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Pricing Grid — compact matrix ═══ */}
      <section className="pb-20 max-lg:pb-12">
        <div className="mx-auto max-w-[1100px] px-12 max-lg:px-6">
          {/* Matrix header — hall labels */}
          <div className="hidden lg:grid grid-cols-[140px_repeat(5,1fr)] gap-0 border-t border-b border-[var(--line)] py-4">
            <div className="text-spec-label text-[var(--ink-mist)]">Season</div>
            {halls.map((h) => (
              <div key={h.label} className="text-center">
                <div className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-light tabular-nums leading-none">
                  {h.label}
                </div>
                <div className="text-[11px] tracking-wider text-[var(--ink-mist)] mt-1 tabular-nums">
                  {h.area}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: rows */}
          <div className="hidden lg:block">
            {seasons.map((s) => (
              <div
                key={s.key}
                className="grid grid-cols-[140px_repeat(5,1fr)] gap-0 items-center py-8 border-b border-[var(--line)] transition-colors hover:bg-[var(--canvas-warm)]"
              >
                <div>
                  <div className="font-display text-[18px] font-light">{s.labelKo}</div>
                  <div className="text-[11px] tracking-[0.1em] text-[var(--ink-mist)] uppercase mt-1">{s.period}</div>
                </div>
                {s.prices.map((p, i) => (
                  <div key={i} className="text-center">
                    <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extralight tabular-nums leading-none">
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile: stacked cards */}
          <div className="lg:hidden space-y-8">
            {seasons.map((s) => (
              <div key={s.key} className="border-t border-[var(--line)] pt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <div className="font-display text-[20px] font-light">{s.labelKo}</div>
                  <div className="text-[11px] tracking-[0.1em] text-[var(--ink-mist)] uppercase">{s.period}</div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {halls.map((h, i) => (
                    <div key={h.label} className="text-center py-3 bg-[var(--canvas-warm)]">
                      <div className="text-[11px] text-[var(--ink-mist)] tracking-wider tabular-nums">{h.label}</div>
                      <div className="font-display text-[20px] font-light tabular-nums mt-1">
                        {s.prices[i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Notes ═══ */}
      <section className="pb-24 max-lg:pb-16">
        <div className="mx-auto max-w-[900px] px-12 max-lg:px-6">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-10 gap-y-4 pt-10 border-t border-[var(--line)]">
            {notes.map((n, i) => (
              <div key={i} className="flex gap-4 items-baseline">
                <span className="text-[11px] text-[var(--ink-faint)] tabular-nums font-display tracking-wider shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] text-[var(--ink-soft)] leading-relaxed">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-32 max-lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-12 max-lg:py-8 border-t border-[var(--line)]">
            <p className="text-[15px] text-[var(--ink-soft)]">
              요금 확인 완료 — 이제 신청
            </p>
            <div className="flex gap-3">
              <Link to="/rental/procedure" className="btn-outline">절차 보기</Link>
              <Link to="/rental/status" className="btn-primary"><span>신청하기</span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
