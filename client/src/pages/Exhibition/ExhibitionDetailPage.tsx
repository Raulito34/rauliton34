import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { Exhibition } from '../../types';

export default function ExhibitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [exhibition, setExhibition] = useState<(Exhibition & { details?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.getExhibition(Number(id))
      .then((data) => setExhibition(data as Exhibition & { details?: string }))
      .catch(() => setExhibition(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-40">
        <p className="text-[#B0B0B0] text-[15px]">전시 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="text-center py-40">
        <p className="text-[#6B6B6B] text-[15px]">전시 정보를 찾을 수 없습니다.</p>
        <Link to="/exhibition" className="link-underline text-[14px] mt-6 inline-block">
          전시 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={exhibition.imageUrl}
          alt={exhibition.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 max-lg:p-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[40px] font-light text-[#FAFAF8] uppercase tracking-[0.5px] max-lg:text-[28px]">
              {exhibition.title}
            </h1>
            <p className="text-[16px] text-[rgba(250,250,248,0.7)] mt-2">{exhibition.artist}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-[80px] max-lg:py-12">
        <div className="max-w-[960px] mx-auto px-12 max-lg:px-6">
          {/* Meta */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-lg:grid-cols-1 max-lg:gap-4">
            <div>
              <p className="text-spec-label text-[#B0B0B0] mb-2">작가</p>
              <p className="text-[16px] text-[#1A1A1A]">{exhibition.artist}</p>
            </div>
            <div>
              <p className="text-spec-label text-[#B0B0B0] mb-2">기간</p>
              <p className="text-[16px] text-[#1A1A1A]">{exhibition.startDate} — {exhibition.endDate}</p>
            </div>
            <div>
              <p className="text-spec-label text-[#B0B0B0] mb-2">장소</p>
              <p className="text-[16px] text-[#1A1A1A]">{exhibition.floor}</p>
            </div>
          </div>

          <div className="thin-divider mb-12" />

          {/* Description */}
          <div className="max-w-[640px]">
            <p className="text-[16px] text-[#3A3A3A] leading-[1.8]">
              {exhibition.details || exhibition.description}
            </p>
          </div>

          <div className="mt-16">
            <Link to="/exhibition" className="link-underline text-[14px] text-[#6B6B6B]">
              ← 전시 목록으로
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
