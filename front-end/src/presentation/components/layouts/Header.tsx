import React from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <header className='mb-8 flex items-center justify-between'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
        {title}
      </h1>
      {children}
    </header>
  );
};
