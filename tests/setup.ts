import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(cleanup);
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
// jsdom does not calculate layout. Supply a nonzero box so Base UI can
// measure slider edges; assertions below still exercise its real inputs.
vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
  () => ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 200,
    bottom: 20,
    width: 200,
    height: 20,
    toJSON: () => ({}),
  }),
);
