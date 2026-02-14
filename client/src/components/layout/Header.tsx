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
      { label: '1F 1전시관', path: '/spaces/1f' },
      { label: '2F 2전시관', path: '/spaces/2f' },
      { label: '3F 3전시관', path: '/spaces/3f' },
      { label: '4F 4전시관', path: '/spaces/4f' },
      { label: 'B1F B1전시관', path: '/spaces/b1f' },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="px-6 py-6 flex justify-between items-end">
        {/* Logo — SUN ART CENTER in Jost (Futura-style, no bold) */}
        <Link
          to="/"
          className="text-2xl uppercase leading-none"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, letterSpacing: '0.08em' }}
          onClick={() => setMobileOpen(false)}
        >
          SUN ART CENTER
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
                className={`px-3 pb-1 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${
                  isActive(item.path)
                    ? 'text-black'
                    : 'text-black/40 hover:text-black'
                }`}
              >
                {item.label}
              </Link>

              {/* Dropdown — pt-2 creates invisible bridge so cursor doesn't lose hover */}
              {item.sub.length > 0 && activeDropdown === item.path && (
                <div className="absolute top-full left-0 pt-2 min-w-[180px]">
                  <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-3">
                    <div className="thin-divider mb-2" />
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-5 py-2 text-[11px] font-medium uppercase tracking-wide text-black/50 hover:text-black transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[10px] font-bold tracking-[0.3em] uppercase"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? 'Close' : 'Index'}
        </button>
      </div>
      <div className="thin-divider mx-6" style={{ width: 'auto' }} />

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden px-6 py-4 max-h-[calc(100vh-5rem)] overflow-y-auto bg-white">
          {navItems.map((item) => (
            <div key={item.path} className="mb-1">
              {item.sub.length > 0 ? (
                <button
                  onClick={() => toggleMobileExpand(item.path)}
                  className="w-full flex items-center justify-between py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black/70"
                >
                  {item.label}
                  <span className={`text-[10px] text-black/30 transition-transform ${mobileExpanded === item.path ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="block py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black/70"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
              {item.sub.length > 0 && mobileExpanded === item.path && (
                <div className="pb-2 pl-4">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block py-1.5 text-[10px] font-medium uppercase tracking-wide text-black/40 hover:text-black"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="thin-divider" />
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
