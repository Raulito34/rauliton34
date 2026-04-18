import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, getAdminCode } from '../../services/api';
import type { Exhibition } from '../../types';

const tabs = [
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
  const statusParam = searchParams.get('status') || 'current';
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
      const data = await api.getExhibitions(activeTab);
      setExhibitions(data as (Exhibition & { details?: string })[]);
    } catch {
      setExhibitions([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    refresh().finally(() => setLoading(false));
  }, [activeTab]);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };

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
    reader.onload = () => { setForm((f) => ({ ...f, imageUrl: reader.result as string })); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) { await api.updateExhibition(editId, form); }
      else { await api.createExhibition(form); }
      setShowForm(false);
      await refresh();
    } catch { alert('저장 중 오류가 발생했습니다.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await api.deleteExhibition(id);
    await refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filtered = exhibitions.filter((e) => e.status === activeTab);

  return (
    <div>
      {/* Page Header */}
      <section className="pt-24 pb-16 max-lg:pt-16 max-lg:pb-10">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <h1 className="text-page-title max-lg:text-[32px]">전시안내</h1>
          <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">Exhibition</p>
          <div className="thin-divider mt-8" />
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-16 max-lg:mb-10">
            {tabs.map((tab) => (
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
              <button onClick={openCreate} className="btn-primary">+ 전시 등록</button>
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-[#FAFAF8] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                <h2 className="font-display text-[24px] font-light mb-8">
                  {editId ? '전시 수정' : '전시 등록'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] text-[#6B6B6B] mb-2">제목 *</label>
                      <input name="title" value={form.title} onChange={handleChange} required
                        className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#6B6B6B] mb-2">작가 *</label>
                      <input name="artist" value={form.artist} onChange={handleChange} required
                        className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[13px] text-[#6B6B6B] mb-2">장소 *</label>
                      <input name="floor" value={form.floor} onChange={handleChange} required placeholder="예: 1F 1전시관"
                        className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#6B6B6B] mb-2">시작일 *</label>
                      <input name="startDate" value={form.startDate} onChange={handleChange} required placeholder="2026.03.01"
                        className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#6B6B6B] mb-2">종료일 *</label>
                      <input name="endDate" value={form.endDate} onChange={handleChange} required placeholder="2026.04.30"
                        className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">상태</label>
                    <select name="status" value={form.status} onChange={handleChange}
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors">
                      <option value="current">진행중</option>
                      <option value="upcoming">예정</option>
                      <option value="past">종료</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">짧은 설명 *</label>
                    <input name="description" value={form.description} onChange={handleChange} required
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">상세 내용</label>
                    <textarea name="details" value={form.details} onChange={handleChange} rows={4}
                      className="w-full border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#6B6B6B] mb-2">이미지</label>
                    <div className="flex gap-3 items-center">
                      <input name="imageUrl" value={form.imageUrl.startsWith('data:') ? '(업로드된 이미지)' : form.imageUrl}
                        onChange={handleChange} placeholder="이미지 URL 또는 파일 업로드"
                        readOnly={form.imageUrl.startsWith('data:')}
                        className="flex-1 border border-[rgba(26,26,26,0.15)] bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                      <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline py-3 px-4 text-[13px]">
                        파일 선택
                      </button>
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                    {form.imageUrl && (
                      <img src={form.imageUrl} alt="미리보기" className="mt-3 h-32 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
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
            <div className="text-center py-20 text-[#B0B0B0] text-[15px]">전시 정보를 불러오는 중...</div>
          ) : (
            <>
              {/* Exhibition Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filtered.map((ex) => (
                  <div key={ex.id} className="group relative">
                    <Link to={`/exhibition/${ex.id}`}>
                      <div className="overflow-hidden">
                        <img
                          src={ex.imageUrl}
                          alt={ex.title}
                          className="w-full aspect-[4/5] object-cover img-grayscale group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[11px] uppercase tracking-[1px] font-medium ${
                            ex.status === 'current' ? 'text-[#1A1A1A]' :
                            ex.status === 'upcoming' ? 'text-[#6B6B6B]' :
                            'text-[#B0B0B0]'
                          }`}>
                            {ex.status === 'current' ? '진행중' : ex.status === 'upcoming' ? '예정' : '종료'}
                          </span>
                          <span className="text-[12px] text-[#B0B0B0]">{ex.floor}</span>
                        </div>
                        <h3 className="font-display text-[20px] font-light uppercase tracking-[0.5px]">{ex.title}</h3>
                        <p className="text-[14px] text-[#6B6B6B] mt-1">{ex.artist}</p>
                        <p className="text-[13px] text-[#B0B0B0] mt-1">{ex.startDate} — {ex.endDate}</p>
                      </div>
                    </Link>
                    {/* Admin controls */}
                    {isAdmin && (
                      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.preventDefault(); openEdit(ex); }}
                          className="bg-[#FAFAF8]/90 text-[#3A3A3A] text-[12px] px-3 py-1.5 shadow-sm hover:bg-[#FAFAF8]">수정</button>
                        <button onClick={(e) => { e.preventDefault(); handleDelete(ex.id); }}
                          className="bg-[#1A1A1A]/80 text-[#FAFAF8] text-[12px] px-3 py-1.5 shadow-sm hover:bg-[#1A1A1A]">삭제</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-[#B0B0B0] text-[15px]">
                  해당하는 전시가 없습니다.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
