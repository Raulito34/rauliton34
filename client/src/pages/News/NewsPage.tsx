import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const newsData = [
  { id: 1, title: '2026년 상반기 대관 접수 안내', category: 'notice' as const, date: '2026.01.15', content: '2026년 상반기(3월~8월) 대관 접수를 시작합니다. 관심 있는 작가 및 단체의 많은 신청 바랍니다.' },
  { id: 2, title: '설 연휴 휴관 안내 (2/7 ~ 2/10)', category: 'notice' as const, date: '2026.01.30', content: '설 연휴 기간 동안 아트센터는 휴관합니다. 2월 11일(수)부터 정상 운영됩니다.' },
  { id: 3, title: '제3전시관 리모델링 완료 안내', category: 'notice' as const, date: '2026.01.10', content: '2F 제3전시관의 리모델링이 완료되었습니다. 새로운 조명 시스템과 가벽 시스템이 도입되었습니다.' },
  { id: 4, title: '김현수 작가 초대전 "빛의 경계" 개막', category: 'news' as const, date: '2026.02.01', content: '1F 제2전시관에서 김현수 작가의 개인전이 개막했습니다. 빛과 그림자의 경계를 탐구하는 회화 작품 30여 점이 전시됩니다.' },
  { id: 5, title: '2025년 연간 보고서 발간', category: 'news' as const, date: '2026.01.20', content: '2025년 아트센터 연간 보고서가 발간되었습니다. 총 48개의 전시가 진행되었으며, 연간 관람객 12만 명을 기록했습니다.' },
  { id: 6, title: '아트센터 × 대학교 산학협력 MOU 체결', category: 'news' as const, date: '2026.01.05', content: '아트센터와 서울예술대학교가 신진 작가 양성을 위한 산학협력 MOU를 체결했습니다.' },
  { id: 7, title: '주차장 이용 안내 변경', category: 'notice' as const, date: '2025.12.20', content: '인근 공영주차장 리모델링에 따른 주차 안내가 변경되었습니다. 자세한 내용은 오시는 길 페이지를 참고해주세요.' },
  { id: 8, title: '2025 아트센터 베스트 전시 선정', category: 'news' as const, date: '2025.12.28', content: '관람객 투표를 통해 2025년 아트센터 베스트 전시 3선이 선정되었습니다.' },
];

export default function NewsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [activeTab, setActiveTab] = useState(categoryParam);

  const filtered = activeTab === 'all'
    ? newsData
    : newsData.filter((n) => n.category === activeTab);

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

          {/* News List */}
          <div className="divide-y">
            {filtered.map((item) => (
              <div key={item.id} className="py-6 hover:bg-gray-50 px-4 -mx-4 transition-colors cursor-pointer">
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
                  <span className="text-xs text-gray-400 flex-shrink-0 mt-1">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>등록된 소식이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
