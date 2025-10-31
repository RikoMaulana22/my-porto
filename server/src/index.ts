// 'dotenv/config' akan otomatis memuat variabel dari .env
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

// (Kita akan tambahkan rute-rute di sini nanti)

// Inisialisasi aplikasi express
const app = express();
const PORT = process.env.PORT || 5000; // Ambil PORT dari .env, atau default ke 5000

// Middleware
app.use(cors()); // Izinkan permintaan dari frontend (client)
app.use(express.json()); // Izinkan server membaca JSON dari body request

// Rute tes sederhana
app.get('/', (req, res) => {
  res.send('Selamat datang di API Portofolio!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});