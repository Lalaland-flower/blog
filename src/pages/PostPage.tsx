import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/posts';
import { formatDate } from '../lib/utils';
import { PostContent } from '../components/post/PostContent';
import { TagBadge } from '../components/common/TagBadge';
import { CommentSection } from '../components/comments/CommentSection';
import { SEO } from '../components/common/SEO';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="text-center py-24">
        <h1 className="text-8xl font-serif font-bold text-line dark:text-line-night mb-4">404</h1>
        <p className="text-stone dark:text-stone-night mb-6">文章不存在</p>
        <Link to="/" className="text-matcha dark:text-matcha-night hover:text-matcha-deep dark:hover:text-matcha-night-deep transition-colors font-serif">
          返回首页
        </Link>
      </div>
    );
  }

  const { frontmatter, content } = post;

  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article>
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink dark:text-ink-night mb-4 leading-tight tracking-tight">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-stone dark:text-stone-night">
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
            <span className="opacity-40">·</span>
            <TagBadge name={frontmatter.category} link={`/categories/${encodeURIComponent(frontmatter.category)}`} />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {frontmatter.tags.map((tag) => (
              <TagBadge key={tag} name={tag} link={`/tags/${encodeURIComponent(tag)}`} />
            ))}
          </div>
        </header>

        <PostContent content={content} />

        <footer className="mt-14 pt-6 border-t border-line dark:border-line-night text-sm">
          <Link to="/" className="text-matcha dark:text-matcha-night hover:text-matcha-deep dark:hover:text-matcha-night-deep transition-colors font-serif">
            ← 返回首页
          </Link>
        </footer>

        <CommentSection />
      </article>
    </>
  );
}
