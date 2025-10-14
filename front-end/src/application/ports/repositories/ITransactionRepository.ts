import { Transaction } from '../../../domain/entities';
import { TransactionFilters } from '../../../application/types/TransactionFilters';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findAll(filters: TransactionFilters): Promise<Transaction[]>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  findAll(filters?: TransactionFilters): Promise<Transaction[]>;
}
