import React, { useState, useEffect } from 'react';
import { CreateTransactionDTO } from '../../application';

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionDTO) => void;
  isLoading: boolean;
  initialData?: CreateTransactionDTO;
}

// Dados mocados. Idealmente, viriam de hooks como `useAccounts()` e `useCategories()`.
const mockAccounts = [
  { id: '1', name: 'Carteira' },
  { id: '2', name: 'Banco Principal' },
];
const mockCategories = [
  { id: '1', name: 'Alimentação' },
  { id: '2', name: 'Transporte' },
  { id: '3', name: 'Salário' },
];

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  isLoading,
  initialData,
}) => {
  const [formData, setFormData] = useState<CreateTransactionDTO>({
    description: '',
    amount: 0,
    date: new Date(), // Formato YYYY-MM-DD
    type: 'expense',
    accountId: '',
    categoryId: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Opcional: Limpar o formulário após o envio
    if (!initialData) {
      setFormData({
        description: '',
        amount: 0,
        date: new Date(),
        type: 'expense',
        accountId: '',
        categoryId: '',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-8 rounded-lg bg-white p-6 shadow-md'
    >
      <h2 className='mb-4 text-xl font-semibold'>Nova Transação</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Description */}
        <div className='lg:col-span-3'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Descrição
          </label>
          <input
            type='text'
            name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor='amount'
            className='block text-sm font-medium text-gray-700'
          >
            Valor
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            value={formData.amount}
            onChange={handleChange}
            required
            step='0.01'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-gray-700'
          >
            Data
          </label>
          <input
            type='date'
            name='date'
            id='date'
            value={formData.date.toDateString().split('T')[0]}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor='type'
            className='block text-sm font-medium text-gray-700'
          >
            Tipo
          </label>
          <select
            name='type'
            id='type'
            value={formData.type}
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          >
            <option value='expense'>Despesa</option>
            <option value='income'>Receita</option>
          </select>
        </div>

        {/* Account */}
        <div>
          <label
            htmlFor='accountId'
            className='block text-sm font-medium text-gray-700'
          >
            Conta
          </label>
          <select
            name='accountId'
            id='accountId'
            value={formData.accountId}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          >
            <option value=''>Selecione uma conta</option>
            {mockAccounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor='categoryId'
            className='block text-sm font-medium text-gray-700'
          >
            Categoria
          </label>
          <select
            name='categoryId'
            id='categoryId'
            value={formData.categoryId}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
          >
            <option value=''>Selecione uma categoria</option>
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='mt-6 flex justify-end'>
        <button
          type='submit'
          disabled={isLoading}
          className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
        >
          {isLoading ? 'Salvando...' : 'Salvar Transação'}
        </button>
      </div>
    </form>
  );
};
