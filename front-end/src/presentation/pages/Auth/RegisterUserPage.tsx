import { Link } from 'react-router-dom';
import { Button } from '../../components';

export const RegisterUserPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Adicionar lógica para registrar o usuário
    console.log('Tentativa de registro de usuário.');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-sm'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Crie sua conta</h1>
          <p className='text-muted-foreground'>
            Preencha os campos abaixo para se registrar
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none' htmlFor='name'>
              Nome
            </label>
            <input
              id='name'
              type='text'
              className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Seu nome completo'
              required
            />
          </div>

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
            type='submit'
            className='bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-full'
          >
            Registrar
          </Button>
        </form>

        <div className='mt-4 text-center text-sm'>
          Já tem uma conta?{' '}
          <Link to='/' className='text-[var(--primary)] hover:underline'>
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};
