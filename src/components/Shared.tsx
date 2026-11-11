import type { Check, Link, Status } from '../content';
import { profile } from '../content';

/** External link, or an honest "not added yet" label when the URL is missing. */
export function LinkOut({ link }: { link: Link }) {
  if (!link.href) return <span className="missing">{link.label} (link not added yet)</span>;
  return (
    <a href={link.href} target="_blank" rel="noreferrer">
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge badge-${status.replace(' ', '-')}`}>{status}</span>;
}

export function CheckLine({ check }: { check: Check }) {
  const icon = check.result === 'passed' ? '✓' : check.result === 'failed' ? '✗' : '○';
  const body = (
    <>
      <span aria-hidden="true">{icon}</span> {check.name} — <strong>{check.result}</strong>
      {check.date ? ` (${check.date})` : ''}
    </>
  );
  return (
    <li className={`check check-${check.result.replace(/ /g, '-')}`}>
      {check.href ? (
        <a href={check.href} target="_blank" rel="noreferrer">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}

/** Professional links shown in both layouts and on the résumé. */
export function ProfileLinks() {
  return (
    <ul className="profile-links" aria-label="Professional links">
      <li>
        <a href="#/resume">Résumé</a>
      </li>
      <li>
        <LinkOut link={profile.links.github} />
      </li>
      <li>
        <LinkOut link={profile.links.linkedin} />
      </li>
      <li>
        <LinkOut link={profile.links.repo} />
      </li>
      <li>
        {profile.email ? (
          <a href={`mailto:${profile.email}`}>Email</a>
        ) : (
          <span className="missing">Email (not added yet)</span>
        )}
      </li>
    </ul>
  );
}

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="intro">
      <h1 id="intro-title">{profile.name}</h1>
      <p className="role">{profile.role}</p>
      <p>{profile.intro}</p>
      <p className="next">{profile.next}</p>
      <a className="cta" href="#/resume">
        View résumé
      </a>
    </section>
  );
}
