import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    // Kakao Maps SDK is loaded dynamically and ships no types; the surface we
    // touch (maps.load/Map/LatLng/Marker) is untyped by design.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const LAT = 37.5730;
const LNG = 126.9856;
const KAKAO_MAP_LINK = `https://map.kakao.com/link/map/SUN ART CENTER,${LAT},${LNG}`;

export default function LocationPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const kakaoKey = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (!kakaoKey || !mapRef.current) return;

    // Dynamically load Kakao Maps SDK
    if (window.kakao?.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };
    document.head.appendChild(script);

    function initMap() {
      if (!mapRef.current) return;
      const coords = new window.kakao.maps.LatLng(LAT, LNG);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: coords,
        level: 3,
      });

      const marker = new window.kakao.maps.Marker({ position: coords });
      marker.setMap(map);

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:8px 12px;font-size:13px;font-weight:600;white-space:nowrap;">SUN ART CENTER</div>',
      });
      infoWindow.open(map, marker);

      setMapLoaded(true);
    }
  }, []);

  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">오시는 길</h1>
          <p className="text-[11px] uppercase tracking-widest text-white/40">Location</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Map */}
          <div className="mb-12">
            <div ref={mapRef} className="w-full h-96 bg-black/5" style={{ display: mapLoaded || import.meta.env.VITE_KAKAO_MAP_KEY ? 'block' : 'none' }} />
            {!import.meta.env.VITE_KAKAO_MAP_KEY && (
              <a
                href={KAKAO_MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-96 bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center"
              >
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/40 mb-1">서울특별시 종로구 인사동5길 8</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30">카카오맵에서 보기 →</p>
                </div>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Address & Transit */}
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">01</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter">찾아오시는 방법</h2>
              </div>
              <div className="thin-divider mb-8" />

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">주소</h3>
                  <p className="text-[13px] font-light text-black/60 leading-relaxed">
                    서울특별시 종로구 인사동5길 8 SUN ART CENTER<br />
                    (우편번호: 03162)
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">지하철</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-black/30 mt-0.5 shrink-0">3호선</span>
                      <p className="text-[13px] font-light text-black/60">안국역 6번 출구 도보 3분</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-black/30 mt-0.5 shrink-0">1호선</span>
                      <p className="text-[13px] font-light text-black/60">종각역 3번 출구 도보 8분</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-black/30 mt-0.5 shrink-0">1·3·5호선</span>
                      <p className="text-[13px] font-light text-black/60">종로3가역 5번 출구 도보 5분</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">버스</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-black/30 mt-0.5 shrink-0">간선</span>
                      <p className="text-[13px] font-light text-black/60">109, 151, 162, 171, 172, 272, 601</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-black/30 mt-0.5 shrink-0">지선</span>
                      <p className="text-[13px] font-light text-black/60">7025</p>
                    </div>
                    <p className="text-[11px] font-medium text-black/40 mt-1">인사동·안국역 정류장 하차</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Info */}
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">02</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter">관람 안내</h2>
              </div>
              <div className="thin-divider mb-8" />

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">운영시간</h3>
                  <div className="text-[13px] font-light text-black/60 leading-relaxed space-y-1">
                    <p>매일 10:00 — 18:00</p>
                    <p className="text-[11px] text-black/30 mt-2">* 전시에 따라 운영시간이 변경될 수 있습니다.</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">관람료</h3>
                  <p className="text-[13px] font-light text-black/60">
                    전시에 따라 상이 (무료 ~ 유료)
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">연락처</h3>
                  <p className="text-[13px] font-light text-black/60 leading-relaxed">
                    전화: 02-000-0000<br />
                    팩스: 02-000-0001<br />
                    이메일: info@sunartcenter.co.kr
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-3">주차</h3>
                  <p className="text-[13px] font-light text-black/60 leading-relaxed">
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
