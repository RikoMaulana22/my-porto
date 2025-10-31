import jwt from 'jsonwebtoken';

/**
 * @desc    Menghasilkan JWT untuk user
 * @param   userId - ID user dari database
 * @returns Token JWT (string)
 */
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // Sebaiknya tidak terjadi karena sudah dicek di middleware,
    // tapi ini sebagai pengaman
    throw new Error('JWT_SECRET tidak ditemukan di .env');
  }

  return jwt.sign(
    { userId }, // Payload
    secret,     // Secret
    { expiresIn: '30d' } // Token kedaluwarsa dalam 30 hari
  );
};

export default generateToken;