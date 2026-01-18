import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FolioFlow - Terms of Service',
};

export default function PrivacyLayout({
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