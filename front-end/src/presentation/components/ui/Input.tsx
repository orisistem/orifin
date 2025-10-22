import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

export const Input = ({
  label,
  type,
  placeholder,
  required = false,
}: InputProps): React.ReactElement => {
  const [visible, setVisible] = React.useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className='space-y-2 relative'>
      <label className='text-sm font-medium leading-none' htmlFor={type}>
        {label}
      </label>
      <input
        id={type}
        type={visible ? 'text' : type}
        className='flex h-10 w-full rounded-lg border border-[color:var(--border-strong)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        placeholder={placeholder}
        required={required}
      />
      <div
        className={
          type === 'password'
            ? 'absolute right-3 top-9 cursor-pointer'
            : 'hidden'
        }
      >
        {visible ? (
          <Eye onClick={handleClick} />
        ) : (
          <EyeOff onClick={handleClick} />
        )}
      </div>
    </div>
  );
};
