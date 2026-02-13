import { Link } from 'react-router-dom';

export default function RentalPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">대관안내</h1>
          <p className="text-gray-400 text-sm">Rental Information</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-12">
            선아트센터의 전시 공간을 대관하여 여러분의 예술 작품을 선보이세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/rental/procedure" className="group p-8 bg-light rounded hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">01</span>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">대관절차</h3>
              <p className="text-sm text-gray-600">대관 신청부터 전시 진행까지의 절차를 안내합니다.</p>
            </Link>

            <Link to="/rental/pricing" className="group p-8 bg-light rounded hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">02</span>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">대관료</h3>
              <p className="text-sm text-gray-600">공간별, 기간별 대관 요금을 확인하세요.</p>
            </Link>

            <Link to="/rental/terms" className="group p-8 bg-light rounded hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">03</span>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">대관규약</h3>
              <p className="text-sm text-gray-600">대관 이용에 관한 규약 및 약관입니다.</p>
            </Link>

            <Link to="/rental/status" className="group p-8 bg-light rounded hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">04</span>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">대관신청</h3>
              <p className="text-sm text-gray-600">대관 가능 일정을 확인하고 온라인으로 신청하세요.</p>
            </Link>

            <Link to="/rental/list" className="group p-8 bg-light rounded hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">05</span>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">신청내역</h3>
              <p className="text-sm text-gray-600">대관 신청 내역과 진행 상태를 확인하세요.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
