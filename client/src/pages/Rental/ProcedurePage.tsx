import { Link } from 'react-router-dom';

const steps = [
  { num: '01', title: '대관 신청', desc: '온라인 신청서 + 전시 기획안 제출' },
  { num: '02', title: '대관 승인', desc: '1주 내 심사 · 승인 여부 통보' },
  { num: '03', title: '계약 체결', desc: '계약금 30% 납부' },
  { num: '04', title: '실무 협의', desc: '반입 · 설치 일정 조율' },
  { num: '05', title: '잔금 납부', desc: '오픈 7일 전' },
  { num: '06', title: '반입 · 설치', desc: '화요일 14:00 — 19:00' },
  { num: '07', title: '전시', desc: '화 — 일 10:00 — 18:00' },
  { num: '08', title: '철수', desc: '다음 화요일 12:00 까지' },
];

export default function ProcedurePage() {
  return (
    <div className="bg-[var(--canvas)]">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-20 max-lg:pt-20 max-lg:pb-12">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <span className="text-section-num text-[var(--ink-mist)]">Procedure</span>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
                여덟 단계.<br />
                <span className="text-[var(--ink-mist)]">문의에서 오프닝까지.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Steps — Minimal Timeline ═══ */}
      <section className="pb-24 max-lg:pb-16">
        <div className="mx-auto max-w-[900px] px-12 max-lg:px-6">
          <div className="border-t border-[var(--line)]">
            {steps.map((s) => (
              <div
                key={s.num}
                className="group flex items-start gap-10 max-lg:gap-5 py-7 max-lg:py-5 border-b border-[var(--line)] transition-colors duration-300 hover:bg-[var(--canvas-warm)] px-4 max-lg:px-2 -mx-4 max-lg:-mx-2"
                style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
              >
                <span className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-extralight text-[var(--ink-faint)] tabular-nums leading-none pt-1 min-w-[3.5rem] max-lg:min-w-[2.5rem] group-hover:text-[var(--ink-mist)] transition-colors">
                  {s.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] font-light tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-[var(--ink-soft)] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-16 max-lg:mt-10 p-8 max-lg:p-6 bg-[var(--canvas-warm)] border border-[var(--line)]">
            <div className="text-spec-label text-[var(--ink-mist)] mb-4">Notes</div>
            <ul className="space-y-2 text-[14px] text-[var(--ink-soft)] leading-relaxed">
              <li>· 현장 답사는 사전 문의 후 가능합니다</li>
              <li>· 계약 체결 시 대관료의 30%, 오픈 7일 전 잔금 납부</li>
              <li>· 신청서 검토 후 1주 이내 결과를 안내드립니다</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-32 max-lg:pb-20">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-12 max-lg:py-8 border-t border-[var(--line)]">
            <p className="text-[15px] text-[var(--ink-soft)]">
              다음 단계 — 요금 확인 또는 바로 신청
            </p>
            <div className="flex gap-3">
              <Link to="/rental/pricing" className="btn-outline">대관료</Link>
              <Link to="/rental/status" className="btn-primary"><span>신청하기</span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
