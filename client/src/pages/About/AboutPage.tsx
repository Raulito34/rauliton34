import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">센터소개</h1>
          <p className="text-gray-400 text-sm">About Us</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/about/greeting"
              className="group p-8 bg-light rounded hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors mb-3">
                인사말
              </h3>
              <p className="text-sm text-gray-600">
                선아트센터의 비전과 철학을 소개합니다.
              </p>
            </Link>
            <Link
              to="/about/architecture"
              className="group p-8 bg-light rounded hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors mb-3">
                건축 / 공간
              </h3>
              <p className="text-sm text-gray-600">
                선아트센터의 건축 설계와 공간 구성을 확인하세요.
              </p>
            </Link>
            <Link
              to="/about/location"
              className="group p-8 bg-light rounded hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors mb-3">
                오시는 길
              </h3>
              <p className="text-sm text-gray-600">
                선아트센터 위치와 교통편 안내입니다.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
