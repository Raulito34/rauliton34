import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: '대관 문의',
    desc: '전화 또는 이메일로 희망 공간, 일정, 전시 내용에 대해 사전 상담을 진행합니다.',
    detail: '02-000-0000 / info@artcenter.com',
  },
  {
    num: '02',
    title: '현장 답사',
    desc: '실제 전시 공간을 방문하여 공간 규모, 시설, 동선 등을 직접 확인합니다.',
    detail: '사전 예약 필수',
  },
  {
    num: '03',
    title: '대관 신청서 제출',
    desc: '온라인 또는 오프라인으로 대관 신청서와 전시 기획안을 제출합니다.',
    detail: '전시 기획안 포함',
  },
  {
    num: '04',
    title: '심사 및 승인',
    desc: '전시 기획안에 대한 내부 심사를 거쳐 대관 승인 여부를 결정합니다.',
    detail: '심사기간: 약 2주',
  },
  {
    num: '05',
    title: '계약 체결',
    desc: '대관 조건, 기간, 요금 등에 대한 계약을 체결하고 대관료를 납부합니다.',
    detail: '계약금 50% 선납',
  },
  {
    num: '06',
    title: '전시 진행',
    desc: '작품 반입, 설치, 전시 운영, 철수까지 아트센터의 지원을 받으며 진행합니다.',
    detail: '기술 지원 포함',
  },
];

export default function ProcedurePage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">대관절차</h1>
          <p className="text-gray-400 text-sm">Rental Procedure</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-12">
            아트센터 대관은 아래 절차에 따라 진행됩니다.
          </p>

          <div className="space-y-0">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative flex gap-6 pb-10">
                {/* Timeline line */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-full bg-gray-200" />
                )}
                {/* Step number circle */}
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-10">
                  {step.num}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                  <span className="inline-block text-xs text-accent mt-2 bg-amber-50 px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-x-4">
            <Link
              to="/rental/pricing"
              className="inline-block bg-light text-primary px-8 py-3 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              대관료 확인
            </Link>
            <Link
              to="/rental/apply"
              className="inline-block bg-accent text-white px-8 py-3 text-sm font-medium hover:bg-accent-light transition-colors"
            >
              대관 신청하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
