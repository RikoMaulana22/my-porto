import { Request, Response } from 'express';
import prisma from '../config/db';
import  { BookingStatus } from '@prisma/client'; // Impor Enum Status

/**
 * @desc    Buat booking baru (dari form "Start Project")
 * @route   POST /api/bookings
 * @access  Public
 */
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { clientName, clientEmail, message } = req.body;

    if (!clientName || !clientEmail || !message) {
      return res.status(400).json({ message: 'Nama, email, dan pesan wajib diisi' });
    }

    const newBooking = await prisma.booking.create({
      data: {
        clientName,
        clientEmail,
        message,
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

/**
 * @desc    Ambil semua booking
 * @route   GET /api/bookings
 * @access  Private (Hanya untuk Admin)
 */
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

/**
 * @desc    Update status booking
 * @route   PATCH /api/bookings/:id
 * @access  Private (Hanya untuk Admin)
 */
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // --- PERBAIKAN ---
    // Tambahkan pengecekan untuk memastikan 'id' tidak undefined
    if (!id) {
      return res.status(400).json({ message: 'Booking ID wajib disertakan' });
    }
    // --- AKHIR PERBAIKAN ---

    // Validasi apakah status yang dikirim valid
    if (!Object.values(BookingStatus).includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id }, // 'id' di sini sekarang dijamin bertipe 'string'
      data: { status },
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};