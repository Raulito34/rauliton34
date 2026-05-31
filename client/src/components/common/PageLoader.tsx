/** Lightweight fallback shown while a lazily-loaded route chunk is fetched. */
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
      <span className="text-spec-label text-[var(--ink-mist)] tracking-[0.2em]">Loading…</span>
    </div>
  );
}
