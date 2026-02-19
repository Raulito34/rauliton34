import { Link } from 'react-router-dom';

const halls = [
  { name: '1전시관', floor: '1F', area: '180㎡' },
  { name: '2전시관', floor: '2F', area: '160㎡' },
  { name: '3전시관', floor: '3F', area: '150㎡' },
  { name: '4전시관', floor: '4F', area: '200㎡' },
  { name: 'B1전시관', floor: 'B1F', area: '200㎡' },
];

const seasons = [
  {
    key: 'offpeak',
    label: '비성수기',
    period: '1–2월, 7–8월, 12월',
    prices: [200, 150, 140, 250, 170],
  },
  {
    key: 'regular',
    label: '일반',
    period: '3월, 6월, 9월',
    prices: [250, 180, 170, 300, 200],
  },
  {
    key: 'peak',
    label: '성수기',
    period: '4–5월, 10–11월',
    prices: [300, 220, 200, 350, 250],
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">대관료</h1>
          <p className="text-gray-400 text-sm">Rental Pricing</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-4">
            시즌별 · 전시관별 1주 기준 대관료 안내입니다.
          </p>
          <p className="text-center text-xs text-gray-400 mb-12">(단위: 만원, VAT 별도)</p>

          {/* Season-based pricing cards */}
          <div className="space-y-12">
            {seasons.map((season) => (
              <div key={season.key}>
                {/* Season header */}
                <div className="bg-primary text-white px-6 py-4 flex items-baseline justify-between">
                  <h3 className="text-lg font-bold">{season.label}</h3>
                  <span className="text-xs text-white/50">{season.period}</span>
                </div>

                {/* Hall cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 border border-gray-200 border-t-0">
                  {halls.map((hall, i) => (
                    <div
                      key={hall.name}
                      className={`p-5 text-center ${
                        i < halls.length - 1 ? 'border-r border-gray-200' : ''
                      } ${i >= 2 && i < halls.length ? 'max-sm:border-t max-sm:border-gray-200' : ''} ${i >= 3 ? 'max-lg:border-t max-lg:border-gray-200' : ''}`}
                    >
                      <p className="text-sm font-bold text-primary mb-1">{hall.name}</p>
                      <p className="text-xs text-gray-400 mb-3">{hall.floor} · {hall.area}</p>
                      <p className="text-2xl font-black text-accent">
                        {season.prices[i]}
                        <span className="text-xs font-medium text-gray-500 ml-0.5">만원</span>
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">/ 1주</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-12 bg-light p-6 rounded">
            <h3 className="font-semibold text-primary mb-3">참고사항</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>상기 요금은 1주 기본 대관료이며, VAT는 별도입니다.</li>
              <li>2주 이상 대관 시 별도 할인이 적용됩니다.</li>
              <li>2개 이상의 전시관을 동시 대관 시 10% 할인이 적용됩니다.</li>
              <li>비영리 단체 및 신진 작가의 경우 별도 협의가 가능합니다.</li>
              <li>대관료에는 기본 조명, 전기, 냉난방비가 포함되어 있습니다.</li>
              <li>설치/철수 기간은 대관 기간에 포함됩니다.</li>
              <li>B1F B1전시관은 시간 단위 대관도 가능합니다 (별도 문의).</li>
            </ul>
          </div>

          <div className="text-center mt-10">
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
