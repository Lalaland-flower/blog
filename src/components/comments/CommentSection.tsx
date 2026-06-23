import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { giscusConfig } from '../../lib/giscus-config';

export function CommentSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const resolvedTheme = theme === 'dark' ? 'dark_dimmed' : 'light';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 清空之前的内容
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', resolvedTheme);
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');

    container.appendChild(script);
  }, [resolvedTheme]);

  // 主题切换时通过 postMessage 更新，避免重新加载
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: resolvedTheme } } },
        'https://giscus.app'
      );
    }
  }, [resolvedTheme]);

  return (
    <section className="mt-14 pt-6 border-t border-line dark:border-line-night">
      <h2 className="text-lg font-serif font-bold text-ink dark:text-ink-night mb-4">
        评论
      </h2>
      <div ref={containerRef} />
    </section>
  );
}
