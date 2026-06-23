import type { PostFrontmatter } from '../types';
import { parseFrontmatter } from './frontmatter';

const rawPages: Record<string, string> = import.meta.glob('/content/pages/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

let pagesCache: Record<string, { frontmatter: PostFrontmatter; content: string }> | null = null;

function loadPages() {
  if (pagesCache) return pagesCache;

  pagesCache = {};
  for (const [filepath, raw] of Object.entries(rawPages)) {
    const slug = filepath.replace('/content/pages/', '').replace(/\.md$/, '');
    const { frontmatter, content } = parseFrontmatter(raw);
    pagesCache[slug] = {
      frontmatter,
      content,
    };
  }
  return pagesCache;
}

export function getPageContent(slug: string): string | undefined {
  return loadPages()[slug]?.content;
}

export function getPageFrontmatter(slug: string): PostFrontmatter | undefined {
  return loadPages()[slug]?.frontmatter;
}
