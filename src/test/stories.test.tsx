// Each test is one acceptance check from PORTFOLIO.md "Stories".
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { routeFromHash } from '../App';
import LayoutA from '../layouts/LayoutA';
import LayoutB from '../layouts/LayoutB';
import { caseStudies } from '../content';

const layouts = [
  ['A', LayoutA],
  ['B', LayoutB],
] as const;

describe.each(layouts)('Layout %s', (_name, Layout) => {
  it('Story 1: the RPS Chaos demo, repo and latest checks open from its card', () => {
    render(<Layout />);
    const card = screen.getByRole('article', { name: 'RPS Chaos' });
    expect(within(card).getByRole('link', { name: /play the demo/i })).toHaveAttribute(
      'href',
      'https://rps-chaos.onrender.com',
    );
    expect(within(card).getByRole('link', { name: /^repository/i })).toHaveAttribute(
      'href',
      'https://github.com/GaretJax6905/rps-chaos',
    );
    expect(within(card).getByRole('link', { name: /latest checks/i })).toHaveAttribute(
      'href',
      expect.stringContaining('/actions/'),
    );
  });

  it('Story 2: every case study shows the AI draft and what I checked', () => {
    render(<Layout />);
    for (const c of caseStudies) {
      const card = screen.getByRole('article', { name: c.title });
      expect(card).toHaveTextContent(c.aiUse.draft);
      expect(card).toHaveTextContent(c.aiUse.checked);
    }
  });

  it('Story 3: the group case study has a "my part" section and is labelled unfinished', () => {
    render(<Layout />);
    const group = screen.getByRole('article', { name: 'Bench & Bolt repair queue' });
    expect(group).toHaveTextContent(/my part/i);
    expect(group).toHaveTextContent(/in progress/i);
  });

  it('Story 4: résumé, GitHub and LinkedIn are reachable from the first screen', () => {
    render(<Layout />);
    // The first list is the one near the top of the page (the second is in Contact).
    const links = screen.getAllByRole('list', { name: 'Professional links' })[0];
    expect(within(links).getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '#/resume');
    expect(within(links).getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/GaretJax6905',
    );
    // LinkedIn must be either a real link or an honest "not added yet" label, never a dead link.
    expect(within(links).getByText(/linkedin/i)).toBeInTheDocument();
  });

  it('shows the same projects as the other layout', () => {
    render(<Layout />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(caseStudies.map((c) => c.title));
  });
});

describe('navigation', () => {
  it('maps hashes to routes', () => {
    expect(routeFromHash('')).toBe('a');
    expect(routeFromHash('#/b')).toBe('b');
    expect(routeFromHash('#/resume')).toBe('resume');
  });

  it('keyboard: first Tab reaches the skip link, then the layout switcher', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: /layout a/i })).toHaveFocus();
  });

  it('the résumé page lists experience, education and skills', () => {
    window.location.hash = '#/resume';
    render(<App />);
    for (const name of ['Experience', 'Education', 'Skills']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    window.location.hash = '';
  });
});

describe.each(layouts)('Layout %s extras', (_name, Layout) => {
  it('has a contact section and the A/B comparison with both references', () => {
    render(<Layout />);
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByText(/two layouts, same content/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /brittanychiang\.com/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github actions run page/i })).toBeInTheDocument();
  });

  it('never renders an empty href', () => {
    const { container } = render(<Layout />);
    for (const a of container.querySelectorAll('a')) {
      expect(a.getAttribute('href')).toBeTruthy();
    }
  });
});
