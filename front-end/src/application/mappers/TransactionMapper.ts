import { TransactionDTO } from '@/application/dto';
import { Transaction } from '@/domain/entities';
import { TransactionType } from '@/domain/value-objects';

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

  // Aqui você também poderia ter um método fromDTO para o caminho inverso
}
