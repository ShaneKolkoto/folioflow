import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FolioFlow - About Us',
  description: 'Login or sign up for FolioFlow to manage your CV with API superpowers',
};

export default function AboutLayout({
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