import { Request, Response } from 'express';
import prisma from '../config/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * @desc    Membuat Project baru
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, projectUrl, repoUrl } = req.body;

    // Validasi field yang wajib
    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: 'Judul, deskripsi, dan imageUrl wajib diisi' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl, // Opsional
        repoUrl,    // Opsional
      },
    });

    res.status(201).json(project);
  } catch (error) {
    let message = 'Terjadi kesalahan pada server';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).json({ message });
  }
};

/**
 * @desc    Mengambil semua Projects
 * @route   GET /api/projects
 * @access  Public
 */
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }, // Tampilkan proyek terbaru di atas
    });
    res.json(projects);
  } catch (error) {
    let message = 'Terjadi kesalahan pada server';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).json({ message });
  }
};

/**
 * @desc    Update Project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin)
 */
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, projectUrl, repoUrl } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Project ID wajib disertakan' });
    }

    // Validasi field yang wajib
    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: 'Judul, deskripsi, dan imageUrl wajib diisi' });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        repoUrl,
      },
    });

    res.json(updatedProject);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Project tidak ditemukan' });
      }
    }
    let message = 'Terjadi kesalahan pada server';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).json({ message });
  }
};

/**
 * @desc    Hapus Project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin)
 */
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Project ID wajib disertakan' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: 'Project berhasil dihapus' });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Project tidak ditemukan' });
      }
    }
    let message = 'Terjadi kesalahan pada server';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).json({ message });
  }
};