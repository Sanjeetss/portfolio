export default function Face({ label, isActive, children, onClick }) {
  return (
    <button
      type="button"
      className={`cube-face-card text-left ${
        isActive ? "ring-1 ring-accent/60" : ""
      }`}
      onClick={onClick}
    >
      <div className="cube-face-inner face-scrollbar">
        <div className="mb-4 flex items-center justify-between">
          <span className="hud-label text-[10px] text-accent/80">{label}</span>
          {/* <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-display text-[10px] uppercase tracking-[0.28em] text-accent">
            Open
          </span> */}
        </div>
        {children}
      </div>
    </button>
  );
}
