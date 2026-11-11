import { caseStudies, otherWork } from '../content';
import { CompareNote, Contact } from '../components/Compare';
import { CheckLine, Intro, LinkOut, ProfileLinks, StatusBadge } from '../components/Shared';

/** B · Build log: each project reads like a CI run, steps top to bottom. */
export default function LayoutB() {
  return (
    <div className="layout-b">
      <Intro />
      <ProfileLinks />
      <h2>Runs</h2>
      {caseStudies.map((c) => (
        <article key={c.id} id={c.id} className="b-run" aria-labelledby={`${c.id}-b`}>
          <header className="b-run-head">
            <StatusBadge status={c.status} />
            <h3 id={`${c.id}-b`}>{c.title}</h3>
            <span className="kind">{c.kind}</span>
          </header>
          <p>{c.summary}</p>
          <ol className="b-steps">
            <li>
              <strong>problem</strong> {c.problem}
            </li>
            <li>
              <strong>decide</strong>
              <ul>
                {c.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>my part</strong> {c.myPart}
            </li>
            <li>
              <strong>ai draft</strong> {c.aiUse.draft}
            </li>
            <li>
              <strong>review</strong> {c.aiUse.checked} <em>{c.aiUse.result}</em>
            </li>
            <li>
              <strong>checks</strong>
              <ul className="checks">
                {c.checks.map((k) => (
                  <CheckLine key={k.name} check={k} />
                ))}
              </ul>
            </li>
            <li>
              <strong>limits</strong> {c.limits.join(' ')}
            </li>
            <li>
              <strong>learned</strong> {c.learned}
            </li>
          </ol>
          {c.links.length > 0 && (
            <ul className="card-links" aria-label={`${c.title} links`}>
              {c.links.map((l) => (
                <li key={l.href}>
                  <LinkOut link={l} />
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
      <h2>Other work</h2>
      <ul>
        {otherWork.map((l) => (
          <li key={l.href}>
            <LinkOut link={l} />
          </li>
        ))}
      </ul>
      <Contact />
      <CompareNote />
    </div>
  );
}
