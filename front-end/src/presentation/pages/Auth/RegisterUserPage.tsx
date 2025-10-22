import { Button, AuthLayout, Input, LinkComponent } from '../../components';

import { AuthCard } from './AuthCard';

export const RegisterUserPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Adicionar lógica para registrar o usuário
    console.log('Tentativa de registro de usuário.');
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Crie sua conta</h1>
          <p className='text-muted-foreground'>
            Preencha os campos abaixo para se registrar
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            label='Nome'
            placeholder='Seu nome completo'
            type='name'
            required
          />
          <Input label='Email' placeholder='seu@email.com' type='email' />
          <Input label='Senha' placeholder='******' type='password' />
          <Input label='Confirmar Senha' placeholder='******' type='password' />
          <Button
            type='submit'
            className='bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-full'
          >
            Registrar
          </Button>
        </form>
        <div className='flex justify-center items-center mt-4 text-sm'>
          Já tem uma conta?{' '}
          <LinkComponent to={'/'} text='Faça login' className='px-2' />
        </div>
      </AuthCard>
    </AuthLayout>
  );
};
