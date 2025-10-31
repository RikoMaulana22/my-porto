// 'dotenv/config' akan otomatis memuat variabel dari .env
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

// Impor rute baru kita
import projectRoutes from './routes/projectRoutes';
import serviceRoutes from './routes/serviceRoutes'; // <-- TAMBAHKAN INI
import bookingRoutes from './routes/bookingRoutes'; // <-- TAMBAHKAN INI
import authRoutes from './routes/authRoutes';
// Inisialisasi aplikasi express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rute tes sederhana
app.get('/', (req, res) => {
  res.send('Selamat datang di API Portofolio!');
});

// Gunakan Rute untuk Project
// Semua rute di projectRoutes akan diawali dengan /api/projects
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes); // <-- TAMBAHKAN INI
app.use('/api/bookings', bookingRoutes); // <-- TAMBAHKAN INI

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});