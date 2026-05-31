import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 bg-[var(--canvas)]">
      <div className="text-center max-w-[480px]">
        <div className="font-display font-extralight text-[clamp(5rem,12vw,9rem)] leading-none text-[var(--ink-faint)] tracking-[-0.04em]">
          404
        </div>
        <h1 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-light mt-4 mb-4">
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="text-[15px] text-[var(--ink-soft)] mb-10 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="btn-primary"><span>홈으로</span></Link>
          <Link to="/exhibition" className="btn-outline">전시 보기</Link>
        </div>
      </div>
    </div>
  );
}
