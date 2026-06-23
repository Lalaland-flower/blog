import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export function NotFoundPage() {
  return (
    <>
      <SEO title="页面不存在" />
      <div className="text-center py-24">
        <h1 className="text-8xl font-serif font-bold text-line dark:text-line-night mb-4">
          404
        </h1>
        <p className="text-stone dark:text-stone-night mb-6">
          你访问的页面不存在
        </p>
        <Link
          to="/"
          className="text-matcha dark:text-matcha-night hover:text-matcha-deep dark:hover:text-matcha-night-deep transition-colors font-serif"
        >
          返回首页
        </Link>
      </div>
    </>
  );
}
