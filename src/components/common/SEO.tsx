import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title ? `${title} | 个人博客` : '个人博客';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = '个人博客';
    };
  }, [title, description]);

  return null;
}
