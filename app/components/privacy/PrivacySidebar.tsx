'use client';

import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  CircleStackIcon,
  BoltIcon,
  KeyIcon,
  ShieldCheckIcon,
  UsersIcon,
  UserIcon,
  ServerIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BellAlertIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface PrivacySidebarProps {
  activeSection: number;
  isScrolling: boolean;
  onSectionClick: (sectionId: number) => void;
}

export default function PrivacySidebar({ 
  activeSection, 
  isScrolling, 
  onSectionClick 
}: PrivacySidebarProps) {
  const sectionData = [
    { id: 1, title: "Introduction", icon: DocumentTextIcon, color: "from-blue-500 to-blue-600" },
    { id: 2, title: "Information We Collect", icon: CircleStackIcon, color: "from-purple-500 to-purple-600" },
    { id: 3, title: "How We Use Your Information", icon: BoltIcon, color: "from-green-500 to-green-600" },
    { id: 4, title: "API Key Usage and Security", icon: KeyIcon, color: "from-yellow-500 to-yellow-600" },
    { id: 5, title: "Data Storage and Security", icon: ShieldCheckIcon, color: "from-red-500 to-red-600" },
    { id: 6, title: "Data Sharing and Disclosure", icon: UsersIcon, color: "from-pink-500 to-pink-600" },
    { id: 7, title: "Your Rights and Choices", icon: UserIcon, color: "from-indigo-500 to-indigo-600" },
    { id: 8, title: "Data Retention", icon: ServerIcon, color: "from-teal-500 to-teal-600" },
    { id: 9, title: "Third-Party Services", icon: GlobeAltIcon, color: "from-orange-500 to-orange-600" },
    { id: 10, title: "Children's Privacy", icon: UserGroupIcon, color: "from-cyan-500 to-cyan-600" },
    { id: 11, title: "International Data Transfers", icon: GlobeAltIcon, color: "from-lime-500 to-lime-600" },
    { id: 12, title: "Changes to This Policy", icon: BellAlertIcon, color: "from-rose-500 to-rose-600" },
    { id: 13, title: "Contact Us", icon: EnvelopeIcon, color: "from-violet-500 to-violet-600" }
  ];

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="lg:col-span-1"
    >
      <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 mr-2 text-blue-600" />
          Quick Navigation
        </h3>
        <div className="space-y-2">
          {sectionData.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionClick(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              } ${isScrolling ? 'cursor-wait' : ''}`}
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mr-3`}>
                <section.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{section.title}</div>
                <div className="text-xs text-gray-500">Section {section.id}</div>
              </div>
              {activeSection === section.id && (
                <ArrowRightIcon className="h-4 w-4 text-blue-600 ml-2" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}