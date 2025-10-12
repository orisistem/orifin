import { ITransactionRepository } from '@/application/ports/repositories';
import { INotificationService } from '@/application/ports/services';
import { Transaction } from '@/domain/entities';
import {
  Money,
  TransactionStatus,
  TransactionType,
} from '@/domain/value-objects';

export interface CreateTransactionDTO {
  accountId: string;
  categoryId: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: Date;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private notificationService: INotificationService
  ) {}

  async execute(dto: CreateTransactionDTO): Promise<Transaction> {
    // Validação de negócio
    const money = new Money(dto.amount);

    // Criar entidade de domínio
    const transaction = new Transaction(
      '', // ID será gerado pelo repositório
      dto.accountId,
      dto.categoryId,
      money,
      dto.type === 'income' ? TransactionType.INCOME : TransactionType.EXPENSE,
      dto.description,
      dto.date,
      TransactionStatus.PENDING
    );

    // Persistir via repositório
    const savedTransaction = await this.transactionRepository.save(transaction);

    // Notificar sucesso
    this.notificationService.success('Transação criada com sucesso!');

    return savedTransaction;
  }
}
