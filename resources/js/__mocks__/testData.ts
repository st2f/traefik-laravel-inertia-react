// resources/js/__mocks__/testData.ts

import { vi } from 'vitest';

// -----------------------------
// Authenticated user mock
// -----------------------------
export const mockAuth = {
  user: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  },
};

// -----------------------------
// Article mock
// -----------------------------
export const mockArticle = {
  id: 1,
  title: 'Article 1 update', // matches your test expectation
  content: 'This is a sample article content.',
  categoryId: 1, // matches one of the categories below
};

// -----------------------------
// Categories mock (for SelectMenu)
// -----------------------------
export const mockCategories = [
  { value: 1, label: 'Tech' },
  { value: 2, label: 'Science' },
];

// Transform categories to match EditCategories component structure
export const mockRawCategories = mockCategories.map(c => ({
  categoryId: c.value,
  categoryName: c.label,
}));

// -----------------------------
// Router mock (Inertia or navigation)
// -----------------------------
export const mockRouter = {
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  visit: vi.fn(),
  reload: vi.fn(),
};
