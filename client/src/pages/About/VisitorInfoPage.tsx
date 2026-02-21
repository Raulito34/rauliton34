export default function VisitorInfoPage() {
  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">관람안내</h1>
          <p className="text-gray-400 text-sm">Visitor Information</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 bg-light rounded">
              <div className="w-24 flex-shrink-0">
                <h3 className="font-semibold text-primary">관람시간</h3>
              </div>
              <p className="text-sm text-gray-600">AM 10:00 ~ PM 6:00</p>
            </div>
            <div className="flex items-start gap-6 p-6 bg-light rounded">
              <div className="w-24 flex-shrink-0">
                <h3 className="font-semibold text-primary">전시교체</h3>
              </div>
              <p className="text-sm text-gray-600">매주 화요일</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
