import { Link } from 'react-router-dom';

const spaces = [
  {
    floor: 'b1f', label: 'B1F', name: '제1전시관', area: 200, height: 4.5, capacity: 100,
    desc: '미디어아트와 설치미술에 최적화된 공간으로, 암실 구현 및 대형 프로젝션 설치가 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=600',
    features: ['암실 구현 가능', '대형 프로젝션', '전문 음향 시스템', '가변형 조명'],
  },
  {
    floor: '1f', label: '1F', name: '제2전시관', area: 180, height: 5.0, capacity: 80,
    desc: '기획전시와 회화 전시의 중심 공간으로, 높은 천장고와 자연광 유입이 특징입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=600',
    features: ['자연광 유입', '높은 천장고', '가벽 설치', '트랙 조명'],
  },
  {
    floor: '2f', label: '2F', name: '제3전시관', area: 160, height: 3.5, capacity: 60,
    desc: '개인전 및 그룹전에 적합한 공간으로, 자유로운 가벽 설치로 다양한 전시 구성이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600',
    features: ['자유 가벽 배치', '스팟 조명', 'LED 월 조명', '작품 보관실'],
  },
  {
    floor: '3f', label: '3F', name: '제4전시관', area: 150, height: 3.2, capacity: 50,
    desc: '사진, 공예 등 소규모 작품 전시에 최적화되어 있으며, 섬세한 조명 컨트롤이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
    features: ['디밍 조명', '전시 진열장', '항온항습', '섬세한 조도 조절'],
  },
  {
    floor: '4f', label: '4F', name: '다목적홀', area: 200, height: 6.0, capacity: 150,
    desc: '세미나, 공연, 특별전시가 가능한 다목적 공간으로, 가변형 무대와 조명 시스템을 갖추고 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    features: ['가변형 무대', '프로젝터/스크린', '무선 마이크', '150석 좌석'],
  },
];

export default function SpacesPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">공간안내</h1>
          <p className="text-gray-400 text-sm">Exhibition Spaces</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-12">
            지하 1층부터 지상 4층까지, 총 5개의 전시 공간을 갖추고 있습니다.
          </p>

          <div className="space-y-12">
            {spaces.map((space, idx) => (
              <Link
                key={space.floor}
                to={`/spaces/${space.floor}`}
                className="group block"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  idx % 2 === 1 ? 'md:direction-rtl' : ''
                }`}>
                  <div className={`overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={space.imageUrl}
                      alt={space.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                    <span className="text-3xl font-bold text-accent">{space.label}</span>
                    <h3 className="text-xl font-bold text-primary mt-2">{space.name}</h3>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{space.desc}</p>
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                      <span>면적: {space.area}㎡</span>
                      <span>천장고: {space.height}m</span>
                      <span>수용: {space.capacity}명</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {space.features.map((f) => (
                        <span key={f} className="text-xs bg-light px-3 py-1 text-gray-600 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
