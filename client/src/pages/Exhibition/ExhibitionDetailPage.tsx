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
      <div className="pt-20 text-center py-40">
        <p className="text-gray-400">전시 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="pt-20 text-center py-40">
        <p className="text-gray-500">전시 정보를 찾을 수 없습니다.</p>
        <Link to="/exhibition" className="text-accent mt-4 inline-block">전시 목록으로 →</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">{exhibition.title}</h1>
          <p className="text-gray-400 text-sm">{exhibition.artist}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <img
            src={exhibition.imageUrl}
            alt={exhibition.title}
            className="w-full h-96 object-cover mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-light p-4 rounded">
              <span className="text-xs text-gray-500">작가</span>
              <p className="font-semibold text-primary">{exhibition.artist}</p>
            </div>
            <div className="bg-light p-4 rounded">
              <span className="text-xs text-gray-500">기간</span>
              <p className="font-semibold text-primary">{exhibition.startDate} - {exhibition.endDate}</p>
            </div>
            <div className="bg-light p-4 rounded">
              <span className="text-xs text-gray-500">장소</span>
              <p className="font-semibold text-primary">{exhibition.floor}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {exhibition.details || exhibition.description}
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/exhibition"
              className="text-sm text-accent border-b border-accent pb-1 hover:text-accent-light"
            >
              ← 전시 목록으로
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
