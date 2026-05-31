import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: '센터소개',
    path: '/about',
    sub: [
      { label: '인사말', path: '/about/greeting' },
      { label: '관람안내', path: '/about/visitor-info' },
      { label: '건축', path: '/about/architecture' },
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the full-screen mobile overlay is open.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const toggleMobileExpand = (path: string) => {
    setMobileExpanded(mobileExpanded === path ? null : path);
  };

  // Close the desktop dropdown when focus leaves the menu group entirely.
  const handleGroupBlur = (e: React.FocusEvent<HTMLDivElement>, path: string) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setActiveDropdown((cur) => (cur === path ? null : cur));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAFAF8]/92 backdrop-blur-[20px] shadow-[0_1px_0_rgba(26,26,26,0.06)]'
          : 'bg-[#FAFAF8]/80 backdrop-blur-[12px]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-12 h-[72px] flex justify-between items-center max-lg:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-[18px] font-normal uppercase tracking-[3px] text-[#1A1A1A] hover:text-[#3A3A3A] transition-colors"
        >
          Sun Art Center
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="주 메뉴">
          {navItems.map((item) => {
            const hasSub = item.sub.length > 0;
            const open = activeDropdown === item.path;
            return (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => hasSub && setActiveDropdown(item.path)}
                onMouseLeave={() => hasSub && setActiveDropdown(null)}
                onFocus={() => hasSub && setActiveDropdown(item.path)}
                onBlur={(e) => hasSub && handleGroupBlur(e, item.path)}
                onKeyDown={(e) => { if (e.key === 'Escape') setActiveDropdown(null); }}
              >
                <Link
                  to={item.path}
                  aria-haspopup={hasSub ? 'menu' : undefined}
                  aria-expanded={hasSub ? open : undefined}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`font-display text-[14px] font-normal uppercase tracking-[1px] px-5 py-2 transition-colors inline-block ${
                    isActive(item.path)
                      ? 'text-[#1A1A1A]'
                      : 'text-[#B0B0B0] hover:text-[#1A1A1A]'
                  }`}
                >
                  {item.label}
                </Link>

                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#1A1A1A]" />
                )}

                {/* Dropdown */}
                {hasSub && open && (
                  <div className="absolute top-full left-0 pt-3 min-w-[200px]" role="menu" aria-label={item.label}>
                    <div className="bg-[#FAFAF8] shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-4">
                      <div className="thin-divider mb-3" />
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          role="menuitem"
                          className="block px-6 py-2.5 text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden font-display text-[12px] font-normal tracking-[2px] uppercase text-[#1A1A1A]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? 'Close' : 'Index'}
        </button>
      </div>

      {/* Mobile Nav — Full-screen overlay */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
          className="lg:hidden fixed inset-0 top-[72px] bg-[#FAFAF8] z-40 overflow-y-auto px-6 pt-4 pb-20"
        >
          {navItems.map((item) => (
            <div key={item.path}>
              {item.sub.length > 0 ? (
                <button
                  onClick={() => toggleMobileExpand(item.path)}
                  aria-haspopup="menu"
                  aria-expanded={mobileExpanded === item.path}
                  className="w-full flex items-center justify-between py-2 font-display text-[18px] font-normal uppercase tracking-[3px] text-[#1A1A1A]"
                >
                  {item.label}
                  <span className={`text-[14px] text-[#B0B0B0] transition-transform duration-300 ${mobileExpanded === item.path ? 'rotate-45' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className="block py-2 font-display text-[18px] font-normal uppercase tracking-[3px] text-[#1A1A1A]"
                >
                  {item.label}
                </Link>
              )}
              {item.sub.length > 0 && mobileExpanded === item.path && (
                <div className="pb-2 pl-3" role="menu" aria-label={item.label}>
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      role="menuitem"
                      className="block py-1.5 text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
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
