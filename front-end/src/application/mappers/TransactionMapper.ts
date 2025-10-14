import { TransactionDTO } from '../../application/dto';
import { Transaction } from '../../domain/entities';
import { Money, TransactionType } from '../../domain/value-objects';

export class TransactionMapper {
  public static toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      accountId: transaction.accountId,
      categoryId: transaction.categoryId,
      amount: transaction.amount.value,
      type: transaction.type, // O enum já tem os valores 'income' | 'expense'
      description: transaction.description,
      date: transaction.date,
      status: transaction.status,
    };
  }

  public static fromDTO(dto: TransactionDTO): Transaction {
    return new Transaction(
      dto.id,
      dto.accountId,
      dto.categoryId,
      new Money(dto.amount),
      dto.type as TransactionType, // Assegura que o tipo é do enum correto
      dto.description,
      dto.date,
      dto.status
    );
  }
}
