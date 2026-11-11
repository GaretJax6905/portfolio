import { caseStudies, otherWork } from '../content';
import { CompareNote, Contact } from '../components/Compare';
import { CheckLine, Intro, LinkOut, ProfileLinks, StatusBadge } from '../components/Shared';

/** A · Grid & evidence: sticky intro on the left, scannable case studies on the right. */
export default function LayoutA() {
  return (
    <div className="layout-a">
      <aside className="a-side">
        <Intro />
        <ProfileLinks />
      </aside>
      <div className="a-main">
        <h2>Case studies</h2>
        {caseStudies.map((c) => (
          <article key={c.id} id={c.id} className="a-card" aria-labelledby={`${c.id}-a`}>
            <p className="kind">
              {c.kind} <StatusBadge status={c.status} />
            </p>
            <h3 id={`${c.id}-a`}>{c.title}</h3>
            <p>{c.summary}</p>
            {c.links.length > 0 && (
              <ul className="card-links" aria-label={`${c.title} links`}>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <LinkOut link={l} />
                  </li>
                ))}
              </ul>
            )}
            <h4>Problem</h4>
            <p>{c.problem}</p>
            <h4>Decisions</h4>
            <ul>
              {c.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h4>My part</h4>
            <p>{c.myPart}</p>
            <h4>AI draft → what I checked → result</h4>
            <p>
              {c.aiUse.draft} {c.aiUse.checked} <em>{c.aiUse.result}</em>
            </p>
            <h4>Checks</h4>
            <ul className="checks">
              {c.checks.map((k) => (
                <CheckLine key={k.name} check={k} />
              ))}
            </ul>
            <h4>Limits</h4>
            <ul>
              {c.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <h4>What I learned</h4>
            <p>{c.learned}</p>
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
    </div>
  );
}
