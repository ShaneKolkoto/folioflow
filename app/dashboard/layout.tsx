import type { Metadata } from 'next';
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
   <>
   {children}
   </>
  );
}