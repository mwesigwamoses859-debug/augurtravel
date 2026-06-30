type FeatureShellProps = {
  eyebrow?: string;
  title: string;
  body: string;
  href?: string;
  action?: string;
};

export function FeatureShell({ eyebrow, title, body, href, action = "Open" }: FeatureShellProps) {
  return (
    <article className="card">
      {eyebrow && <p><strong>{eyebrow}</strong></p>}
      <h3>{title}</h3>
      <p>{body}</p>
      {href && <a className="button" href={href}>{action}</a>}
    </article>
  );
}
