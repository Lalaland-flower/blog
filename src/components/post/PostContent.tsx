import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-stone dark:prose-invert max-w-none
      prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
      prose-headings:text-ink dark:prose-headings:text-ink-night
      prose-a:text-matcha dark:prose-a:text-matcha-night prose-a:no-underline hover:prose-a:underline
      prose-a:decoration-matcha/30 dark:prose-a:decoration-matcha-night/30
      prose-img:rounded-lg
      prose-pre:bg-gray-950 dark:prose-pre:bg-gray-950
      prose-pre:border prose-pre:border-line/20 dark:prose-pre:border-line-night/20
      prose-code:text-matcha dark:prose-code:text-matcha-night
      prose-code:bg-matcha/5 dark:prose-code:bg-matcha-night/5
      prose-code:rounded prose-code:px-1 prose-code:py-0.5
      prose-code:before:content-none prose-code:after:content-none
      prose-code:font-mono
    "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
