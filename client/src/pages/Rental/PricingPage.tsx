import { Link } from 'react-router-dom';

const pricingData = [
  { floor: '1F', name: '1전시관', area: '180㎡', week1: 250, week2: 450, week3: 600, week4: 750 },
  { floor: '2F', name: '2전시관', area: '160㎡', week1: 180, week2: 320, week3: 450, week4: 550 },
  { floor: '3F', name: '3전시관', area: '150㎡', week1: 170, week2: 300, week3: 420, week4: 520 },
  { floor: '4F', name: '4전시관', area: '200㎡', week1: 300, week2: 550, week3: 750, week4: 900 },
  { floor: 'B1F', name: 'B1전시관', area: '200㎡', week1: 200, week2: 350, week3: 500, week4: 600 },
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
          <p className="text-center text-gray-600 mb-10">
            공간별, 기간별 대관료 안내입니다. (단위: 만원, VAT 별도)
          </p>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-4 text-left text-sm font-medium">층</th>
                  <th className="p-4 text-left text-sm font-medium">공간명</th>
                  <th className="p-4 text-left text-sm font-medium">면적</th>
                  <th className="p-4 text-center text-sm font-medium">1주</th>
                  <th className="p-4 text-center text-sm font-medium">2주</th>
                  <th className="p-4 text-center text-sm font-medium">3주</th>
                  <th className="p-4 text-center text-sm font-medium">4주</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((p, idx) => (
                  <tr key={p.floor} className={idx % 2 === 0 ? 'bg-white' : 'bg-light'}>
                    <td className="p-4 text-sm font-semibold text-accent">{p.floor}</td>
                    <td className="p-4 text-sm text-gray-700">{p.name}</td>
                    <td className="p-4 text-sm text-gray-500">{p.area}</td>
                    <td className="p-4 text-sm text-center text-gray-700">{p.week1}만원</td>
                    <td className="p-4 text-sm text-center text-gray-700">{p.week2}만원</td>
                    <td className="p-4 text-sm text-center text-gray-700">{p.week3}만원</td>
                    <td className="p-4 text-sm text-center text-gray-700">{p.week4}만원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {pricingData.map((p) => (
              <div key={p.floor} className="border rounded p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-accent">{p.floor}</span>
                  <span className="font-semibold text-primary">{p.name}</span>
                  <span className="text-xs text-gray-400">{p.area}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-light p-2 rounded">
                    <span className="block text-xs text-gray-500">1주</span>
                    <span className="font-semibold">{p.week1}만</span>
                  </div>
                  <div className="bg-light p-2 rounded">
                    <span className="block text-xs text-gray-500">2주</span>
                    <span className="font-semibold">{p.week2}만</span>
                  </div>
                  <div className="bg-light p-2 rounded">
                    <span className="block text-xs text-gray-500">3주</span>
                    <span className="font-semibold">{p.week3}만</span>
                  </div>
                  <div className="bg-light p-2 rounded">
                    <span className="block text-xs text-gray-500">4주</span>
                    <span className="font-semibold">{p.week4}만</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-10 bg-light p-6 rounded">
            <h3 className="font-semibold text-primary mb-3">참고사항</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>상기 요금은 기본 대관료이며, VAT는 별도입니다.</li>
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
