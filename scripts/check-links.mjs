// Checks every external link in src/content.ts responds (status < 400).
// Empty links are reported as "not added yet" (allowed, but listed). Run in CI: npm run check:links
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8').replaceAll(
  '${GITHUB}',
  'https://github.com/GaretJax6905',
);
const urls = [...new Set([...src.matchAll(/https:\/\/[^\s'`"]+/g)].map((m) => m[0]))];
let failed = 0;
for (const url of urls) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(90_000) });
    const ok = res.status < 400;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${res.status} ${url}`);
  } catch (err) {
    failed++;
    console.log(`FAIL --- ${url} (${err.message})`);
  }
}
const missing = (src.match(/href: ''/g) || []).length;
console.log(`\n${urls.length} links checked, ${failed} failed, ${missing} not added yet.`);
process.exit(failed ? 1 : 0);
