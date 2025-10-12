import { Money } from '@/domain/value-objects';
import { ValidationError } from '@/domain/errors';

export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  CREDIT_CARD = 'credit_card',
  INVESTMENT = 'investment',
  CASH = 'cash',
}

export class Account {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public name: string,
    public balance: Money,
    public readonly type: AccountType
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new ValidationError('Account name cannot be empty.');
    }
    if (!this.userId) {
      throw new ValidationError('Account must belong to a user.');
    }
  }

  public credit(amount: Money): void {
    this.balance = this.balance.add(amount);
  }

  public debit(amount: Money): void {
    this.balance = this.balance.subtract(amount);
  }
}
