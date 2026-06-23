import { Link } from 'react-router-dom';
import { getAllCategories } from '../lib/posts';
import { SEO } from '../components/common/SEO';

export function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <>
      <SEO title="分类" />
      <section>
        <h1 className="text-2xl font-serif font-bold mb-8 text-ink dark:text-ink-night tracking-tight">
          分类
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map(({ name, count }) => (
            <Link
              key={name}
              to={`/categories/${encodeURIComponent(name)}`}
              className="group p-5 rounded-lg border border-line/60 dark:border-line-night/60 bg-white dark:bg-surface-night
                         hover:border-matcha/30 dark:hover:border-matcha-night/20
                         transition-all text-center"
            >
              <div className="text-2xl font-serif font-bold text-matcha dark:text-matcha-night">{count}</div>
              <div className="text-sm text-stone dark:text-stone-night mt-1 group-hover:text-matcha dark:group-hover:text-matcha-night transition-colors">{name}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
