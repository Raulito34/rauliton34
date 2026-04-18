import { useState, useEffect } from 'react';
import { api, getAdminCode, setAdminCode } from '../../services/api';
import type { SiteImage } from '../../types';

const DEFAULT_IMAGES: Record<string, string> = {
  hero: '/images/building/hero.jpg',
  exhibition_1: '',
  exhibition_2: '',
};

const IMAGE_LABELS: Record<string, string> = {
  hero: '메인 히어로 이미지',
  exhibition_1: '전시 1 이미지 (빛의 경계)',
  exhibition_2: '전시 2 이미지 (도시의 기억)',
};

export default function AdminHomePage() {
  const [authenticated, setAuthenticated] = useState(!!getAdminCode());
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUrls, setEditUrls] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<Record<string, boolean>>({});

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setCodeError('');
    try {
      const res = await api.verifyAdmin(codeInput);
      if (res.ok) {
        setAdminCode(codeInput);
        setAuthenticated(true);
      }
    } catch {
      setCodeError('관리자 코드가 올바르지 않습니다.');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    api
      .getSiteImages()
      .then((data) => {
        setImages(data);
        const urls: Record<string, string> = {};
        data.forEach((img) => {
          urls[img.key] = img.imageUrl;
        });
        setEditUrls(urls);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authenticated]);

  const handleUrlChange = (key: string, url: string) => {
    setEditUrls((prev) => ({ ...prev, [key]: url }));
    setSaveSuccess((prev) => ({ ...prev, [key]: false }));
  };

  const handleImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setEditUrls((prev) => ({ ...prev, [key]: dataUrl }));
      setSaveSuccess((prev) => ({ ...prev, [key]: false }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (key: string) => {
    setSaving((prev) => ({ ...prev, [key]: true }));
    setSaveSuccess((prev) => ({ ...prev, [key]: false }));
    try {
      const existing = images.find((img) => img.key === key);
      if (existing) {
        await api.updateSiteImage(key, { imageUrl: editUrls[key] });
      } else {
        await api.createSiteImage({
          key,
          imageUrl: editUrls[key],
          label: IMAGE_LABELS[key] || key,
        });
      }
      setSaveSuccess((prev) => ({ ...prev, [key]: true }));
      const updated = await api.getSiteImages();
      setImages(updated);
    } catch {
      alert('저장에 실패했습니다.');
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleReset = (key: string) => {
    const defaultUrl = DEFAULT_IMAGES[key];
    if (defaultUrl) {
      setEditUrls((prev) => ({ ...prev, [key]: defaultUrl }));
      setSaveSuccess((prev) => ({ ...prev, [key]: false }));
    }
  };

  if (!authenticated) {
    return (
      <div>
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin</h1>
            <p className="text-[11px] uppercase tracking-widest text-white/40">Homepage Image Management</p>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-sm mx-auto px-6">
            <form onSubmit={handleVerify} className="space-y-4">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">
                관리자 코드
              </label>
              <input
                type="password"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="관리자 코드를 입력하세요"
                className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-black"
              />
              {codeError && (
                <p className="text-[11px] text-red-500">{codeError}</p>
              )}
              <button
                type="submit"
                disabled={verifying}
                className="w-full bg-black text-white py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {verifying ? '확인 중...' : '로그인'}
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin</h1>
            <p className="text-[11px] uppercase tracking-widest text-white/40">Homepage Image Management</p>
          </div>
        </section>
        <section className="py-20 bg-white">
          <p className="text-center text-black/40 text-sm">불러오는 중...</p>
        </section>
      </div>
    );
  }

  const imageKeys = ['hero', 'exhibition_1', 'exhibition_2'];

  return (
    <div>
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin</h1>
          <p className="text-[11px] uppercase tracking-widest text-white/40">Homepage Image Management</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">01</span>
            <h2 className="text-2xl font-black uppercase tracking-tight">메인 페이지 이미지 관리</h2>
          </div>
          <div className="thin-divider mb-10" />

          <div className="space-y-16">
            {imageKeys.map((key, idx) => {
              const currentUrl = editUrls[key] || DEFAULT_IMAGES[key] || '';
              const originalUrl = images.find((img) => img.key === key)?.imageUrl || DEFAULT_IMAGES[key] || '';
              const isChanged = currentUrl !== originalUrl;
              const isDataUrl = currentUrl.startsWith('data:');

              return (
                <div key={key}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold text-black/20">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xs font-black uppercase tracking-[0.15em]">
                      {IMAGE_LABELS[key] || key}
                    </h3>
                    {saveSuccess[key] && (
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">
                        저장됨
                      </span>
                    )}
                  </div>

                  {/* Preview */}
                  <div className="mb-4">
                    {currentUrl ? (
                      <div className="img-frame inline-block">
                        <img
                          src={currentUrl}
                          alt={IMAGE_LABELS[key]}
                          className={`object-cover ${
                            key === 'hero'
                              ? 'w-full max-w-2xl aspect-[16/9]'
                              : 'w-full max-w-md aspect-[4/3]'
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-md aspect-[4/3] bg-black/5 flex items-center justify-center">
                        <span className="text-[11px] text-black/30 uppercase">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* URL Input */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">
                        이미지 URL
                      </label>
                      <input
                        type="text"
                        value={isDataUrl ? '(업로드된 이미지)' : currentUrl}
                        onChange={(e) => handleUrlChange(key, e.target.value)}
                        disabled={isDataUrl}
                        placeholder="https://..."
                        className="w-full border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:border-black disabled:bg-black/5 disabled:text-black/40"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">
                        또는 파일 업로드
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(key, e)}
                        className="text-sm text-black/60 file:mr-4 file:py-2 file:px-4 file:border file:border-black/10 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-white file:text-black hover:file:bg-black/5 file:cursor-pointer"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() => handleSave(key)}
                        disabled={saving[key] || !isChanged}
                        className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {saving[key] ? '저장 중...' : '저장'}
                      </button>
                      <button
                        onClick={() => handleReset(key)}
                        className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-black transition-colors"
                      >
                        기본값 복원
                      </button>
                    </div>
                  </div>

                  {idx < imageKeys.length - 1 && <div className="thin-divider mt-10" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
