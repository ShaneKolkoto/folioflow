import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Authentication - FolioFlow',
  description: 'Login or sign up for FolioFlow to manage your CV with API superpowers',
};

export default function AuthLayout({
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