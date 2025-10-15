import React, { useState } from 'react';
import { TransactionFilters } from '../../../application/types/TransactionFilters';

interface FilterBarProps {
  onFilter: (filters: TransactionFilters) => void;
  onClick: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilter, onClick }) => {
  const [localFilters, setLocalFilters] = useState<TransactionFilters>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value || undefined }));
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(localFilters);
  };

  return (
    <form
      onSubmit={handleApplyFilters}
      className='mb-6 bg-gray-100 p-4 shadow-sm border-0.5 border-gray-300'
    >
      <div className='flex justify-between space-x-6'>
        {/* Start Date */}
        <div className='w-full'>
          <label
            htmlFor='startDate'
            className='block text-sm font-medium text-gray-700'
          >
            Data Início
          </label>
          <input
            type='date'
            id='startDate'
            name='startDate'
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          />
        </div>

        {/* End Date */}
        <div className='w-full'>
          <label
            htmlFor='endDate'
            className='block text-sm font-medium text-gray-700'
          >
            Data Fim
          </label>
          <input
            type='date'
            id='endDate'
            name='endDate'
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          />
        </div>

        {/* Type */}
        <div className='w-full'>
          <label
            htmlFor='type'
            className='block text-sm font-medium text-gray-700'
          >
            Tipo
          </label>
          <select
            id='type'
            name='type'
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          >
            <option value=''>Todos</option>
            <option value='income'>Receita</option>
            <option value='expense'>Despesa</option>
          </select>
        </div>

        <div className='flex items-end w-full'>
          <button
            type='submit'
            className='w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Aplicar Filtros
          </button>
        </div>
        <div className='flex items-end w-full'>
          <button
            type='submit'
            onClick={onClick}
            className='w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Nova Transação
          </button>
        </div>
      </div>
    </form>
  );
};
