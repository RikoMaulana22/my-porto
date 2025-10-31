// client/src/lib/next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

// 1. Modul augmentasi untuk tipe User dan Session Next-Auth
declare module 'next-auth' {
  /**
   * Tipe 'user' yang dikembalikan oleh fungsi 'authorize'
   * (Harus sama dengan tipe AuthUser Anda di lib/types.ts)
   */
  interface User {
    id: string;
    email: string;
    role: 'ADMIN' | 'USER';
    token: string;
  }

  /**
   * Tipe 'session.user' yang bisa diakses di frontend.
   * Kita gabungkan tipe default dengan properti kustom kita.
   */
  interface Session {
    user: {
      id: string;
      email: string;
      role: 'ADMIN' | 'USER';
      backendToken: string;
    } & DefaultSession['user']; // DefaultSession['user'] berisi 'name' & 'image' (opsional)
  }
}

// 2. Modul augmentasi untuk tipe JWT
declare module 'next-auth/jwt' {
  /**
   * Tipe 'token' yang digunakan di callback 'jwt'.
   */
  interface JWT {
    id: string;
    email: string;
    role: 'ADMIN' | 'USER';
    backendToken: string;
  }
}