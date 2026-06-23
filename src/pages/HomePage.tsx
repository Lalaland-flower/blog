import { SEO } from '../components/common/SEO';

export function HomePage() {
  return (
    <>
      <SEO title="首页" />
      <section className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-lg">
          <h1 className="text-2xl font-serif font-bold text-ink dark:text-ink-night mb-2 tracking-wider">
            锦瑟
          </h1>
          <p className="text-sm text-stone dark:text-stone-night mb-10 tracking-widest">
            李商隐
          </p>

          <div className="space-y-3 text-lg font-serif text-ink dark:text-ink-night leading-loose tracking-wide">
            <p>锦瑟无端五十弦，一弦一柱思华年。</p>
            <p>庄生晓梦迷蝴蝶，望帝春心托杜鹃。</p>
            <p>沧海月明珠有泪，蓝田日暖玉2222生烟。</p>
            <p>此情可待成追忆，只是当时已惘111然。</p>
          </div>
        </div>
      </section>
    </>
  );
}
