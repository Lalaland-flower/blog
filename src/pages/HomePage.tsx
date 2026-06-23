import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../lib/posts';
import { paginate } from '../lib/utils';
import { PostList } from '../components/post/PostList';
import { SEO } from '../components/common/SEO';

const PER_PAGE = 10;

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const allPosts = getAllPosts();
  const { items, totalPages, currentPage } = paginate(allPosts, page, PER_PAGE);

  const goTo = (p: number) => {
    setSearchParams(p > 1 ? { page: String(p) } : {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO title="首页" />
      <section>
        <h1 className="text-2xl font-serif font-bold mb-8 text-ink dark:text-ink-night tracking-tight">
          最新文章
        </h1>
        <PostList posts={items} />

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 text-sm rounded-lg border border-line dark:border-line-night
                         disabled:opacity-30 disabled:cursor-not-allowed font-serif
                         hover:border-matcha/40 dark:hover:border-matcha-night/30
                         hover:text-matcha dark:hover:text-matcha-night
                         transition-all"
            >
              上一页
            </button>
            <span className="text-sm text-stone dark:text-stone-night tabular-nums">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 text-sm rounded-lg border border-line dark:border-line-night
                         disabled:opacity-30 disabled:cursor-not-allowed font-serif
                         hover:border-matcha/40 dark:hover:border-matcha-night/30
                         hover:text-matcha dark:hover:text-matcha-night
                         transition-all"
            >
              下一页
            </button>
          </div>
        )}
      </section>
    </>
  );
}
