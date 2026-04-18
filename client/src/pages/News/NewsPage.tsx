import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, getAdminCode } from '../../services/api';
import type { NewsItem } from '../../types';

const emptyForm: { title: string; content: string; category: 'notice' | 'news' } = {
  title: '', content: '', category: 'notice',
};

export default function NewsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [activeTab, setActiveTab] = useState(categoryParam);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = !!getAdminCode();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    try {
      const data = await api.getNews(activeTab === 'all' ? undefined : activeTab);
      setNews(data);
    } catch { setNews([]); }
  };

  useEffect(() => {
    setLoading(true);
    refresh().finally(() => setLoading(false));
  }, [activeTab]);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };

  const openEdit = (item: NewsItem) => {
    setEditId(item.id);
    setForm({ title: item.title, content: item.content, category: item.category });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) { await api.updateNews(editId, form); }
      else { await api.createNews(form); }
      setShowForm(false);
      await refresh();
    } catch { alert('저장 중 오류가 발생했습니다.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await api.deleteNews(id);
    await refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div>
      {/* Page Header */}
      <section className="pt-24 pb-16 max-lg:pt-16 max-lg:pb-10">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <h1 className="text-page-title max-lg:text-[32px]">소식</h1>
          <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">News & Notice</p>
          <div className="thin-divider mt-8" />
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="max-w-[960px] mx-auto px-12 max-lg:px-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-12">
            {[
              { key: 'all', label: '전체' },
              { key: 'notice', label: '공지사항' },
              { key: 'news', label: '선아트센터 소식' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-[14px] font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#1A1A1A] text-[#FAFAF8]'
                    : 'bg-transparent text-[#B0B0B0] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Admin: Add button */}
          {isAdmin && (
            <div className="flex justify-end mb-8">
              <button onClick={openCreate} className="btn-primary">+ 소식 등록</button>
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-[#FAFAF8] max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                <h2 className="font-display text-[24px] font-light mb-8">
                  {editId ? '소식 수정' : '소식 등록'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">카테고리</label>
                    <select name="category" value={form.category} onChange={handleChange}
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors">
                      <option value="notice">공지사항</option>
                      <option value="news">선아트센터 소식</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">제목 *</label>
                    <input name="title" value={form.title} onChange={handleChange} required
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">내용 *</label>
                    <textarea name="content" value={form.content} onChange={handleChange} required rows={6}
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none" />
                  </div>
                  <div className="flex justify-end gap-3 pt-6">
                    <button type="button" onClick={() => setShowForm(false)} className="btn-outline">취소</button>
                    <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                      {saving ? '저장 중...' : editId ? '수정' : '등록'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-[#B0B0B0] text-[15px]">소식을 불러오는 중...</div>
          ) : (
            <>
              {/* News List */}
              <div>
                {news.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex items-start justify-between py-6 gap-6 hover:pl-2 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[11px] uppercase tracking-[1px] font-medium ${
                            item.category === 'notice' ? 'text-[#1A1A1A]' : 'text-[#6B6B6B]'
                          }`}>
                            {item.category === 'notice' ? '공지' : '소식'}
                          </span>
                          <span className="text-[13px] text-[#B0B0B0] tabular-nums">{formatDate(item.createdAt)}</span>
                        </div>
                        <h3 className="text-[16px] text-[#1A1A1A] group-hover:text-[#3A3A3A] transition-colors">{item.title}</h3>
                        <p className="text-[14px] text-[#B0B0B0] mt-1 line-clamp-1">{item.content}</p>
                      </div>
                      {isAdmin && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                          <button onClick={() => openEdit(item)} className="text-[12px] text-[#6B6B6B] hover:text-[#1A1A1A]">수정</button>
                          <button onClick={() => handleDelete(item.id)} className="text-[12px] text-[#B0B0B0] hover:text-[#1A1A1A]">삭제</button>
                        </div>
                      )}
                    </div>
                    <div className="thin-divider" />
                  </div>
                ))}
              </div>

              {news.length === 0 && (
                <div className="text-center py-20 text-[#B0B0B0] text-[15px]">
                  등록된 소식이 없습니다.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
