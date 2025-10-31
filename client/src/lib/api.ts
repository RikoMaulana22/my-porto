import { Service, Project, Booking } from './types';
import { AuthUser } from './types';
// 1. Ambil URL API dari .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL tidak ditemukan. Cek file .env.local');
}

/**
 * @desc    Mengambil semua data Services (Untuk Halaman Publik)
 */
export const getAllServices = async (): Promise<Service[]> => {
  try {
    const res = await fetch(`${API_URL}/services`, {
      method: 'GET',
      next: { revalidate: 60 }, // Revalidasi data setiap 60 detik (ISR)
    });

    if (!res.ok) {
      throw new Error('Gagal mengambil data services');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return []; // Kembalikan array kosong jika error
  }
};

/**
 * @desc    Mengambil semua data Projects (Untuk Halaman Publik)
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'GET',
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error('Gagal mengambil data projects');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * @desc    Membuat booking baru (Dari Form "Start Project")
 */
// Tipe untuk data input booking
type BookingInput = Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export const createBooking = async (
  bookingData: BookingInput
): Promise<Booking | null> => {
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      // Jika status 400 (Bad Request), coba baca pesan error
      if (res.status === 400) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Input tidak valid');
      }
      throw new Error('Gagal mengirim booking');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    // Lempar error lagi agar komponen bisa menangkapnya
    throw error;
  }
};

export const adminLogin = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthUser> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Email atau Password salah');
  }

  const user: AuthUser = await res.json();

  // Pastikan yang login adalah ADMIN
  if (user.role !== 'ADMIN') {
    throw new Error('Akses ditolak. Hanya untuk Admin.');
  }

  return user;
};
// TODO: Nanti kita tambahkan fungsi API untuk Admin (login, create, update, delete)