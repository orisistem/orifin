import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateTransactionDTO, TransactionFilters } from '../../application';
import {
  createTransactionUseCase,
  transactionRepository,
} from '../../config/dependencies';
import { NotificationService } from '../../infrastructure/services/NotificationService';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const notificationService = new NotificationService();

  return useMutation({
    mutationFn: (data: CreateTransactionDTO) =>
      createTransactionUseCase.execute(data),
    onSuccess: () => {
      // Invalida as queries para forçar a atualização da lista de transações
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      notificationService.error('Erro ao criar transação');
    },
  });
};

export const useTransactions = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      console.log(
        'Chamando transactionRepository.findAll com filters:',
        filters
      );
      const result = await transactionRepository.findAll(filters);
      console.log('Resultado da API:', result);
      return result;
    },
    // staleTime: 5 * 60 * 1000, // 5 minutos
    // cacheTime: 10 * 60 * 1000, // 10 minutos
  });
};
