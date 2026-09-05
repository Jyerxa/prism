'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Layers3, AudioLines, BookOpen } from 'lucide-react';
import { GlassBadge } from '@/components/prism';

export function PrismMark() {
  return (
    <span className="prism-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
export function SiteShell({
  children,
  active = 'components',
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <div className="site-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Prism home">
          <PrismMark />
          <span>
            prism<span className="brand-period">.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link
            href="/"
            aria-current={active === 'components' ? 'page' : undefined}
          >
            <Layers3 />
            Components
          </Link>
          <Link
            href="/foundations"
            aria-current={active === 'foundations' ? 'page' : undefined}
          >
            <BookOpen />
            Foundations
          </Link>
          <Link
            href="/listening-room"
            aria-current={active === 'demo' ? 'page' : undefined}
          >
            <AudioLines />
            Listening room
            <ArrowUpRight className="nav-arrow" />
          </Link>
        </nav>
        <a
          className="storybook-link"
          href="/storybook/index.html"
          target="_blank"
          rel="noreferrer"
        >
          <span className="storybook-icon">S</span>Storybook
          <ArrowUpRight size={14} />
        </a>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-brand">
          <PrismMark />
          <span>Made of light. Built for people.</span>
        </div>
        <div>
          <GlassBadge>v1.0</GlassBadge>
          <span>React · shadcn/ui · Base UI</span>
        </div>
      </footer>
    </div>
  );
}
