// components/ApiDocsSidebar.tsx
'use client';

import { ServerStackIcon } from '@heroicons/react/24/outline';
import { useApiDocs } from '@/contexts/ApiDocsContext';
import QuickLinks from './QuickLinks';

export default function ApiDocsSidebar() {
  const {
    endpoints,
    activeEndpoint,
    setActiveEndpoint,
    getEndpointMethodColor,
  } = useApiDocs();

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ServerStackIcon className="h-5 w-5 mr-2" />
        API Endpoints
      </h2>
      <div className="space-y-2">
        {endpoints.map((endpoint, index) => {
          const colors = getEndpointMethodColor(endpoint.method);
          return (
            <button
              key={index}
              onClick={() => setActiveEndpoint(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-150 ${
                activeEndpoint === index
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${colors.bg} ${colors.text}`}>
                    {endpoint.method}
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-900 truncate">
                    {endpoint.path}
                  </span>
                </div>
                {activeEndpoint === index && (
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {endpoint.title}
              </p>
            </button>
          );
        })}
      </div>

      <QuickLinks />
    </div>
  );
}