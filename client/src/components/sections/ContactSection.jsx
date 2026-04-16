const isUrl = (value) => /^https?:\/\//i.test(value);

export default function ContactSection({ contact }) {
  return (
    <div className="space-y-4">
      {contact.map((item) => {
        const isEmail = item.type.toLowerCase() === 'email';
        const href = isEmail ? `mailto:${item.value}` : item.value;
        const clickable = isEmail || isUrl(item.value);

        const content = (
          <div className="block rounded-2xl border border-accent/15 bg-white/5 p-4 transition hover:border-accent/50 hover:bg-accent/10">
            <p className="hud-label text-[10px] text-accent/75">{item.type}</p>
            <p className="mt-2 break-all text-sm text-white">{item.value}</p>
          </div>
        );

        if (!clickable) {
          return <div key={item.id}>{content}</div>;
        }

        return (
          <a
            key={item.id}
            href={href}
            target={!isEmail ? '_blank' : undefined}
            rel={!isEmail ? 'noreferrer' : undefined}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
