import { Router } from 'express';
import {
  createService,
  getAllServices,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// @route   /api/services
router
  .route('/')
  .post(protect, admin, createService) // Privat: Hanya Admin bisa buat
  .get(getAllServices); // Publik: Siapa saja bisa lihat

// @route   /api/services/:id
router
  .route('/:id')
  .put(protect, admin, updateService) // Privat: Hanya Admin bisa update
  .delete(protect, admin, deleteService); // Privat: Hanya Admin bisa hapus

export default router;