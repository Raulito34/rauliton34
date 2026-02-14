import { Link } from 'react-router-dom';

const currentExhibitions = [
  {
    id: 1,
    title: '빛의 경계',
    artist: '김현수',
    floor: '1F 제2전시관',
    period: '2026.02.01 - 2026.03.15',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
  },
  {
    id: 2,
    title: '도시의 기억',
    artist: '이서연',
    floor: '2F 제3전시관',
    period: '2026.02.10 - 2026.03.20',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600',
  },
  {
    id: 3,
    title: '디지털 자연',
    artist: '박민지',
    floor: 'B1F 제1전시관',
    period: '2026.01.20 - 2026.03.01',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600',
  },
];

const floors = [
  { floor: 'B1F', name: '제1전시관', desc: '미디어아트 / 설치미술', area: '200㎡', path: '/spaces/b1f' },
  { floor: '1F', name: '제2전시관', desc: '기획전시 / 회화', area: '180㎡', path: '/spaces/1f' },
  { floor: '2F', name: '제3전시관', desc: '개인전 / 그룹전', area: '160㎡', path: '/spaces/2f' },
  { floor: '3F', name: '제4전시관', desc: '사진 / 공예', area: '150㎡', path: '/spaces/3f' },
  { floor: '4F', name: '다목적홀', desc: '세미나 / 공연 / 특별전', area: '200㎡', path: '/spaces/4f' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero — Framed Image + Bold Headline */}
      <section className="pt-12 px-6 pb-16 bg-white">
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] p-3 sm:p-4 bg-white border-[10px] sm:border-[12px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden max-w-6xl mx-auto">
          <img
            alt="Sun Art Center"
            className="w-full h-full object-cover grayscale brightness-90 contrast-125"
            src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920"
          />
        </div>
        <div className="mt-12 flex flex-col gap-8 max-w-6xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            Art <br />
            <span className="ml-8 sm:ml-16">Meets</span> <br />
            Space.
          </h1>
          <div className="thin-divider" />
          <p className="text-[12px] sm:text-[13px] font-medium leading-relaxed max-w-[280px] uppercase tracking-wide text-black/50">
            B1F부터 4F까지 5개의 전시 공간. 예술과 건축이 만나는 선아트센터.
          </p>
          <div className="flex gap-4">
            <Link
              to="/exhibition"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 transition-colors"
            >
              전시 보기
            </Link>
            <Link
              to="/rental/status"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/30 pb-1 text-black/40 hover:text-black hover:border-black transition-colors"
            >
              대관 신청
            </Link>
          </div>
        </div>
      </section>

      {/* Current Exhibition — Asymmetric Gallery */}
      <section className="py-16 bg-white">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">01</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">현재 전시</h2>
          </div>
          <div className="thin-divider mb-12" />

          <div className="space-y-20">
            {currentExhibitions.map((ex, i) => (
              <Link key={ex.id} to={`/exhibition/${ex.id}`} className="block group">
                <div className="flex flex-col gap-6">
                  <div className={`${i % 2 === 0 ? 'w-4/5 ml-auto' : 'w-4/5 mr-auto'} img-frame`}>
                    <img
                      src={ex.imageUrl}
                      alt={ex.title}
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className={`w-2/3 ${i % 2 === 0 ? 'pr-4' : 'ml-auto text-right pl-4'}`}>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                      {ex.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-black/50 font-medium mb-1 uppercase">
                      {ex.artist} &middot; {ex.floor}
                    </p>
                    <p className="text-[10px] text-black/30 font-medium uppercase tracking-wide mb-4">
                      {ex.period}
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1">
                      View
                    </span>
                  </div>
                </div>
                {i < currentExhibitions.length - 1 && <div className="thin-divider mt-16" />}
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/exhibition"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 transition-colors"
            >
              전체 전시 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Spaces — Dark Inverted Section */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">02</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">공간 안내</h2>
          </div>
          <div className="h-[1px] bg-white/10 mb-12" />

          <div className="space-y-0">
            {floors.map((f, i) => (
              <Link key={f.floor} to={f.path} className="block group">
                <div className="flex items-start gap-4 py-8">
                  <span className="text-[10px] font-bold text-white/20 mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-3">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">
                        {f.floor} {f.name}
                      </h4>
                      <span className="text-[10px] font-medium text-white/20">{f.area}</span>
                    </div>
                    <p className="text-[12px] font-light text-white/40 leading-relaxed uppercase tracking-wide">
                      {f.desc}
                    </p>
                  </div>
                </div>
                {i < floors.length - 1 && <div className="h-[1px] bg-white/10" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-20 bg-white">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">03</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">공지사항</h2>
          </div>
          <div className="thin-divider mb-10" />

          <div>
            {[
              { title: '2026년 상반기 대관 접수 안내', date: '2026.01.15' },
              { title: '설 연휴 휴관 안내 (2/7 ~ 2/10)', date: '2026.01.30' },
              { title: '제3전시관 리모델링 완료 안내', date: '2026.01.10' },
            ].map((n, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-5">
                  <span className="text-[12px] sm:text-sm font-medium text-black/70">{n.title}</span>
                  <span className="text-[10px] font-bold text-black/20 ml-4 shrink-0 uppercase tracking-wide">{n.date}</span>
                </div>
                <div className="thin-divider" />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/news?category=notice"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/30 pb-1 text-black/40 hover:text-black hover:border-black transition-colors"
            >
              더보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
