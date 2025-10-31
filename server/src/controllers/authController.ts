import { Request, Response } from 'express';
import prisma from '../config/db';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

/**
 * @desc    Registrasi User baru (termasuk Admin pertama)
 * @route   POST /api/auth/register
 * @access  Public (Nanti bisa dibatasi hanya untuk Admin)
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body; // 'role' opsional

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // 1. Cek apakah email sudah terdaftar
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Buat user baru
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'USER', // Default 'USER' jika 'role' tidak dikirim
      },
      select: { // Hanya kirim balik data yang aman
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // 4. Kirim response (TIDAK MENGIRIM TOKEN, user harus login dulu)
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

/**
 * @desc    Login User / Admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // 1. Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });

    // 2. Cek user & bandingkan password
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. Jika cocok, buat token dan kirim
      const token = generateToken(user.id);

      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        token: token, // <-- Ini token yang akan dipakai di middleware
      });
    } else {
      // Jika email atau password salah
      return res.status(401).json({ message: 'Email atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};