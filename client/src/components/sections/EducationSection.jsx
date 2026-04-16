export default function EducationSection({ education }) {
  return (
    <div className="space-y-4">
      {education.map((item) => (
        <article key={item.id} className="rounded-2xl border border-accent/15 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-accent/75">
            {item.year}
          </p>
          <h2 className="mt-2 font-display text-lg uppercase tracking-[0.08em] text-white">
            {item.degree}
          </h2>
          <p className="mt-2 text-sm text-slate-200">{item.institution}</p>
        </article>
      ))}
    </div>
  );
}
