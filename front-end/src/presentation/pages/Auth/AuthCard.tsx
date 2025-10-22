import { ReactNode } from 'react';

interface CardPros {
  children: ReactNode;
}

export const AuthCard = ({ children }: CardPros): ReactNode => {
  return (
    <div className='w-full max-w-md space-y-6 rounded-lg bg-[var(--card)] p-8 shadow-sm'>
      {children}
    </div>
  );
};
