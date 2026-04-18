export default function GreetingPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="pt-24 pb-16 max-lg:pt-16 max-lg:pb-10">
        <div className="max-w-[1280px] mx-auto px-12 max-lg:px-6">
          <h1 className="text-page-title max-lg:text-[32px]">인사말</h1>
          <p className="text-[14px] text-[#B0B0B0] mt-3 font-display uppercase tracking-[2px]">Greeting</p>
          <div className="thin-divider mt-8" />
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="max-w-[720px] mx-auto px-12 max-lg:px-6">
          <h2 className="font-display text-[28px] font-light leading-snug mb-12 max-lg:text-[22px]">
            예술과 사람을 잇는 공간,<br />
            선아트센터에 오신 것을 환영합니다.
          </h2>

          <div className="space-y-6 text-[16px] text-[#3A3A3A] leading-[1.8]">
            <p>
              선아트센터는 예술가와 관람객, 그리고 다양한 문화 주체들이 만나는
              열린 예술 공간입니다. 지하 1층부터 지상 4층까지 총 5개의 전시 공간을
              갖추고 있으며, 회화, 조각, 설치미술, 미디어아트, 사진, 공예 등
              다양한 장르의 예술 작품을 선보이고 있습니다.
            </p>
            <p>
              우리는 신진 작가부터 중견 작가까지, 역량 있는 예술가들에게
              최적의 전시 환경을 제공하고자 노력하고 있습니다. 각 전시관은
              다목적 전시가 가능하도록 설계되어 있어, 작가의 개성과 작품의
              특성에 맞는 유연한 전시 구성이 가능합니다.
            </p>
            <p>
              또한 세미나, 공연, 워크숍 등 다양한 문화 프로그램을 통해
              예술의 저변을 넓히고, 지역 문화 발전에 기여하고자 합니다.
              선아트센터를 통해 예술의 감동과 영감을 경험하시길 바랍니다.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-[rgba(26,26,26,0.1)]">
            <p className="text-[15px] text-[#6B6B6B]">선아트센터 대표</p>
          </div>
        </div>
      </section>
    </div>
  );
}
