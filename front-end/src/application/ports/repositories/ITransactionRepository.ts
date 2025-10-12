import { Transaction } from '@/domain/entities';

export interface FindAllFilters {
  accountId?: string;
  categoryId?: string;
  type?: 'income' | 'expense';
  dateStart?: Date;
  dateEnd?: Date;
}

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findAll(filters: FindAllFilters): Promise<Transaction[]>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
