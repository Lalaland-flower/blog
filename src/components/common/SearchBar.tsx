import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  autoFocus?: boolean;
}

export function SearchBar({ autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const doSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (trimmed) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [navigate]
  );

  // 300ms 防抖
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章…"
        autoFocus={autoFocus}
        className="w-full sm:w-48 pl-9 pr-3 py-1.5 text-sm rounded-lg border border-line dark:border-line-night
                   bg-white dark:bg-surface-night
                   focus:outline-none focus:ring-2 focus:ring-matcha/40 focus:border-matcha/40 dark:focus:ring-matcha-night/30
                   placeholder:text-stone/50 dark:placeholder:text-stone-night/50
                   transition-all"
      />
      <svg
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone/40 dark:text-stone-night/40"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  );
}
