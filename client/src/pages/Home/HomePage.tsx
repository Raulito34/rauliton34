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
  { floor: 'B1F', name: '제1전시관', desc: '미디어아트 / 설치미술', path: '/spaces/b1f' },
  { floor: '1F', name: '제2전시관', desc: '기획전시 / 회화', path: '/spaces/1f' },
  { floor: '2F', name: '제3전시관', desc: '개인전 / 그룹전', path: '/spaces/2f' },
  { floor: '3F', name: '제4전시관', desc: '사진 / 공예', path: '/spaces/3f' },
  { floor: '4F', name: '다목적홀', desc: '세미나 / 공연 / 특별전', path: '/spaces/4f' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-dark flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920)',
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">
            Art Space in Seoul
          </p>
          <h1 className="font-logo text-4xl sm:text-5xl md:text-7xl font-semibold mb-8 tracking-tight">
            SUN ART CENTER
          </h1>
          <p className="text-sm md:text-base text-gray-400 mb-12 max-w-md mx-auto leading-relaxed">
            지하 1층부터 지상 4층까지,<br />
            다양한 전시와 문화를 경험하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/exhibition"
              className="bg-white text-primary px-8 py-3 text-xs font-medium tracking-wide hover:bg-gray-100 transition-colors"
            >
              전시 보기
            </Link>
            <Link
              to="/rental/status"
              className="border border-white/40 text-white px-8 py-3 text-xs font-medium tracking-wide hover:bg-white hover:text-primary transition-colors"
            >
              대관 신청
            </Link>
          </div>
        </div>
      </section>

      {/* Current Exhibition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">Current Exhibition</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">현재 전시</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentExhibitions.map((ex) => (
              <Link key={ex.id} to={`/exhibition/${ex.id}`} className="group">
                <div className="overflow-hidden">
                  <img
                    src={ex.imageUrl}
                    alt={ex.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-5">
                  <span className="text-[11px] tracking-wider text-gray-400 uppercase">{ex.floor}</span>
                  <h3 className="text-base font-semibold text-primary mt-1.5 group-hover:text-accent transition-colors">{ex.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{ex.artist}</p>
                  <p className="text-xs text-gray-400 mt-2">{ex.period}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              to="/exhibition"
              className="text-xs tracking-wide text-gray-400 hover:text-primary transition-colors border-b border-gray-300 pb-1"
            >
              전체 전시 보기 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Spaces Preview */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">Exhibition Spaces</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">B1F &mdash; 4F</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {floors.map((f) => (
              <Link
                key={f.floor}
                to={f.path}
                className="bg-white p-5 sm:p-6 text-center hover:shadow-md transition-all group border border-gray-100"
              >
                <span className="text-xl sm:text-2xl font-semibold text-primary group-hover:text-accent transition-colors">
                  {f.floor}
                </span>
                <h3 className="text-xs font-medium text-gray-600 mt-2">{f.name}</h3>
                <p className="text-[11px] text-gray-400 mt-1">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rental CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-3">Rental</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">대관 안내</h2>
          <p className="text-sm text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto">
            선아트센터의 전시 공간을 대관하여 여러분의 예술 작품을 선보이세요.<br />
            B1F부터 4F까지 다양한 규모의 공간을 제공합니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/rental/pricing"
              className="bg-white text-primary px-8 py-3 text-xs font-medium tracking-wide hover:bg-gray-100 transition-colors"
            >
              대관료 안내
            </Link>
            <Link
              to="/rental/status"
              className="border border-white/30 text-white px-8 py-3 text-xs font-medium tracking-wide hover:bg-white hover:text-primary transition-colors"
            >
              대관 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">Notice</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-primary">공지사항</h2>
            </div>
            <Link to="/news?category=notice" className="text-xs text-gray-400 hover:text-primary transition-colors">
              더보기 &rarr;
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { title: '2026년 상반기 대관 접수 안내', date: '2026.01.15' },
              { title: '설 연휴 휴관 안내 (2/7 ~ 2/10)', date: '2026.01.30' },
              { title: '제3전시관 리모델링 완료 안내', date: '2026.01.10' },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-5">
                <span className="text-sm text-gray-700">{n.title}</span>
                <span className="text-xs text-gray-400 ml-4 shrink-0">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
