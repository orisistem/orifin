import { Button } from '../../components';

import { useAuth } from '../../../contexts/AuthContext';

export const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica de validação de formulário se necessário
    login();
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-sm'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Acesse sua conta</h1>
          <p className='text-muted-foreground'>
            Insira suas credenciais abaixo para entrar
          </p>
        </div>

        <form className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              type='email'
              className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='seu@email.com'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='text-sm font-medium leading-none'
              htmlFor='password'
            >
              Senha
            </label>
            <input
              id='password'
              type='password'
              className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='••••••••'
              required
            />
          </div>

          <Button
            onClick={handleSubmit}
            type='submit'
            className='dark:bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-full dark:text-[var(--primary-foreground)]'
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};
