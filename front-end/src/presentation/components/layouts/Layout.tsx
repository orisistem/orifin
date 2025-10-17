import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '../../../lib';

import { useSidebar } from '../../../contexts';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  const { isCollapsed } = useSidebar();
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main
        className={cn(
          'flex-1 p-8 transition-all duration-300 ease-in-out',
          isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {children}
      </main>
    </div>
  );
};
