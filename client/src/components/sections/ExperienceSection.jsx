export default function ExperienceSection({ experience }) {
  return (
    <div className="space-y-4">
      {experience.map((item) => (
        <article key={item.id} className="relative rounded-2xl border border-accent/15 bg-white/5 p-4 pl-6">
          <span className="absolute left-3 top-5 h-2.5 w-2.5 rounded-full bg-accent shadow-edge" />
          <p className="text-xs uppercase tracking-[0.2em] text-accent/75">
            {item.duration}
          </p>
          <h2 className="mt-2 font-display text-lg uppercase tracking-[0.08em] text-white">
            {item.role}
          </h2>
          <p className="text-sm text-accentSoft">{item.company}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
