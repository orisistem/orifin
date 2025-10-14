import React, { useState } from 'react';
import { useTransactions, useCreateTransaction } from '../hooks';
import {
  Container,
  Header,
  FilterBar,
  Loading,
  ErrorMessage,
  TransactionForm,
  TransactionList,
} from '../components';
import { CreateTransactionDTO, TransactionFilters } from '../../application';

export const TransactionsPage: React.FC = () => {
  const [filters, setFilters] = useState<TransactionFilters>({});
  const { data: transactions, isLoading, error } = useTransactions(filters);
  const createMutation = useCreateTransaction();

  const handleCreateTransaction = async (data: CreateTransactionDTO) => {
    await createMutation.mutateAsync(data);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Container>
      <Header title='Transações' />

      <FilterBar onFilter={setFilters} />

      <TransactionForm
        onSubmit={handleCreateTransaction}
        isLoading={createMutation.isPending}
      />

      <TransactionList
        transactions={transactions || []}
        onEdit={(t) => console.log('Edit', t)}
        onDelete={(t) => console.log('Delete', t)}
      />
    </Container>
  );
};
