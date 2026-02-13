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
      { label: '대관신청', path: '/rental/status' },
      { label: '신청내역', path: '/rental/list' },
    ],
  },
  {
    label: '소식',
    path: '/news',
    sub: [
      { label: '공지사항', path: '/news?category=notice' },
      { label: '선아트센터 소식', path: '/news?category=news' },
    ],
  },
  { label: '문의', path: '/contact', sub: [] },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const toggleMobileExpand = (path: string) => {
    setMobileExpanded(mobileExpanded === path ? null : path);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-logo text-[17px] sm:text-lg font-semibold tracking-tight text-primary">
              SUN ART CENTER
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.path)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-5 text-[13px] font-medium tracking-wide transition-colors ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
                {item.sub.length > 0 && activeDropdown === item.path && (
                  <div className="absolute top-full left-0 bg-white shadow-lg min-w-[180px] py-2 border-t border-primary">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-5 py-2 text-[13px] text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
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
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-gray-100 py-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.sub.length > 0 ? (
                  <button
                    onClick={() => toggleMobileExpand(item.path)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-gray-700"
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform ${mobileExpanded === item.path ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-4 py-2.5 text-[13px] font-medium text-gray-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.sub.length > 0 && mobileExpanded === item.path && (
                  <div className="bg-gray-50 py-1">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-8 py-2 text-xs text-gray-500 hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
