import { Link } from 'react-router-dom';

const spaces = [
  {
    floor: '1f', label: '1F', name: '1전시관', area: 120, pyeong: 35, height: 3.0,
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=800',
  },
  {
    floor: '2f', label: '2F', name: '2전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800',
  },
  {
    floor: '3f', label: '3F', name: '3전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  },
  {
    floor: '4f', label: '4F', name: '4전시관', area: 70, pyeong: 20, height: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    floor: 'b1f', label: 'B1F', name: 'B1전시관', area: 250, pyeong: 75, height: 2.6,
    imageUrl: 'https://images.unsplash.com/photo-1594784457240-6d3aa0f2cf10?w=800',
  },
];

export default function SpacesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">공간안내</h1>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Space Inventory</p>
        </div>
      </section>

      {/* Spaces — Asymmetric Architectural Layout */}
      <section className="py-12 bg-white">
        <div className="px-6">
          <p className="text-[13px] font-medium text-black/60 text-center mb-12 uppercase tracking-wide">
            지하 1층부터 지상 4층까지, 총 5개의 전시 공간을 갖추고 있습니다.
          </p>

          <div className="space-y-20">
            {spaces.map((space, idx) => (
              <Link key={space.floor} to={`/spaces/${space.floor}`} className="block group">
                <div className="flex flex-col gap-6">
                  {/* Asymmetric image placement */}
                  <div className={`${idx % 2 === 0 ? 'w-4/5 lg:w-3/5 ml-auto' : 'w-4/5 lg:w-3/5 mr-auto'} img-frame`}>
                    <img
                      alt={space.name}
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-500"
                      src={space.imageUrl}
                    />
                  </div>

                  <div className={`${idx % 2 === 0 ? 'w-2/3 pr-4' : 'w-2/3 ml-auto text-right pl-4'}`}>
                    <span className="text-3xl font-black text-black/10">{space.label}</span>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2 mt-1">{space.name}</h3>
                    <p className="text-[11px] leading-relaxed text-black/60 font-medium mb-4 uppercase">
                      {space.area}㎡ ({space.pyeong}평) · 천장고 {space.height}M
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black pb-1">
                      상세 보기
                    </span>
                  </div>
                </div>
                {idx < spaces.length - 1 && <div className="thin-divider mt-12" />}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
