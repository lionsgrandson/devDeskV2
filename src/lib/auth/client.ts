'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  name: 'Demo User',
  email: 'demo@devdesk.local',
} satisfies User;

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    if (params.email !== 'demo@devdesk.local' || params.password !== 'Secret1') {
      return { error: 'Invalid credentials' };
    }

    localStorage.setItem('custom-auth-token', generateToken());
    return {};
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    return token ? { data: user } : { data: null };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();
