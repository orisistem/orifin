import { Button } from '../../components';
import { Layout } from '../../components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components';

// Em uma aplicação real, estes dados viriam de um contexto ou API
const currentUser = {
  name: 'Orianderson',
  email: 'ori@orifin.com',
};

const ProfileSettings = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Adicionar lógica para atualizar o perfil
    console.log('Atualizando perfil...');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
      <div className='space-y-2'>
        <label htmlFor='name' className='text-sm font-medium text-foreground'>
          Nome
        </label>
        <input
          id='name'
          type='text'
          defaultValue={currentUser.name}
          className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm'
        />
      </div>
      <div className='space-y-2'>
        <label htmlFor='email' className='text-sm font-medium text-foreground'>
          Email
        </label>
        <input
          id='email'
          type='email'
          defaultValue={currentUser.email}
          className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm'
        />
      </div>
      <div className='flex justify-center self-center bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-5/12 border rounded-md'>
        <Button type='submit'>Salvar Alterações</Button>
      </div>
    </form>
  );
};

const SecuritySettings = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Adicionar lógica para alterar a senha
    console.log('Alterando senha...');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
      <div className='space-y-2'>
        <label
          htmlFor='currentPassword'
          className='text-sm font-medium text-foreground'
        >
          Senha Atual
        </label>
        <input
          id='currentPassword'
          type='password'
          className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm'
          placeholder='••••••••'
        />
      </div>
      <div className='space-y-2'>
        <label
          htmlFor='newPassword'
          className='text-sm font-medium text-foreground'
        >
          Nova Senha
        </label>
        <input
          id='newPassword'
          type='password'
          className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm'
          placeholder='••••••••'
        />
      </div>
      <div className='flex justify-center self-center bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-primary/90 w-5/12 border rounded-md'>
        <Button type='submit'>Alterar Senha</Button>
      </div>
    </form>
  );
};

export const SettingsPage = () => {
  // <div className='mx-auto max-w-4xl space-y-8'>
  return (
    <Layout>
      <div className='flex flex-col items-center h-screen space-y-15 mt-10 mx-auto max-w-3xl bg-white max-h-fit p-10 rounded-2xl shadow-lg'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-center'>
            Configurações
          </h1>
          <p className='text-muted-foreground text-center'>
            Gerencie as configurações da sua conta e preferências.
          </p>
        </div>
        <Tabs defaultValue='perfil' className='w-lg'>
          <TabsList className='flex justify-around items-center w-full grid-cols-2'>
            <TabsTrigger className='w-full' value='perfil'>
              Perfil
            </TabsTrigger>
            <TabsTrigger className='w-full' value='seguranca'>
              Segurança
            </TabsTrigger>
          </TabsList>
          <TabsContent value='perfil' className='mt-6 max-w-2xl'>
            <ProfileSettings />
          </TabsContent>
          <TabsContent value='seguranca' className='mt-6 max-w-2xl'>
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
