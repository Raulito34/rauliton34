import { useParams, Link } from 'react-router-dom';

const exhibitionsData: Record<string, {
  title: string; artist: string; floor: string;
  startDate: string; endDate: string; description: string;
  imageUrl: string; details: string;
}> = {
  '1': {
    title: '빛의 경계', artist: '김현수', floor: '1F 제2전시관',
    startDate: '2026.02.01', endDate: '2026.03.15',
    description: '빛과 그림자의 경계를 탐구하는 회화 작품 전시',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200',
    details: '김현수 작가의 개인전 "빛의 경계"는 빛과 어둠, 가시와 비가시의 경계에 대한 탐구를 담은 회화 작품 30여 점을 선보입니다. 작가는 자연광의 변화에 따른 공간의 변모를 캔버스에 포착하여, 관람자로 하여금 빛의 본질에 대해 사유하게 합니다.',
  },
  '2': {
    title: '도시의 기억', artist: '이서연', floor: '2F 제3전시관',
    startDate: '2026.02.10', endDate: '2026.03.20',
    description: '도시 공간의 기억과 변화를 담은 사진 전시',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200',
    details: '이서연 사진작가의 "도시의 기억"은 서울의 오래된 골목과 건축물이 재개발로 사라져가는 과정을 기록한 다큐멘터리 사진전입니다. 50여 점의 사진을 통해 도시가 품고 있던 기억과 이야기를 되돌아봅니다.',
  },
  '3': {
    title: '디지털 자연', artist: '박민지', floor: 'B1F 제1전시관',
    startDate: '2026.01.20', endDate: '2026.03.01',
    description: '디지털 기술로 재해석한 자연의 아름다움',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200',
    details: '박민지 작가의 미디어아트 전시 "디지털 자연"은 AI와 프로젝션 매핑 기술을 활용하여 자연의 아름다움을 디지털 공간으로 옮겨놓은 몰입형 전시입니다. 관람객은 디지털로 재현된 숲, 바다, 하늘 속을 거닐며 새로운 감각적 경험을 하게 됩니다.',
  },
};

export default function ExhibitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const exhibition = id ? exhibitionsData[id] : null;

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
            <p className="text-gray-600 leading-relaxed">{exhibition.details}</p>
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
