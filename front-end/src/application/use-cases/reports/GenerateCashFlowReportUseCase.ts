import { Money } from '@/domain/value-objects';
import { Transaction, Account } from '@/domain/entities';

import {
  ITransactionRepository,
  IAccountRepository,
} from '@/application/ports/repositories';
import { CashFlowFilters, CashFlowReport } from '@/application/dto/ReportDTO';
import { TransactionMapper } from '@/application/mappers';

export class GenerateCashFlowReportUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private accountRepository: IAccountRepository
  ) {}

  async execute(filters: CashFlowFilters): Promise<CashFlowReport> {
    const [transactions, accounts] = await Promise.all([
      this.transactionRepository.findAll({
        dateStart: filters.startDate,
        dateEnd: filters.endDate,
      }),
      this.accountRepository.findAll(),
    ]);

    const income = this.calculateIncome(transactions);
    const expenses = this.calculateExpenses(transactions);
    const balance = income.subtract(expenses);

    return {
      period: {
        start: filters.startDate,
        end: filters.endDate,
      },
      income,
      expenses,
      balance,
      transactions: transactions.map((t) => TransactionMapper.toDTO(t)),
      byCategory: this.groupByCategory(transactions),
    };
  }

  private calculateIncome(transactions: Transaction[]): Money {
    return transactions
      .filter((t) => t.isIncome())
      .reduce((sum, t) => sum.add(t.amount), new Money(0));
  }

  private calculateExpenses(transactions: Transaction[]): Money {
    return transactions
      .filter((t) => t.isExpense())
      .reduce((sum, t) => sum.add(t.amount), new Money(0));
  }

  private groupByCategory(
    transactions: Transaction[]
  ): CashFlowReport['byCategory'] {
    const grouped: CashFlowReport['byCategory'] = {};

    for (const transaction of transactions) {
      if (transaction.isIncome()) continue;

      const categoryId = transaction.categoryId;
      if (!grouped[categoryId]) {
        grouped[categoryId] = {
          total: new Money(0),
        };
      }
      grouped[categoryId].total = grouped[categoryId].total.add(
        transaction.amount
      );
    }
    return grouped;
  }
}
