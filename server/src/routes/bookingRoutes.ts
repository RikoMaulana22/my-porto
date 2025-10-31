import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  
} from '../controllers/bookingController';
import { protect, admin } from '../middleware/authMiddleware';

// TODO: Impor middleware autentikasi setelah Anda membuatnya
// import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// @route   /api/bookings
router.route('/')
  .post(createBooking) // Public
  .get(protect, admin, getAllBookings); // Nanti akan diproteksi: .get(protect, admin, getAllBookings)

// @route   /api/bookings/:id
router.route('/:id')
  .patch(protect, admin, updateBookingStatus); // Nanti akan diproteksi: .patch(protect, admin, updateBookingStatus)

export default router;