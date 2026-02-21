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
  approved: '대관완료',
  confirmed: '대관완료',
  cancelled: '취소됨',
};

const statusStyle: Record<string, string> = {
  pending: 'bg-orange-100 text-orange-700 border-orange-200',
  reviewing: 'bg-orange-100 text-orange-700 border-orange-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  confirmed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
};

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
    if (!confirm('정말로 이 신청을 취소하시겠습니까?')) return;
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

  const selectedBooking = bookings?.find((b) => b.id === selectedId);

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">신청내역</h1>
          <p className="text-gray-400 text-sm">My Applications</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Lookup form */}
          {bookings === null && (
            <div className="max-w-sm mx-auto">
              <p className="text-center text-gray-600 text-sm mb-8">
                대관 신청 시 입력한 신청자명과 이메일로 조회하세요.
              </p>
              <form onSubmit={handleLookup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">신청자명</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="홍길동"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">이메일</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-white py-3 text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50"
                >
                  {loading ? '조회 중...' : '조회하기'}
                </button>
              </form>
            </div>
          )}

          {/* Results */}
          {bookings !== null && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-primary">{name}</span>님의 신청 내역 ({bookings.length}건)
                </p>
                <button
                  onClick={() => { setBookings(null); setError(''); }}
                  className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded transition-colors"
                >
                  다시 조회
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 mb-4">신청 내역이 없습니다.</p>
                  <Link
                    to="/rental/status"
                    className="text-accent hover:text-accent-light text-sm font-medium underline underline-offset-4"
                  >
                    대관 신청하러 가기
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className={`border rounded-lg transition-all ${
                        selectedId === b.id ? 'border-accent shadow-md' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedId(selectedId === b.id ? null : b.id)}
                        className="w-full text-left px-6 py-4 flex flex-wrap items-center gap-4"
                      >
                        <span className={`text-xs font-medium px-2.5 py-1 rounded border ${statusStyle[b.status] || statusStyle.pending}`}>
                          {statusLabel[b.status] || b.status}
                        </span>
                        <span className="font-medium text-primary text-sm">{b.spaceName}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(b.startDate)} ~ {formatDate(b.endDate)}
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${selectedId === b.id ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {selectedId === b.id && selectedBooking && (
                        <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div>
                              <span className="text-gray-400 block mb-1">희망 공간</span>
                              <span className="text-primary font-medium">{selectedBooking.spaceName}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">대관 기간</span>
                              <span className="text-primary">
                                {formatDate(selectedBooking.startDate)} ~ {formatDate(selectedBooking.endDate)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">전시/행사 목적</span>
                              <span className="text-primary">{selectedBooking.purpose || '-'}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">상태</span>
                              <span className={`text-xs font-medium px-2.5 py-1 rounded border ${statusStyle[selectedBooking.status] || statusStyle.pending}`}>
                                {statusLabel[selectedBooking.status] || selectedBooking.status}
                              </span>
                            </div>
                            {selectedBooking.message && (
                              <div className="md:col-span-2">
                                <span className="text-gray-400 block mb-1">상세 내용</span>
                                <p className="text-primary whitespace-pre-wrap bg-white rounded p-3 border border-gray-200">
                                  {selectedBooking.message}
                                </p>
                              </div>
                            )}
                          </div>

                          {selectedBooking.status !== 'cancelled' && (
                            <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-200">
                              <button
                                onClick={() => handleReschedule(selectedBooking)}
                                className="text-xs px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                일정 변경
                              </button>
                              <button
                                onClick={() => handleCancel(selectedBooking.id)}
                                disabled={cancelling === selectedBooking.id}
                                className="text-xs px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors disabled:opacity-50"
                              >
                                {cancelling === selectedBooking.id ? '취소 중...' : '신청 취소'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
