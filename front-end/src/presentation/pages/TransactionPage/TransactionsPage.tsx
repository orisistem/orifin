import React, { useState } from 'react';
import { useTransactions, useCreateTransaction } from '../../hooks';
import { Container, Loading, ErrorMessage, Layout } from '../../components';
import { FilterBar } from './FilterBar';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { Header } from './Header';
import { CreateTransactionDTO, TransactionFilters } from '../../../application';

export const TransactionsPage: React.FC = () => {
  const [filters, setFilters] = useState<TransactionFilters>({});
  const { data: transactions, isLoading, error } = useTransactions(filters);
  const createMutation = useCreateTransaction();
  const [visibleForm, setVisibleForm] = useState(false);

  const handleCreateTransaction = async (data: CreateTransactionDTO) => {
    await createMutation.mutateAsync(data);
  };

  const toggleVisibility = () => {
    setVisibleForm(!visibleForm); // Toggle the state
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Layout>
      <Header title='Transações' />

      <FilterBar onClick={toggleVisibility} onFilter={setFilters} />

      <TransactionForm
        onSubmit={handleCreateTransaction}
        isLoading={createMutation.isPending}
        visible={visibleForm ? 'block' : 'hidden'}
      />

      <TransactionList
        transactions={transactions || []}
        onEdit={(t) => console.log('Edit', t)}
        onDelete={(t) => console.log('Delete', t)}
      />
    </Layout>
  );
};
