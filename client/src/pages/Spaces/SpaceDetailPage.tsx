import { useParams, Link } from 'react-router-dom';

const spacesData: Record<string, {
  label: string; name: string; area: number; pyeong: number; height: number;
  imageUrl: string; features: string[];
}> = {
  b1f: {
    label: 'B1F', name: 'B1전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=1200',
    features: ['조명 시스템', '시스템 냉난방'],
  },
  '1f': {
    label: '1F', name: '1전시관', area: 120, pyeong: 35, height: 3.0,
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=1200',
    features: ['대형 쇼윈도 및 도로 직접 노출', '조명 시스템', '시스템 냉난방', '엘리베이터'],
  },
  '2f': {
    label: '2F', name: '2전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1200',
    features: ['조명 시스템', '시스템 냉난방', '엘리베이터'],
  },
  '3f': {
    label: '3F', name: '3전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200',
    features: ['조명 시스템', '시스템 냉난방', '엘리베이터'],
  },
  '4f': {
    label: '4F', name: '4전시관', area: 70, pyeong: 20, height: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    features: ['조명 시스템', '시스템 냉난방', '엘리베이터', '4.3m 천장고'],
  },
};

export default function SpaceDetailPage() {
  const { floor } = useParams<{ floor: string }>();
  const space = floor ? spacesData[floor] : null;

  if (!space) {
    return (
      <div className="pt-20 text-center py-40">
        <p className="text-black/50 text-[13px] font-medium">공간 정보를 찾을 수 없습니다.</p>
        <Link to="/spaces" className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 mt-4 inline-block">
          공간 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-4xl font-black text-white/20">{space.label}</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter mt-2">{space.name}</h1>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Framed Image */}
          <div className="img-frame mb-10">
            <img
              src={space.imageUrl}
              alt={space.name}
              className="w-full h-96 object-cover grayscale"
            />
          </div>

          {/* Specs */}
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Specs</span>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{space.name}</h2>
          </div>
          <div className="thin-divider mb-8" />

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="text-center py-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-black/40">면적</span>
              <p className="text-2xl font-black mt-1">{space.area}<span className="text-sm font-bold">㎡</span><span className="text-xs font-medium text-black/40 ml-1">({space.pyeong}평)</span></p>
            </div>
            <div className="text-center py-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-black/40">천장고</span>
              <p className="text-2xl font-black mt-1">{space.height}<span className="text-sm font-bold">m</span></p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-10">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Features</span>
              <h3 className="text-xl font-black uppercase tracking-tighter">시설 및 장비</h3>
            </div>
            <div className="thin-divider mb-6" />
            <div className="space-y-0">
              {space.features.map((f, i) => (
                <div key={f}>
                  <div className="flex items-center gap-4 py-4">
                    <span className="text-[10px] font-bold text-black/20">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[12px] font-medium text-black/70">{f}</span>
                  </div>
                  <div className="thin-divider" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-6 justify-center mt-12 mb-8">
            <Link
              to="/rental/pricing"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors"
            >
              대관료 확인
            </Link>
            <Link
              to="/rental/status"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors"
            >
              대관 신청
            </Link>
          </div>

          <div className="text-center mt-4 mb-8">
            <Link to="/spaces" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">
              ← 전체 공간 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
