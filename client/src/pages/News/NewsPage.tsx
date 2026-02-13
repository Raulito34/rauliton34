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
    } catch {
      setNews([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    refresh().finally(() => setLoading(false));
  }, [activeTab]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditId(item.id);
    setForm({ title: item.title, content: item.content, category: item.category });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.updateNews(editId, form);
      } else {
        await api.createNews(form);
      }
      setShowForm(false);
      await refresh();
    } catch {
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
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
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${dd}`;
  };

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">소식</h1>
          <p className="text-gray-400 text-sm">News & Notice</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-10 justify-center">
            {[
              { key: 'all', label: '전체' },
              { key: 'notice', label: '공지사항' },
              { key: 'news', label: '아트센터 소식' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Admin: Add button */}
          {isAdmin && (
            <div className="flex justify-end mb-6">
              <button
                onClick={openCreate}
                className="bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-light transition-colors"
              >
                + 소식 등록
              </button>
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-xl font-bold text-primary mb-6">
                  {editId ? '소식 수정' : '소식 등록'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                    <select name="category" value={form.category} onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent">
                      <option value="notice">공지사항</option>
                      <option value="news">아트센터 소식</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                    <input name="title" value={form.title} onChange={handleChange} required
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">내용 *</label>
                    <textarea name="content" value={form.content} onChange={handleChange} required rows={6}
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
                      취소
                    </button>
                    <button type="submit" disabled={saving}
                      className="px-6 py-2 text-sm bg-accent text-white font-medium hover:bg-accent-light transition-colors disabled:opacity-50">
                      {saving ? '저장 중...' : editId ? '수정' : '등록'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-gray-400">소식을 불러오는 중...</div>
          ) : (
            <>
              {/* News List */}
              <div className="divide-y">
                {news.map((item) => (
                  <div key={item.id} className="py-6 hover:bg-gray-50 px-4 -mx-4 transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            item.category === 'notice'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {item.category === 'notice' ? '공지' : '소식'}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-primary">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.content}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                        <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                        {isAdmin && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEdit(item)}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                              수정
                            </button>
                            <button onClick={() => handleDelete(item.id)}
                              className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {news.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p>등록된 소식이 없습니다.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
