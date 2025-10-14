// Lê as variáveis de ambiente com valores padrão para desenvolvimento
export const API_BASE_URL = 'http://localhost:8000/api';
// (process.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api';

export const SUPABASE_URL = 'http://localhost:8000/api';
export const SUPABASE_ANON_KEY = 'http://localhost:8000/api';

// Validação para garantir que as variáveis essenciais do Supabase estão definidas
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Supabase URL and Anon Key must be provided in environment variables.'
  );
}
