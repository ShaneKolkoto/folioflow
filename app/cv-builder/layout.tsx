import type { Metadata } from 'next';
import ProtectedRoute from '@/components/ProtectedRoute';
import CVBuilderNav from '@/components/cv-builder/CVBuilderNav';

export const metadata: Metadata = {
  title: 'FolioFlow - CV Builder',
  description: 'Build and edit your professional CV with real-time preview and API integration',
};

export default function CVBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <CVBuilderNav />
        {children}
      </div>
    </ProtectedRoute>
  );
}