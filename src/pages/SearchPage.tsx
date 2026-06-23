import { useSearchParams } from 'react-router-dom';
import { searchPosts } from '../lib/search';
import { PostList } from '../components/post/PostList';
import { SEO } from '../components/common/SEO';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const results = searchPosts(query);

  return (
    <>
      <SEO title={query ? `搜索: ${query}` : '搜索'} />
      <section>
        <h1 className="text-2xl font-serif font-bold mb-2 text-ink dark:text-ink-night tracking-tight">
          搜索结果
        </h1>
        {query ? (
          <p className="text-sm text-stone dark:text-stone-night mb-8">
            关于 "<span className="font-medium text-ink dark:text-ink-night">{query}</span>" 的搜索结果，共 {results.length} 篇
          </p>
        ) : (
          <p className="text-sm text-stone dark:text-stone-night mb-8">
            输入关键词开始搜索
          </p>
        )}
        <PostList posts={results} />
      </section>
    </>
  );
}
