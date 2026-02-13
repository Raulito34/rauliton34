import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, getAdminCode } from '../../services/api';
import type { Exhibition } from '../../types';

const tabs = [
  { key: 'all', label: '전체' },
  { key: 'current', label: '현재전시' },
  { key: 'upcoming', label: '예정전시' },
  { key: 'past', label: '지난전시' },
];

const emptyForm: {
  title: string; artist: string; description: string; startDate: string; endDate: string;
  floor: string; imageUrl: string; status: 'current' | 'upcoming' | 'past'; details: string;
} = {
  title: '', artist: '', description: '', startDate: '', endDate: '',
  floor: '', imageUrl: '', status: 'upcoming', details: '',
};

export default function ExhibitionPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status') || 'all';
  const [activeTab, setActiveTab] = useState(statusParam);
  const [exhibitions, setExhibitions] = useState<(Exhibition & { details?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = !!getAdminCode();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    try {
      const data = await api.getExhibitions(activeTab === 'all' ? undefined : activeTab);
      setExhibitions(data as (Exhibition & { details?: string })[]);
    } catch {
      setExhibitions([]);
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

  const openEdit = (ex: Exhibition & { details?: string }) => {
    setEditId(ex.id);
    setForm({
      title: ex.title, artist: ex.artist, description: ex.description,
      startDate: ex.startDate, endDate: ex.endDate, floor: ex.floor,
      imageUrl: ex.imageUrl, status: ex.status, details: ex.details || '',
    });
    setShowForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, imageUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.updateExhibition(editId, form);
      } else {
        await api.createExhibition(form);
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
    await api.deleteExhibition(id);
    await refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filtered = activeTab === 'all'
    ? exhibitions
    : exhibitions.filter((e) => e.status === activeTab);

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">전시안내</h1>
          <p className="text-gray-400 text-sm">Exhibition</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-10 justify-center">
            {tabs.map((tab) => (
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
                + 전시 등록
              </button>
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-xl font-bold text-primary mb-6">
                  {editId ? '전시 수정' : '전시 등록'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                      <input name="title" value={form.title} onChange={handleChange} required
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">작가 *</label>
                      <input name="artist" value={form.artist} onChange={handleChange} required
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">장소 *</label>
                      <input name="floor" value={form.floor} onChange={handleChange} required placeholder="예: 1F 제2전시관"
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">시작일 *</label>
                      <input name="startDate" value={form.startDate} onChange={handleChange} required placeholder="2026.03.01"
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">종료일 *</label>
                      <input name="endDate" value={form.endDate} onChange={handleChange} required placeholder="2026.04.30"
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                    <select name="status" value={form.status} onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent">
                      <option value="current">진행중</option>
                      <option value="upcoming">예정</option>
                      <option value="past">종료</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">짧은 설명 *</label>
                    <input name="description" value={form.description} onChange={handleChange} required
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상세 내용</label>
                    <textarea name="details" value={form.details} onChange={handleChange} rows={4}
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이미지</label>
                    <div className="flex gap-2 items-center">
                      <input name="imageUrl" value={form.imageUrl.startsWith('data:') ? '(업로드된 이미지)' : form.imageUrl}
                        onChange={handleChange} placeholder="이미지 URL 또는 파일 업로드"
                        readOnly={form.imageUrl.startsWith('data:')}
                        className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors">
                        파일 선택
                      </button>
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                    {form.imageUrl && (
                      <img src={form.imageUrl} alt="미리보기" className="mt-2 h-32 object-cover rounded"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
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
            <div className="text-center py-20 text-gray-400">전시 정보를 불러오는 중...</div>
          ) : (
            <>
              {/* Exhibition Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((ex) => (
                  <div key={ex.id} className="group relative">
                    <Link to={`/exhibition/${ex.id}`}>
                      <div className="overflow-hidden">
                        <img
                          src={ex.imageUrl}
                          alt={ex.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 ${
                            ex.status === 'current' ? 'bg-green-100 text-green-700' :
                            ex.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {ex.status === 'current' ? '진행중' : ex.status === 'upcoming' ? '예정' : '종료'}
                          </span>
                          <span className="text-xs text-accent">{ex.floor}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-primary">{ex.title}</h3>
                        <p className="text-sm text-gray-500">{ex.artist}</p>
                        <p className="text-xs text-gray-400 mt-1">{ex.startDate} - {ex.endDate}</p>
                        <p className="text-sm text-gray-600 mt-2">{ex.description}</p>
                      </div>
                    </Link>
                    {/* Admin controls */}
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.preventDefault(); openEdit(ex); }}
                          className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded shadow hover:bg-white"
                        >
                          수정
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); handleDelete(ex.id); }}
                          className="bg-red-500/90 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p>해당하는 전시가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
