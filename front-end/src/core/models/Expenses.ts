export type categories =
  | 'Aluguel'
  | 'Telefone'
  | 'Internet'
  | 'Alimentação'
  | 'Transporte';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  purchaseDate: string;
  category: categories;
  status: string;
  dueDate: string;
}
