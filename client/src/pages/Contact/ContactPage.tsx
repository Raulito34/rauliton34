import { useState } from 'react';
import type { ContactForm } from '../../types';

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <section className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-2">문의</h1>
            <p className="text-gray-400 text-sm">Contact</p>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">문의가 접수되었습니다</h2>
            <p className="text-gray-600">빠른 시일 내에 답변 드리겠습니다.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">문의</h1>
          <p className="text-gray-400 text-sm">Contact Us</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">연락처 정보</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-primary mb-1">전화</h3>
                  <p className="text-sm text-gray-600">02-000-0000</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">팩스</h3>
                  <p className="text-sm text-gray-600">02-000-0001</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">이메일</h3>
                  <p className="text-sm text-gray-600">info@sunartcenter.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">주소</h3>
                  <p className="text-sm text-gray-600">
                    서울특별시 종로구 인사동길 00<br />선아트센터
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">운영시간</h3>
                  <p className="text-sm text-gray-600">
                    화~일 10:00 - 18:00<br />
                    월요일 휴관
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-primary mb-6">문의하기</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-accent text-white px-10 py-3 text-sm font-medium hover:bg-accent-light transition-colors"
                  >
                    문의하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
