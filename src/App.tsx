import { useEffect, useState } from 'react';
import LayoutA from './layouts/LayoutA';
import LayoutB from './layouts/LayoutB';
import Resume from './Resume';

export type Route = 'a' | 'b' | 'resume';

export function routeFromHash(hash: string): Route {
  if (hash.startsWith('#/b')) return 'b';
  if (hash.startsWith('#/resume')) return 'resume';
  return 'a';
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash));

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash(window.location.hash));
      document.getElementById('main')?.focus();
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className={`site theme-${route}`}>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Skip to content
      </a>
      <nav className="topbar" aria-label="Site">
        <span className="draft-flag">Draft · comparing two layouts</span>
        <a href="#/" aria-current={route === 'a' ? 'page' : undefined}>
          Layout A · Grid
        </a>
        <a href="#/b" aria-current={route === 'b' ? 'page' : undefined}>
          Layout B · Build log
        </a>
        <a href="#/resume" aria-current={route === 'resume' ? 'page' : undefined}>
          Résumé
        </a>
      </nav>
      <main id="main" tabIndex={-1}>
        {route === 'a' && <LayoutA />}
        {route === 'b' && <LayoutB />}
        {route === 'resume' && <Resume />}
      </main>
    </div>
  );
}
