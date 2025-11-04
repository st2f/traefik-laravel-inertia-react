// resources/js/__tests__/EditCategories.test.tsx
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/testUtils/renderWithProviders';
import EditCategories from '@/Pages/Content/EditCategories';
import { mockAuth, mockRawCategories as  mockCategories, mockRouter } from '@/__mocks__/testData';
import { vi } from "vitest";


vi.mock('@/Services/useData.js', () => ({
  useData: vi.fn(() => mockCategories),
}));

describe('EditCategories Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders categories correctly', () => {
    renderWithProviders(<EditCategories auth={mockAuth} />);

    // Check category names
    mockCategories.forEach(c => {
      expect(screen.getByDisplayValue(c.categoryName)).toBeInTheDocument();
    });
  });

  it('calls router.patch on update', () => {
    renderWithProviders(<EditCategories auth={mockAuth} />);

    const input = screen.getByDisplayValue('Tech');
    fireEvent.change(input, { target: { value: 'Tech Updated' } });

    const updateButton = screen.getAllByText('Update')[0];
    fireEvent.click(updateButton);

    expect(mockRouter.patch).toHaveBeenCalledWith('/content/category/1', {
      categoryId: 1,
      categoryName: 'Tech Updated',
    });
  });

  it('calls router.post on delete', () => {
    renderWithProviders(<EditCategories auth={mockAuth} />);

    const deleteButton = screen.getAllByText('delete')[0];
    fireEvent.click(deleteButton);

    expect(mockRouter.post).toHaveBeenCalledWith(
      '/content/category/delete',
      { categoryId: 1 },
      { preserveState: false }
    );
  });

  it('adds a new category', () => {
    renderWithProviders(<EditCategories auth={mockAuth} />);

    // Show new category input
    const toggleButton = screen.getByText('+');
    fireEvent.click(toggleButton);

    const newInput = screen.getByRole('textbox', { name: /newCategory/i });
    fireEvent.change(newInput, { target: { value: 'Vitest quickstart' } });

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    expect(mockRouter.post).toHaveBeenCalledWith(
      '/content/category',
      { categoryName: 'Vitest quickstart' },
      { preserveState: false }
    );
  });
});
