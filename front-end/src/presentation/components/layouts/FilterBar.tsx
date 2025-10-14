import React, { useState } from 'react';
import { TransactionFilters } from '../../../application/types/TransactionFilters';

interface FilterBarProps {
  onFilter: (filters: TransactionFilters) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
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
      className='mb-6 rounded-lg bg-gray-50 p-4 shadow-sm'
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {/* Start Date */}
        <div>
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </div>

        {/* End Date */}
        <div>
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
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
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
            id='type'
            name='type'
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          >
            <option value=''>Todos</option>
            <option value='income'>Receita</option>
            <option value='expense'>Despesa</option>
          </select>
        </div>

        <div className='flex items-end'>
          <button
            type='submit'
            className='w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </form>
  );
};
