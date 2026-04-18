import { Link } from 'react-router-dom';

const sections = [
  {
    label: '01',
    title: '인사말',
    desc: '선아트센터의 비전과 철학을 소개합니다.',
    path: '/about/greeting',
  },
  {
    label: '02',
    title: '건축 / 공간',
    desc: '선아트센터의 건축 설계와 공간 구성을 확인하세요.',
    path: '/about/architecture',
  },
  {
    label: '03',
    title: '오시는 길',
    desc: '선아트센터 위치와 교통편 안내입니다.',
    path: '/about/location',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="pt-24 pb-16 max-lg:pt-16 max-lg:pb-10">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <h1 className="text-page-title max-lg:text-[32px]">센터소개</h1>
          <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">About Us</p>
          <div className="thin-divider mt-8" />
        </div>
      </section>

      {/* Cards */}
      <section className="pb-[120px] max-lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {sections.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="group py-12 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r border-[rgba(26,26,26,0.1)] last:border-0"
              >
                <span className="text-section-num text-[#B0B0B0] block mb-6">{s.label}</span>
                <h3 className="font-display text-[24px] font-light uppercase tracking-[0.5px] mb-3 group-hover:text-[#3A3A3A] transition-colors">
                  {s.title}
                </h3>
                <p className="text-[14px] text-[#6B6B6B] leading-relaxed">
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
