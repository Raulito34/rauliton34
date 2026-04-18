import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[rgba(250,250,248,0.7)] pt-20 pb-12">
      <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
        {/* Top: Logo */}
        <div className="mb-16">
          <Link to="/" className="font-display text-[18px] font-normal uppercase tracking-[3px] text-[#FAFAF8]">
            Sun Art Center
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <p className="text-spec-label text-[rgba(250,250,248,0.4)] mb-4">Location</p>
            <p className="text-[14px] leading-relaxed">
              서울시 종로구<br />인사동 5길 8
            </p>
          </div>
          <div>
            <p className="text-spec-label text-[rgba(250,250,248,0.4)] mb-4">Hours</p>
            <p className="text-[14px] leading-relaxed">
              매일 10:00 — 18:00
            </p>
          </div>
          <div>
            <p className="text-spec-label text-[rgba(250,250,248,0.4)] mb-4">Contact</p>
            <p className="text-[14px] leading-relaxed">
              02-734-0458<br />
              info@sunartcenter.com
            </p>
          </div>
          <div>
            <p className="text-spec-label text-[rgba(250,250,248,0.4)] mb-4">Links</p>
            <div className="flex flex-col gap-2">
              <Link to="/exhibition" className="text-[14px] text-[rgba(250,250,248,0.5)] hover:text-[#FAFAF8] transition-colors">전시안내</Link>
              <Link to="/spaces" className="text-[14px] text-[rgba(250,250,248,0.5)] hover:text-[#FAFAF8] transition-colors">공간안내</Link>
              <Link to="/rental" className="text-[14px] text-[rgba(250,250,248,0.5)] hover:text-[#FAFAF8] transition-colors">대관안내</Link>
              <Link to="/news" className="text-[14px] text-[rgba(250,250,248,0.5)] hover:text-[#FAFAF8] transition-colors">소식</Link>
              <Link to="/contact" className="text-[14px] text-[rgba(250,250,248,0.5)] hover:text-[#FAFAF8] transition-colors">문의</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="thin-divider-light" />
        <div className="flex justify-between items-center pt-8">
          <span className="font-display text-[11px] font-normal uppercase tracking-[2px] text-[rgba(250,250,248,0.4)]">
            Sun Art Center
          </span>
          <span className="text-[11px] text-[rgba(250,250,248,0.3)]">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
