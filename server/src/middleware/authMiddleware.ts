import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';

interface JwtPayload {
  userId: string;
}

/**
 * @desc    Middleware untuk memproteksi rute (memerlukan login)
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // 1. Cek JWT_SECRET (Ini sudah benar)
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET tidak diatur di file .env');
    return res
      .status(500)
      .json({ message: 'Kesalahan Server: Konfigurasi JWT hilang' });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // --- PERBAIKAN: Cek apakah token ada ---
      // Ini perbaikan untuk error ts(2769)
      if (!token) {
        return res
          .status(401)
          .json({ message: 'Otentikasi gagal, format token salah' });
      }
      // --- AKHIR PERBAIKAN ---

      // Sekarang 'token' dan 'secret' dijamin bertipe 'string'
      const decoded = jwt.verify(token, secret) as JwtPayload;

      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'Otentikasi gagal, user tidak ditemukan' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: 'Otentikasi gagal, token tidak valid' });
    }
  }

  // Jika 'if' di atas tidak berjalan, berarti tidak ada token
  if (!token) {
    return res.status(401).json({ message: 'Otentikasi gagal, tidak ada token' });
  }
};

/**
 * @desc    Middleware untuk memvalidasi role Admin
 */
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(430); // 403 Forbidden
    return res.json({ message: 'Tidak diizinkan, hanya untuk Admin' });
  }
};