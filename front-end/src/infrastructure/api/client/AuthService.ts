import { IAuthService } from '../../../application/ports/services/IAuthService';
import { supabase } from '../../api/client/SupabaseClient';
import { AuthResponse, Session, User } from '@supabase/supabase-js';

export class AuthService implements IAuthService {
  public async login(credentials: any): Promise<AuthResponse> {
    return supabase.auth.signInWithPassword(credentials);
  }

  public async logout(): Promise<{ error: any | null }> {
    return supabase.auth.signOut();
  }

  public async getUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }

  public async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  public async getToken(): Promise<string | null> {
    const session = await this.getSession();
    return session?.access_token ?? null;
  }

  public async refreshToken(): Promise<boolean> {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Failed to refresh token:', error);
      return false;
    }
    return !!data.session;
  }

  public onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ): { data: { subscription: any } } {
    return supabase.auth.onAuthStateChange(callback);
  }
}
