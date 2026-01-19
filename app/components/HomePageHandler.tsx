'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface ScrollOptions {
  behavior?: 'smooth' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
  offset?: number;
  timeout?: number;
}

export default function HomePageHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Refs to track scrolling state
  const isScrollingRef = useRef(false);
  const lastHashRef = useRef<string | null>(null);
  const userScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to scroll to an element
  const scrollToElement = useCallback((
    element: HTMLElement | Element, 
    options: ScrollOptions = {}
  ) => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    const {
      behavior = 'smooth',
      block = 'start',
      inline = 'nearest',
      offset = 0,
      timeout = 0
    } = options;

    setTimeout(() => {
      if (offset > 0) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const offsetPosition = absoluteElementTop - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior
        });
      } else {
        if (element instanceof HTMLElement) {
          element.scrollIntoView({ behavior, block, inline });
        }
      }

      if (element instanceof HTMLElement) {
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
        setTimeout(() => {
          if (element.hasAttribute('tabindex')) {
            element.removeAttribute('tabindex');
          }
        }, 1000);
      }

      // Reset scrolling state after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, behavior === 'smooth' ? 1000 : 100);
    }, timeout);
  }, []);

  // Find element by various methods
  const findElement = useCallback((hash: string): HTMLElement | Element | null => {
    const byId = document.getElementById(hash);
    if (byId) return byId;

    const byDataSection = document.querySelector(`[data-section="${hash}"]`);
    if (byDataSection) return byDataSection;

    const byName = document.querySelector(`a[name="${hash}"]`);
    if (byName) return byName;

    const byDataAnchor = document.querySelector(`[data-anchor="${hash}"]`);
    if (byDataAnchor) return byDataAnchor;

    const byClass = document.querySelector(`.section-${hash}`);
    if (byClass) return byClass;

    return null;
  }, []);

  // Check if element is in viewport
  const isElementInViewport = useCallback((element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Check if element is at least 20% visible
    const tolerance = 0.2; // 20% tolerance
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    
    return (
      visibleHeight > rect.height * tolerance &&
      visibleWidth > rect.width * tolerance &&
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight * 1.5 && // Allow some buffer below
      rect.right <= windowWidth
    );
  }, []);

  // Handle hash scrolling with intelligent checks
  const handleHashScroll = useCallback((hash: string, force = false) => {
    if (!hash || isScrollingRef.current) return;

    const element = findElement(hash);
    
    if (element) {
      // If element is already in viewport and we're not forcing, don't scroll
      if (!force && isElementInViewport(element) && lastHashRef.current === hash) {
        return;
      }
      
      lastHashRef.current = hash;
      userScrollRef.current = false; // Reset user scroll flag

      const isHomePage = pathname === '/';
      
      scrollToElement(element, {
        behavior: 'smooth',
        block: 'start',
        offset: 80,
        timeout: isHomePage ? 300 : 100
      });
    } else {
      setTimeout(() => {
        const retryElement = findElement(hash);
        if (retryElement && !force && !isElementInViewport(retryElement)) {
          lastHashRef.current = hash;
          userScrollRef.current = false;
          
          scrollToElement(retryElement, {
            behavior: 'smooth',
            block: 'start',
            offset: 80
          });
        } else if (!retryElement) {
          console.warn(`Element with ID/name "${hash}" not found`);
        }
      }, 1000);
    }
  }, [pathname, findElement, scrollToElement, isElementInViewport]);

  // Track user scrolling
  useEffect(() => {
    const handleUserScroll = () => {
      if (isScrollingRef.current) return;
      
      userScrollRef.current = true;
      
      // Clear any pending scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to reset user scroll flag after no scrolling for 500ms
      scrollTimeoutRef.current = setTimeout(() => {
        userScrollRef.current = false;
      }, 500);
    };

    let scrollTimer: NodeJS.Timeout;
    const handleScrollWithThrottle = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleUserScroll, 100);
    };

    window.addEventListener('scroll', handleScrollWithThrottle, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollWithThrottle);
      clearTimeout(scrollTimer);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Initial load and URL change handling
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    
    if (hash) {
      // Only scroll if user hasn't manually scrolled away recently
      if (!userScrollRef.current) {
        handleHashScroll(hash);
      }
    }
  }, [pathname, searchParams, handleHashScroll]);

  // Handle hash changes (client-side navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      
      if (hash && !userScrollRef.current) {
        setTimeout(() => handleHashScroll(hash), 50);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashScroll]);

  // Handle custom data attribute clicks
  useEffect(() => {
    const handleCustomClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const scrollElement = target.closest('[data-scroll-to]');
      
      if (scrollElement) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = scrollElement.getAttribute('data-scroll-to');
        const optionsStr = scrollElement.getAttribute('data-scroll-options');
        
        if (targetId) {
          // Update URL
          const newUrl = `#${targetId}`;
          window.history.pushState(null, '', newUrl);
          
          // Parse options if provided
          let scrollOptions: ScrollOptions = {
            behavior: 'smooth',
            block: 'start',
            offset: 80
          };
          
          if (optionsStr) {
            try {
              const parsedOptions = JSON.parse(optionsStr);
              scrollOptions = { ...scrollOptions, ...parsedOptions };
            } catch (e) {
              console.warn('Invalid scroll options:', optionsStr);
            }
          }
          
          // Force scroll on click
          setTimeout(() => {
            const element = findElement(targetId);
            if (element) {
              lastHashRef.current = targetId;
              userScrollRef.current = false;
              scrollToElement(element, scrollOptions);
            }
          }, 10);
        }
      }
    };

    document.addEventListener('click', handleCustomClick, true);
    
    return () => {
      document.removeEventListener('click', handleCustomClick, true);
    };
  }, [findElement, scrollToElement]);

  // Handle window.location.hash directly
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (window.location.hash && !userScrollRef.current) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => handleHashScroll(hash), 50);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [handleHashScroll]);

  // Reset hash on page change without hash
  useEffect(() => {
    if (!window.location.hash) {
      lastHashRef.current = null;
      userScrollRef.current = false;
    }
  }, [pathname]);

  return null;
}

// Export utility functions
export const scrollToSection = (
  sectionId: string, 
  options: ScrollOptions = {}
) => {
  const element = document.getElementById(sectionId) || 
                 document.querySelector(`[data-section="${sectionId}"]`);
  
  if (element) {
    // Update URL
    window.history.pushState(null, '', `#${sectionId}`);
    
    const finalOptions = {
      behavior: 'smooth' as const,
      block: 'start' as const,
      offset: 80,
      timeout: 0,
      ...options
    };
    
    setTimeout(() => {
      if (finalOptions.offset && finalOptions.offset > 0) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const offsetPosition = absoluteElementTop - finalOptions.offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: finalOptions.behavior
        });
      } else if (element instanceof HTMLElement) {
        element.scrollIntoView({ 
          behavior: finalOptions.behavior,
          block: finalOptions.block
        });
      }
    }, finalOptions.timeout);
  }
};

export const useScrollToSection = () => {
  const scrollTo = useCallback((
    sectionId: string, 
    options?: ScrollOptions
  ) => {
    scrollToSection(sectionId, options);
  }, []);

  return { scrollTo };
};