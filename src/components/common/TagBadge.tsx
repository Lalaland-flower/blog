import { Link } from 'react-router-dom';

interface TagBadgeProps {
  name: string;
  link?: string;
  size?: 'sm' | 'md';
}

export function TagBadge({ name, link, size = 'sm' }: TagBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  const className = `inline-block rounded-md ${sizeClasses} font-medium tracking-wide
    bg-matcha/8 text-matcha dark:bg-matcha-night/10 dark:text-matcha-night`;

  if (link) {
    return (
      <Link
        to={link}
        className={`${className} hover:bg-matcha/15 dark:hover:bg-matcha-night/20 transition-colors`}
      >
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
}
