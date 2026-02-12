import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingStatuses, getSpaceStatusForWeek } from '../../services/rentalStore';
import type { RentalBooking } from '../../types';

const spaces = [
  { key: 'B1F 제1전시관', floor: 'B1F', name: '제1전시관', area: '200㎡' },
  { key: '1F 제2전시관', floor: '1F', name: '제2전시관', area: '180㎡' },
  { key: '2F 제3전시관', floor: '2F', name: '제3전시관', area: '160㎡' },
  { key: '3F 제4전시관', floor: '3F', name: '제4전시관', area: '150㎡' },
  { key: '4F 다목적홀', floor: '4F', name: '다목적홀', area: '200㎡' },
];

const floorPlans: Record<string, string[]> = {
  'B1F 제1전시관': ['면적: 200㎡', '층고: 4.5m', '수용: 100명', '암실 구현 가능, 대형 프로젝션 4면'],
  '1F 제2전시관': ['면적: 180㎡', '층고: 5.0m', '수용: 80명', '남향 자연광, 이동식 가벽 12패널'],
  '2F 제3전시관': ['면적: 160㎡', '층고: 3.5m', '수용: 60명', '자유 가벽 배치, 스팟/월워셔 조명'],
  '3F 제4전시관': ['면적: 150㎡', '층고: 3.2m', '수용: 50명', '정밀 디밍 조명, 유리 진열장 8대'],
  '4F 다목적홀': ['면적: 200㎡', '층고: 6.0m', '수용: 150명', '가변형 무대, 4K 프로젝터'],
};

function getMonday(d: Date): Date {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d);
  mon.setDate(diff);
  mon.setHours(0, 0, 0, 0);
  return mon;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${dd}`;
}

function formatISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

interface WeekRange {
  start: Date;
  end: Date;
  label: string;
}

function generateWeeks(baseMonday: Date, count: number): WeekRange[] {
  const weeks: WeekRange[] = [];
  for (let i = 0; i < count; i++) {
    const start = addDays(baseMonday, i * 7);
    const end = addDays(start, 6);
    const startDay = dayNames[start.getDay() === 0 ? 6 : start.getDay() - 1];
    const endDay = dayNames[end.getDay() === 0 ? 6 : end.getDay() - 1];
    weeks.push({
      start,
      end,
      label: `${formatDate(start)} (${startDay}) ~ ${formatDate(end)} (${endDay})`,
    });
  }
  return weeks;
}

interface SelectedCell {
  weekIdx: number;
  spaceKey: string;
}

const statusLabelMap: Record<string, string> = {
  available: '선택',
  reviewing: '심사중',
  pending: '심사중',
  confirmed: '대관완료',
  approved: '대관완료',
};

const statusColorMap: Record<string, string> = {
  available: 'text-blue-600',
  reviewing: 'text-orange-500',
  pending: 'text-orange-500',
  confirmed: 'text-gray-400',
  approved: 'text-gray-400',
};

export default function StatusPage() {
  const navigate = useNavigate();
  const today = new Date();
  const baseMonday = getMonday(today);
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
    () => generateWeeks(addDays(baseMonday, pageOffset * 7 * WEEKS_PER_PAGE), WEEKS_PER_PAGE),
    [pageOffset],
  );

  // Build status grid from server data
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
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">대관현황</h1>
          <p className="text-gray-400 text-sm">Rental Availability</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <p className="text-gray-600 text-sm mb-4 lg:mb-0">
              대관 가능한 전시장을 선택하여 신청하세요.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-blue-100 border border-blue-400 inline-block" />
                대관가능
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-orange-100 border border-orange-400 inline-block" />
                심사중
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-gray-200 border border-gray-300 inline-block" />
                대관완료
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => { setPageOffset((p) => p - 1); setSelected([]); }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-accent transition-colors px-3 py-2 border border-gray-300 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
            <span className="text-sm font-medium text-primary">
              {formatDate(weeks[0].start)} ~ {formatDate(weeks[weeks.length - 1].end)}
            </span>
            <button
              onClick={() => { setPageOffset((p) => p + 1); setSelected([]); }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-accent transition-colors px-3 py-2 border border-gray-300 rounded"
            >
              다음
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">대관 현황을 불러오는 중...</div>
          ) : (
            <>
              {/* Calendar Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-3 px-4 text-left font-medium w-[260px] min-w-[220px]">기간</th>
                      {spaces.map((sp) => (
                        <th key={sp.key} className="py-3 px-3 text-center font-medium min-w-[120px]">
                          <div>{sp.floor}</div>
                          <div className="text-xs font-normal text-gray-300">{sp.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeks.map((week, wi) => (
                      <tr key={wi} className={wi % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 text-gray-700 font-medium text-xs whitespace-nowrap border-r border-gray-100">
                          {week.label}
                        </td>
                        {spaces.map((sp) => {
                          const status = statusGrid[sp.key][wi];
                          const checked = isSelected(wi, sp.key);
                          return (
                            <td key={sp.key} className="py-3 px-3 text-center border-r border-gray-100 last:border-r-0">
                              {isAvailable(status) ? (
                                <label className="cursor-pointer inline-flex items-center gap-1.5 select-none">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleSelect(wi, sp.key)}
                                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                                  />
                                  <span className="text-blue-600 text-xs font-medium">선택</span>
                                </label>
                              ) : (
                                <span className={`text-xs font-medium ${statusColorMap[status] || 'text-gray-400'}`}>
                                  {statusLabelMap[status] || status}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selected Summary & Apply */}
              {selected.length > 0 && (
                <div className="mt-8 border border-accent/30 rounded-lg bg-accent/5 p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">선택 내역</h3>
                  <div className="space-y-3 mb-6">
                    {(() => {
                      const grouped: Record<string, number[]> = {};
                      for (const s of selected) {
                        if (!grouped[s.spaceKey]) grouped[s.spaceKey] = [];
                        grouped[s.spaceKey].push(s.weekIdx);
                      }
                      return Object.entries(grouped).map(([spaceKey, weekIdxs]) => {
                        const sortedWeeks = weekIdxs.sort((a, b) => a - b);
                        const earliest = weeks[sortedWeeks[0]].start;
                        const latest = weeks[sortedWeeks[sortedWeeks.length - 1]].end;
                        return (
                          <div key={spaceKey} className="flex flex-wrap items-center gap-4 bg-white rounded p-4 border border-gray-200">
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-primary">{spaceKey}</span>
                              <span className="text-sm text-gray-500 ml-3">
                                {formatDate(earliest)} ~ {formatDate(latest)} ({sortedWeeks.length}주)
                              </span>
                            </div>
                            <button
                              onClick={() => setDetailSpace(spaceKey)}
                              className="text-xs text-accent hover:text-accent-light border border-accent/40 px-3 py-1.5 rounded transition-colors"
                            >
                              전시장 정보
                            </button>
                          </div>
                        );
                      });
                    })()}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleApply}
                      className="bg-accent text-white px-12 py-3 text-sm font-medium hover:bg-accent-light transition-colors rounded"
                    >
                      대관 신청하기
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Space Detail Modal */}
      {detailSpace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setDetailSpace(null)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">{detailSpace}</h3>
              <button onClick={() => setDetailSpace(null)} className="text-white/70 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-8 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <p className="text-sm text-gray-400">전시장 도면</p>
                </div>
              </div>
              <h4 className="font-medium text-primary mb-3">공간 정보</h4>
              <ul className="space-y-2">
                {(floorPlans[detailSpace] || []).map((info, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-accent mt-0.5">&#8226;</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pb-6 text-center">
              <button
                onClick={() => setDetailSpace(null)}
                className="bg-primary text-white px-8 py-2.5 text-sm font-medium hover:bg-secondary transition-colors rounded"
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
