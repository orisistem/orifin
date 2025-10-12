import { Expense } from '../models';

export interface IExpenseRepository {
  create(expense: Expense): Promise<Expense>;
  list(): Promise<Expense[]>;
  delete(id: string): Promise<void>;
  update(expense: Expense): Promise<Expense>;
}
