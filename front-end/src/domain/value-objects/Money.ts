import { BusinessRuleError, ValidationError } from '@/domain/errors';

export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: string = 'BRL'
  ) {
    if (amount < 0) {
      throw new ValidationError('Money amount cannot be negative');
    }
  }

  get value(): number {
    return this.amount;
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  format(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new BusinessRuleError('Cannot operate on different currencies');
    }
  }
}
