// components/QuickLinks.tsx
'use client';
import Link from 'next/link';
import {
  KeyIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ServerStackIcon,
  CodeBracketIcon,
  BoltIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface QuickLink {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export default function QuickLinks() {
  const quickLinks: QuickLink[] = [
    { id: 'authentication', label: 'Authentication', icon: 'KeyIcon', href: '#authentication' },
    { id: 'schema', label: 'Data Schema', icon: 'DocumentTextIcon', href: '#schema' },
    { id: 'rate-limiting', label: 'Rate Limiting', icon: 'ExclamationTriangleIcon', href: '#rate-limiting' },
    { id: 'error-codes', label: 'Error Codes', icon: 'CodeBracketIcon', href: '#error-codes' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'KeyIcon':
        return <KeyIcon className="h-4 w-4 mr-2" />;
      case 'DocumentTextIcon':
        return <DocumentTextIcon className="h-4 w-4 mr-2" />;
      case 'ExclamationTriangleIcon':
        return <ExclamationTriangleIcon className="h-4 w-4 mr-2" />;
      case 'ServerStackIcon':
        return <ServerStackIcon className="h-4 w-4 mr-2" />;
      case 'CodeBracketIcon':
        return <CodeBracketIcon className="h-4 w-4 mr-2" />;
      case 'BoltIcon':
        return <BoltIcon className="h-4 w-4 mr-2" />;
      case 'ShieldCheckIcon':
        return <ShieldCheckIcon className="h-4 w-4 mr-2" />;
      case 'UserIcon':
        return <UserIcon className="h-4 w-4 mr-2" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
      <div className="space-y-2">
        {quickLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 p-2 hover:bg-gray-50 rounded transition-colors duration-150"
          >
            {getIcon(link.icon)}
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}