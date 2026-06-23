export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.ceil(items.length / perPage);
  const safePage = Math.max(1, Math.min(page, totalPages));
  return {
    items: items.slice((safePage - 1) * perPage, safePage * perPage),
    totalPages,
    currentPage: safePage,
  };
}
