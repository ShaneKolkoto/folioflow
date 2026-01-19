// components/sections/AuthenticationSection.tsx
'use client';

import { KeyIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function AuthenticationSection() {
  return (
    <section id="authentication" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <KeyIcon className="h-6 w-6 mr-2" />
        Authentication
      </h2>
      <p className="text-gray-600 mb-6">
        All API requests require authentication using Bearer tokens. Get your API key from the dashboard.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Security Note</h4>
            <p className="text-sm text-blue-700">
              Keep your API keys secure. Do not commit them to version control or expose them in client-side code.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4">
        <pre className="text-sm text-gray-300">
          <code>
{`// Example with fetch API
fetch('https://api.folioflow.com/api/portfolio', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

// Example with curl
curl -X GET https://api.folioflow.com/api/portfolio \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
          </code>
        </pre>
      </div>
    </section>
  );
}