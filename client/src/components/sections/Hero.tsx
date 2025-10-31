import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero min-h-[calc(100vh-64px)] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {/*  */}
          <h1 className="text-5xl font-bold">Halo, Saya Riko Maulana</h1>
          <p className="py-6">
            Seorang Web Developer yang bersemangat membangun aplikasi web modern,
            cepat, dan fungsional dengan Next.js dan Express.
          </p>
          <Link href="/#projects" className="btn btn-primary mr-2">
            Lihat Proyek
          </Link>
          <Link href="/#start-project" className="btn btn-outline">
            Mulai Proyek
          </Link>
        </div>
      </div>
    </section>
  );
}