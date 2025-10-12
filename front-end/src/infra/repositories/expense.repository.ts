import { IExpenseRepository, Expense } from '../../core';

export class ExpenseRepository implements IExpenseRepository {
  create(expense: Expense): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  update(expense: Expense): Promise<Expense> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<Expense[]> {
    throw new Error('Method not implemented.');
  }
}
