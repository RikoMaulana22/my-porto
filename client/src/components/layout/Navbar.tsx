import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-base-100 shadow-md">
      <div className="container mx-auto px-4">
        <div className="navbar">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl normal-case">
              Riko.M (Logo)
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#projects">Projects</Link></li>
              <li>
                <Link href="/#start-project" className="btn btn-primary">
                  Start Project
                </Link>
              </li>
              {/* TODO: Tambahkan link ke /admin/dashboard di sini */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}