// client/src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { adminLogin } from '@/lib/api';
import { AuthUser } from '@/lib/types';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Fungsi ini akan dipanggil saat admin mencoba login
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          // Panggil API backend Express Anda
          const user = await adminLogin({
            email: credentials.email,
            password: credentials.password,
          });

          // Jika berhasil, kembalikan data user ke Next-Auth
          if (user && user.token) {
            return user; // 'user' ini akan disimpan di token Next-Auth
          }
          return null;
        } catch (error: any) {
          console.error('Auth Error:', error.message);
          return null; // Gagal login
        }
      },
    }),
  ],

  // Callbacks untuk memasukkan token backend kita ke sesi Next-Auth
  callbacks: {
    async jwt({ token, user }) {
      // 'user' hanya ada saat login pertama kali
      if (user) {
        const authUser = user as AuthUser;
        token.backendToken = authUser.token; // Simpan token backend
        token.role = authUser.role;         // Simpan role
        token.email = authUser.email;
        token.id = authUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Masukkan data dari JWT ke 'session' yang bisa diakses client
      if (token) {
        session.user.backendToken = token.backendToken as string;
        session.user.role = token.role as 'ADMIN' | 'USER';
        session.user.email = token.email as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Tentukan halaman login kustom kita
  pages: {
    signIn: '/admin/login',
  },

  secret: process.env.NEXTAUTH_SECRET, // Anda perlu menambahkan ini di .env.local
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };