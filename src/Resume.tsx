import { caseStudies, profile, resume } from './content';
import { ProfileLinks } from './components/Shared';

export default function Resume() {
  const rps = caseStudies[0];
  return (
    <article className="resume" aria-labelledby="resume-title">
      <p className="draft-note">Draft résumé — use your browser’s Print → Save as PDF for a file.</p>
      <h1 id="resume-title">{profile.name}</h1>
      <p>{profile.role}</p>
      <ProfileLinks />
      <h2>Experience</h2>
      {resume.experience.map((e) => (
        <section key={e.title}>
          <h3>
            {e.title} · {e.org}
          </h3>
          <p className="dates">{e.dates}</p>
          <ul>
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}
      <h2>Projects</h2>
      <section>
        <h3>{rps.title}</h3>
        <p>
          {rps.summary} Flask API, vanilla JavaScript front end, 115 automated tests plus browser tests in GitHub
          Actions.
        </p>
      </section>
      <h2>Education</h2>
      {resume.education.map((e) => (
        <section key={e.title}>
          <h3>
            {e.title} · {e.org}
          </h3>
          <p className="dates">{e.dates}</p>
        </section>
      ))}
      <h2>Skills</h2>
      <p>{resume.skills.join(' · ')}</p>
    </article>
  );
}
