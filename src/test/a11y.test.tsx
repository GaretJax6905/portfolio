// Automated accessibility scan (axe-core) of each page. jsdom cannot compute colours,
// so contrast is checked separately; this covers names, landmarks, headings, lists and links.
import { render } from '@testing-library/react';
import axe from 'axe-core';
import LayoutA from '../layouts/LayoutA';
import LayoutB from '../layouts/LayoutB';
import Resume from '../Resume';

const pages = [
  ['Layout A', LayoutA],
  ['Layout B', LayoutB],
  ['Résumé', Resume],
] as const;

describe.each(pages)('%s', (_name, Page) => {
  it('has no axe violations', async () => {
    const { container } = render(
      <main>
        <Page />
      </main>,
    );
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    const summary = result.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`);
    expect(summary).toEqual([]);
  });
});
