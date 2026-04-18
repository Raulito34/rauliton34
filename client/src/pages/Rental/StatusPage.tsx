import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingStatuses, getSpaceStatusForWeek } from '../../services/rentalStore';
import type { RentalBooking } from '../../types';

const spaces = [
  { key: 'B1F B1전시관', label: 'B1', name: 'B1 전시관', area: '250㎡' },
  { key: '1F 1전시관',  label: '01', name: '1 전시관',  area: '120㎡' },
  { key: '2F 2전시관',  label: '02', name: '2 전시관',  area: '250㎡' },
  { key: '3F 3전시관',  label: '03', name: '3 전시관',  area: '250㎡' },
  { key: '4F 4전시관',  label: '04', name: '4 전시관',  area: '70㎡'  },
];

const floorPlans: Record<string, string[]> = {
  '1F 1전시관':  ['120㎡ (35평)', '천장고 3.0M', '유리 파사드', '인사동 거리 노출'],
  '2F 2전시관':  ['250㎡ (75평)', '천장고 2.6M', '시멘트 바닥 · 화이트 월'],
  '3F 3전시관':  ['250㎡ (75평)', '천장고 2.6M', '분할 가능 공간'],
  '4F 4전시관':  ['70㎡ (20평)',  '천장고 4.3M', '높은 천장 · 조각 · 설치 적합'],
  'B1F B1전시관': ['250㎡ (75평)', '천장고 2.6M', '완전 차광 · 미디어아트'],
};

function getTuesday(d: Date): Date {
  const day = d.getDay();
  const diff = day >= 2 ? day - 2 : day - 2 + 7;
  const tue = new Date(d);
  tue.setDate(tue.getDate() - diff);
  tue.setHours(0, 0, 0, 0);
  return tue;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function formatDate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${m}.${dd}`;
}

function formatISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function generateWeeks(baseTuesday: Date, count: number) {
  const weeks: { start: Date; end: Date; month: string }[] = [];
  for (let i = 0; i < count; i++) {
    const start = addDays(baseTuesday, i * 7);
    const end = addDays(start, 6);
    weeks.push({
      start,
      end,
      month: `${start.getMonth() + 1}월`,
    });
  }
  return weeks;
}

interface SelectedCell {
  weekIdx: number;
  spaceKey: string;
}

export default function StatusPage() {
  const navigate = useNavigate();
  const today = new Date();
  const baseTuesday = getTuesday(today);
  const WEEKS_PER_PAGE = 8;

  const [pageOffset, setPageOffset] = useState(0);
  const [selected, setSelected] = useState<SelectedCell[]>([]);
  const [detailSpace, setDetailSpace] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Pick<RentalBooking, 'id' | 'spaceName' | 'startDate' | 'endDate' | 'status'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBookingStatuses()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const weeks = useMemo(
    () => generateWeeks(addDays(baseTuesday, pageOffset * 7 * WEEKS_PER_PAGE), WEEKS_PER_PAGE),
    [pageOffset, baseTuesday],
  );

  const statusGrid = useMemo(() => {
    const grid: Record<string, string[]> = {};
    for (const sp of spaces) {
      grid[sp.key] = weeks.map((w) => getSpaceStatusForWeek(bookings, sp.key, w.start, w.end));
    }
    return grid;
  }, [weeks, bookings]);

  const toggleSelect = (weekIdx: number, spaceKey: string) => {
    const exists = selected.find((s) => s.weekIdx === weekIdx && s.spaceKey === spaceKey);
    if (exists) {
      setSelected(selected.filter((s) => !(s.weekIdx === weekIdx && s.spaceKey === spaceKey)));
    } else {
      setSelected([...selected, { weekIdx, spaceKey }]);
    }
  };

  const isSelected = (weekIdx: number, spaceKey: string) =>
    selected.some((s) => s.weekIdx === weekIdx && s.spaceKey === spaceKey);

  const handleApply = () => {
    if (selected.length === 0) return;

    let earliest = weeks[selected[0].weekIdx].start;
    let latest = weeks[selected[0].weekIdx].end;
    const spaceNames = new Set<string>();

    for (const s of selected) {
      const w = weeks[s.weekIdx];
      if (w.start < earliest) earliest = w.start;
      if (w.end > latest) latest = w.end;
      spaceNames.add(s.spaceKey);
    }

    const params = new URLSearchParams({
      space: Array.from(spaceNames)[0],
      startDate: formatISO(earliest),
      endDate: formatISO(latest),
    });
    navigate(`/rental/apply?${params.toString()}`);
  };

  const isAvailable = (status: string) => status === 'available';

  return (
    <div className="bg-[var(--canvas)] min-h-screen">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-12 max-lg:pt-20 max-lg:pb-8">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <span className="text-section-num text-[var(--ink-mist)]">Availability</span>
        </div>
      </section>

      {/* ═══ Legend & Navigation ═══ */}
      <section className="pb-8">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-t border-b border-[var(--line)]">
            <div className="flex items-center gap-6 max-lg:gap-4 text-[12px] tracking-[0.1em] uppercase text-[var(--ink-mist)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'oklch(60% 0.18 145)' }} />
                가능
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'oklch(70% 0.12 60)' }} />
                심사중
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--ink-faint)]" />
                마감
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => { setPageOffset((p) => Math.max(0, p - 1)); setSelected([]); }}
                disabled={pageOffset === 0}
                className="w-10 h-10 flex items-center justify-center border border-[var(--line-strong)] hover:bg-[var(--canvas-warm)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="이전 기간"
              >
                ←
              </button>
              <span className="text-[13px] tabular-nums text-[var(--ink-soft)] min-w-[160px] text-center">
                {formatDate(weeks[0].start)} — {formatDate(weeks[weeks.length - 1].end)}
              </span>
              <button
                onClick={() => { setPageOffset((p) => p + 1); setSelected([]); }}
                className="w-10 h-10 flex items-center justify-center border border-[var(--line-strong)] hover:bg-[var(--canvas-warm)] transition-colors"
                aria-label="다음 기간"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Availability Grid ═══ */}
      <section className="pb-16">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          {loading ? (
            <div className="py-32 text-center text-[var(--ink-mist)] text-[14px]">
              <div className="inline-block w-1 h-1 rounded-full bg-[var(--ink-mist)] animate-pulse" />
              <span className="ml-3">Loading availability...</span>
            </div>
          ) : (
            <div className="border-t border-[var(--line)]">
              {/* Header row */}
              <div className="grid grid-cols-[180px_repeat(5,1fr)] max-lg:grid-cols-[100px_repeat(5,1fr)] gap-0 py-4 border-b border-[var(--line)] sticky top-[72px] bg-[var(--canvas)] z-10">
                <div className="text-spec-label text-[var(--ink-mist)] px-2">Week</div>
                {spaces.map((sp) => (
                  <button
                    key={sp.key}
                    onClick={() => setDetailSpace(sp.key)}
                    className="text-center px-2 group cursor-pointer"
                  >
                    <div className="font-display text-[clamp(1rem,1.5vw,1.375rem)] font-light tabular-nums leading-none group-hover:text-[var(--ink-soft)] transition-colors">
                      {sp.label}
                    </div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-[var(--ink-mist)] mt-1 max-lg:hidden">
                      {sp.area}
                    </div>
                  </button>
                ))}
              </div>

              {/* Week rows */}
              {weeks.map((week, wi) => {
                const prevMonth = wi > 0 ? weeks[wi - 1].month : '';
                const showMonth = wi === 0 || week.month !== prevMonth;
                return (
                  <div
                    key={wi}
                    className="grid grid-cols-[180px_repeat(5,1fr)] max-lg:grid-cols-[100px_repeat(5,1fr)] gap-0 border-b border-[var(--line)] hover:bg-[var(--canvas-warm)]/50 transition-colors"
                  >
                    <div className="py-4 px-2 flex items-center gap-3">
                      {showMonth && (
                        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--ink-faint)] font-display">
                          {week.month}
                        </span>
                      )}
                      <span className="text-[13px] tabular-nums text-[var(--ink-soft)]">
                        {formatDate(week.start)}
                      </span>
                    </div>
                    {spaces.map((sp) => {
                      const status = statusGrid[sp.key][wi];
                      const checked = isSelected(wi, sp.key);
                      const available = isAvailable(status);
                      return (
                        <button
                          key={sp.key}
                          onClick={() => available && toggleSelect(wi, sp.key)}
                          disabled={!available}
                          className={`
                            relative py-4 px-2 flex items-center justify-center text-[12px] tracking-wide
                            border-l border-[var(--line)]
                            transition-all duration-200
                            ${available ? 'cursor-pointer hover:bg-[var(--canvas-warm)]' : 'cursor-not-allowed'}
                            ${checked ? 'bg-[var(--ink)] text-[var(--canvas)]' : ''}
                          `}
                          style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
                        >
                          {checked ? (
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--canvas)]" />
                              <span className="font-medium">선택</span>
                            </span>
                          ) : available ? (
                            <span className="text-[var(--ink-mist)]" style={{ color: 'oklch(55% 0.12 145)' }}>
                              가능
                            </span>
                          ) : status === 'reviewing' || status === 'pending' ? (
                            <span style={{ color: 'oklch(62% 0.10 60)' }}>심사중</span>
                          ) : (
                            <span className="text-[var(--ink-faint)]">마감</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ Selection Summary — sticky bottom ═══ */}
      {selected.length > 0 && (
        <div className="sticky bottom-0 z-20 bg-[var(--void)] text-[var(--snow)] border-t border-[rgba(250,250,248,0.1)] shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
          <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6 py-5 max-lg:py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 max-lg:gap-3 flex-wrap">
                <div>
                  <div className="text-spec-label text-[rgba(250,250,248,0.5)] mb-1">Selected</div>
                  <div className="font-display text-[20px] font-light tabular-nums">
                    {selected.length}주 · {new Set(selected.map(s => s.spaceKey)).size}개 공간
                  </div>
                </div>

                <div className="hidden lg:flex gap-2 flex-wrap max-w-[600px]">
                  {(() => {
                    const grouped: Record<string, number[]> = {};
                    for (const s of selected) {
                      if (!grouped[s.spaceKey]) grouped[s.spaceKey] = [];
                      grouped[s.spaceKey].push(s.weekIdx);
                    }
                    return Object.entries(grouped).map(([spaceKey, idxs]) => {
                      const sp = spaces.find(s => s.key === spaceKey);
                      return (
                        <span
                          key={spaceKey}
                          className="text-[12px] tracking-wide px-3 py-1.5 bg-[rgba(250,250,248,0.1)] border border-[rgba(250,250,248,0.15)]"
                        >
                          {sp?.label} · {idxs.length}주
                        </span>
                      );
                    });
                  })()}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelected([])}
                  className="text-[12px] tracking-[0.1em] uppercase text-[rgba(250,250,248,0.6)] hover:text-[var(--snow)] transition-colors"
                >
                  초기화
                </button>
                <button
                  onClick={handleApply}
                  className="px-8 py-3.5 bg-[var(--snow)] text-[var(--ink)] text-[12px] tracking-[0.1em] uppercase font-medium hover:bg-[oklch(92%_0.004_80)] transition-colors"
                >
                  신청하기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Space Detail Drawer ═══ */}
      {detailSpace && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center lg:items-center bg-[oklch(10%_0.005_80/0.6)] backdrop-blur-sm animate-fade-up"
          style={{ '--delay': '0ms' } as React.CSSProperties}
          onClick={() => setDetailSpace(null)}
        >
          <div
            className="bg-[var(--canvas)] w-full max-w-[520px] mx-0 lg:mx-4 p-10 max-lg:p-6 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="text-spec-label text-[var(--ink-mist)]">Space</span>
                <h3 className="font-display text-[clamp(1.5rem,2vw,2rem)] font-light mt-2">
                  {spaces.find(s => s.key === detailSpace)?.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailSpace(null)}
                className="w-8 h-8 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <ul className="space-y-4 border-t border-[var(--line)] pt-6">
              {(floorPlans[detailSpace] || []).map((info, i) => (
                <li key={i} className="flex items-baseline gap-4">
                  <span className="text-[11px] font-display tabular-nums text-[var(--ink-faint)] tracking-wider shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] text-[var(--ink-soft)] leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex gap-3">
              <button
                onClick={() => setDetailSpace(null)}
                className="flex-1 btn-outline"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
