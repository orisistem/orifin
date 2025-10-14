import { Account } from '../../../domain/entities';

export interface IAccountRepository {
  save(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  update(account: Account): Promise<Account>;
  delete(id: string): Promise<void>;
}
