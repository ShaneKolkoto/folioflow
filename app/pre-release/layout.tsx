import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FolioFlow - Pre Release',
};

export default function PreReleaseLayout({
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