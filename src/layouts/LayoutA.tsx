import { caseStudies, otherWork } from '../content';
import { CompareNote, Contact } from '../components/Compare';
import { CheckLine, Intro, LinkOut, ProfileLinks, StatusBadge } from '../components/Shared';

const allChecks = caseStudies.flatMap((c) => c.checks);
const stats = [
  { value: caseStudies.length, label: 'case studies' },
  { value: allChecks.filter((k) => k.result === 'passed').length, label: 'checks passed' },
  { value: allChecks.filter((k) => k.result === 'not run yet').length, label: 'checks still to run' },
  { value: otherWork.length, label: 'more builds' },
];

/** A · Grid & evidence: sticky intro on the left, scannable case studies on the right. */
export default function LayoutA() {
  return (
    <div className="layout-a">
      <aside className="a-side">
        <p className="eyebrow">Player 1 · Ready</p>
        <Intro />
        <ProfileLinks />
      </aside>
      <div className="a-main">
        <ul className="stat-strip" aria-label="Evidence at a glance">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong> <span>{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="eyebrow">01 / Case studies</p>
        <h2>What I built, and how I checked it</h2>
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
        <p className="eyebrow">02 / More builds</p>
        <h2>Other work</h2>
        <ul className="other-work">
          {otherWork.map((l) => (
            <li key={l.href}>
              <LinkOut link={l} />
            </li>
          ))}
        </ul>
        <p className="eyebrow">03 / Contact</p>
        <Contact />
        <CompareNote />
      </div>
    </div>
  );
}
