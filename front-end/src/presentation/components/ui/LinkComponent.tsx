import { Link } from 'react-router-dom';

import { cn } from '../../../lib';

interface LinkProps {
  to: string;
  text: string;
  className?: string;
}

export const LinkComponent = ({ to, text, className }: LinkProps) => {
  return (
    <div>
      <Link
        to={to}
        className={cn(
          'text-sm text-end text-[var(--link)] hover:text-[var(--link-hover)] auto-justify-end',
          className
        )}
      >
        {text}
      </Link>
    </div>
  );
};
