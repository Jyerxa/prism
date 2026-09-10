import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';

function HistoryBack() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>History back</button>;
}

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <HistoryBack />
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

describe('demo navigation', () => {
  it.each([
    ['/', 'Prism — Glass, with substance.', 'Components'],
    ['/foundations', 'Foundations · Prism', 'Foundations'],
    ['/listening-room', 'The listening room · Prism', 'Listening room'],
  ])(
    'opens %s directly with its title and active navigation',
    (path, title, name) => {
      renderRoute(path);
      expect(document.title).toBe(title);
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
      expect(
        within(
          screen.getByRole('navigation', { name: 'Main navigation' }),
        ).getByRole('link', { name }),
      ).toHaveAttribute('aria-current', 'page');
    },
  );

  it('navigates between pages and supports history back', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    const navigation = () =>
      within(screen.getByRole('navigation', { name: 'Main navigation' }));
    await user.click(navigation().getByRole('link', { name: 'Foundations' }));
    expect(document.title).toBe('Foundations · Prism');
    await user.click(
      navigation().getByRole('link', { name: 'Listening room' }),
    );
    expect(document.title).toBe('The listening room · Prism');
    expect(
      screen.getByRole('region', { name: 'Ambient listening room' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'History back' }));
    expect(document.title).toBe('Foundations · Prism');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('links component documentation to the separate Storybook app', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    const workshop = screen.getByRole('link', { name: /^SStorybook$/ });
    expect(workshop).toHaveAttribute('href', 'http://localhost:6006');
    await user.click(
      screen.getByRole('button', { name: 'View Button usage rules' }),
    );
    const link = screen.getByRole('link', {
      name: 'Explore states in Storybook',
    });
    const url = new URL(link.getAttribute('href')!);
    expect(url.origin).toBe('http://localhost:6006');
    expect(url.searchParams.get('path')).toBe('/docs/prism-button--docs');
  });

  it('shows a recoverable not-found page', async () => {
    const user = userEvent.setup();
    renderRoute('/missing');
    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Back to components' }));
    expect(document.title).toBe('Prism — Glass, with substance.');
  });
});
