import { useState } from 'react';
import type { ContactForm } from '../../types';

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <section className="pt-24 pb-16">
          <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
            <h1 className="text-page-title max-lg:text-[32px]">문의</h1>
            <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">Contact</p>
            <div className="thin-divider mt-8" />
          </div>
        </section>
        <section className="pb-[120px]">
          <div className="max-w-[480px] mx-auto text-center px-6">
            <div className="w-16 h-16 border border-[rgba(26,26,26,0.15)] flex items-center justify-center mx-auto mb-8">
              <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-[28px] font-light mb-4">문의가 접수되었습니다</h2>
            <p className="text-[15px] text-[#6B6B6B]">빠른 시일 내에 답변 드리겠습니다.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <section className="pt-24 pb-16 max-lg:pt-16 max-lg:pb-10">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <h1 className="text-page-title max-lg:text-[32px]">문의</h1>
          <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">Contact Us</p>
          <div className="thin-divider mt-8" />
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div>
              <div className="space-y-8">
                <div>
                  <p className="text-spec-label text-[#B0B0B0] mb-3">전화</p>
                  <p className="text-[16px] text-[#1A1A1A]">02-734-0458</p>
                </div>
                <div>
                  <p className="text-spec-label text-[#B0B0B0] mb-3">팩스</p>
                  <p className="text-[16px] text-[#1A1A1A]">02-734-0459</p>
                </div>
                <div>
                  <p className="text-spec-label text-[#B0B0B0] mb-3">이메일</p>
                  <p className="text-[16px] text-[#1A1A1A]">info@sunartcenter.com</p>
                </div>
                <div>
                  <p className="text-spec-label text-[#B0B0B0] mb-3">주소</p>
                  <p className="text-[16px] text-[#1A1A1A] leading-relaxed">
                    서울특별시 종로구<br />인사동 5길 8 선아트센터
                  </p>
                </div>
                <div>
                  <p className="text-spec-label text-[#B0B0B0] mb-3">운영시간</p>
                  <p className="text-[16px] text-[#1A1A1A]">화 — 일 10:00 ~ 18:00</p>
                  <p className="text-[14px] text-[#B0B0B0] mt-1">월요일 휴관</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">이름 *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-4 text-[15px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">이메일 *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-4 text-[15px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">연락처</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-4 text-[15px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">제목 *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-4 text-[15px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] text-[#6B6B6B] mb-2">문의 내용 *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                    className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-4 text-[15px] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none" />
                </div>
                <div className="pt-2">
                  <button type="submit" className="btn-primary">문의하기</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
