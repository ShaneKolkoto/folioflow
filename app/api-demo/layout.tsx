import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FolioFlow - Demo API',
  description: 'Login or sign up for FolioFlow to manage your CV with API superpowers',
};

export default function DemoApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {children}
    
    </>
  );
}