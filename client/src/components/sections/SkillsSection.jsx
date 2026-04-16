export default function SkillsSection({ skills }) {
  return (
    <div className="space-y-4">
      {Object.entries(skills).map(([category, items]) => (
        <section
          key={category}
          className="rounded-2xl border border-accent/15 bg-white/5 p-4"
        >
          <h2 className="font-display text-base text-white uppercase tracking-[0.16em] text-accent">
            {category}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm text-white"
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
