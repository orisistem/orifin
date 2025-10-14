import {
  Money,
  TransactionType,
  TransactionStatus,
} from '../../domain/value-objects';
import { ValidationError } from '../../domain/errors';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly categoryId: string,
    public readonly amount: Money,
    public readonly type: TransactionType,
    public readonly description: string,
    public readonly date: Date,
    public readonly status: 'pending' | 'completed' | 'failed'
  ) {
    this.validate();
  }

  private validate() {
    if (!this.amount || this.amount.isZero()) {
      throw new ValidationError('Transaction amount cannot be zero');
    }
    if (!this.description || this.description.trim().length === 0) {
      throw new ValidationError('Transaction must have a description');
    }
  }

  isExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }

  isIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  isPending(): boolean {
    return this.status === TransactionStatus.PENDING;
  }

  getValue(): number {
    return this.amount.value;
  }
}
