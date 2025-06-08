export function getCatName(id, categories) {

  const category = categories.find((c) => c.categoryId === id);
  if (category) {
    return category.categoryName;
  }
  return 'UNDEFINED';
}
