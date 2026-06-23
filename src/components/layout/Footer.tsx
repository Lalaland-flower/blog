export function Footer() {
  return (
    <footer className="border-t border-line dark:border-line-night">
      <div className="mx-auto px-5 py-8 text-center text-sm text-stone dark:text-stone-night">
        <p>
          <a
            href="/rss.xml"
            className="text-matcha dark:text-matcha-night hover:text-matcha-deep dark:hover:text-matcha-night-deep transition-colors"
          >
            RSS 订阅
          </a>
          <span className="mx-2 opacity-40">·</span>
          <span>Powered by React + Vite</span>
        </p>
        <p className="mt-1.5 opacity-70">&copy; {new Date().getFullYear()} 个人博客</p>
      </div>
    </footer>
  );
}
