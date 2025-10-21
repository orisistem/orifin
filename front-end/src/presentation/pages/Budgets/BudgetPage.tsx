import { useState } from 'react';
import {
  Car,
  Gamepad2,
  Home,
  MoreVertical,
  PlusCircle,
  Utensils,
} from 'lucide-react';
import { Button, Layout } from '../../components';

// Mock data - em uma aplicação real, isso viria de uma API/contexto.
const budgets = [
  {
    id: '1',
    category: 'Alimentação',
    icon: Utensils,
    budgeted: 1000,
    spent: 750,
    color: 'bg-blue-500',
  },
  {
    id: '2',
    category: 'Transporte',
    icon: Car,
    budgeted: 300,
    spent: 250,
    color: 'bg-green-500',
  },
  {
    id: '3',
    category: 'Lazer',
    icon: Gamepad2,
    budgeted: 400,
    spent: 450, // Exemplo de gasto excedido
    color: 'bg-purple-500',
  },
  {
    id: '4',
    category: 'Moradia',
    icon: Home,
    budgeted: 1500,
    spent: 1500,
    color: 'bg-orange-500',
  },
];

// Componente para o Modal de Adicionar Orçamento
const BudgetModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Adicionar lógica para salvar o novo orçamento
    console.log('Salvando novo orçamento...');
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50 p-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 text-card-foreground shadow-xl'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Novo Orçamento</h2>
          <Button variant='ghost' size='icon' onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-6 w-6'
            >
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='category'
              className='mb-1 block text-sm font-medium'
            >
              Categoria
            </label>
            <input
              type='text'
              id='category'
              className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm'
              placeholder='Ex: Educação'
            />
          </div>
          <div>
            <label
              htmlFor='budgeted'
              className='mb-1 block text-sm font-medium'
            >
              Valor Orçado
            </label>
            <input
              type='number'
              id='budgeted'
              className='flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm'
              placeholder='Ex: 500,00'
            />
          </div>
          <div className='flex justify-center bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md mt-6'>
            <Button type='submit'>Salvar Orçamento</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const BudgetPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  // TODO: Em uma aplicação real, você usaria 'currentDate' para buscar os orçamentos do mês/ano selecionado.

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
  );

  return (
    <Layout>
      <div className='space-y-8 mt-2'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Orçamentos</h1>
            <p className='text-muted-foreground'>
              Acompanhe seus gastos em relação às suas metas.
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-2'>
              <select
                value={currentDate.getMonth()}
                onChange={handleMonthChange}
                className='h-10 rounded-lg bg-white px-3 py-2 text-sm'
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={currentDate.getFullYear()}
                onChange={handleYearChange}
                className='h-10 rounded-lg bg-white px-3 py-2 text-sm'
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusCircle className='mr-2 h-4 w-4' />
              Criar Orçamento
            </Button>
          </div>
        </div>

        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {budgets.map((budget) => {
            const progress = (budget.spent / budget.budgeted) * 100;
            const Icon = budget.icon;
            return (
              <div
                key={budget.id}
                className='bg-white rounded-lg bg-card p-6 text-card-foreground shadow-sm'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <Icon className='h-6 w-6 text-muted-foreground' />
                    <h3 className='text-lg font-semibold'>{budget.category}</h3>
                  </div>
                  <Button variant='ghost' size='icon'>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </div>
                <div className='space-y-2'>
                  <div className='h-2 w-full rounded-full bg-muted'>
                    <div
                      className={`h-2 rounded-full ${budget.color}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Gasto</span>
                    <span
                      className={`font-medium ${
                        progress > 100 ? 'text-destructive' : 'text-foreground'
                      }`}
                    >
                      {budget.spent.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Orçado</span>
                    <span className='font-medium text-foreground'>
                      {budget.budgeted.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
