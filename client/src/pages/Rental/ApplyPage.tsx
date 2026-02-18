import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { RentalApplication } from '../../types';
import { addBooking } from '../../services/rentalStore';

const spaceOptions = [
  '1F 1전시관',
  '2F 2전시관',
  '3F 3전시관',
  '4F 4전시관',
  'B1F B1전시관',
];

export default function ApplyPage() {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState<RentalApplication>({
    spaceName: '',
    applicantName: '',
    organization: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    purpose: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill from query params (from StatusPage)
  useEffect(() => {
    const space = searchParams.get('space');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (space || startDate || endDate) {
      setForm((prev) => ({
        ...prev,
        ...(space && { spaceName: space }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      }));
    }
  }, [searchParams]);

  const fromStatus = searchParams.has('space');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addBooking({
        spaceName: form.spaceName,
        startDate: form.startDate,
        endDate: form.endDate,
        status: 'pending',
        applicantName: form.applicantName,
        organization: form.organization,
        email: form.email,
        phone: form.phone,
        purpose: form.purpose,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`신청 중 오류가 발생했습니다: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <section className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-2">대관신청</h1>
            <p className="text-gray-400 text-sm">Rental Application</p>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">신청이 완료되었습니다</h2>
            <p className="text-gray-600 mb-2">대관 신청서가 정상적으로 접수되었습니다.</p>
            <p className="text-sm text-gray-500 mb-8">
              담당자 검토 후 입력하신 이메일로 결과를 안내드리겠습니다.<br />
              (심사기간: 약 2주 소요)
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link
                to="/rental/list"
                className="bg-accent text-white px-6 py-2.5 text-sm font-medium hover:bg-accent-light transition-colors rounded"
              >
                신청내역 확인
              </Link>
              <Link
                to="/rental/status"
                className="text-accent hover:text-accent-light text-sm font-medium underline underline-offset-4"
              >
                대관현황 보기
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">대관신청</h1>
          <p className="text-gray-400 text-sm">Rental Application</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {fromStatus && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-sm text-blue-800">
              대관현황에서 선택한 정보가 자동으로 입력되었습니다. 대관 기간을 아래에서 조정할 수 있습니다.
            </div>
          )}

          <p className="text-center text-gray-600 mb-10">
            아래 양식을 작성하여 대관 신청을 해주세요. <span className="text-red-500">*</span> 표시는 필수 항목입니다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Space Selection */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                희망 공간 <span className="text-red-500">*</span>
              </label>
              <select
                name="spaceName"
                value={form.spaceName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
              >
                <option value="">공간을 선택해주세요</option>
                {spaceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  희망 시작일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  희망 종료일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Applicant Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  신청자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={form.applicantName}
                  onChange={handleChange}
                  required
                  placeholder="홍길동"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">소속/단체</label>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="소속 기관 또는 단체명"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="010-0000-0000"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                전시/행사 목적 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                required
                placeholder="예: 개인 회화전, 사진 그룹전, 세미나 등"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">상세 내용</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="전시 기획 내용, 특이사항, 요청사항 등을 자유롭게 작성해주세요."
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-accent text-white px-12 py-3 text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? '신청 중...' : '대관 신청하기'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
