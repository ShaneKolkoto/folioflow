'use client';

import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface SectionContactProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionContact({ ref }: SectionContactProps) {
  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      details: "privacy@folioflow.com",
      link: "mailto:privacy@folioflow.com",
      color: "from-blue-500 to-blue-600",
      description: "For privacy-related inquiries"
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "from-green-500 to-green-600",
      description: "Mon-Fri, 9AM-5PM PST"
    },
    {
      icon: MapPinIcon,
      title: "Address",
      details: "123 Tech Street",
      subdetails: "San Francisco, CA 94107",
      color: "from-purple-500 to-purple-600",
      description: "Our headquarters"
    }
  ];

  const responseTimes = [
    { type: "General Inquiries", time: "Within 24 hours", color: "bg-green-100 text-green-800" },
    { type: "Privacy Requests", time: "Within 48 hours", color: "bg-blue-100 text-blue-800" },
    { type: "Data Breach Reports", time: "Immediately", color: "bg-red-100 text-red-800" },
    { type: "Legal Requests", time: "Within 5 business days", color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center mr-4">
            <EnvelopeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">13. Contact Us</h2>
            <p className="text-gray-600">Get in touch with our privacy team</p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="block p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 text-center group transition-all"
            >
              <div className={`h-14 w-14 rounded-xl bg-linear-to-br ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
              <div className="text-gray-700 font-medium mb-1">{method.details}</div>
              {method.subdetails && (
                <div className="text-gray-600 text-sm">{method.subdetails}</div>
              )}
              <div className="text-sm text-gray-500 mt-2">{method.description}</div>
            </motion.a>
          ))}
        </div>

        {/* Response Times */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
            Expected Response Times
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {responseTimes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="text-sm font-medium text-gray-900 mb-2">{item.type}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Protection Officer */}
        <div className="mb-8 p-6 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <h3 className="font-semibold text-indigo-800 mb-3">Data Protection Officer</h3>
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-4">
              <span className="text-white font-bold">DPO</span>
            </div>
            <div>
              <p className="text-sm text-indigo-700 mb-2">
                Our Data Protection Officer oversees all privacy matters and ensures compliance with data protection regulations.
              </p>
              <div className="flex items-center text-sm text-indigo-600">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <a href="mailto:dpo@folioflow.com" className="font-medium hover:underline">
                  dpo@folioflow.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Documents */}
        <div className="p-5 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/terms"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                  <DocumentTextIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Terms of Service</div>
                  <div className="text-sm text-gray-500">Our terms and conditions</div>
                </div>
              </div>
            </Link>
            
            <Link
              href="/cookies"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mr-3">
                  <LinkIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-green-600">Cookie Policy</div>
                  <div className="text-sm text-gray-500">How we use cookies</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-5 bg-linear-to-r from-red-50 to-orange-50 rounded-xl border border-red-200"
        >
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Emergency Contact</h4>
              <p className="text-sm text-red-700 mb-2">
                For urgent privacy matters, including suspected data breaches, contact us immediately at:
              </p>
              <div className="flex items-center space-x-4">
                <a href="mailto:security@folioflow.com" className="text-red-600 font-semibold hover:underline">
                  security@folioflow.com
                </a>
                <span className="text-gray-400">•</span>
                <a href="tel:+15551234567" className="text-red-600 font-semibold hover:underline">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}