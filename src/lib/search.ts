import Fuse from 'fuse.js';
import type { Post } from '../types';
import { getAllPosts } from './posts';

let fuse: Fuse<Post> | null = null;

function getFuse(): Fuse<Post> {
  if (fuse) return fuse;

  fuse = new Fuse(getAllPosts(), {
    keys: [
      { name: 'frontmatter.title', weight: 2 },
      { name: 'frontmatter.description', weight: 1.5 },
      { name: 'frontmatter.tags', weight: 1 },
      { name: 'content', weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  });

  return fuse;
}

export function searchPosts(query: string): Post[] {
  if (!query.trim()) return [];
  return getFuse()
    .search(query.trim())
    .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
    .map((r) => r.item);
}
