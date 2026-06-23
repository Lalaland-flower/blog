export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  draft: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}
