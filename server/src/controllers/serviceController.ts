import { Request, Response } from 'express';
import prisma from '../config/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Membuat Service baru
 * @route   POST /api/services
 * @access  Private (Admin)
 */
export const createService = asyncHandler(
  async (req: Request, res: Response) => {
    // 3. Hapus try...catch
    const { title, description, imageUrl } = req.body;

    if (!title || !description) {
      res.status(400); // Cukup set status
      throw new Error('Judul dan deskripsi wajib diisi'); // Lempar error
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });

    res.status(201).json(service);
  }
);
/**
 * @desc    Mengambil semua Services
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServices = asyncHandler(
  async (req: Request, res: Response) => {
    // Hapus try...catch
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(services);
  }
);

/**
 * @desc    Update Service
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
export const updateService = asyncHandler(
  async (req: Request, res: Response) => {
    // Hapus try...catch
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Judul dan deskripsi wajib diisi');
    }
    
    // findUnique untuk mengecek apakah ada (akan error P2025 jika tidak ada)
    await prisma.service.findUniqueOrThrow({ where: { id } });

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
      },
    });

    res.json(updatedService);
  }
);

/**
 * @desc    Hapus Service
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
export const deleteService = asyncHandler(
  async (req: Request, res: Response) => {
    // Hapus try...catch
    const { id } = req.params;

    // findUniqueOrThrow akan otomatis melempar P2025 jika id tidak ada
    // dan error itu akan ditangkap oleh middleware kita
    await prisma.service.findUniqueOrThrow({ where: { id } });
    
    await prisma.service.delete({
      where: { id },
    });

    res.json({ message: 'Service berhasil dihapus' });
  }
);