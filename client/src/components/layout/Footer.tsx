import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-20 px-6">
      {/* Info Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8 mb-24">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">Location</p>
          <p className="text-sm font-bold uppercase leading-relaxed">
            서울시 종로구<br />인사동5길 8
          </p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">Hours</p>
          <p className="text-sm font-bold leading-relaxed">
            10:00 ~ 18:00
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/exhibition" className="text-xs font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">전시안내</Link>
          <Link to="/spaces" className="text-xs font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">공간안내</Link>
          <Link to="/rental" className="text-xs font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">대관안내</Link>
          <Link to="/news" className="text-xs font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">소식</Link>
          <Link to="/contact" className="text-xs font-bold uppercase tracking-[0.15em] text-black/30 hover:text-black transition-colors">문의</Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto">
        <div className="thin-divider mb-8" />
        <div className="flex justify-between items-center text-black/40">
          <span className="text-xs font-black uppercase tracking-tighter">SUN ART CENTER</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
