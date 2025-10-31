import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// @route   /api/projects
router
  .route('/')
  .post(protect, admin, createProject) // Privat: Admin
  .get(getAllProjects); // Publik

// @route   /api/projects/:id
router
  .route('/:id')
  .put(protect, admin, updateProject) // Privat: Admin
  .delete(protect, admin, deleteProject); // Privat: Admin

export default router;