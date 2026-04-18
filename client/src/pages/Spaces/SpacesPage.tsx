import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const spaces = [
  {
    floor: '1f', label: '1F', name: '1전시관', area: 120, pyeong: 35, height: 3.0,
    desc: '통유리 파사드를 통해 인사동 거리와 맞닿은 개방적 공간',
    imageUrl: '/images/spaces/1f.jpg',
  },
  {
    floor: '2f', label: '2F', name: '2전시관', area: 250, pyeong: 75, height: 2.6,
    desc: '시멘트 바닥과 화이트 월이 만드는 정제된 전시 공간',
    imageUrl: '/images/spaces/2f.jpg',
  },
  {
    floor: '3f', label: '3F', name: '3전시관', area: 250, pyeong: 75, height: 2.6,
    desc: '넓은 벽면과 균일한 조명, 어떤 장르든 담아내는 캔버스',
    imageUrl: '/images/spaces/3f.jpg',
  },
  {
    floor: '4f', label: '4F', name: '4전시관', area: 70, pyeong: 20, height: 4.3,
    desc: '4.3M 높은 천장고가 특징인 소규모 전시 공간',
    imageUrl: '/images/spaces/4f.jpg',
  },
  {
    floor: 'b1f', label: 'B1F', name: 'B1전시관', area: 250, pyeong: 75, height: 2.6,
    desc: '외부 빛이 차단된 독립 공간, 미디어아트와 몰입형 설치에 적합',
    imageUrl: '/images/spaces/b1f.jpg',
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function SpacesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="pt-24 pb-16 max-lg:pt-16 max-lg:pb-10">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <h1 className="text-page-title max-lg:text-[32px]">공간안내</h1>
          <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">
            Space Inventory
          </p>
          <div className="thin-divider mt-8" />
          <p className="text-[15px] text-[#6B6B6B] mt-8 max-w-[480px] leading-relaxed">
            지하 1층부터 지상 4층까지, 총 5개의 전시 공간을 갖추고 있습니다.
            회화, 조각, 설치, 미디어 — 어떤 장르의 전시든 담아낼 준비가 되어 있습니다.
          </p>
        </div>
      </section>

      {/* Spaces — Asymmetric Layout */}
      <section className="pb-[120px] max-lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <div className="space-y-[120px] max-lg:space-y-20">
            {spaces.map((space, idx) => (
              <RevealDiv key={space.floor}>
                <Link to={`/spaces/${space.floor}`} className="block group">
                  <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className="lg:w-[60%]">
                      <div className="overflow-hidden">
                        <img
                          alt={space.name}
                          className="w-full aspect-[4/3] object-cover img-grayscale group-hover:scale-[1.02] transition-transform duration-600"
                          src={space.imageUrl}
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`lg:w-[40%] flex flex-col justify-center relative ${idx % 2 !== 0 ? 'lg:text-right' : ''}`}>
                      {/* Large faded floor label */}
                      <span className="font-display text-[120px] font-extralight leading-none text-[rgba(26,26,26,0.04)] absolute top-[-20px] max-lg:text-[80px] max-lg:static max-lg:mb-[-20px]"
                        style={idx % 2 !== 0 ? { right: 0 } : { left: 0 }}>
                        {space.label}
                      </span>

                      <div className="relative z-10">
                        <h3 className="font-display text-[28px] font-light uppercase tracking-[0.5px] mb-3">
                          {space.name}
                        </h3>
                        <p className="text-spec-label text-[#6B6B6B] mb-4">
                          {space.area}㎡ ({space.pyeong}평) · 천장고 {space.height}M
                        </p>
                        <p className="text-[14px] text-[#6B6B6B] leading-relaxed mb-6 max-w-[320px] max-lg:max-w-none"
                          style={idx % 2 !== 0 ? { marginLeft: 'auto' } : {}}>
                          {space.desc}
                        </p>
                        <span className="link-underline text-[14px] font-medium text-[#1A1A1A]">
                          상세 보기
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
