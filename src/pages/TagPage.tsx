import { useParams, Link } from 'react-router-dom';
import { getPostsByTag } from '../lib/posts';
import { PostList } from '../components/post/PostList';
import { SEO } from '../components/common/SEO';

export function TagPage() {
  const { name } = useParams<{ name: string }>();
  const posts = name ? getPostsByTag(name) : [];

  return (
    <>
      <SEO title={`标签: ${name}`} />
      <section>
        <Link
          to="/tags"
          className="inline-flex items-center gap-1 text-sm text-stone dark:text-stone-night hover:text-matcha dark:hover:text-matcha-night transition-colors mb-8 font-serif"
        >
          ← 全部标签
        </Link>
        <h1 className="text-2xl font-serif font-bold mb-2 text-ink dark:text-ink-night tracking-tight">
          #{name}
        </h1>
        <p className="text-sm text-stone dark:text-stone-night mb-8">
          共 {posts.length} 篇文章
        </p>
        <PostList posts={posts} />
      </section>
    </>
  );
}
