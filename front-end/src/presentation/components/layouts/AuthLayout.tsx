import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: LayoutProps): ReactNode => {
  return (
    <div className='flex min-h-screen items-center justify-center p-4 bg-[var(--gray-200)]'>
      {children}
    </div>
  );
};
