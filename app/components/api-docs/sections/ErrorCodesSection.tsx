// components/sections/ErrorCodesSection.tsx
'use client';

interface ErrorCode {
  status: number;
  code: string;
  description: string;
}

export default function ErrorCodesSection() {
  const errorCodes: ErrorCode[] = [
    { status: 400, code: 'BAD_REQUEST', description: 'Missing or invalid parameters' },
    { status: 401, code: 'UNAUTHORIZED', description: 'Invalid or missing API key' },
    { status: 404, code: 'NOT_FOUND', description: 'Portfolio or user not found' },
    { status: 429, code: 'RATE_LIMITED', description: 'Too many requests' },
    { status: 500, code: 'SERVER_ERROR', description: 'Internal server error' }
  ];

  const getStatusColor = (status: number) => {
    if (status >= 500) return 'bg-red-100 text-red-800';
    if (status >= 400) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Codes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {errorCodes.map((error, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(error.status)}`}>
                    {error.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{error.code}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{error.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}