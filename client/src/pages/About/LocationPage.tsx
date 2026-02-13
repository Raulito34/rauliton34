export default function LocationPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">오시는 길</h1>
          <p className="text-gray-400 text-sm">Location</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Map Placeholder */}
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center mb-12 rounded">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">지도 영역 (Google Maps / Kakao Map API 연동)</p>
              <p className="text-xs mt-1">서울시 종로구 인사동길 00 아트센터</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Address Info */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">찾아오시는 방법</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">주소</h3>
                  <p className="text-sm text-gray-600">
                    서울특별시 종로구 인사동길 00 아트센터<br />
                    (우편번호: 03148)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">지하철</h3>
                  <p className="text-sm text-gray-600">
                    1호선 종각역 3번 출구 도보 5분<br />
                    3호선 안국역 6번 출구 도보 3분<br />
                    5호선 종로3가역 5번 출구 도보 7분
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">버스</h3>
                  <p className="text-sm text-gray-600">
                    간선: 109, 151, 162, 171, 172, 272, 601<br />
                    지선: 7025<br />
                    인사동 정류장 하차
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Info */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">관람 안내</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">운영시간</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>화요일 ~ 일요일: 10:00 - 18:00</p>
                    <p>매주 월요일 휴관</p>
                    <p className="text-xs text-gray-400">* 전시에 따라 운영시간이 변경될 수 있습니다.</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">관람료</h3>
                  <p className="text-sm text-gray-600">
                    전시에 따라 상이 (무료 ~ 유료)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">연락처</h3>
                  <p className="text-sm text-gray-600">
                    전화: 02-000-0000<br />
                    팩스: 02-000-0001<br />
                    이메일: info@artcenter.com
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">주차</h3>
                  <p className="text-sm text-gray-600">
                    건물 내 주차장 없음<br />
                    인근 공영주차장 이용 (도보 3분)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
