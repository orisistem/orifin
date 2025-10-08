import { Expense } from '../models';
import { IExpenseRepository } from '../repositories';

export class CreateExpenseUseCase {
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  async execute(expense: Expense): Promise<Expense> {
    return await this.expenseRepository.create(expense);
  }
}
