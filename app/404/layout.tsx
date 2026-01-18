import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FolioFlow - 404',
  description: 'Login or sign up for FolioFlow to manage your CV with API superpowers',
};

export default function NotFoundLayout({
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