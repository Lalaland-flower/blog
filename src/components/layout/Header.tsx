import { Link, NavLink } from 'react-router-dom';
import { SearchBar } from '../common/SearchBar';
import { ThemeToggle } from '../common/ThemeToggle';

export function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors font-serif ${
      isActive
        ? 'text-matcha dark:text-matcha-night'
        : 'text-stone dark:text-stone-night hover:text-matcha dark:hover:text-matcha-night'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-paper/85 dark:bg-gray-950/85 backdrop-blur-sm">
      <div className="mx-auto px-5 h-16 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="text-xl font-serif font-bold text-ink dark:text-ink-night tracking-tight shrink-0"
        >
          个人博客
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            首页
          </NavLink>
          <NavLink to="/categories" className={linkClass}>
            分类
          </NavLink>
          <NavLink to="/tags" className={linkClass}>
            标签
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            关于
          </NavLink>
        </nav>

        <div className="flex items-center gap-2.5">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
