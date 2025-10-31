import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * @desc    Middleware untuk menangani error "Not Found" (404)
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Meneruskan ke error handler utama
};

/**
 * @desc    Middleware Error Handler Utama
 */
export const errorHandler = (
  err: Error, // Tipe error adalah 'Error'
  req: Request,
  res: Response,
  next: NextFunction // next wajib ada, meskipun tidak dipakai
) => {
  // Tentukan status code. Jika 200 (OK), ubah jadi 500 (Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // --- Penanganan Error Spesifik Prisma ---
  if (err instanceof PrismaClientKnownRequestError) {
    // Error "Record not found"
    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Data tidak ditemukan';
    }
    // Error "Unique constraint failed" (misal: email duplikat)
    if (err.code === 'P2002') {
      statusCode = 400;
      // 'err.meta.target' berisi field yang gagal
      message = `Input duplikat pada field: ${err.meta?.target}`;
    }
  }

  res.status(statusCode).json({
    message: message,
    // Tampilkan stack trace hanya jika sedang dalam mode development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};