import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FolioFlow - Github Contribute Page',
};

export default function ContributeLayout({
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