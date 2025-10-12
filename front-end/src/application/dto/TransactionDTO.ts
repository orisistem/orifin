export interface TransactionDTO {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
}
