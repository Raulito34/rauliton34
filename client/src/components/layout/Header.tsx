import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: '센터소개',
    path: '/about',
    sub: [
      { label: '인사말', path: '/about/greeting' },
      { label: '건축/공간', path: '/about/architecture' },
      { label: '오시는 길', path: '/about/location' },
    ],
  },
  {
    label: '전시안내',
    path: '/exhibition',
    sub: [
      { label: '현재전시', path: '/exhibition?status=current' },
      { label: '예정전시', path: '/exhibition?status=upcoming' },
      { label: '지난전시', path: '/exhibition?status=past' },
    ],
  },
  {
    label: '공간안내',
    path: '/spaces',
    sub: [
      { label: 'B1F 제1전시관', path: '/spaces/b1f' },
      { label: '1F 제2전시관', path: '/spaces/1f' },
      { label: '2F 제3전시관', path: '/spaces/2f' },
      { label: '3F 제4전시관', path: '/spaces/3f' },
      { label: '4F 다목적홀', path: '/spaces/4f' },
    ],
  },
  {
    label: '대관안내',
    path: '/rental',
    sub: [
      { label: '대관절차', path: '/rental/procedure' },
      { label: '대관료', path: '/rental/pricing' },
      { label: '대관규약', path: '/rental/terms' },
      { label: '대관신청', path: '/rental/apply' },
      { label: '대관현황', path: '/rental/status' },
    ],
  },
  {
    label: '소식',
    path: '/news',
    sub: [
      { label: '공지사항', path: '/news?category=notice' },
      { label: '아트센터 소식', path: '/news?category=news' },
    ],
  },
  { label: '문의', path: '/contact', sub: [] },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-xl font-bold text-primary tracking-tight">ART CENTER</span>
              <span className="block text-xs text-gray-500 tracking-widest">아트센터</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.path)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-accent'
                      : 'text-gray-700 hover:text-accent'
                  }`}
                >
                  {item.label}
                </Link>
                {item.sub.length > 0 && activeDropdown === item.path && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg min-w-[180px] py-2 border-t-2 border-accent">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-accent hover:bg-gray-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t py-4">
            {navItems.map((item) => (
              <div key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-accent"
                  onClick={() => item.sub.length === 0 && setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.sub.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    className="block px-8 py-1.5 text-sm text-gray-500 hover:text-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
