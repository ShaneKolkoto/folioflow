import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FolioFlow - Dashboard',
  description: 'Login or sign up for FolioFlow to manage your CV with API superpowers',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}