import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: '대관신청',
    desc: '온라인 또는 오프라인으로 대관 신청서와 전시 기획안 제안',
  },
  {
    num: '02',
    title: '대관승인',
    desc: '내부 심사를 거쳐 대관 승인 여부를 1주내에 결정',
  },
  {
    num: '03',
    title: '계약서 작성',
    desc: '전체 대관료의 30%를 계약금으로 납부하여 대관 계약 체결',
  },
  {
    num: '04',
    title: '실무 협의',
    desc: '자료 업로드, 반입 설치 시간 등 세부 계획 조율',
  },
  {
    num: '05',
    title: '잔금 납부',
    desc: '전시 오픈 7일 전까지 납부',
  },
  {
    num: '06',
    title: '작품 반입, 설치',
    desc: '화요일 오후 2시부터 작품 반입 가능. 설치 오후 7시까지 가능',
  },
  {
    num: '07',
    title: '전시',
    desc: '오전 10:00 ~ 오후 6:00',
  },
  {
    num: '08',
    title: '전시 철수',
    desc: '화요일 정오 12시까지 철수 완료',
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
          {/* Header info */}
          <div className="mb-12 text-center space-y-2">
            <p className="text-gray-600 text-sm">현장 답사 필요시 사전문의</p>
            <div className="bg-light p-4 rounded inline-block">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-primary">계약 체결</span> — 대관 조건, 기간, 요금 등에 대한 계약을 체결 후 대관료 납부
              </p>
              <p className="text-xs text-gray-500 mt-1">계약시 30%, 전시 시작 7일 전 잔금 납부</p>
            </div>
          </div>

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
              to="/rental/status"
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
