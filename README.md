# Thomas Moylan — portfolio

Personal portfolio site, built for NJIT IS218 (Fall 2026).

- Live site: https://garetjax6905.github.io/portfolio/ (Layout A at `#/`, Layout B at `#/b`, résumé at `#/resume`)
- Plan and progress: [PORTFOLIO.md](PORTFOLIO.md)
- Stack: Vite + React + TypeScript, Vitest + Testing Library, deployed to GitHub Pages by GitHub Actions.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
npm test           # story checks
npm run build      # type-check + production build into dist/
```

All site text lives in `src/content.ts`. Both layouts render from that one file.
