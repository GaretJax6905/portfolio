# Portfolio record — Thomas Moylan

## Status

- Stage: Review 2 · First working slice. Draft site built with two layouts; peer test on Nov 18 still to do.
- Live: https://garetjax6905.github.io/portfolio/ (after the first Pages deploy)
- Stack: Vite + React + TypeScript, deployed to GitHub Pages. Built with a coding
  agent; I review and test what it produces.

## Direction

- Main: AI-augmented front-end/full-stack development.
- Also exploring: applied AI / forward-deployed work.

## Reader

Compared:

- **A.** A hiring manager at a small product team that hires AI-native developers from
  their GitHub and side projects.
- **B.** A large-company new-grad recruiter.

Chosen: **A**, because those are the roles I can realistically land this spring.

**Promise:** "For a small-team hiring manager, this portfolio makes it easy to see what
I built, how I used AI to build it, and how I checked it, then reach my GitHub and
résumé."

Assumption to check: these readers try a demo before reading a case study.

## Brand

- Voice: practical, curious, honest. Character: Builder.
- **A · Grid & evidence:** two-column layout with a sticky intro (reference:
  brittanychiang.com).
- **B · Build log:** each project shown like a commit and CI history (reference:
  the GitHub Actions run page).
- Both use the same intro, projects and "View résumé" action. Choose after a peer test.
- Honest persuasion: each case study shows the AI's draft, what I caught, and the test
  that proved the fix. No invented metrics or testimonials.

## Case studies (planned)

1. **RPS Chaos** — accounts, saved runs and tests; what the coding agent got wrong and
   how I caught it. Plan: [SPEC.md](https://github.com/GaretJax6905/rps-chaos/blob/final-project-plan/SPEC.md)
2. **Group project** — Bench & Bolt repair queue; my slice clearly labeled.
3. **Lab setup automation** — a setup script I wrote for work (license keys, serials and
   hostnames removed).

## Stories

| Story | Check |
|---|---|
| As a hiring manager, I want to try something I built. | RPS Chaos demo, repo and latest test run open from its card. |
| As a hiring manager, I want to see how I work with AI. | Each case study has an "AI draft → what I checked → fix" section linking the commit. |
| As a reviewer, I want to know my part of the group project. | Case study names my slice, my teammate's, AI help and one limit. |
| As a reviewer on a phone, I want my résumé fast. | Résumé, GitHub and LinkedIn within two clicks; works at 375px and by keyboard. |

## AI use

AI helped find and summarize job postings; I read each posting myself. The site will
be built with a coding agent, and I will check accessibility and links myself.

## 2 · First working slice

**New behavior:** one Vite + React + TypeScript site with both presentation options built from the
same content file ([`src/content.ts`](src/content.ts)):

- **A · Grid & evidence** (`#/`): sticky intro on the left, case-study cards on the right.
  Adapted from brittanychiang.com (sticky intro column beside scrolling work).
- **B · Build log** (`#/b`): each project reads like a CI run: problem → decide → my part → AI draft →
  review → checks → limits. Adapted from the GitHub Actions run page (numbered job steps).
- **Résumé draft** (`#/resume`), printable to PDF.
- **Case studies:** RPS Chaos (working), Bench & Bolt group project (in progress, labelled), lab setup
  script (work; code not public). Plus links to MoodWave, Plaque Attack, Neon Swarm and the IS218 calculator.
- **Contact** section and an "About this draft" note in both layouts (promise, voice, both references,
  strengths/risks, persuasion choices and their limits).

**Leaning:** A for scannability, keeping B's "AI draft → review → checks" order inside A's cards.
Decide after the Nov 18 peer test.

### Pattern experiment: shared content + components vs. two separate pages

- **Problem:** the brief wants two presentation options with the *same* content, without building two portfolios.
- **Alternative:** two hand-written pages (copy the text into each). Simple at first, but every edit
  has to be made twice and the two drafts drift apart, so the comparison stops being fair.
- **Attempted:** one typed content module (`content.ts`) and shared components (`Intro`, `ProfileLinks`,
  `CheckLine`, `StatusBadge`, `LinkOut`, `Contact`, `CompareNote`). Each layout file
  (`src/layouts/LayoutA.tsx`, `LayoutB.tsx`) only decides arrangement.
- **Test:** `shows the same projects as the other layout` renders both layouts and asserts the same
  case-study titles in the same order; every story test runs against both layouts (`describe.each`).
- **Cost:** a layout can't easily show one-off content; adding a field means touching the type.
  **Keep for now**; revisit after choosing A or B, when one layout file may be removed.

### Stories and their checks

| Story | Acceptance check | Result (Nov 11) |
|---|---|---|
| 1. As a hiring manager, I want to try something I built. | RPS Chaos demo, repo and latest checks open from its card. | passed (both layouts) |
| 2. As a hiring manager, I want to see how I work with AI. | Every case study shows "AI draft → what I checked → result". | passed |
| 3. As a reviewer, I want to know my part of the group project. | Group case study has "My part" and is labelled in progress. | passed, but my slice still says "to confirm" |
| 4. As a reviewer on a phone, I want my résumé fast. | Résumé, GitHub and LinkedIn on the first screen; works at 375px and by keyboard. | partly: links, 375px and keyboard pass; LinkedIn URL not added yet |

### Checks run (Nov 11, 2026)

| Check | Result |
|---|---|
| `npm test`: 20 tests — stories 1–4 in both layouts, same projects in both, no empty links, contact + comparison present, keyboard skip link, résumé sections | passed |
| axe-core accessibility scan of Layout A, Layout B and résumé (contrast excluded; jsdom) | passed, 0 violations |
| `npm run build` (type-check + build) | passed |
| Headless Chromium at 1280px and 375px: no sideways scroll on A, B or résumé | passed |
| Text contrast, both themes (WCAG AA 4.5:1), computed from the CSS colours | passed after fix (see below) |
| RPS Chaos suite referenced on the site: 115 unit/API tests | passed |
| `npm run check:links` (every external link returns < 400) | passed: 14 of 14 links OK in [Actions run 43050370974](https://github.com/GaretJax6905/portfolio/actions/runs/43050370974); LinkedIn not added yet |
| Screen reader pass | not run yet |
| Peer task | not run yet (Nov 18; use the "Peer review observation" issue template) |

**AI output, my inspection, result:** a coding agent wrote the components and tests from my plan.
The screenshot check caught a real bug in its Layout B: the dark theme's colours were set on the page
wrapper but the text colour was still inherited from the light theme, so the run cards were nearly
unreadable. Fixed by applying `color`/`background` on `.site`; re-checked by screenshot and contrast
ratios. The agent's first Story 4 test also broke once a Contact section repeated the profile links;
I changed it to check the first-screen copy, which is what the story is about.

**Still incomplete (labelled on the site):** LinkedIn URL, public contact email, ECC start year on the
résumé, my exact slice in the group project, and a cleaned public version of the lab script.

**Peer observation:** pending. On Nov 18 a classmate gets this task, without coaching: "Find my individual
project, tell me what I did in the group project, then find my code, résumé and professional profiles."
Record it with the **Peer review observation** issue template, make one change, and retest.
