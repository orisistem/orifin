import { AuthResponse, Session, User } from '@supabase/supabase-js';

export interface IAuthService {
  login(credentials: any): Promise<AuthResponse>;
  logout(): Promise<{ error: any | null }>;
  getUser(): Promise<User | null>;
  getSession(): Promise<Session | null>;
  getToken(): Promise<string | null>;
  refreshToken(): Promise<boolean>;
  onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ): any;
}
