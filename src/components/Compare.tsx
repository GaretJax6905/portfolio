import { directions } from '../content';
import { LinkOut, ProfileLinks } from './Shared';

/** Visible in both layouts: contact route plus a short note comparing the two drafts. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact">
      <h2 id="contact-title">Contact</h2>
      <p>The quickest way to reach me or see more of my code:</p>
      <ProfileLinks />
    </section>
  );
}

export function CompareNote() {
  return (
    <details className="compare">
      <summary>About this draft: two layouts, same content</summary>
      <p>
        <strong>Promise:</strong> {directions.promise}
      </p>
      <p>
        <strong>Voice:</strong> {directions.voice.join(', ')} · <strong>Character:</strong> {directions.character}
      </p>
      <ul>
        {directions.options.map((o) => (
          <li key={o.id}>
            <a href={o.href}>{o.name}</a> — adapted from <LinkOut link={o.reference} />: {o.adapted}{' '}
            <em>Strength:</em> {o.strength} <em>Risk:</em> {o.risk}
          </li>
        ))}
      </ul>
      <p>{directions.leaning}</p>
      <p>
        <strong>Persuasion choices and their limits:</strong>
      </p>
      <ul>
        {directions.persuasion.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </details>
  );
}
