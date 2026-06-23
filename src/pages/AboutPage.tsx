import { getPageContent } from '../lib/pages';
import { PostContent } from '../components/post/PostContent';
import { SEO } from '../components/common/SEO';

export function AboutPage() {
  const content = getPageContent('about');

  if (!content) {
    return (
      <div className="text-center py-24">
        <p className="text-stone dark:text-stone-night">页面不存在</p>
      </div>
    );
  }

  return (
    <>
      <SEO title="关于" />
      <article>
        <PostContent content={content} />
      </article>
    </>
  );
}
