// client/src/app/(admin)/layout.tsx
import AdminSessionProvider from '../AdminSessionProvider';
// TODO: Impor AdminSidebar Anda di sini nanti

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <div className="flex">
        {/* <AdminSidebar /> */}
        <main className="flex-grow p-8">
          {children}
        </main>
      </div>
    </AdminSessionProvider>
  );
}