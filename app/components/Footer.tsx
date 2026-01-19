"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Social icon components for better performance and maintainability
const SocialIcons = {
  LinkedIn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  GitHub: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  ),
  YouTube: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

// Social links configuration
const socialLinks = [
  // {
  //   name: "LinkedIn",
  //   url: "https://linkedin.com",
  //   Icon: SocialIcons.LinkedIn,
  //   label: "Visit our LinkedIn page",
  // },
  // {
  //   name: "Twitter",
  //   url: "https://twitter.com",
  //   Icon: SocialIcons.Twitter,
  //   label: "Visit our Twitter page",
  // },
  {
    name: "GitHub",
    url: "https://github.com/ShaneKolkoto/folioflow",
    Icon: SocialIcons.GitHub,
    label: "Visit our GitHub repository",
  },
  // {
  //   name: "YouTube",
  //   url: "https://youtube.com",
  //   Icon: SocialIcons.YouTube,
  //   label: "Visit our YouTube channel",
  // },
];

// Navigation data
const navigation = {
  product: [
    { href: "/#features", label: "Features", id: "features" },
    { href: "/#how-it-works", label: "How It Works", id: "how-it-works" },
  ],
  company: [
    { href: "/about", label: "About", id: "about" },
    { href: "/blog", label: "Blog", id: "blog" },
    // { href: "/contact", label: "Contact", id: "contact" },
    { href: "/privacy", label: "Privacy", id: "privacy" },
  ],
  developers: [
    { href: "/api-docs", label: "API Docs", id: "api-docs" },
     { 
      href: "/github/contribute", 
      label: "Contribute", 
      id: "github-contribute",
      external: false 
    },
    { 
      href: "https://github.com/ShaneKolkoto/folioflow", 
      label: "GitHub", 
      id: "github",
      external: true 
    },
   
  ],
} as const;

// Type for navigation items
type NavigationItem = {
  href: string;
  label: string;
  id: string;
  external?: boolean;
};

export default function Footer() {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    
    // Handle external links
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Handle hash navigation on homepage
    if (pathname === "/" && !href.startsWith('/')) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Update URL without page reload
        window.history.pushState(null, '', `#${id}`);
      }
      return;
    }

    // Handle navigation to other pages with hash
    if (href.includes('#')) {
      const [page, hash] = href.split('#');
      if (pathname === page || (page === '/' && pathname === '/')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          window.history.pushState(null, '', `#${hash}`);
        }
      } else {
        window.location.href = href;
      }
      return;
    }

    // Regular navigation
    window.location.href = href;
  };

  // Render navigation column
  const renderNavigationColumn = (title: string, items: NavigationItem[]) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={(e) => handleScroll(e, item.id, item.href)}
              className="text-gray-400 hover:text-white transition-colors duration-200 inline-block"
              {...(item.external ? {
                target: "_blank",
                rel: "noopener noreferrer"
              } : {})}
            >
              {item.label}
              {item.external && (
                <span className="ml-1 inline-block" aria-hidden="true">
                  ↗
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-3 mb-6"
              aria-label="FolioFlow Home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                <span className="text-sm font-bold">CV</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                FolioFlow
              </span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Build, manage, and distribute your CV with API superpowers. 
              Modern tools for modern career development.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {renderNavigationColumn("Product", navigation.product)}
          {renderNavigationColumn("Company", navigation.company)}
          {renderNavigationColumn("Developers", navigation.developers)}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FolioFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            GDPR Compliant
          </div>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            256-bit Encryption
          </div>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
            SOC 2 Type II
          </div>
        </div>
      </div>
    </footer>
  );
}