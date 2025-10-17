import React from 'react';
import { Transaction } from '../../../domain/entities';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <p className='text-center text-gray-500'>Nenhuma transação encontrada.</p>
    );
  }

  return (
    <div className='overflow-x-auto rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200 bg-gray-100'>
        <thead>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
            >
              Descrição
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
            >
              Valor
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
            >
              Data
            </th>
            <th scope='col' className='relative px-6 py-3'>
              <span className='sr-only'>Ações</span>
            </th>
          </tr>
        </thead>
        {/* TODO - Structure DB - Transactions, Accounts and Categories */}
        <tbody className='divide-y divide-gray-200 bg-gray-100'>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className='whitespace-nowrap px-6 py-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {transaction.description}
                </div>
                <div className='text-sm text-gray-500'>
                  {transaction.categoryId}
                </div>
              </td>
              <td
                className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'expense' && '- '}
                {formatCurrency(transaction.amount.value)}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                {formatDate(transaction.date)}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                <button
                  onClick={() => onEdit(transaction)}
                  className='text-indigo-600 hover:text-indigo-900'
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(transaction)}
                  className='ml-4 text-red-600 hover:text-red-900'
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
