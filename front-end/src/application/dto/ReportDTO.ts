import { Money } from '../../domain/value-objects';
import { TransactionDTO } from './TransactionDTO';

export interface CashFlowFilters {
  startDate: Date;
  endDate: Date;
}

export interface CashFlowReport {
  period: {
    start: Date;
    end: Date;
  };
  income: Money;
  expenses: Money;
  balance: Money;
  transactions: TransactionDTO[];
  byCategory: Record<
    string,
    {
      total: Money;
    }
  >;
}
