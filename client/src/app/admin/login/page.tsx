// client/src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Panggil 'signIn' dari Next-Auth dengan 'credentials'
      const res = await signIn('credentials', {
        redirect: false, // Jangan redirect otomatis
        email: email,
        password: password,
      });

      if (res?.error) {
        setError('Email atau password salah');
      } else {
        // Redirect ke dashboard jika berhasil
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
    }
    setLoading(false);
  };

  return (
    // --- PERUBAHAN UI DIMULAI DI SINI ---

    // 1. Latar belakang utama. Kita gunakan 'bg-base-200' dari tema gelap Anda
    //    'relative' ditambahkan untuk menampung elemen gelombang dan logo
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-200 p-8">
      
      {/* 2. Hapus 'card', ganti dengan div biasa untuk membungkus form */}
      <div className="z-10 w-full max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* 3. Tambahkan Judul dan Subjudul sesuai gambar */}
          <div className="mb-4 text-center">
            <h1 className="text-5xl font-bold">Sign in</h1>
            <p className="mt-2 text-base-content/70">
              Sign in and start managing your candidates!
            </p>
          </div>

          {error && (
            <div role="alert" className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {/* 4. Ubah style input (hapus 'input-bordered' ganti dengan 'bg-base-100') */}
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Login" // Ganti placeholder
              className="input w-full bg-base-100" // Input dengan latar belakang
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password" // Ganti placeholder
              className="input w-full bg-base-100" // Input dengan latar belakang
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 5. Tambahkan 'Remember me' dan 'Forgot password' */}
          <div className="flex items-center justify-between text-sm">
            <label className="label-text flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm border-base-content/30"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="link link-hover text-sm">
              Forgot password?
            </a>
          </div>

          {/* 6. Ganti tombol 'btn-primary' menjadi 'btn-success' (hijau) */}
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-success text-white" // Tombol hijau
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 7. Logo di kiri bawah (Placeholder) */}
      <div className="absolute bottom-8 left-8 z-10">
        {/* Ganti div ini dengan komponen <Image /> logo Anda */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-100 font-bold shadow-lg">
          R
        </div>
      </div>

      {/* 8. Gelombang di bawah (Versi CSS Sederhana) */}
      {/* Desain di gambar menggunakan custom SVG, ini adalah tiruan sederhana */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden leading-none opacity-50">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0"
          style={{ transform: 'translateY(60%)' }}
        >
          <path
            fill="currentColor"
            className="text-base-content/10" // Gelombang 1
            d="M0,160L48,181.3C96,203,192,245,288,256C384,267,480,245,576,208C672,171,768,117,864,117.3C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="currentColor"
            className="text-success/30" // Gelombang 2 (hijau)
            d="M0,192L48,170.7C96,149,192,107,288,112C384,117,480,171,576,176C672,181,768,139,864,144C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}