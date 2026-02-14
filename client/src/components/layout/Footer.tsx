import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-12 px-6">
      {/* Bold CTA */}
      <div className="max-w-7xl mx-auto mb-16">
        <h3 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase mb-4 leading-tight">
          전시를 시작하세요.
        </h3>
        <p className="text-[12px] font-light text-black/50 mb-8 max-w-sm leading-relaxed">
          선아트센터의 전시 공간을 대관하여 여러분의 예술 작품을 선보이세요.
        </p>
        <Link
          to="/rental/status"
          className="inline-block w-full sm:w-auto text-center border border-black py-4 px-12 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-colors duration-300"
        >
          대관 신청하기
        </Link>
      </div>

      {/* Info Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8 mb-16">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-black/30 mb-3">Location</p>
          <p className="text-[12px] font-light leading-relaxed text-black/80">
            서울시 종로구<br />인사동길 00
          </p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-black/30 mb-3">Contact</p>
          <p className="text-[12px] font-light leading-relaxed text-black/80">
            info@sunartcenter.com<br />02-000-0000
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/exhibition" className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">전시안내</Link>
          <Link to="/spaces" className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">공간안내</Link>
          <Link to="/rental" className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">대관안내</Link>
          <Link to="/news" className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">소식</Link>
          <Link to="/contact" className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">문의</Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto">
        <div className="catalog-border mb-6" />
        <div className="flex justify-between items-center text-black/30">
          <span className="text-[10px] font-light uppercase tracking-tighter">SUN ART CENTER</span>
          <span className="text-[8px] font-medium uppercase tracking-[0.2em]">&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
