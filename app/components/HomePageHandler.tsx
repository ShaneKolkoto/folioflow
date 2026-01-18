'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function HomePageHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on home page
    if (pathname === '/') {
      // Check for hash in URL
      const hash = window.location.hash.substring(1); // Remove the # symbol
      
      if (hash) {
        // Wait a bit for the page to load, then scroll
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100); // Small delay to ensure page is loaded
      }
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}