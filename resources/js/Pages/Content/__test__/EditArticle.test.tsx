//import fs from 'fs';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/testUtils/renderWithProviders';
import EditArticle from '@/Pages/Content/EditArticle';
import {
  mockAuth,
  mockArticle,
  mockRawCategories,
} from "@/__mocks__/testData";
import { vi } from 'vitest';

// -----------------------------
// Mock the useData hook
// -----------------------------
vi.mock('@/Services/useData.js', () => ({
  useData: vi.fn((url: string) => {
    if (url.includes('/api/articles')) {
      return {
        id: mockArticle.id,
        title: mockArticle.title,
        content: mockArticle.content,
        categoryId: mockArticle.categoryId,
      };
    }
    if (url.includes('/api/categories')) {
      return mockRawCategories;
    }
    return {};
  }),
}));

describe('EditArticle Component', () => {

  it('renders the edit form correctly', async () => {
    const { container } = renderWithProviders(
      <EditArticle
        auth={mockAuth}
        id={mockArticle.id}
      />
    );

    // --- Header ---
    const header = await screen.findByText(/Article 1 update/i);
    expect(header).toBeInTheDocument();

    // --- Title input ---
    const titleInput = screen.getByLabelText(/Title/i);
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(mockArticle.title);

    // --- Buttons ---
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();

    const contentButton = screen.getByRole('button', { name: /^Content$/i }); // avoid multiple matches
    expect(contentButton).toBeInTheDocument();

    const previewButton = screen.getByRole('button', { name: /Preview/i });
    expect(previewButton).toBeInTheDocument();

    // --- API elements ---
    // checking in container.innerHTML for more complex structures

    // --- Content textarea ---
    expect(container.innerHTML).toContain(mockArticle.content);

    // --- Category select ---
    expect(container.innerHTML).toContain(mockRawCategories[0].categoryName);

    // debug output
    //screen.debug();
    //fs.writeFileSync(`test-results/EditArticle.html`, container.innerHTML);
  });
});
