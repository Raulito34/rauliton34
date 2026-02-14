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
    <header className="sticky top-0 z-50 bg-white/95 blur-backdrop border-b border-black">
      <div className="px-6 py-5 flex justify-between items-end">
        {/* Logo */}
        <Link
          to="/"
          className="leading-none"
          onClick={() => setMobileOpen(false)}
        >
          <h1 className="text-xl sm:text-2xl font-light tracking-tighter uppercase leading-none">
            SUN ART CENTER
          </h1>
          <p className="text-[10px] mt-1.5 tracking-[0.3em] uppercase font-medium text-black/50">
            Space Inventory / 2026
          </p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-end gap-0">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.path)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className={`px-3 text-[10px] font-semibold tracking-[0.15em] uppercase transition-colors ${
                  isActive(item.path)
                    ? 'text-black'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
              {item.sub.length > 0 && activeDropdown === item.path && (
                <div className="absolute top-full right-0 bg-white border border-black/5 min-w-[180px] py-3 mt-4">
                  <div className="thin-divider mb-2" />
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block px-5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-black/50 hover:text-black transition-colors"
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
          className="lg:hidden flex items-center text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          <span className="material-symbols-outlined font-light text-[22px]">
            {mobileOpen ? 'close' : 'filter_list'}
          </span>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden px-6 py-4 max-h-[calc(100vh-5rem)] overflow-y-auto bg-white border-t border-black/5">
          {navItems.map((item) => (
            <div key={item.path} className="mb-0">
              {item.sub.length > 0 ? (
                <button
                  onClick={() => toggleMobileExpand(item.path)}
                  className="w-full flex items-center justify-between py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 border-b border-black/5"
                >
                  {item.label}
                  <span className={`text-[10px] text-black/30 transition-transform ${mobileExpanded === item.path ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="block py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 border-b border-black/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
              {item.sub.length > 0 && mobileExpanded === item.path && (
                <div className="pb-2 pl-4 border-b border-black/5">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block py-2 text-[10px] font-medium uppercase tracking-wide text-black/40 hover:text-black"
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
    </header>
  );
}
