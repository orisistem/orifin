import { toast } from 'react-hot-toast';
import { INotificationService } from '../../application/ports/services/INotificationService';

export class NotificationService implements INotificationService {
  public success(message: string): void {
    toast.success(message);
  }

  public error(message: string): void {
    toast.error(message);
  }

  public info(message: string): void {
    toast(message, { icon: 'ℹ️' });
  }

  public warning(message: string): void {
    toast(message, { icon: '⚠️' });
  }
}
