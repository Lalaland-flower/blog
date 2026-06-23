import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import { formatDate } from '../../lib/utils';
import { TagBadge } from '../common/TagBadge';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter } = post;

  return (
    <article className="group relative p-5 rounded-lg border border-line/60 dark:border-line-night/60 bg-white dark:bg-surface-night hover:border-matcha/30 dark:hover:border-matcha-night/20 transition-all duration-200">
      {/* hover 时左侧出现抹茶色竖条——致敬编辑器选中行 */}
      <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full bg-matcha dark:bg-matcha-night opacity-0 scale-y-75 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 origin-center" />

      <div className="flex items-center gap-2 mb-2.5 text-xs text-stone dark:text-stone-night">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span className="opacity-40">·</span>
        <TagBadge name={frontmatter.category} link={`/categories/${encodeURIComponent(frontmatter.category)}`} />
      </div>

      <h2 className="text-lg font-serif font-semibold mb-2.5 leading-snug">
        <Link
          to={`/posts/${slug}`}
          className="text-ink dark:text-ink-night group-hover:text-matcha dark:group-hover:text-matcha-night transition-colors"
        >
          {frontmatter.title}
        </Link>
      </h2>

      <p className="text-sm text-stone dark:text-stone-night mb-3.5 line-clamp-2 leading-relaxed">
        {frontmatter.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {frontmatter.tags.map((tag) => (
          <TagBadge key={tag} name={tag} link={`/tags/${encodeURIComponent(tag)}`} />
        ))}
      </div>
    </article>
  );
}
