export default function ProjectsSection({ projects }) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-2xl border border-accent/15 bg-white/5 p-4"
        >
          <h2 className="font-display text-lg uppercase tracking-[0.08em] text-white">
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            {project.description}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-accent/80">
            {project.tech_stack}
          </p>
          {project.github_link || project.live_link ? (
            <div className="mt-4 flex gap-3 text-xs uppercase tracking-[0.18em] text-accent">
              {project.github_link ? (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-accent/25 px-3 py-1.5 transition hover:border-accent/60 hover:bg-accent/10"
                >
                  GitHub
                </a>
              ) : null}
              {project.live_link ? (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-accent/25 px-3 py-1.5 transition hover:border-accent/60 hover:bg-accent/10"
                >
                  Live
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
