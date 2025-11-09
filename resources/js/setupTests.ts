// resources/js/setupTests.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// -----------------------------
// Mock global route() helper (Ziggy)
// -----------------------------
global.route = (name?: string, params?: Record<string, never>) => {
  const baseUrl = 'http://localhost';

  // If calling route() with no name, return object with .current()
  if (!name) {
    return {
      current: (currentName: string) => currentName === 'dashboard',
    };
  }

  // Build URL with query params if any
  const paramStr =
    params && Object.keys(params).length
      ? '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
      : '';

  return `${baseUrl}/${name}${paramStr}`;
};

// -----------------------------
// Mock global fetch (for useData.js or any API calls)
// -----------------------------
global.fetch = vi.fn((url: string) =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        url.includes('/api/articles')
          ? { id: 1, title: 'Sample Article', content: 'Lorem ipsum' }
          : url.includes('/api/categories')
            ? [
              { id: 1, name: 'Category 1' },
              { id: 2, name: 'Category 2' },
            ]
            : {}
      ),
  })
);

// -----------------------------
// Mock authenticated user for AuthenticatedLayout
// -----------------------------
global.auth = {
  user: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  },
};
