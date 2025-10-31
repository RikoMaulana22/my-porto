import { User } from '@prisma/client';

declare module 'express-serve-static-core' {
  interface Request {
    // Tambahkan '| null' di akhir
    user?: Omit<User, 'password'> | null;
  }
}