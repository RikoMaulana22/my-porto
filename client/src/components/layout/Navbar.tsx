import Link from 'next/link';

export default function Navbar() {
  return (
    // 'absolute' agar melayang di atas Hero section, 'z-50' agar di atas
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4">
      <div className="container mx-auto px-4">
        <div className="navbar">
          {/* Bagian Kiri: Logo & Email */}
          <div className="flex-1">
            <Link
              href="/"
              className="btn btn-ghost text-2xl font-bold normal-case"
            >
              Riko.M {/* Ganti dengan logo/nama Anda */}
            </Link>
            <span className="ml-4 hidden text-base-content/70 md:block">
              helloriko7@gmail.com {/* Ganti dengan email Anda */}
            </span>
          </div>

          {/* Bagian Kanan: Hamburger Menu */}
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              aria-label="Toggle menu"
            >
              {/* Ikon Hamburger */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            {/* TODO: Anda perlu menambahkan logic untuk Dropdown/Modal menu di sini */}
          </div>
        </div>
      </div>
    </nav>
  );
}