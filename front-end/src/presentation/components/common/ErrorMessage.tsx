import React from 'react';

interface ErrorMessageProps {
  error: Error | null;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className = '',
}) => {
  if (!error) return null;

  return (
    <div
      className={`rounded-md border border-red-200 bg-red-50 p-4 ${className}`}
      role='alert'
    >
      <h3 className='text-sm font-semibold text-red-800'>Ocorreu um erro</h3>
      <p className='mt-2 text-sm text-red-700'>
        {error.message || 'Não foi possível completar a sua solicitação.'}
      </p>
    </div>
  );
};
