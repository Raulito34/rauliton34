import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Info */}
          <div>
            <h3 className="font-logo text-white text-lg font-semibold tracking-tight mb-4">
              SUN ART CENTER
            </h3>
            <p className="text-sm leading-relaxed">
              서울시 종로구 인사동길 00<br />
              선아트센터 (B1F ~ 4F)
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-widest uppercase mb-4">Contact</h4>
            <ul className="text-sm space-y-2">
              <li>TEL: 02-000-0000</li>
              <li>FAX: 02-000-0001</li>
              <li>Email: info@sunartcenter.com</li>
              <li>운영시간: 10:00 - 18:00 (월요일 휴관)</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-medium tracking-widest uppercase mb-4">Links</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/exhibition" className="hover:text-white transition-colors">전시안내</Link></li>
              <li><Link to="/spaces" className="hover:text-white transition-colors">공간안내</Link></li>
              <li><Link to="/rental/status" className="hover:text-white transition-colors">대관신청</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-600">
          <p>&copy; 2026 SUN ART CENTER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
