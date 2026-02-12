import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const exhibitions = [
  {
    id: 1, title: '빛의 경계', artist: '김현수', floor: '1F 제2전시관',
    startDate: '2026.02.01', endDate: '2026.03.15', status: 'current' as const,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
    description: '빛과 그림자의 경계를 탐구하는 회화 작품 전시',
  },
  {
    id: 2, title: '도시의 기억', artist: '이서연', floor: '2F 제3전시관',
    startDate: '2026.02.10', endDate: '2026.03.20', status: 'current' as const,
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600',
    description: '도시 공간의 기억과 변화를 담은 사진 전시',
  },
  {
    id: 3, title: '디지털 자연', artist: '박민지', floor: 'B1F 제1전시관',
    startDate: '2026.01.20', endDate: '2026.03.01', status: 'current' as const,
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600',
    description: '디지털 기술로 재해석한 자연의 아름다움',
  },
  {
    id: 4, title: '흙과 불의 대화', artist: '정도윤', floor: '3F 제4전시관',
    startDate: '2026.04.01', endDate: '2026.05.15', status: 'upcoming' as const,
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
    description: '전통 도예의 현대적 재해석',
  },
  {
    id: 5, title: '시간의 층위', artist: '한수빈', floor: '4F 다목적홀',
    startDate: '2026.04.15', endDate: '2026.06.01', status: 'upcoming' as const,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
    description: '시간의 겹침과 축적을 주제로 한 설치 작품전',
  },
  {
    id: 6, title: '무한의 색채', artist: '오지현', floor: '1F 제2전시관',
    startDate: '2025.11.01', endDate: '2025.12.31', status: 'past' as const,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
    description: '추상 회화를 통한 색채의 무한한 가능성 탐구',
  },
  {
    id: 7, title: '소리의 형태', artist: '김태우', floor: 'B1F 제1전시관',
    startDate: '2025.10.15', endDate: '2025.12.15', status: 'past' as const,
    imageUrl: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=600',
    description: '소리를 시각화한 미디어아트 전시',
  },
];

const tabs = [
  { key: 'all', label: '전체' },
  { key: 'current', label: '현재전시' },
  { key: 'upcoming', label: '예정전시' },
  { key: 'past', label: '지난전시' },
];

export default function ExhibitionPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status') || 'all';
  const [activeTab, setActiveTab] = useState(statusParam);

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

          {/* Exhibition Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ex) => (
              <Link key={ex.id} to={`/exhibition/${ex.id}`} className="group">
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
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>해당하는 전시가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
