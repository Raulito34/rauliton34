import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ART CENTER</h3>
            <p className="text-sm leading-relaxed">
              서울시 종로구 인사동길 00<br />
              아트센터 (B1F ~ 4F)
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <ul className="text-sm space-y-2">
              <li>TEL: 02-000-0000</li>
              <li>FAX: 02-000-0001</li>
              <li>Email: info@artcenter.com</li>
              <li>운영시간: 10:00 - 18:00 (월요일 휴관)</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">바로가기</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/exhibition" className="hover:text-accent transition-colors">전시안내</Link></li>
              <li><Link to="/spaces" className="hover:text-accent transition-colors">공간안내</Link></li>
              <li><Link to="/rental/apply" className="hover:text-accent transition-colors">대관신청</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">문의하기</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 ART CENTER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
