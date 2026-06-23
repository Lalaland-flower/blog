import { Link } from 'react-router-dom';
import { getAllTags } from '../lib/posts';
import { SEO } from '../components/common/SEO';

export function TagsPage() {
  const tags = getAllTags();
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  return (
    <>
      <SEO title="标签" />
      <section>
        <h1 className="text-2xl font-serif font-bold mb-8 text-ink dark:text-ink-night tracking-tight">
          标签
        </h1>
        <div className="flex flex-wrap gap-2.5">
          {tags.map(({ name, count }) => {
            const fontSize = 0.75 + (count / maxCount) * 1.25; // 0.75rem ~ 2rem
            return (
              <Link
                key={name}
                to={`/tags/${encodeURIComponent(name)}`}
                className="inline-block px-3.5 py-1.5 rounded-md font-serif
                           bg-white dark:bg-surface-night
                           border border-line/60 dark:border-line-night/60
                           hover:border-matcha/30 dark:hover:border-matcha-night/20
                           hover:text-matcha dark:hover:text-matcha-night
                           text-ink dark:text-ink-night
                           transition-all"
                style={{ fontSize: `${fontSize}rem` }}
              >
                {name}
                <sup className="ml-0.5 text-[0.55em] text-stone dark:text-stone-night">{count}</sup>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
