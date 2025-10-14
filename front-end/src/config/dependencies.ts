import { CreateTransactionUseCase } from '../application/use-cases/transactions/CreateTransactionUseCase';
import { APIClient } from '../infrastructure/api/client';
import { TransactionRepository } from '../infrastructure/repositories/TransactionRepository';
import { NotificationService } from '../infrastructure/services/NotificationService';

// --- Instâncias Singleton ---
// Criamos uma única instância para cada serviço.

const apiClient = new APIClient();
const notificationService = new NotificationService();

// --- Repositórios ---
// Os repositórios dependem do apiClient.

export const transactionRepository = new TransactionRepository(apiClient);

// --- Casos de Uso (Use Cases) ---
// Os casos de uso dependem dos repositórios e serviços.

export const createTransactionUseCase = new CreateTransactionUseCase(
  transactionRepository,
  notificationService
);
