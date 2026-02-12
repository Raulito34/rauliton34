export default function TermsPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">대관규약</h1>
          <p className="text-gray-400 text-sm">Rental Terms & Conditions</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-8">
            <div>
              <h2 className="text-lg font-bold text-primary">제1조 (목적)</h2>
              <p>
                본 규약은 아트센터(이하 "센터")의 전시 공간 대관에 관한 제반 사항을
                규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제2조 (대관 대상)</h2>
              <p>센터의 대관 대상 공간은 다음과 같습니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>B1F 제1전시관 (미디어아트/설치미술)</li>
                <li>1F 제2전시관 (기획전시/회화)</li>
                <li>2F 제3전시관 (개인전/그룹전)</li>
                <li>3F 제4전시관 (사진/공예)</li>
                <li>4F 다목적홀 (세미나/공연/특별전)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제3조 (대관 신청)</h2>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>대관 신청은 사용 희망일 최소 2개월 전에 신청해야 합니다.</li>
                <li>신청 시 전시 기획안, 작가 포트폴리오를 함께 제출해야 합니다.</li>
                <li>센터는 전시 기획의 적합성을 심사하여 대관 승인 여부를 결정합니다.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제4조 (대관료 및 납부)</h2>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>대관료는 센터가 정한 요금표에 따릅니다.</li>
                <li>계약금(대관료의 50%)은 계약 체결 시 납부합니다.</li>
                <li>잔금은 전시 시작 2주 전까지 완납해야 합니다.</li>
                <li>대관료에는 기본 조명, 전기, 냉난방비가 포함됩니다.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제5조 (취소 및 환불)</h2>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>전시 시작 30일 전 취소: 납부금의 90% 환불</li>
                <li>전시 시작 15일 전 취소: 납부금의 50% 환불</li>
                <li>전시 시작 7일 전 취소: 환불 불가</li>
                <li>천재지변 등 불가항력적 사유의 경우 별도 협의합니다.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제6조 (시설 이용)</h2>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>대관자는 센터의 시설을 선량한 관리자의 주의로 사용해야 합니다.</li>
                <li>시설물의 훼손이나 파손 시 원상 복구 또는 손해배상의 의무가 있습니다.</li>
                <li>작품 반입 및 설치 시 센터 직원의 안내에 따라야 합니다.</li>
                <li>센터의 사전 승인 없이 시설의 구조를 변경할 수 없습니다.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제7조 (보험)</h2>
              <p>
                전시 기간 중 작품 및 관람객에 대한 보험은 대관자가 별도로 가입해야 합니다.
                센터는 대관자의 작품 분실, 파손 등에 대해 책임지지 않습니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">제8조 (기타)</h2>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>본 규약에 명시되지 않은 사항은 센터와 대관자 간 협의에 의합니다.</li>
                <li>센터는 공익적 목적 또는 시설 안전을 위해 대관을 제한할 수 있습니다.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
