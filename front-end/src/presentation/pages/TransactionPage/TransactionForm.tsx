import React, { useState, useEffect } from 'react';
import { CreateTransactionDTO } from '../../../application';
import { calculateDueDate } from '../../../utils';
interface TransactionFormProps {
  onSubmit: (data: CreateTransactionDTO) => void;
  isLoading: boolean;
  initialData?: CreateTransactionDTO;
  visible: string;
}

// Dados mocados. Idealmente, viriam de hooks como `useAccounts()` e `useCategories()`.
const mockAccounts = [
  { id: '1', name: 'Banco Inter' },
  { id: '2', name: 'Nubank' },
  { id: '3', name: 'Caixa Econômica' },
  { id: '4', name: 'Banco do Brasil' },
  { id: '5', name: 'Cartão de Crédito' },
];
const mockCategories = [
  { id: '1', name: 'Alimentação' },
  { id: '2', name: 'Transporte' },
  { id: '3', name: 'Salário' },
];

const mockCards = [
  { id: '1', name: 'Nubank' },
  { id: '2', name: 'Itaucard Visa' },
  { id: '3', name: 'Itaucard Master' },
  { id: '4', name: 'Inter' },
  { id: '5', name: 'Amazon Master' },
];

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  isLoading,
  initialData,
  visible,
}) => {
  const [formData, setFormData] = useState<CreateTransactionDTO>({
    description: '',
    amount: 0,
    date: new Date(), // Formato YYYY-MM-DD
    type: 'expense',
    accountId: mockAccounts[0].id,
    categoryId: '',
    cardId: undefined,
    dueDate: undefined,
    installments: undefined,
    numberInstallments: 1,
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

  useEffect(() => {
    if (formData.accountId === '5' && formData.cardId && formData.date) {
      const transactionDate = new Date(formData.date);
      const newDueDate = calculateDueDate(transactionDate, formData.cardId);
      setFormData((prev) => ({ ...prev, dueDate: newDueDate }));
    } else {
      setFormData((prev) => ({ ...prev, dueDate: undefined }));
    }
  }, [formData.date, formData.cardId, formData.accountId]);

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
        accountId: mockAccounts[0].id,
        categoryId: '',
        cardId: undefined,
        dueDate: undefined,
        numberInstallments: 1,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${visible} mb-8 rounded-lg bg-gray-100 p-6 shadow-md`}
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            placeholder='...'
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
            // id='amount'
            value={formData.amount}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
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
            value={new Date(formData.date).toISOString().split('T')[0]}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
          >
            <option value='type'>Tipo</option>
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
          >
            <option value=''>Selecione uma categoria</option>
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Cartão */}
        <div className={formData.accountId === '5' ? '' : 'hidden'}>
          <label
            htmlFor='cardId'
            className='block text-sm font-medium text-gray-700'
          >
            Cartão
          </label>
          <select
            name='cardId'
            id='cardId'
            value={formData.cardId}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
          >
            <option value=''>Selecione um cartão</option>
            {mockCards.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Due Date */}
        <div className={formData.accountId === '5' ? '' : 'hidden'}>
          <label
            htmlFor='dueDate'
            className='block text-sm font-medium text-gray-700'
          >
            Vencimento
          </label>
          <input
            type='date'
            name='dueDate'
            id='dueDate'
            value={
              formData.dueDate
                ? new Date(formData.dueDate).toISOString().split('T')[0]
                : ''
            }
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 disabled:bg-gray-200'
            disabled={formData.accountId !== '5'}
          />
        </div>
        {/* Parcelamento? */}
        <div className={formData.accountId === '5' ? '' : 'hidden'}>
          <label
            htmlFor='installments'
            className='block text-sm font-medium text-gray-700'
          >
            Forma de Pagamento
          </label>
          <select
            name='installments'
            id='installments'
            value={formData.installments}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
          >
            <option value=''>Selecione a forma de pagamento</option>
            <option value={'À Vista'}>À Vista</option>
            <option value={'Parcelado'}>Parcelado</option>
          </select>
        </div>
        {/* Number of Installments */}
        <div className={formData.installments === 'Parcelado' ? '' : 'hidden'}>
          <label
            htmlFor='amount'
            className='block text-sm font-medium text-gray-700'
          >
            Número de Parcelas
          </label>
          <input
            type='number'
            name='numberInstallments'
            id='numberInstallments'
            value={formData.numberInstallments}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
          />
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
