'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  EyeIcon,
  CloudArrowDownIcon,
  CodeBracketIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function CVBuilderNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: '/cv-builder', label: 'Editor', icon: DocumentTextIcon },
    { href: '/cv-builder/preview', label: 'Preview', icon: EyeIcon },
    { href: '/cv-builder/export', label: 'Export', icon: CloudArrowDownIcon },
    { href: '/cv-builder/api', label: 'API', icon: CodeBracketIcon },
    { href: '/cv-builder/settings', label: 'Settings', icon: Cog6ToothIcon },
  ];

  const handleExport = () => {
    // Will implement export functionality
    console.log('Export triggered');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <Link 
              href="/dashboard" 
              className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="text-sm text-gray-600">
                Editing: <span className="font-medium text-gray-900">Professional CV</span>
              </div>
              <div className="text-xs text-gray-500">
                Auto-saved {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CloudArrowDownIcon className="h-4 w-4 mr-2" />
                Export CV
              </button>

              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="h-8 w-8 rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-3 border-t border-gray-200">
          <div className="flex items-center justify-between overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center px-2 py-1 min-w-[60px] ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}