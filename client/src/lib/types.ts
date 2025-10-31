// src/lib/types.ts

// Enum ini harus SAMA PERSIS dengan di schema.prisma
export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

// Tipe berdasarkan model 'Service' di Prisma
export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string; // string lebih mudah ditangani di frontend
  updatedAt: string;
}

// Tipe berdasarkan model 'Project' di Prisma
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string | null;
  repoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// Tipe berdasarkan model 'Booking' di Prisma
export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  message: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

// Tipe untuk data login user (dari backend authController)
export interface AuthUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  token: string;
}