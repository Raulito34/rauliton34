import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { RentalBooking } from '../../types';

function formatDate(iso: string): string {
  if (!iso) return '-';
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${dd}`;
}

const statusLabel: Record<string, string> = {
  pending: '심사중',
  reviewing: '심사중',
  approved: '확정',
  confirmed: '확정',
  cancelled: '취소됨',
};

// Monochromatic status — opacity + border variation, no chromatic colors
const statusStyle: Record<string, { dot: string; text: string }> = {
  pending:   { dot: 'oklch(62% 0.10 60)',  text: 'var(--ink)' },
  reviewing: { dot: 'oklch(62% 0.10 60)',  text: 'var(--ink)' },
  approved:  { dot: 'oklch(55% 0.12 145)', text: 'var(--ink)' },
  confirmed: { dot: 'oklch(55% 0.12 145)', text: 'var(--ink)' },
  cancelled: { dot: 'var(--ink-faint)',    text: 'var(--ink-mist)' },
};

const inputCls = `
  w-full bg-transparent border-0 border-b border-[var(--line-strong)]
  px-0 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)]
  focus:outline-none focus:border-[var(--ink)] transition-colors
`;

export default function RentalListPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<RentalBooking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSelectedId(null);
    try {
      const data = await api.lookupRentals(name, email);
      setBookings(data);
      if (data.length === 0) {
        setError('해당 정보로 조회된 신청 내역이 없습니다.');
      }
    } catch {
      setError('조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm('이 신청을 취소하시겠습니까?')) return;
    setCancelling(id);
    try {
      await api.cancelRental(id, email);
      const data = await api.lookupRentals(name, email);
      setBookings(data);
    } catch {
      alert('취소 처리 중 오류가 발생했습니다.');
    } finally {
      setCancelling(null);
    }
  };

  const handleReschedule = (booking: RentalBooking) => {
    const params = new URLSearchParams({
      rescheduleId: String(booking.id),
      space: booking.spaceName,
      email: booking.email,
    });
    navigate(`/rental/status?${params.toString()}`);
  };

  return (
    <div className="bg-[var(--canvas)] min-h-screen">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-12 max-lg:pt-20 max-lg:pb-8">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <span className="text-section-num text-[var(--ink-mist)]">Bookings</span>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
                신청 내역.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Lookup Form ═══ */}
      {bookings === null && (
        <section className="pb-32 max-lg:pb-20">
          <div className="mx-auto max-w-[480px] px-12 max-lg:px-6">
            <div className="border-t border-[var(--line)] pt-10">
              <p className="text-[13px] text-[var(--ink-mist)] mb-10 leading-relaxed">
                신청 시 입력한 이름과 이메일로 조회합니다.
              </p>

              <form onSubmit={handleLookup} className="space-y-10">
                <div>
                  <label className="block text-spec-label text-[var(--ink-mist)] mb-3">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="홍길동"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-spec-label text-[var(--ink-mist)] mb-3">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                    className={inputCls}
                  />
                </div>

                {error && (
                  <div className="p-4 border-l-2 border-[var(--ink)] bg-[var(--canvas-warm)] text-[13px] text-[var(--ink-soft)]">
                    {error}
                  </div>
                )}

                <div className="pt-6 flex items-center justify-between gap-4">
                  <Link to="/rental" className="text-[12px] tracking-[0.1em] uppercase text-[var(--ink-mist)] hover:text-[var(--ink)] transition-colors">
                    ← 돌아가기
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary disabled:opacity-50"
                  >
                    <span>{loading ? '조회 중 ...' : '조회'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ═══ Results ═══ */}
      {bookings !== null && (
        <section className="pb-32 max-lg:pb-20">
          <div className="mx-auto max-w-[1000px] px-12 max-lg:px-6">
            {/* Results header */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 py-6 border-t border-b border-[var(--line)] mb-0">
              <div>
                <span className="text-spec-label text-[var(--ink-mist)]">{name}</span>
                <span className="ml-4 font-display text-[18px] font-light tabular-nums">
                  {bookings.length} 건
                </span>
              </div>
              <button
                onClick={() => { setBookings(null); setError(''); }}
                className="text-[12px] tracking-[0.1em] uppercase text-[var(--ink-mist)] hover:text-[var(--ink)] transition-colors"
              >
                다시 조회
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-[15px] text-[var(--ink-mist)] mb-8">신청 내역이 없습니다.</p>
                <Link to="/rental/status" className="btn-primary"><span>대관 신청하기</span></Link>
              </div>
            ) : (
              <div>
                {bookings.map((b) => {
                  const isOpen = selectedId === b.id;
                  const status = statusStyle[b.status] || statusStyle.pending;
                  return (
                    <div
                      key={b.id}
                      className="border-b border-[var(--line)] group transition-colors"
                    >
                      <button
                        onClick={() => setSelectedId(isOpen ? null : b.id)}
                        className="w-full text-left py-6 max-lg:py-5 hover:bg-[var(--canvas-warm)]/50 transition-colors px-4 max-lg:px-2 -mx-4 max-lg:-mx-2"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-6 max-lg:gap-3 flex-wrap">
                          {/* Status indicator */}
                          <div className="flex items-center gap-2 min-w-[80px]">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: status.dot }}
                            />
                            <span className="text-[12px] tracking-[0.08em] uppercase font-medium" style={{ color: status.text }}>
                              {statusLabel[b.status] || b.status}
                            </span>
                          </div>

                          {/* Space name */}
                          <div className="flex-1 min-w-0">
                            <div className="font-display text-[clamp(1rem,1.3vw,1.25rem)] font-light">
                              {b.spaceName}
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="text-[13px] text-[var(--ink-soft)] tabular-nums font-display tracking-wide">
                            {formatDate(b.startDate)} — {formatDate(b.endDate)}
                          </div>

                          {/* Expand */}
                          <span
                            className="font-display text-[18px] text-[var(--ink-faint)] transition-transform duration-300"
                            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}
                            aria-hidden
                          >
                            →
                          </span>
                        </div>
                      </button>

                      {/* Expanded detail */}
                      {isOpen && (
                        <div className="pb-10 max-lg:pb-6 pt-2">
                          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-12 gap-y-6 py-8 px-4 max-lg:px-2 bg-[var(--canvas-warm)]">
                            <DetailField label="Space" value={b.spaceName} />
                            <DetailField
                              label="Period"
                              value={`${formatDate(b.startDate)} — ${formatDate(b.endDate)}`}
                            />
                            <DetailField label="Purpose" value={b.purpose || '—'} />
                            <DetailField label="Status" value={statusLabel[b.status] || b.status} />

                            {b.message && (
                              <div className="col-span-2 max-lg:col-span-1">
                                <div className="text-spec-label text-[var(--ink-mist)] mb-3">Message</div>
                                <p className="text-[14px] text-[var(--ink-soft)] leading-relaxed whitespace-pre-wrap border-l border-[var(--line-strong)] pl-4">
                                  {b.message}
                                </p>
                              </div>
                            )}
                          </div>

                          {b.status !== 'cancelled' && (
                            <div className="flex flex-wrap items-center gap-3 mt-6 max-lg:mt-4 px-4 max-lg:px-2">
                              <button
                                onClick={() => handleReschedule(b)}
                                className="btn-outline"
                              >
                                일정 변경
                              </button>
                              <button
                                onClick={() => handleCancel(b.id)}
                                disabled={cancelling === b.id}
                                className="text-[12px] tracking-[0.1em] uppercase text-[var(--ink-mist)] hover:text-[var(--ink)] border-b border-[var(--line-strong)] pb-1 transition-colors disabled:opacity-50"
                              >
                                {cancelling === b.id ? '취소 중 ...' : '신청 취소'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-spec-label text-[var(--ink-mist)] mb-2">{label}</div>
      <div className="text-[15px] text-[var(--ink)] leading-relaxed">{value}</div>
    </div>
  );
}
