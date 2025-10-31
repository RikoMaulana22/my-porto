import Link from 'next/link';
import Image from 'next/image';

// Anda bisa install 'react-icons' (npm install react-icons)
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Hero() {
  return (
    // 'bg-base-100' akan menjadi hitam pekat di tema gelap Anda
    <section className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden bg-base-100 py-20 pt-32 md:min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-3">
          
          {/* 1. Kiri: Teks Utama & Tombol "Hire Me" */}
          <div className="z-10 text-center md:text-left">
            <h1 className="text-6xl font-bold leading-tight">
              Hi, <br />
              I'm <span className="text-primary">Riko</span>
            </h1>
            <p className="mt-4 text-2xl text-base-content/80">
              Web Developer
            </p>
            <Link
              href="/#start-project"
              className="btn btn-primary btn-lg mt-8" // Tombol "Hire Me"
            >
              Mulai Proyek <span aria-hidden="true">→</span>
            </Link>

            {/* Ikon Sosial Media (sesuai referensi) */}
            <div className="mt-12 flex justify-center gap-6 md:justify-start">
              {/* Ganti '#' dengan link sosmed Anda */}
              <a href="#" aria-label="Facebook" className="text-2xl hover:text-primary">
                {/* <FaFacebook /> */} F {/* Placeholder */}
              </a>
              <a href="#" aria-label="Twitter" className="text-2xl hover:text-primary">
                {/* <FaTwitter /> */} T {/* Placeholder */}
              </a>
              <a href="#" aria-label="Instagram" className="text-2xl hover:text-primary">
                {/* <FaInstagram /> */} I {/* Placeholder */}
              </a>
            </div>
          </div>

          {/* 2. Tengah: Gambar Profil */}
          <div className="relative z-0 order-first flex h-full min-h-64 items-center justify-center md:order-none">
            {/* Ganti dengan gambar profil Anda. Pastikan ada di folder /client/public/ */}
            <Image 
              src="/profile-pic.jpg" // GANTI DENGAN GAMBAR ANDA
              alt="Riko Maulana" 
              width={400} 
              height={600} 
              className="rounded-lg object-cover shadow-2xl"
              priority // Prioritaskan load gambar ini
            />
            
            {/* Lingkaran Dekoratif (dari referensi) */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full border-4 border-cyan-400 opacity-30"></div>
            <div className="absolute -top-5 right-20 h-8 w-8 rounded-full bg-cyan-400 opacity-50"></div>
          </div>

          {/* 3. Kanan: Teks Sekunder & CV */}
          <div className="z-10 text-center md:text-left">
            <p className="font-semibold text-primary">Expert on</p>
            <h2 className="mt-2 text-3xl font-bold">
              Full Stack Web Developer
            </h2>
            <p className="mt-6 text-base-content/80">
              Mencari developer untuk membangun brand dan
              mengembangkan bisnis Anda? Mari berkolaborasi.
            </p>
            <a
              href="/cv-riko.pdf" // Ganti dengan path CV Anda di /client/public/
              download
              className="link-hover link mt-8 inline-block text-lg font-semibold text-primary"
            >
              Download CV <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tautan Bawah (sesuai referensi) */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <a href="#" className="link-hover link text-base-content/70">
          github.com/RikoMaulana22 {/* Ganti link Anda */}
        </a>
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block">
        <Link href="/#start-project" className="link-hover link text-base-content/70">
          Let's Chat
        </Link>
      </div>
    </section>
  );
}