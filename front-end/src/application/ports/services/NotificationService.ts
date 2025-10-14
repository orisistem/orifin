import { INotificationService } from '../../../application/ports/services/INotificationService';

/**
 * Implementação básica do serviço de notificação.
 * Em uma aplicação real, isso se integraria com uma biblioteca de UI
 * para mostrar toasts ou snackbars.
 */
export class NotificationService implements INotificationService {
  success(message: string): void {
    console.log(`[SUCCESS]: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }

  info(message: string): void {
    console.info(`[INFO]: ${message}`);
  }

  warning(message: string): void {
    console.warn(`[WARNING]: ${message}`);
  }
}
