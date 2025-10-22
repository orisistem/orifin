import { Button, AuthLayout, Input, LinkComponent } from '../../components';
import { AuthCard } from './AuthCard';

import { useAuth } from '../../../contexts/AuthContext';

export const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica de validação de formulário se necessário
    login();
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Acesse sua conta</h1>
          <p className='text-muted-foreground'>
            Insira suas credenciais abaixo para entrar
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input label='Email' placeholder='seu@email.com' type='email' />
          <Input label='Senha' placeholder='******' type='password' />
          <LinkComponent
            to={'/forgotten-password'}
            text='Esqueceu sua senha?'
          />
          <Button
            type='submit'
            className='bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-full'
          >
            Entrar
          </Button>
        </form>

        <div className='flex justify-center items-center mt-4 text-sm'>
          Não tem uma conta?{' '}
          <LinkComponent to={'/register'} text='Registre-se' className='px-2' />
        </div>
      </AuthCard>
    </AuthLayout>
  );
};
