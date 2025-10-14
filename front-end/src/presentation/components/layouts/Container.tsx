import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ${className}`}
    >
      {children}
    </div>
  );
};
