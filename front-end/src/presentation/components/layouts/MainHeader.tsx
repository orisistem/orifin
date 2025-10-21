import { useState, useRef, useEffect } from 'react';
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import { useAuth } from '../../../contexts';
// Componente do Menu do Usuário (interno por enquanto)
const UserMenu = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica de validação de formulário se necessário
    logout();
  };

  // Em uma aplicação real, estes dados viriam de um contexto de autenticação
  const user = {
    name: 'Orianderson',
    email: 'ori@orifin.com',
    avatarUrl: '', // URL da imagem do avatar ou vazio para usar o ícone
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative' ref={menuRef}>
      <Button
        variant='ghost'
        className='flex items-center gap-3 px-3 h-10'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-offset-2 ring-gray-300'>
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className='h-full w-full rounded-full object-cover'
            />
          ) : (
            <User className='h-5 w-5 text-gray-600' />
          )}
        </div>
        <span className='hidden md:inline text-sm font-medium text-gray-700'>
          {user.name}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
          <div className='py-1'>
            <div className='px-4 py-3 border-b border-gray-200'>
              <p className='text-sm font-semibold text-gray-800'>{user.name}</p>
              <p className='text-xs text-gray-500 truncate'>{user.email}</p>
            </div>
            <Link
              to='/settings'
              className='text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100'
            >
              <Settings className='mr-3 h-4 w-4' />
              Configurações
            </Link>
            <Button
              onClick={handleSubmit}
              className='text-red-600 flex items-center px-4 py-2 text-sm hover:bg-gray-100'
            >
              <LogOut className='mr-3 h-4 w-4' />
              Sair
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const MainHeader = () => {
  return (
    <header className='flex items-center justify-end h-16 bg-white border-b border-gray-200 -mt-8 -mx-8 px-8 sticky top-0 z-30'>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <Button variant='ghost' size='icon'>
            <Bell className='h-5 w-5' />
          </Button>
          {/* Badge de notificação */}
          <span className='absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white' />
        </div>

        {/* Separador Vertical */}
        <div className='h-6 w-px bg-gray-200' />

        <UserMenu />
      </div>
    </header>
  );
};
