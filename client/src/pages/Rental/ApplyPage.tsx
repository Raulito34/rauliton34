import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { RentalApplication } from '../../types';
import { addBooking } from '../../services/rentalStore';

const spaceOptions = [
  { value: 'B1F B1전시관', label: 'B1 · B1 전시관', desc: '250㎡ · 미디어아트' },
  { value: '1F 1전시관',   label: '01 · 1 전시관',  desc: '120㎡ · 유리 파사드' },
  { value: '2F 2전시관',   label: '02 · 2 전시관',  desc: '250㎡ · 화이트 큐브' },
  { value: '3F 3전시관',   label: '03 · 3 전시관',  desc: '250㎡ · 분할 가능' },
  { value: '4F 4전시관',   label: '04 · 4 전시관',  desc: '70㎡ · 4.3M 천장' },
];

// Minimal, reusable field styles — all share the same underline-only aesthetic.
const inputCls = `
  w-full bg-transparent border-0 border-b border-[var(--line-strong)]
  px-0 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-faint)]
  focus:outline-none focus:border-[var(--ink)] transition-colors
`;

const labelCls = 'block text-spec-label text-[var(--ink-mist)] mb-3';

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

  /* ══════════════════════════════════════════════════════
     CONFIRMATION STATE — minimal, respectful
     ══════════════════════════════════════════════════════ */
  if (submitted) {
    return (
      <div className="bg-[var(--canvas)] min-h-screen">
        <section className="pt-40 pb-32 max-lg:pt-28 max-lg:pb-20">
          <div className="mx-auto max-w-[600px] px-12 max-lg:px-6 text-center">
            <div className="inline-flex items-center gap-2 text-spec-label text-[var(--ink-mist)] mb-8">
              <span className="live-dot" />
              Submitted
            </div>
            <h1 className="font-display font-extralight text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              신청이 접수되었습니다.
            </h1>
            <div className="h-px w-12 bg-[var(--ink-faint)] mx-auto mb-8" />
            <p className="text-[15px] text-[var(--ink-soft)] leading-[1.8] mb-12">
              담당자 검토 후 입력하신 이메일로<br />
              결과를 안내해드리겠습니다.
            </p>
            <div className="text-[12px] tracking-[0.15em] uppercase text-[var(--ink-mist)] mb-10">
              검토 기간 · 약 2주
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/rental/list" className="btn-primary"><span>신청 내역</span></Link>
              <Link to="/" className="btn-outline">홈으로</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     APPLICATION FORM
     ══════════════════════════════════════════════════════ */
  return (
    <div className="bg-[var(--canvas)]">
      {/* ═══ Header ═══ */}
      <section className="pt-32 pb-12 max-lg:pt-20 max-lg:pb-8">
        <div className="mx-auto max-w-[1320px] px-12 max-lg:px-6">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-4">
            <div className="col-span-1 max-lg:col-span-12">
              <span className="text-section-num text-[var(--ink-mist)]">Apply</span>
            </div>
            <div className="col-span-11 max-lg:col-span-12">
              <h1 className="font-display font-extralight text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
                대관 신청.
              </h1>
              <p className="mt-6 text-[15px] text-[var(--ink-soft)] max-w-[52ch]">
                <span className="text-[var(--ink-faint)]">*</span> 필수 항목
              </p>
            </div>
          </div>
        </div>
      </section>

      {fromStatus && (
        <div className="mx-auto max-w-[800px] px-12 max-lg:px-6 mb-8">
          <div className="flex items-center gap-3 py-4 px-5 border-l-2 border-[var(--ink)] bg-[var(--canvas-warm)] text-[13px] text-[var(--ink-soft)]">
            <span className="font-display text-spec-label text-[var(--ink-mist)]">Pre-filled</span>
            <span>대관 현황에서 선택한 정보가 자동으로 입력되었습니다.</span>
          </div>
        </div>
      )}

      {/* ═══ Form ═══ */}
      <section className="pb-32 max-lg:pb-20">
        <div className="mx-auto max-w-[800px] px-12 max-lg:px-6">
          <form onSubmit={handleSubmit}>
            {/* Section 01 — Space */}
            <FormSection num="01" title="Space" titleKo="공간">
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-0 border-t border-[var(--line)]">
                  {spaceOptions.map((opt) => {
                    const selected = form.spaceName === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`
                          flex items-center gap-4 py-4 px-0 border-b border-[var(--line)] cursor-pointer
                          transition-colors duration-200 hover:bg-[var(--canvas-warm)]
                          ${selected ? 'bg-[var(--canvas-warm)]' : ''}
                        `}
                      >
                        <input
                          type="radio"
                          name="spaceName"
                          value={opt.value}
                          checked={selected}
                          onChange={handleChange}
                          required
                          className="sr-only peer"
                        />
                        <span className={`
                          w-3 h-3 rounded-full border
                          ${selected ? 'bg-[var(--ink)] border-[var(--ink)]' : 'border-[var(--line-strong)]'}
                          transition-all
                        `} />
                        <span className="flex-1 flex items-baseline justify-between gap-4">
                          <span className="font-display text-[16px] font-light">{opt.label}</span>
                          <span className="text-[12px] tracking-wide text-[var(--ink-mist)]">{opt.desc}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </FormSection>

            {/* Section 02 — Period */}
            <FormSection num="02" title="Period" titleKo="기간">
              <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 max-lg:gap-6">
                <div>
                  <label className={labelCls}>시작일 *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    readOnly={fromStatus}
                    className={`${inputCls} ${fromStatus ? 'text-[var(--ink-mist)] cursor-not-allowed' : ''}`}
                  />
                </div>
                <div>
                  <label className={labelCls}>종료일 *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    readOnly={fromStatus}
                    className={`${inputCls} ${fromStatus ? 'text-[var(--ink-mist)] cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>
            </FormSection>

            {/* Section 03 — Applicant */}
            <FormSection num="03" title="Applicant" titleKo="신청자">
              <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 max-lg:gap-6">
                <div>
                  <label className={labelCls}>이름 *</label>
                  <input
                    type="text" name="applicantName" value={form.applicantName}
                    onChange={handleChange} required placeholder="홍길동"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>소속 · 단체</label>
                  <input
                    type="text" name="organization" value={form.organization}
                    onChange={handleChange} placeholder="선택사항"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>이메일 *</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} required placeholder="example@email.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>연락처 *</label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} required placeholder="010-0000-0000"
                    className={inputCls}
                  />
                </div>
              </div>
            </FormSection>

            {/* Section 04 — Exhibition */}
            <FormSection num="04" title="Exhibition" titleKo="전시 계획">
              <div className="space-y-8 max-lg:space-y-6">
                <div>
                  <label className={labelCls}>전시 · 행사 목적 *</label>
                  <input
                    type="text" name="purpose" value={form.purpose}
                    onChange={handleChange} required
                    placeholder="개인 회화전 · 사진 그룹전 · 세미나 등"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>상세 내용</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={6}
                    placeholder="전시 기획 내용, 특이사항, 요청사항 등을 자유롭게 작성해주세요."
                    className={`${inputCls} resize-none py-3 leading-relaxed`}
                  />
                </div>
              </div>
            </FormSection>

            {/* Error */}
            {error && (
              <div className="mb-8 p-5 border-l-2 border-[oklch(55%_0.22_25)] bg-[oklch(98%_0.01_25)]">
                <div className="text-spec-label text-[oklch(55%_0.22_25)] mb-1">Error</div>
                <p className="text-[14px] text-[var(--ink-soft)]">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="pt-12 max-lg:pt-8 border-t border-[var(--line)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-[13px] text-[var(--ink-mist)]">
                  신청 후 담당자 검토 (약 2주) 후 이메일 회신
                </p>
                <div className="flex gap-3">
                  <Link to="/rental" className="btn-outline">취소</Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{submitting ? '제출 중 ...' : '제출하기'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERNAL — Section wrapper
   ══════════════════════════════════════════════════════ */
function FormSection({
  num, title, titleKo, children
}: {
  num: string; title: string; titleKo: string; children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-8 max-lg:gap-4 py-12 max-lg:py-8 border-b border-[var(--line)]">
      <div className="col-span-3 max-lg:col-span-12">
        <div className="text-section-num text-[var(--ink-faint)] mb-2">{num}</div>
        <div className="font-display text-[clamp(1.25rem,1.5vw,1.625rem)] font-light">{title}</div>
        <div className="text-[13px] text-[var(--ink-mist)] mt-1">{titleKo}</div>
      </div>
      <div className="col-span-9 max-lg:col-span-12">
        {children}
      </div>
    </div>
  );
}
