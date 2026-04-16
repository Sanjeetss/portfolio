export default function AboutSection({ data }) {
  if (!data) {
    return <p className="text-sm text-muted">Awaiting identity signal...</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mt-2 text-lg text-accent text-white">I'm an</p>
        <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-white">
          {data.title}
        </h2>
        {/* <p className="mt-2 text-lg text-accent">{data.title}</p> */}
      </div>
      <p className="text-base leading-relaxed text-slate-200">{data.bio}</p>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="rounded-2xl border border-accent/15 bg-white/5 p-3">
          <p className="hud-label text-[10px] text-accent/70">Focus</p>
          <p className="mt-2 text-sm text-white">AI Product Engineering</p>
        </div>
        <div className="rounded-2xl border border-accent/15 bg-white/5 p-3">
          <p className="hud-label text-[10px] text-accent/70">Strength</p>
          <p className="mt-2 text-sm text-white">Full-Stack Delivery</p>
        </div>
      </div>
    </div>
  );
}
