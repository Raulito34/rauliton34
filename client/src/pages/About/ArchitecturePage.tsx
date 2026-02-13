export default function ArchitecturePage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">건축 / 공간</h1>
          <p className="text-gray-400 text-sm">Architecture & Space</p>
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
                연속성을 보장하며, 자연광이 유입되는 설계로 작품 감상의
                질을 높였습니다.
              </p>
            </div>
          </div>

          {/* Floor Guide */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">층별 안내</h2>
            <div className="space-y-6">
              {[
                { floor: '4F', name: '다목적홀', area: '200㎡', desc: '세미나, 공연, 특별전시가 가능한 다목적 공간으로, 가변형 무대와 조명 시스템을 갖추고 있습니다.' },
                { floor: '3F', name: '제4전시관', area: '150㎡', desc: '사진, 공예 등 소규모 작품 전시에 최적화된 공간으로, 섬세한 조명 시스템을 제공합니다.' },
                { floor: '2F', name: '제3전시관', area: '160㎡', desc: '개인전 및 그룹전에 적합한 공간으로, 가벽 설치가 자유로워 다양한 전시 구성이 가능합니다.' },
                { floor: '1F', name: '제2전시관', area: '180㎡', desc: '기획전시와 회화 전시의 중심 공간으로, 높은 천장고와 자연광 유입이 특징입니다.' },
                { floor: 'B1F', name: '제1전시관', area: '200㎡', desc: '미디어아트와 설치미술에 최적화된 공간으로, 암실 구현과 대형 프로젝션이 가능합니다.' },
              ].map((f) => (
                <div key={f.floor} className="flex items-start gap-6 p-6 bg-light rounded">
                  <div className="w-20 text-center flex-shrink-0">
                    <span className="text-2xl font-bold text-accent">{f.floor}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {f.name} <span className="text-sm font-normal text-gray-400 ml-2">{f.area}</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">주요 시설</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🛗', name: '엘리베이터', desc: '작품용/관람객용 2대' },
                { icon: '💡', name: '전문 조명', desc: '트랙 조명 시스템' },
                { icon: '🌡️', name: '항온항습', desc: '최적 보존 환경' },
                { icon: '🔒', name: '보안 시스템', desc: '24시간 CCTV' },
              ].map((facility) => (
                <div key={facility.name} className="text-center p-6 bg-light rounded">
                  <span className="text-3xl">{facility.icon}</span>
                  <h3 className="font-semibold text-primary mt-3">{facility.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
