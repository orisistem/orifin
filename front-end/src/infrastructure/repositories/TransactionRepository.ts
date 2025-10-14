import { ITransactionRepository } from '../../application/ports/repositories';
import { Transaction, createMockTransaction } from '../../domain/entities';
import { TransactionFilters } from '../../application';
import { APIClient } from '../api/client';
import { TransactionMapper, TransactionDTO } from '../../application';

export class TransactionRepository implements ITransactionRepository {
  constructor(private apiClient: APIClient) {}
  async update(transaction: Transaction): Promise<Transaction> {
    const dto = TransactionMapper.toDTO(transaction);
    const response = await this.apiClient.put<TransactionDTO>(
      `/transactions/${transaction.id}`,
      dto
    );
    return TransactionMapper.fromDTO(response);
  }

  async delete(id: string): Promise<void> {
    try {
      await this.apiClient.delete<void>(`/transactions/${id}`);
    } catch (error: any) {
      if (error.response?.status === 404) return;
      throw error;
    }
  }

  async findById(id: string): Promise<Transaction | null> {
    try {
      const response = await this.apiClient.get<TransactionDTO>(
        `/transactions/${id}`
      );
      return TransactionMapper.fromDTO(response);
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  }

  async findAll(filters?: TransactionFilters): Promise<Transaction[]> {
    // const response = await this.apiClient.get<TransactionDTO[]>(
    //   '/transactions',
    //   {
    //     params: filters,
    //   }
    // );
    // return response.map((dto) => TransactionMapper.fromDTO(dto));
    return [createMockTransaction()];
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const dto = TransactionMapper.toDTO(transaction);
    const response = await this.apiClient.post<TransactionDTO>(
      '/transactions',
      dto
    );
    return TransactionMapper.fromDTO(response);
  }
}
