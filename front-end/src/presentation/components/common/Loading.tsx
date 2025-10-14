import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-50'>
      <div className='h-16 w-16 animate-spin rounded-full border-4 border-solid border-indigo-600 border-t-transparent'></div>
      <span className='sr-only'>Carregando...</span>
    </div>
  );
};
