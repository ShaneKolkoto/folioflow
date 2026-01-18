import type { Metadata } from 'next';
import { ApiDocsProvider } from '@/contexts/ApiDocsContext';

export const metadata: Metadata = {
  title: 'FolioFlow - API Docs',
  description: 'Login or sign up for FolioFlow to manage your CV with API superpowers',
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ApiDocsProvider>

    {children}
    </ApiDocsProvider>
    </>
  );
}