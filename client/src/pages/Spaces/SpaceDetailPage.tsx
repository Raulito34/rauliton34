import { useParams, Link } from 'react-router-dom';

const spacesData: Record<string, {
  label: string; name: string; area: number; pyeong: number; height: number;
  imageUrl: string; features: string[];
}> = {
  b1f: {
    label: 'B1F', name: 'B1전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: '/images/spaces/b1f.jpg',
    features: ['조명 시스템', '시스템 냉난방'],
  },
  '1f': {
    label: '1F', name: '1전시관', area: 120, pyeong: 35, height: 3.0,
    imageUrl: '/images/spaces/1f.jpg',
    features: ['대형 쇼윈도 및 도로 직접 노출', '조명 시스템', '시스템 냉난방', '엘리베이터'],
  },
  '2f': {
    label: '2F', name: '2전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: '/images/spaces/2f.jpg',
    features: ['조명 시스템', '시스템 냉난방', '엘리베이터'],
  },
  '3f': {
    label: '3F', name: '3전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: '/images/spaces/3f.jpg',
    features: ['조명 시스템', '시스템 냉난방', '엘리베이터'],
  },
  '4f': {
    label: '4F', name: '4전시관', area: 70, pyeong: 20, height: 4.3,
    imageUrl: '/images/spaces/4f.jpg',
    features: ['조명 시스템', '시스템 냉난방', '엘리베이터', '4.3m 천장고'],
  },
};

export default function SpaceDetailPage() {
  const { floor } = useParams<{ floor: string }>();
  const space = floor ? spacesData[floor] : null;

  if (!space) {
    return (
      <div className="pt-[72px] text-center py-40">
        <p className="text-[#6B6B6B] text-[15px]">공간 정보를 찾을 수 없습니다.</p>
        <Link to="/spaces" className="link-underline text-[14px] mt-6 inline-block">
          공간 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={space.imageUrl}
          alt={space.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 max-lg:p-6">
          <div className="max-w-[1280px] mx-auto">
            <span className="font-display text-[80px] font-extralight text-[rgba(250,250,248,0.2)] leading-none max-lg:text-[48px]">
              {space.label}
            </span>
            <h1 className="font-display text-[36px] font-light text-[#FAFAF8] uppercase tracking-[0.5px] mt-2 max-lg:text-[28px]">
              {space.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-[80px] max-lg:py-12">
        <div className="max-w-[960px] mx-auto px-12 max-lg:px-6">
          {/* Specs */}
          <div className="grid grid-cols-2 gap-8 mb-16">
            <div>
              <p className="text-spec-label text-[#B0B0B0] mb-3">면적</p>
              <p className="font-display text-[36px] font-light">
                {space.area}<span className="text-[18px] text-[#6B6B6B]">㎡</span>
                <span className="text-[14px] text-[#B0B0B0] ml-2">({space.pyeong}평)</span>
              </p>
            </div>
            <div>
              <p className="text-spec-label text-[#B0B0B0] mb-3">천장고</p>
              <p className="font-display text-[36px] font-light">
                {space.height}<span className="text-[18px] text-[#6B6B6B]">M</span>
              </p>
            </div>
          </div>

          <div className="thin-divider mb-16" />

          {/* Features */}
          <div className="mb-16">
            <h3 className="text-section-num text-[#B0B0B0] mb-8">시설 및 장비</h3>
            <div>
              {space.features.map((f, i) => (
                <div key={f}>
                  <div className="flex items-center gap-6 py-5">
                    <span className="text-[13px] text-[#B0B0B0] tabular-nums w-[28px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">{f}</span>
                  </div>
                  <div className="thin-divider" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 max-lg:flex-col">
            <Link to="/rental/pricing" className="btn-primary text-center">
              대관료 확인
            </Link>
            <Link to="/rental/status" className="btn-outline text-center">
              대관 신청
            </Link>
          </div>

          <div className="mt-12">
            <Link to="/spaces" className="link-underline text-[14px] text-[#6B6B6B]">
              ← 전체 공간 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
