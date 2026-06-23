import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = process.env.SITE_URL || 'https://example.com';
const SITE_TITLE = '个人博客';
const SITE_DESCRIPTION = '技术分享与思考';

interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  draft: boolean;
}

const postsDir = path.resolve('content/posts');

function generateRSS() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, '');
      return { frontmatter: data as PostFrontmatter, content, slug };
    })
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  const author = {
    name: '博客作者',
    link: SITE_URL,
  };

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-CN',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${SITE_TITLE}`,
    updated: posts.length > 0 ? new Date(posts[0].frontmatter.date) : new Date(),
    feedLinks: {
      rss: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
    },
    author,
  });

  for (const post of posts) {
    const url = `${SITE_URL}/posts/${post.slug}`;
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.content,
      date: new Date(post.frontmatter.date),
      category: [
        { name: post.frontmatter.category },
        ...post.frontmatter.tags.map((tag) => ({ name: tag })),
      ],
      author: [author],
    });
  }

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), feed.rss2());
  fs.writeFileSync(path.join(publicDir, 'atom.xml'), feed.atom1());

  console.log(`✅ RSS 已生成: ${posts.length} 篇文章`);
  console.log(`   rss.xml → ${SITE_URL}/rss.xml`);
  console.log(`   atom.xml → ${SITE_URL}/atom.xml`);
}

generateRSS();
