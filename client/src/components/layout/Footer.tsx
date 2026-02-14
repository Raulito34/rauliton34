import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-20 px-6">
      {/* Bold CTA */}
      <div className="max-w-7xl mx-auto mb-20">
        <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
          전시를 <br />시작하세요.
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-wide text-black/40 mb-8 max-w-[280px]">
          선아트센터의 전시 공간을 대관하여 여러분의 예술 작품을 선보이세요.
        </p>
        <Link
          to="/rental/status"
          className="inline-block text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors"
        >
          대관 신청하기
        </Link>
      </div>

      {/* Info Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8 mb-20">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mb-4">Location</p>
          <p className="text-[11px] font-bold uppercase leading-relaxed">
            서울시 종로구<br />인사동길 00
          </p>
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mb-4">Contact</p>
          <p className="text-[11px] font-bold uppercase leading-relaxed">
            info@sunartcenter.com<br />02-000-0000
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/exhibition" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">전시안내</Link>
          <Link to="/spaces" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">공간안내</Link>
          <Link to="/rental" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">대관안내</Link>
          <Link to="/news" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">소식</Link>
          <Link to="/contact" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">문의</Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto">
        <div className="thin-divider mb-8" />
        <div className="flex justify-between items-center text-black/30">
          <span className="text-[10px] font-black uppercase tracking-tighter">Sun Art Center</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.2em]">&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
