// components/EndpointDetail.tsx
'use client';

import {
  CodeBracketIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { useApiDocs } from '@/contexts/ApiDocsContext';

export default function EndpointDetail() {
  const {
    currentEndpoint,
    copyToClipboard,
    copied,
    getEndpointMethodColor,
  } = useApiDocs();

  const colors = getEndpointMethodColor(currentEndpoint.method);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 gap-1">
        <div>
          <div className="flex items-center">
            <span className={`px-3 py-1 text-sm font-semibold rounded ${colors.bg} ${colors.text}`}>
              {currentEndpoint.method}
            </span>
            <h2 className="ml-4 text-2xl font-bold text-gray-900">
              {currentEndpoint.title}
            </h2>
          </div>
          <p className="mt-2 text-gray-600">
            {currentEndpoint.description}
          </p>
        </div>
       <div className='flex flex-col gap-2'>
         <div className="hidden sm:block">
          <span className="text-sm text-gray-500">Base URL: </span>
          <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://api.folioflow.com</code>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm text-gray-500">Header: </span>
          <code className="text-sm bg-gray-100 px-2 py-1 rounded"><span className='text-xs'>Authorization: Bearer {"<Your API_TOKEN>"}</span></code>
        </div>
       </div>
      </div>

      {/* Endpoint Path */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Endpoint</h3>
        <div className="flex items-center justify-between bg-gray-900 text-gray-100 p-4 rounded-lg">
          <code className="text-sm font-mono">
            <span className="text-green-400">{currentEndpoint.method}</span>{' '}
            <span className="text-blue-300">{currentEndpoint.path}</span>
          </code>
          <button
            onClick={() => copyToClipboard(`https://api.folioflow.com${currentEndpoint.path}`, 'endpoint')}
            className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition-colors"
          >
            {copied === 'endpoint' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Parameters Table */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Parameters</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Parameter</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Required</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentEndpoint.parameters.map((param, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{param.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <code className="bg-gray-100 px-2 py-1 rounded">{param.type}</code>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {param.required ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Required
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        Optional
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Example */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Request Example</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <CodeBracketIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-300">{currentEndpoint.exampleRequest.method} Request</span>
            </div>
            <button
              onClick={() => copyToClipboard(JSON.stringify(currentEndpoint.exampleRequest, null, 2), 'request')}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
            >
              {copied === 'request' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono">
              {JSON.stringify(currentEndpoint.exampleRequest, null, 2)}
            </code>
          </pre>
        </div>
      </div>

      {/* Response Example */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Response Example</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-300">Response</span>
            </div>
            <button
              onClick={() => copyToClipboard(JSON.stringify(currentEndpoint.exampleResponse, null, 2), 'response')}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
            >
              {copied === 'response' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono">
              {JSON.stringify(currentEndpoint.exampleResponse, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}