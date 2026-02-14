import { Link } from 'react-router-dom';

const spaces = [
  {
    floor: 'b1f', label: 'B1F', name: '제1전시관', tag: '미디어아트',
    area: '200㎡', capacity: 100,
    desc: '미디어아트와 설치미술에 최적화된 공간으로, 암실 구현 및 대형 프로젝션 설치가 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=800',
    features: ['암실 구현 가능', '대형 프로젝션', '전문 음향 시스템', '가변형 조명'],
  },
  {
    floor: '1f', label: '1F', name: '제2전시관', tag: '기획전시',
    area: '180㎡', capacity: 80,
    desc: '기획전시와 회화 전시의 중심 공간으로, 높은 천장고와 자연광 유입이 특징입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=800',
    features: ['자연광 유입', '높은 천장고', '가벽 설치', '트랙 조명'],
  },
  {
    floor: '2f', label: '2F', name: '제3전시관', tag: '개인전/그룹전',
    area: '160㎡', capacity: 60,
    desc: '개인전 및 그룹전에 적합한 공간으로, 자유로운 가벽 설치로 다양한 전시 구성이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800',
    features: ['자유 가벽 배치', '스팟 조명', 'LED 월 조명', '작품 보관실'],
  },
  {
    floor: '3f', label: '3F', name: '제4전시관', tag: '사진/공예',
    area: '150㎡', capacity: 50,
    desc: '사진, 공예 등 소규모 작품 전시에 최적화되어 있으며, 섬세한 조명 컨트롤이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    features: ['디밍 조명', '전시 진열장', '항온항습', '섬세한 조도 조절'],
  },
  {
    floor: '4f', label: '4F', name: '다목적홀', tag: '세미나/공연',
    area: '200㎡', capacity: 150,
    desc: '세미나, 공연, 특별전시가 가능한 다목적 공간으로, 가변형 무대와 조명 시스템을 갖추고 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    features: ['가변형 무대', '프로젝터/스크린', '무선 마이크', '150석 좌석'],
  },
];

export default function SpacesPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="px-6 py-6 border-b border-black">
        <h1 className="text-2xl font-light tracking-tighter uppercase leading-none">공간안내</h1>
        <p className="text-[10px] mt-2 tracking-[0.3em] uppercase font-medium text-black/50">
          Space Inventory / B1F–4F
        </p>
      </div>

      {/* Space Cards — Catalog Style */}
      <main className="divide-y divide-black/5">
        {spaces.map((space, idx) => (
          <section key={space.floor} className="group card-hover-transition hover:bg-neutral-light/50">
            <div className="p-6">
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden bg-neutral-light mb-6">
                <img
                  alt={space.name}
                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-500"
                  src={space.imageUrl}
                />
              </div>

              <div className="flex flex-col space-y-4">
                {/* Title + Tag */}
                <div className="flex justify-between items-baseline border-b border-black pb-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {String(idx + 1).padStart(2, '0')}. {space.label} {space.name}
                  </h2>
                  <span className="text-[10px] tracking-widest uppercase">{space.tag}</span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-widest font-semibold py-2">
                  <div className="flex items-center border-l border-black/10 pl-3">
                    <span>면적: {space.area}</span>
                  </div>
                  <div className="flex items-center border-l border-black/10 pl-3">
                    <span>수용: {space.capacity}명</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] leading-relaxed font-light text-black/80 max-w-md">
                  {space.desc}
                </p>

                {/* CTA */}
                <div className="pt-4">
                  <Link
                    to={`/spaces/${space.floor}`}
                    className="block w-full border border-black py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-center hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    상세 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
