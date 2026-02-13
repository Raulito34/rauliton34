import { useParams, Link } from 'react-router-dom';

const spacesData: Record<string, {
  label: string; name: string; area: number; height: number; capacity: number;
  desc: string; imageUrl: string; features: string[]; details: string;
}> = {
  b1f: {
    label: 'B1F', name: '제1전시관', area: 200, height: 4.5, capacity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=1200',
    features: ['암실 구현 가능', '대형 프로젝션 4면', '전문 음향 시스템 (5.1ch)', '가변형 LED 조명', '방음 처리', '항온항습 시스템'],
    desc: '미디어아트와 설치미술에 최적화된 공간',
    details: '지하 1층 제1전시관은 미디어아트, 설치미술, 영상 작품 전시를 위해 특별히 설계된 공간입니다. 완전 암실 구현이 가능하며, 4면 프로젝션과 5.1채널 음향 시스템을 갖추고 있어 몰입형 전시 연출에 최적입니다. 방음 처리가 되어 있어 사운드 아트 작품 전시에도 적합합니다.',
  },
  '1f': {
    label: '1F', name: '제2전시관', area: 180, height: 5.0, capacity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=1200',
    features: ['남향 자연광 유입', '5m 천장고', '이동식 가벽 12패널', '트랙 조명 시스템', '작품 반입구 (대형)', '무장애 접근'],
    desc: '기획전시와 회화 전시의 중심 공간',
    details: '1층 제2전시관은 선아트센터의 대표 전시 공간으로, 5m의 높은 천장고와 남향 채광창을 통한 자연광 유입이 특징입니다. 대형 회화 작품의 전시에 최적이며, 12패널의 이동식 가벽을 활용하여 다양한 전시 동선을 구성할 수 있습니다.',
  },
  '2f': {
    label: '2F', name: '제3전시관', area: 160, height: 3.5, capacity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1200',
    features: ['자유 가벽 배치', '스팟/월워셔 조명', 'LED 월 조명', '별도 작품 보관실', '카페 인접', 'Wi-Fi'],
    desc: '개인전 및 그룹전에 적합한 공간',
    details: '2층 제3전시관은 개인전과 소규모 그룹전에 적합한 아늑한 규모의 전시 공간입니다. 가벽 배치의 자유도가 높아 작가의 의도에 맞는 공간 연출이 가능하며, 인접한 카페 공간과 연계하여 오프닝 리셉션 등의 행사 진행이 용이합니다.',
  },
  '3f': {
    label: '3F', name: '제4전시관', area: 150, height: 3.2, capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200',
    features: ['정밀 디밍 조명', '유리 진열장 8대', '항온항습 (20±2°C, 50±5%)', '보안 시스템', '작품 핸들링 장비', 'UV 차단 조명'],
    desc: '사진, 공예 등 소규모 작품 전시에 최적화',
    details: '3층 제4전시관은 사진, 공예, 판화 등 섬세한 작품의 전시에 최적화된 공간입니다. 정밀 디밍이 가능한 조명 시스템과 UV 차단 조명으로 작품 보호에 만전을 기하며, 유리 진열장 8대를 비치하여 입체 작품 전시도 가능합니다.',
  },
  '4f': {
    label: '4F', name: '다목적홀', area: 200, height: 6.0, capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    features: ['가변형 무대 (8m x 4m)', '4K 프로젝터/스크린', '무선 마이크 4채널', '접이식 좌석 150석', '동시통역 부스', '리셉션 공간'],
    desc: '세미나, 공연, 특별전시가 가능한 다목적 공간',
    details: '4층 다목적홀은 전시뿐 아니라 세미나, 강연, 소규모 공연, 아트 토크, 워크숍 등 다양한 문화 행사를 진행할 수 있는 다목적 공간입니다. 8m x 4m 가변형 무대와 150석 규모의 접이식 좌석, 4K 프로젝터 등 최신 시설을 갖추고 있습니다.',
  },
};

export default function SpaceDetailPage() {
  const { floor } = useParams<{ floor: string }>();
  const space = floor ? spacesData[floor] : null;

  if (!space) {
    return (
      <div className="pt-20 text-center py-40">
        <p className="text-gray-500">공간 정보를 찾을 수 없습니다.</p>
        <Link to="/spaces" className="text-accent mt-4 inline-block">공간 목록으로 →</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-accent text-4xl font-bold">{space.label}</span>
          <h1 className="text-3xl font-bold mt-2">{space.name}</h1>
          <p className="text-gray-400 text-sm mt-1">{space.desc}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <img
            src={space.imageUrl}
            alt={space.name}
            className="w-full h-96 object-cover mb-10"
          />

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-light p-6 rounded text-center">
              <span className="text-xs text-gray-500">면적</span>
              <p className="text-2xl font-bold text-primary">{space.area}<span className="text-sm">㎡</span></p>
            </div>
            <div className="bg-light p-6 rounded text-center">
              <span className="text-xs text-gray-500">천장고</span>
              <p className="text-2xl font-bold text-primary">{space.height}<span className="text-sm">m</span></p>
            </div>
            <div className="bg-light p-6 rounded text-center">
              <span className="text-xs text-gray-500">수용인원</span>
              <p className="text-2xl font-bold text-primary">{space.capacity}<span className="text-sm">명</span></p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">공간 소개</h2>
            <p className="text-gray-600 leading-relaxed">{space.details}</p>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">시설 및 장비</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {space.features.map((f) => (
                <div key={f} className="bg-light p-3 rounded text-sm text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 justify-center mt-12">
            <Link
              to="/rental/pricing"
              className="bg-accent text-white px-8 py-3 text-sm font-medium hover:bg-accent-light transition-colors"
            >
              대관료 확인
            </Link>
            <Link
              to="/rental/apply"
              className="border border-primary text-primary px-8 py-3 text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            >
              대관 신청
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link to="/spaces" className="text-sm text-accent border-b border-accent pb-1">
              ← 전체 공간 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
