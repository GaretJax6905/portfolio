// Single source of content. Both layouts (A and B) render from this file only,
// so they always show the same intro, projects and main action.
// Anything marked TODO still needs Tom's real value before it goes public.

export type Status = 'working' | 'in progress' | 'planned';
export type CheckResult = 'passed' | 'failed' | 'not run yet';

export interface Link {
  label: string;
  href: string;
}

export interface Check {
  name: string;
  result: CheckResult;
  date?: string;
  href?: string;
}

export interface CaseStudy {
  id: string;
  kind: 'Individual project' | 'Group project' | 'Work project';
  title: string;
  status: Status;
  summary: string;
  problem: string;
  decisions: string[];
  myPart: string;
  aiUse: { draft: string; checked: string; result: string };
  checks: Check[];
  limits: string[];
  learned: string;
  links: Link[];
}

const GITHUB = 'https://github.com/GaretJax6905';

export const profile = {
  name: 'Thomas Moylan',
  role: 'Front-end developer building with AI',
  intro:
    'I build browser apps with a coding agent, and I check what it gives me with tests I can explain. ' +
    'I am finishing a BS in Information Technology (MIS) at NJIT in Spring 2027, and I work in academic ' +
    'computing at Essex County College, where I turn faculty and staff requests into working lab setups.',
  next: 'Looking for an entry-level front-end or full-stack role on a small product team, starting summer 2027.',
  links: {
    github: { label: 'GitHub', href: GITHUB },
    repo: { label: 'This site’s code', href: `${GITHUB}/portfolio` },
    // TODO(Tom): paste your own LinkedIn URL. Until then the link is labelled as missing.
    linkedin: { label: 'LinkedIn', href: '' },
  },
  // TODO(Tom): choose a public contact address (not your work email unless you mean to).
  email: '',
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'rps-chaos',
    kind: 'Individual project',
    title: 'RPS Chaos',
    status: 'working',
    summary:
      'Rock Paper Scissors as a boss-rush arcade game: five bosses, a pattern-learning final boss (ORACLE) and online rooms.',
    problem:
      'Turn a small class lab into a game people replay, with an AI opponent that is fair: it must not be able to see your move.',
    decisions: [
      'The server keeps the game state and both players’ moves, so the browser cannot cheat and Peek is honest.',
      'ORACLE votes on your next move from simple, testable pattern counts instead of a black-box model.',
      'Vanilla JavaScript front end on a Flask JSON API, so every rule lives in Python where it is easy to test.',
    ],
    myPart: 'Solo project. I designed the game, directed the coding agent, reviewed its changes and wrote the plan.',
    aiUse: {
      draft: 'A coding agent wrote most of the first versions of the bosses, rooms and front end.',
      checked:
        'I check each change against automated tests and by playing it. Next experiment: I predicted the agent will miss duplicate-save protection and signing out other sessions after a password change when it builds accounts.',
      result: 'Accounts slice in progress. The two prediction tests are written into the plan but not run yet.',
    },
    checks: [
      {
        name: '115 unit and API tests (pytest)',
        result: 'passed',
        date: 'Nov 11, 2026',
        href: `${GITHUB}/rps-chaos/tree/main/tests`,
      },
      {
        name: 'GitHub Actions on every push (includes 8 Playwright browser journeys)',
        result: 'passed',
        href: `${GITHUB}/rps-chaos/actions/workflows/python.yml`,
      },
      { name: 'Account journey tests (sign up → saved run → dashboard)', result: 'not run yet' },
    ],
    limits: [
      'Free hosting: the first visit after a quiet spell takes 30–60 seconds to wake up.',
      'Accounts and saved scores are planned, not built yet.',
    ],
    learned:
      'Putting the rules on the server made the agent’s mistakes easy to catch, because the tests talk to one API instead of the UI.',
    links: [
      { label: 'Play the demo', href: 'https://rps-chaos.onrender.com' },
      { label: 'Repository', href: `${GITHUB}/rps-chaos` },
      { label: 'Latest checks', href: `${GITHUB}/rps-chaos/actions/workflows/python.yml` },
      { label: 'Project record (SPEC.md)', href: `${GITHUB}/rps-chaos/blob/main/SPEC.md` },
      { label: 'Plan pull request #4', href: `${GITHUB}/rps-chaos/pull/4` },
    ],
  },
  {
    id: 'bench-and-bolt',
    kind: 'Group project',
    title: 'Bench & Bolt repair queue',
    status: 'in progress',
    summary: 'A repair-request queue for a customer scenario, built with a classmate for the IS218 group studio.',
    problem: 'Let a small repair shop take requests, see the queue and update each job’s status.',
    decisions: ['Slices are split by owner so each part can be reviewed by the other person.'],
    // TODO(Tom): replace with your actual slice and your teammate's once agreed.
    myPart: 'To confirm with my teammate. This section will name my slice, my teammate’s slice and who reviewed each.',
    aiUse: {
      draft: 'Not started.',
      checked: 'Not started.',
      result: 'Planned.',
    },
    checks: [{ name: 'Customer story checks', result: 'not run yet' }],
    limits: ['No shared repository link yet. Current progress only; nothing here is finished.'],
    learned: 'Planned: added after the first working slice.',
    links: [],
  },
  {
    id: 'lab-setup',
    kind: 'Work project',
    title: 'Lab computer setup script',
    status: 'working',
    summary:
      'A Windows batch script I use at Essex County College to configure lab computers in one pass: BitLocker, Windows Update, first-run setup and power settings.',
    problem: 'Setting up each lab machine by hand was slow and easy to get slightly wrong.',
    decisions: [
      'Numbered sections, so a technician can see where a run stopped and rerun one part.',
      'Lockdown so standard users cannot install software without admin approval.',
    ],
    myPart: 'I wrote and maintain the script, with AI help drafting sections that I then tested on lab machines.',
    aiUse: {
      draft: 'AI drafted individual sections of the script.',
      checked: 'I ran each section on a test machine before using it on the lab fleet.',
      result: 'In use on lab computers.',
    },
    checks: [{ name: 'Manual run on a test lab machine', result: 'passed' }],
    limits: [
      'The script is not public: it runs on college systems. A cleaned version (no keys, serials or hostnames) is planned.',
    ],
    learned: 'Small, rerunnable sections are easier to trust than one long script.',
    links: [],
  },
];

export const otherWork: Link[] = [
  { label: 'MoodWave — binaural mood synth with a neon visualizer', href: `${GITHUB}/moodwave` },
  { label: 'Plaque Attack — retro dental education game', href: `${GITHUB}/plaque-attack` },
  { label: 'Neon Swarm — graphics-heavy browser game', href: `${GITHUB}/neon-swarm` },
  { label: 'IS218 calculator — tested Python CLI', href: `${GITHUB}/is218_calculator` },
];

export const resume = {
  // TODO(Tom): add your start year at ECC and check every bullet is accurate.
  experience: [
    {
      title: 'Technical Support Specialist, Academic Computing',
      org: 'Essex County College, Newark, NJ',
      dates: '[start year] – present',
      bullets: [
        'Deploy and maintain software on student lab computers, including Autodesk, Office LTSC, developer tools and virtual machines on new Dell all-in-ones.',
        'Joined lab computers to the college lab domain and moved the labs from SmartShield to Deep Freeze Enterprise.',
        'Locked down Windows 11 lab machines so standard users cannot install software without admin approval.',
        'Resolve help desk tickets, run the loaner device program and redeploy computers across campus.',
        'Supervised part-time lab staff and co-write the monthly IT operations report.',
      ],
    },
  ],
  education: [
    {
      title: 'BS, Information Technology (MIS specialization)',
      org: 'New Jersey Institute of Technology',
      dates: 'Expected May 2027',
    },
  ],
  skills: [
    'Python (Flask, pytest, Playwright)',
    'JavaScript, HTML, CSS',
    'React + TypeScript (learning; this site)',
    'Git, GitHub Actions',
    'SQL, MS Access',
    'Java, C++, Rust (coursework)',
    'Windows administration, Linux, Docker',
  ],
};

/** The two presentation options being compared (Stage 4 of the brief). Same content, different treatment. */
export const directions = {
  promise:
    'For a small-team hiring manager, this portfolio makes it easy to see what I built, how I used AI to build it, and how I checked it, then reach my GitHub and résumé.',
  voice: ['practical', 'curious', 'honest'],
  character: 'Builder',
  options: [
    {
      id: 'a',
      name: 'A · Grid & evidence',
      href: '#/',
      reference: { label: 'brittanychiang.com', href: 'https://brittanychiang.com' },
      adapted: 'A sticky intro column beside a scrolling list of work, so name, links and résumé never leave the screen on desktop.',
      strength: 'Fast to scan; evidence sits right next to each claim.',
      risk: 'Can feel like a familiar template.',
    },
    {
      id: 'b',
      name: 'B · Build log',
      href: '#/b',
      reference: { label: 'GitHub Actions run page', href: 'https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/monitoring-workflows/using-workflow-run-logs' },
      adapted: 'Each project as numbered steps (problem → decide → AI draft → review → checks), like a CI job, to show how I work.',
      strength: 'Shows process and checking, which is what my promise is about.',
      risk: 'Longer to read; monospace text is harder to skim on a phone.',
    },
  ],
  leaning:
    'Leaning A for scannability, but keeping B’s “AI draft → review → checks” order inside A’s cards. Final choice after the Nov 18 peer test.',
  persuasion: [
    'Evidence before claims: every project card links a demo, code or check result. Limit: a link only helps if the reader clicks it.',
    'Honest status badges (working / in progress / planned). Limit: “in progress” items can read as weaker, so they stay short.',
  ],
};
