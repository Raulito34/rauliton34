export default function ArchitecturePage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">건축</h1>
          <p className="text-gray-400 text-sm">Architecture</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Building Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800"
                alt="선아트센터 외관"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                전통과 현대의 조화
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                선아트센터는 현대 건축의 미학과 기능성을 결합한 설계로,
                다목적 전시 공간의 최적화를 추구합니다. 지하 1층부터
                지상 4층까지 총 5개의 전시 공간은 각기 다른 성격과
                분위기를 가지고 있습니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                전 층을 연결하는 엘리베이터와 넓은 계단은 관람의
                연속성을 보장합니다.
              </p>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">주요 시설</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: '엘리베이터' },
                { name: '전문 조명' },
                { name: '항온항습' },
                { name: '보안 시스템' },
              ].map((facility) => (
                <div key={facility.name} className="text-center p-6 bg-light rounded">
                  <h3 className="font-semibold text-primary">{facility.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
