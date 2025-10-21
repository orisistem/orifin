import { Link } from 'react-router-dom';
import { Button } from '../../components';

export const ForgottenPasswordPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Adicionar lógica para enviar o e-mail de redefinição de senha
    console.log('Solicitação de redefinição de senha enviada.');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-sm'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Recupere sua senha</h1>
          <p className='text-muted-foreground'>
            Digite seu e-mail para receber o link de redefinição
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
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

          <Button
            type='submit'
            className='bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-full'
          >
            Enviar link de redefinição
          </Button>
        </form>

        <div className='mt-4 text-center text-sm'>
          Lembrou a senha?{' '}
          <Link to='/' className='text-[var(--primary)] hover:underline'>
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};
