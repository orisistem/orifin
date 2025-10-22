import { Link } from 'react-router-dom';
import { Button, AuthLayout, Input, LinkComponent } from '../../components';

import { AuthCard } from './AuthCard';

export const ForgottenPasswordPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Adicionar lógica para enviar o e-mail de redefinição de senha
    console.log('Solicitação de redefinição de senha enviada.');
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Recupere sua senha</h1>
          <p className='text-muted-foreground'>
            Digite seu e-mail para receber o link de redefinição
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input label='Email' placeholder='seu@email.com' type='email' />

          <Button
            type='submit'
            className='bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-full'
          >
            Enviar link de redefinição
          </Button>
        </form>
        <div className='flex justify-center items-center mt-4 text-sm'>
          Lembrou a senha?{' '}
          <LinkComponent to={'/'} text='Faça login' className='px-2' />
        </div>
      </AuthCard>
    </AuthLayout>
  );
};
