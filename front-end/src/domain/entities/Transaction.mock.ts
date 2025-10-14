import { Transaction } from '../../domain/entities';
import {
  Money,
  TransactionStatus,
  TransactionType,
} from '../../domain/value-objects';

// Define um tipo para os dados parciais que a factory pode receber
type MockTransactionData = Partial<{
  id: string;
  accountId: string;
  categoryId: string;
  amount: Money;
  type: TransactionType;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
}>;

/**
 * Cria uma instância mock da entidade Transaction para uso em testes.
 * @param data - Dados parciais para sobrescrever os valores padrão.
 * @returns Uma nova instância de Transaction.
 */
export const createMockTransaction = (
  data: MockTransactionData = {}
): Transaction => {
  const defaults = {
    id: 'trans_12345',
    accountId: 'acc_123',
    categoryId: 'cat_123',
    amount: new Money(100),
    type: TransactionType.EXPENSE,
    description: 'Mock Transaction',
    date: new Date('2023-10-27T10:00:00Z'),
    status: TransactionStatus.PENDING,
  };

  const transactionData = { ...defaults, ...data };

  return new Transaction(
    transactionData.id,
    transactionData.accountId,
    transactionData.categoryId,
    transactionData.amount,
    transactionData.type,
    transactionData.description,
    transactionData.date,
    transactionData.status
  );
};
