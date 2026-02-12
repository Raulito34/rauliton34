import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings, updateBookingStatus, deleteBooking } from '../../services/rentalStore';
import type { RentalBooking } from '../../types';

function formatDate(iso: string): string {
  if (!iso) return '-';
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${dd}`;
}

function formatDateTime(iso: string): string {
  if (!iso) return '-';
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${dd} ${hh}:${mm}`;
}

const statusLabel: Record<string, string> = {
  pending: '심사중',
  reviewing: '심사중',
  approved: '대관완료',
  confirmed: '대관완료',
};

const statusStyle: Record<string, string> = {
  pending: 'bg-orange-100 text-orange-700 border-orange-200',
  reviewing: 'bg-orange-100 text-orange-700 border-orange-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  confirmed: 'bg-green-100 text-green-700 border-green-200',
};

const isReviewingStatus = (s: string) => s === 'pending' || s === 'reviewing';
const isConfirmedStatus = (s: string) => s === 'approved' || s === 'confirmed';

export default function RentalListPage() {
  const [bookings, setBookings] = useState<RentalBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'reviewing' | 'confirmed'>('all');

  const refresh = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch {
      setBookings([]);
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await updateBookingStatus(id, status);
    await refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteBooking(id);
    if (selectedId === id) setSelectedId(null);
    await refresh();
  };

  const reviewingCount = bookings.filter((b) => isReviewingStatus(b.status)).length;
  const confirmedCount = bookings.filter((b) => isConfirmedStatus(b.status)).length;

  const filtered = filterStatus === 'all'
    ? bookings
    : filterStatus === 'reviewing'
      ? bookings.filter((b) => isReviewingStatus(b.status))
      : bookings.filter((b) => isConfirmedStatus(b.status));

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const selectedBooking = bookings.find((b) => b.id === selectedId);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">신청내역</h1>
          <p className="text-gray-400 text-sm">Rental Applications</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-gray-400">신청 내역을 불러오는 중...</div>
          ) : (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-light rounded-lg p-5 text-center">
                  <p className="text-2xl font-bold text-primary">{bookings.length}</p>
                  <p className="text-sm text-gray-500 mt-1">전체 신청</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-5 text-center">
                  <p className="text-2xl font-bold text-orange-600">{reviewingCount}</p>
                  <p className="text-sm text-gray-500 mt-1">심사중</p>
                </div>
                <div className="bg-green-50 rounded-lg p-5 text-center">
                  <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
                  <p className="text-sm text-gray-500 mt-1">대관완료</p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
                {(['all', 'reviewing', 'confirmed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterStatus(f)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      filterStatus === f
                        ? 'border-accent text-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {f === 'all' ? '전체' : f === 'reviewing' ? '심사중' : '대관완료'}
                    <span className="ml-1.5 text-xs text-gray-400">
                      ({f === 'all' ? bookings.length : f === 'reviewing' ? reviewingCount : confirmedCount})
                    </span>
                  </button>
                ))}
              </div>

              {sorted.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-400 mb-4">신청 내역이 없습니다.</p>
                  <Link
                    to="/rental/apply"
                    className="text-accent hover:text-accent-light text-sm font-medium underline underline-offset-4"
                  >
                    대관 신청하러 가기
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {sorted.map((b) => (
                    <div
                      key={b.id}
                      className={`border rounded-lg transition-all ${
                        selectedId === b.id ? 'border-accent shadow-md' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {/* Row Summary */}
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
                        <span className="text-sm text-gray-500 ml-auto hidden sm:inline">{b.applicantName}</span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${selectedId === b.id ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Expanded Detail */}
                      {selectedId === b.id && selectedBooking && (
                        <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div>
                              <span className="text-gray-400 block mb-1">신청자</span>
                              <span className="text-primary font-medium">{selectedBooking.applicantName}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">소속/단체</span>
                              <span className="text-primary">{selectedBooking.organization || '-'}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">이메일</span>
                              <span className="text-primary">{selectedBooking.email}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">연락처</span>
                              <span className="text-primary">{selectedBooking.phone}</span>
                            </div>
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
                              <span className="text-primary">{selectedBooking.purpose}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-1">신청일시</span>
                              <span className="text-primary">{formatDateTime(selectedBooking.createdAt)}</span>
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

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-200">
                            <span className="text-xs text-gray-400 mr-auto">상태 변경:</span>
                            {!isConfirmedStatus(selectedBooking.status) && (
                              <button
                                onClick={() => handleStatusChange(selectedBooking.id, 'approved')}
                                className="text-xs px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              >
                                대관 승인
                              </button>
                            )}
                            {!isReviewingStatus(selectedBooking.status) && (
                              <button
                                onClick={() => handleStatusChange(selectedBooking.id, 'pending')}
                                className="text-xs px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                              >
                                심사중으로 변경
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(selectedBooking.id)}
                              className="text-xs px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors"
                            >
                              삭제
                            </button>
                          </div>
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
