import { useState, useRef, useEffect } from 'react';
import {
  Banknote,
  CreditCard,
  DollarSign,
  Landmark,
  Pencil,
  PlusCircle,
  Wallet,
} from 'lucide-react';
import { Layout, Button } from '../../components';

// Tipos e Dados Mockados
// Em um cenário real, estes tipos seriam definidos em um local compartilhado (ex: src/domain/models)
type AccountType = 'checking' | 'savings' | 'credit_card' | 'cash';

interface Account {
  id: string;
  name: string;
  type: AccountType;
  institution: string;
  balance: number;
  closingDay?: number;
  dueDay?: number;
}

// Em um cenário real, estes dados viriam de um hook (ex: useAccounts)
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Conta Principal',
    type: 'checking',
    institution: 'Banco Bradesco',
    balance: 5230.55,
  },
  {
    id: '2',
    name: 'Cartão Black',
    type: 'credit_card',
    institution: 'XP Investimentos',
    balance: -2890.1,
    closingDay: 20,
    dueDay: 27,
  },
  {
    id: '3',
    name: 'Roxinho',
    type: 'credit_card',
    institution: 'Nubank',
    closingDay: 2,
    dueDay: 9,
    balance: -875.4,
  },
  {
    id: '4',
    name: 'Carteira',
    type: 'cash',
    institution: 'Dinheiro Físico',
    balance: 350.0,
  },
];

// Componente para o Card da Conta
// Em um cenário real, seria movido para seu próprio arquivo (ex: src/presentation/components/widgets/AccountCard.tsx)
const AccountCard = ({
  account,
  onEdit,
  onAddIncome,
}: {
  account: Account;
  onEdit: (account: Account) => void;
  onAddIncome: (account: Account) => void;
}) => {
  const getIcon = (type: AccountType) => {
    switch (type) {
      case 'checking':
      case 'savings':
        return <Landmark className='h-8 w-8 text-blue-600' />;
      case 'credit_card':
        return <CreditCard className='h-8 w-8 text-orange-600' />;
      case 'cash':
        return <Wallet className='h-8 w-8 text-green-600' />;
      default:
        return <Banknote className='h-8 w-8 text-gray-500' />;
    }
  };

  const getTypeLabel = (type: AccountType) => {
    const labels: Record<AccountType, string> = {
      checking: 'Conta Corrente',
      savings: 'Conta Poupança',
      credit_card: 'Cartão de Crédito',
      cash: 'Dinheiro',
    };
    return labels[type];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const isCreditCard = account.type === 'credit_card';
  const balanceColor = isCreditCard ? 'text-red-600' : 'text-green-700';

  return (
    <div className='bg-white p-5 rounded-lg shadow-md flex flex-col justify-between gap-4'>
      <div
        className={`p-3 rounded-full self-start ${
          isCreditCard ? 'bg-orange-100' : 'bg-blue-100'
        } ${account.type === 'cash' && 'bg-green-100'}`}
      >
        {getIcon(account.type)}
      </div>
      <div className='flex-1'>
        <div className='flex justify-between items-start'>
          <div>
            <p className='font-bold text-gray-800 text-lg'>{account.name}</p>
            <p className='text-sm text-gray-600'>{account.institution}</p>
          </div>
          <div className='text-right'>
            <p className='text-xs text-gray-500'>
              {isCreditCard ? 'Fatura Atual' : 'Saldo'}
            </p>
            <p className={`font-semibold text-lg ${balanceColor}`}>
              {formatCurrency(Math.abs(account.balance))}
            </p>
          </div>
        </div>
        <p className='text-xs text-gray-500 mt-2'>
          {getTypeLabel(account.type)}{' '}
          {isCreditCard &&
            `(Fecha dia ${account.closingDay} | Vence dia ${account.dueDay})`}
        </p>
      </div>
      <div className='border-t border-gray-200 pt-3 flex justify-end gap-2'>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-2'
          onClick={() => onAddIncome(account)}
        >
          <DollarSign className='h-4 w-4' />
          Receita
        </Button>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-2'
          onClick={() => onEdit(account)}
        >
          <Pencil className='h-4 w-4' />
          Editar
        </Button>
      </div>
    </div>
  );
};

// Componente para o Modal de Adicionar/Editar Conta
// Em um cenário real, seria movido para seu próprio arquivo
const AccountModal = ({
  isOpen,
  onClose,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  account?: Account | null;
}) => {
  if (!isOpen) return null;

  const isEditing = !!account;
  const [accountType, setAccountType] = useState<AccountType>(
    account?.type || 'checking'
  );

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>
            {isEditing ? 'Editar Conta' : 'Nova Conta'}
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            X
          </Button>
        </div>
        <form className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Nome da Conta/Cartão
            </label>
            <input
              type='text'
              id='name'
              defaultValue={account?.name}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              placeholder='Ex: Cartão Nubank'
            />
          </div>
          <div>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-gray-700'
            >
              Tipo
            </label>
            <select
              id='type'
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='checking'>Conta Corrente</option>
              <option value='savings'>Conta Poupança</option>
              <option value='credit_card'>Cartão de Crédito</option>
              <option value='cash'>Dinheiro</option>
            </select>
          </div>
          {accountType === 'credit_card' && (
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='closingDay'
                  className='block text-sm font-medium text-gray-700'
                >
                  Dia de Fechamento
                </label>
                <input
                  type='number'
                  id='closingDay'
                  defaultValue={account?.closingDay}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label
                  htmlFor='dueDay'
                  className='block text-sm font-medium text-gray-700'
                >
                  Dia de Vencimento
                </label>
                <input
                  type='number'
                  id='dueDay'
                  defaultValue={account?.dueDay}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>
          )}
          <div className='flex justify-end pt-4'>
            <Button type='submit'>
              {isEditing ? 'Salvar Alterações' : 'Salvar Conta'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente para o Modal de Adicionar Receita
const AddIncomeModal = ({
  isOpen,
  onClose,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  account?: Account | null;
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-sm'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Adicionar Receita
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            X
          </Button>
        </div>
        <p className='text-sm text-gray-600 mb-4'>
          Adicionando receita para: <strong>{account?.name}</strong>
        </p>
        <form className='space-y-4'>
          <div>
            <label
              htmlFor='incomeValue'
              className='block text-sm font-medium text-gray-700'
            >
              Valor da Receita
            </label>
            <input
              type='number'
              id='incomeValue'
              step='0.01'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              placeholder='Ex: 150,00'
            />
          </div>
          <div className='flex justify-end pt-4'>
            <Button type='submit'>Adicionar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AccountsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accounts] = useState<Account[]>(mockAccounts);

  const handleOpenEditModal = (account: Account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleOpenIncomeModal = (account: Account) => {
    setSelectedAccount(account);
    setIsIncomeModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsIncomeModalOpen(false);
    setSelectedAccount(null);
  };

  return (
    <Layout>
      <div className='space-y-8'>
        <header className='flex flex-wrap justify-between items-center gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Contas e Cartões
            </h1>
            <p className='text-gray-600 mt-1'>
              Gerencie suas fontes de receitas e despesas.
            </p>
          </div>
          <Button onClick={handleOpenAddModal}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Adicionar Conta
          </Button>
        </header>

        <AccountModal
          isOpen={isModalOpen}
          onClose={handleCloseModals}
          account={selectedAccount}
        />

        <AddIncomeModal
          isOpen={isIncomeModalOpen}
          onClose={handleCloseModals}
          account={selectedAccount}
        />

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={handleOpenEditModal}
              onAddIncome={handleOpenIncomeModal}
            />
          ))}
        </section>
      </div>
    </Layout>
  );
};
