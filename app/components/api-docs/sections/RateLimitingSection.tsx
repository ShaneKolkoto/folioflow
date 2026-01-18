// components/sections/RateLimitingSection.tsx
'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface RateLimitTier {
  name: string;
  requests: string;
  description: string;
  color: string;
}

export default function RateLimitingSection() {
  const rateLimitTiers: RateLimitTier[] = [
    { name: 'Free Tier', requests: '1,000', description: 'requests/day', color: 'green' },
    { name: 'Pro Tier', requests: '10,000', description: 'requests/day', color: 'blue' },
    { name: 'Enterprise', requests: 'Unlimited', description: 'custom limits', color: 'purple' }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-green-50 to-green-100 border-green-200 text-green-800 font-semibold text-green-900';
      case 'blue':
        return 'from-blue-50 to-blue-100 border-blue-200 text-blue-800 font-semibold text-blue-900';
      case 'purple':
        return 'from-purple-50 to-purple-100 border-purple-200 text-purple-800 font-semibold text-purple-900';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200 text-gray-800 font-semibold text-gray-900';
    }
  };

  return (
    <div id="rate-limiting" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limiting</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {rateLimitTiers.map((tier, index) => {
          const colors = getColorClasses(tier.color);
          const [fromColor, toColor, borderColor, textColor, boldColor] = colors.split(' ');
          
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${fromColor} ${toColor} border ${borderColor} rounded-lg p-4`}
            >
              <h3 className={`${textColor} mb-2`}>{tier.name}</h3>
              <p className={`text-3xl ${boldColor} mb-1`}>{tier.requests}</p>
              <p className={`text-sm ${textColor.replace('800', '700')}`}>{tier.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-900 mb-1">Rate Limit Headers</h4>
            <p className="text-sm text-yellow-700 mb-2">
              All responses include rate limit headers:
            </p>
            <div className="flex flex-wrap gap-2">
              <code className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                X-RateLimit-Limit
              </code>
              <code className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                X-RateLimit-Remaining
              </code>
              <code className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                X-RateLimit-Reset
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}