import { useEffect, type ReactNode } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import { ComponentExplorer } from './components/component-explorer';
import { ListeningRoom } from './components/listening-room';
import { SiteShell } from './components/site-shell';
import Foundations from './pages/foundations';

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <title>{title}</title>
      {children}
    </>
  );
}

export function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Page title="Prism — Glass, with substance.">
            <ComponentExplorer />
          </Page>
        }
      />
      <Route
        path="/foundations"
        element={
          <Page title="Foundations · Prism">
            <Foundations />
          </Page>
        }
      />
      <Route
        path="/listening-room"
        element={
          <Page title="The listening room · Prism">
            <ListeningRoom />
          </Page>
        }
      />
      <Route
        path="*"
        element={
          <Page title="Page not found · Prism">
            <SiteShell active="">
              <main id="main" className="foundations-main">
                <h1>Page not found</h1>
                <Link to="/" className="text-link">
                  Back to components
                </Link>
              </main>
            </SiteShell>
          </Page>
        }
      />
    </Routes>
  );
}
