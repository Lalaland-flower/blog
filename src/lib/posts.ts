import type { Post } from '../types';
import { parseFrontmatter } from './frontmatter';

const rawPosts: Record<string, string> = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

let postsCache: Post[] | null = null;

function loadPosts(): Post[] {
  if (postsCache) return postsCache;

  postsCache = Object.entries(rawPosts)
    .map(([filepath, raw]) => {
      const { frontmatter, content } = parseFrontmatter(raw);
      const slug = filepath.replace('/content/posts/', '').replace(/\.md$/, '');
      return {
        slug,
        frontmatter,
        content,
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return postsCache;
}

export function getAllPosts(): Post[] {
  return loadPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
  return loadPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return loadPosts().filter((p) => p.frontmatter.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return loadPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export function getAllCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of loadPosts()) {
    const c = post.frontmatter.category;
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllTags(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of loadPosts()) {
    for (const tag of post.frontmatter.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
