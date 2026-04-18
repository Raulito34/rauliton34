import { Link } from 'react-router-dom';

const articles = [
  {
    num: '01',
    title: '목적',
    content: [
      '본 규약은 선아트센터의 전시 공간 대관에 관한 제반 사항을 규정합니다.',
    ],
  },
  {
    num: '02',
    title: '대관 대상',
    content: [
      'B1 전시관 · 250㎡ · 미디어아트 · 설치미술',
      '01 전시관 · 120㎡ · 회화 · 기획전시',
      '02 전시관 · 250㎡ · 개인전 · 그룹전',
      '03 전시관 · 250㎡ · 사진 · 공예',
      '04 전시관 · 70㎡  · 세미나 · 공연 · 특별전',
    ],
    isList: true,
  },
  {
    num: '03',
    title: '대관 신청',
    content: [
      '사용 희망일 최소 2개월 전 신청',
      '전시 기획안 · 작가 포트폴리오 제출',
      '센터의 심사를 거쳐 승인 여부 결정',
    ],
    isList: true,
  },
  {
    num: '04',
    title: '대관료 및 납부',
    content: [
      '대관료는 센터가 정한 요금표에 따릅니다',
      '계약금 50% 계약 체결 시 납부',
      '잔금은 전시 시작 2주 전까지 완납',
      '기본 조명 · 전기 · 냉난방 포함',
    ],
    isList: true,
  },
  {
    num: '05',
    title: '취소 및 환불',
    content: [
      '전시 30일 전 취소 · 90% 환불',
      '전시 15일 전 취소 · 50% 환불',
      '전시 7일 전 취소 · 환불 불가',
      '천재지변 등 불가항력 · 별도 협의',
    ],
    isList: true,
  },
  {
    num: '06',
    title: '시설 이용',
    content: [
      '선량한 관리자의 주의로 사용',
      '훼손 · 파손 시 원상 복구 또는 손해배상',
      '작품 반입 · 설치 시 직원 안내 준수',
      '사전 승인 없이 구조 변경 불가',
    ],
    isList: true,
  },
  {
    num: '07',
    title: '보험',
    content: [
      '작품 및 관람객 보험은 대관자가 별도로 가입합니다. 센터는 분실 · 파손 등에 대해 책임지지 않습니다.',
    ],
  },
  {
    num: '08',
    title: '기타',
    content: [
      '명시되지 않은 사항은 센터와 대관자 간 협의',
      '공익적 목적 또는 시설 안전을 위해 대관 제한 가능',
    ],
    isList: true,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[var(--canvas)] min-h-screen">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-12 max-lg:pt-20 max-lg:pb-8">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <span className="text-section-num text-[var(--ink-mist)]">Terms</span>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
                대관 규약.
              </h1>
              <p className="mt-8 text-[15px] text-[var(--ink-soft)]">
                Rental Terms &amp; Conditions · 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Articles ═══ */}
      <section className="pb-24 max-lg:pb-16">
        <div className="mx-auto max-w-[900px] px-12 max-lg:px-6">
          <div className="border-t border-[var(--line)]">
            {articles.map((a) => (
              <article
                key={a.num}
                className="grid grid-cols-12 gap-8 max-lg:gap-4 py-10 max-lg:py-7 border-b border-[var(--line)]"
              >
                <div className="col-span-3 max-lg:col-span-12">
                  <div className="font-display text-[clamp(2rem,3vw,3rem)] font-extralight text-[var(--ink-faint)] tabular-nums leading-none mb-2">
                    {a.num}
                  </div>
                  <div className="text-spec-label text-[var(--ink-mist)] mt-1">
                    Article
                  </div>
                </div>
                <div className="col-span-9 max-lg:col-span-12">
                  <h2 className="font-display text-[clamp(1.25rem,1.6vw,1.625rem)] font-light mb-6">
                    {a.title}
                  </h2>
                  {a.isList ? (
                    <ul className="space-y-3">
                      {a.content.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-4 text-[14px] text-[var(--ink-soft)] leading-relaxed">
                          <span className="text-[11px] font-display tabular-nums text-[var(--ink-faint)] tracking-wider shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-4">
                      {a.content.map((p, i) => (
                        <p key={i} className="text-[14px] text-[var(--ink-soft)] leading-[1.8] max-w-[65ch]">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Footnote + CTA ═══ */}
      <section className="pb-32 max-lg:pb-20">
        <div className="mx-auto max-w-[900px] px-12 max-lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-10 max-lg:py-6 border-t border-[var(--line)]">
            <p className="text-[12px] tracking-[0.1em] uppercase text-[var(--ink-mist)]">
              Last updated · 2026.01
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
