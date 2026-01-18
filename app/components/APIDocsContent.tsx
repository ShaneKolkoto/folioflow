'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  ServerStackIcon,
  KeyIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const APIEndpoints = [
  {
    method: 'POST',
    path: '/api/portfolio',
    title: 'Create or Update Portfolio',
    description: 'Create a new portfolio or update existing one for a user',
    parameters: [
      { name: 'userId', type: 'string', required: true, description: 'Unique user identifier' },
      { name: 'portfolioData', type: 'object', required: true, description: 'Portfolio data following schema' }
    ],
    exampleRequest: {
      method: 'POST',
      url: 'https://api.folioflow.com/api/portfolio',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: {
        userId: 'user_12345',
        userInfo: {
          name: 'John Doe',
          title: 'Senior Developer',
          email: 'john@example.com',
          phone: '+1234567890',
          location: 'San Francisco, CA'
        },
        skills: {
          technical: ['React', 'Node.js', 'TypeScript'],
          soft: ['Leadership', 'Communication'],
          languages: ['English', 'Spanish']
        }
      }
    },
    exampleResponse: {
      success: true,
      message: "Portfolio saved successfully",
      userId: "user_12345"
    }
  },
  {
    method: 'GET',
    path: '/api/portfolio/:userId',
    title: 'Get Portfolio',
    description: 'Retrieve complete portfolio data for a user',
    parameters: [
      { name: 'userId', type: 'string', required: true, description: 'User ID to fetch portfolio for' }
    ],
    exampleRequest: {
      method: 'GET',
      url: 'https://api.folioflow.com/api/portfolio/user_12345',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    },
    exampleResponse: {
      userId: "user_12345",
      exists: true,
      userInfo: {
        name: 'John Doe',
        title: 'Senior Developer',
        email: 'john@example.com'
      },
      skills: {
        technical: ['React', 'Node.js', 'TypeScript'],
        soft: ['Leadership', 'Communication'],
        languages: ['English', 'Spanish']
      },
      workExperience: [
        {
          company: 'Tech Corp',
          position: 'Senior Developer',
          startDate: '2020-01-01',
          endDate: '2023-12-31',
          description: 'Led development team'
        }
      ]
    }
  },
  {
    method: 'PUT',
    path: '/api/portfolio/section',
    title: 'Update Section',
    description: 'Update a specific section of the portfolio',
    parameters: [
      { name: 'userId', type: 'string', required: true, description: 'User ID' },
      { name: 'section', type: 'string', required: true, description: 'Section name to update (e.g., "skills", "workExperience")' },
      { name: 'data', type: 'any', required: true, description: 'New data for the section' }
    ],
    exampleRequest: {
      method: 'PUT',
      url: 'https://api.folioflow.com/api/portfolio/section',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: {
        userId: 'user_12345',
        section: 'skills',
        data: {
          technical: ['React', 'Node.js', 'TypeScript', 'AWS'],
          soft: ['Leadership', 'Communication', 'Problem Solving'],
          languages: ['English', 'Spanish', 'French']
        }
      }
    },
    exampleResponse: {
      success: true,
      message: "skills updated successfully"
    }
  },
  {
    method: 'POST',
    path: '/api/portfolio/item',
    title: 'Add Item to Section',
    description: 'Add a single item to an array section (e.g., add experience, project)',
    parameters: [
      { name: 'userId', type: 'string', required: true, description: 'User ID' },
      { name: 'section', type: 'string', required: true, description: 'Array section name (e.g., "workExperience", "projects")' },
      { name: 'item', type: 'object', required: true, description: 'Item to add to the array' }
    ],
    exampleRequest: {
      method: 'POST',
      url: 'https://api.folioflow.com/api/portfolio/item',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: {
        userId: 'user_12345',
        section: 'workExperience',
        item: {
          company: 'New Startup',
          position: 'Lead Developer',
          startDate: '2024-01-01',
          current: true,
          description: 'Building new product from scratch'
        }
      }
    },
    exampleResponse: {
      success: true,
      message: "Item added to workExperience"
    }
  },
  {
    method: 'GET',
    path: '/api/portfolio/:userId/section/:section',
    title: 'Get Specific Section',
    description: 'Retrieve only a specific section of the portfolio',
    parameters: [
      { name: 'userId', type: 'string', required: true, description: 'User ID' },
      { name: 'section', type: 'string', required: true, description: 'Section name (e.g., "skills.technical", "workExperience")' }
    ],
    exampleRequest: {
      method: 'GET',
      url: 'https://api.folioflow.com/api/portfolio/user_12345/section/skills.technical',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    },
    exampleResponse: {
      "skills.technical": ['React', 'Node.js', 'TypeScript', 'AWS']
    }
  }
];


export default function APIDocsContent() {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          API Documentation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete reference for FolioFlow Portfolio API. Build, manage, and fetch CV data programmatically.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span>RESTful API</span>
          </div>
          <div className="flex items-center text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            <ShieldCheckIcon className="h-5 w-5 mr-2" />
            <span>Authentication Required</span>
          </div>
          <div className="flex items-center text-purple-600 bg-purple-50 px-4 py-2 rounded-lg">
            <BoltIcon className="h-5 w-5 mr-2" />
            <span>Real-time Updates</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Endpoints */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ServerStackIcon className="h-5 w-5 mr-2" />
              API Endpoints
            </h2>
            <div className="space-y-2">
              {APIEndpoints.map((endpoint, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEndpoint(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeEndpoint === index
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
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
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a href="#authentication" className="flex items-center text-sm text-gray-600 hover:text-blue-600 p-2 hover:bg-gray-50 rounded">
                  <KeyIcon className="h-4 w-4 mr-2" />
                  Authentication
                </a>
                <a href="#schema" className="flex items-center text-sm text-gray-600 hover:text-blue-600 p-2 hover:bg-gray-50 rounded">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Data Schema
                </a>
                <a href="#rate-limiting" className="flex items-center text-sm text-gray-600 hover:text-blue-600 p-2 hover:bg-gray-50 rounded">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  Rate Limiting
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Selected Endpoint Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 text-sm font-semibold rounded ${
                    APIEndpoints[activeEndpoint].method === 'GET' ? 'bg-green-100 text-green-800' :
                    APIEndpoints[activeEndpoint].method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    APIEndpoints[activeEndpoint].method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {APIEndpoints[activeEndpoint].method}
                  </span>
                  <h2 className="ml-4 text-2xl font-bold text-gray-900">
                    {APIEndpoints[activeEndpoint].title}
                  </h2>
                </div>
                <p className="mt-2 text-gray-600">
                  {APIEndpoints[activeEndpoint].description}
                </p>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm text-gray-500">Base URL: </span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://api.folioflow.com</code>
              </div>
            </div>

            {/* Endpoint Path */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Endpoint</h3>
              <div className="flex items-center justify-between bg-gray-900 text-gray-100 p-4 rounded-lg">
                <code className="text-sm font-mono">
                  <span className="text-green-400">{APIEndpoints[activeEndpoint].method}</span>{' '}
                  <span className="text-blue-300">{APIEndpoints[activeEndpoint].path}</span>
                </code>
                <button
                  onClick={() => copyToClipboard(`https://api.folioflow.com${APIEndpoints[activeEndpoint].path}`, 'endpoint')}
                  className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
                >
                  {copied === 'endpoint' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Parameters */}
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
                    {APIEndpoints[activeEndpoint].parameters.map((param, idx) => (
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
                    <span className="text-sm text-gray-300">{APIEndpoints[activeEndpoint].exampleRequest.method} Request</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(APIEndpoints[activeEndpoint].exampleRequest, null, 2), 'request')}
                    className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                  >
                    {copied === 'request' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300 font-mono">
                    {JSON.stringify(APIEndpoints[activeEndpoint].exampleRequest, null, 2)}
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
                    onClick={() => copyToClipboard(JSON.stringify(APIEndpoints[activeEndpoint].exampleResponse, null, 2), 'response')}
                    className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                  >
                    {copied === 'response' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300 font-mono">
                    {JSON.stringify(APIEndpoints[activeEndpoint].exampleResponse, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Authentication Section */}
          <div id="authentication" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
          </div>

          {/* Data Schema Section */}
          <div id="schema" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Schema</h2>
            <p className="text-gray-600 mb-6">
              The portfolio data follows this structure. All fields are optional and will be filled with default values if not provided.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>
{`// Complete Portfolio Schema
{
  userInfo: {
    name: string,
    title: string,
    email: string,
    phone: string,
    location: string,
    summary: string
  },
  skills: {
    technical: string[],    // e.g., ["React", "Node.js"]
    soft: string[],        // e.g., ["Communication", "Leadership"]
    languages: string[]    // e.g., ["English", "Spanish"]
  },
  workExperience: Array<{
    company: string,
    position: string,
    startDate: string,     // ISO 8601 format: "2020-01-01"
    endDate: string|null,  // null for current position
    current: boolean,
    description: string
  }>,
  education: Array<{
    institution: string,
    degree: string,
    field: string,
    graduationYear: number
  }>,
  projects: Array<{
    name: string,
    description: string,
    technologies: string[],
    url: string
  }>,
  certifications: Array<{
    name: string,
    issuer: string,
    date: string,
    url: string
  }>,
  achievements: Array<{
    title: string,
    description: string,
    date: string
  }>,
  socialLinks: {
    linkedin: string,
    github: string,
    twitter: string,
    website: string
  }
}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Rate Limiting Section */}
          <div id="rate-limiting" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limiting</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Free Tier</h3>
                <p className="text-3xl font-bold text-green-900 mb-1">1,000</p>
                <p className="text-sm text-green-700">requests/day</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Pro Tier</h3>
                <p className="text-3xl font-bold text-blue-900 mb-1">10,000</p>
                <p className="text-sm text-blue-700">requests/day</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-purple-900 mb-1">Unlimited</p>
                <p className="text-sm text-purple-700">custom limits</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-900 mb-1">Rate Limit Headers</h4>
                  <p className="text-sm text-yellow-700 mb-2">
                    All responses include rate limit headers:
                  </p>
                  <code className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    X-RateLimit-Limit
                  </code>
                  <code className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">
                    X-RateLimit-Remaining
                  </code>
                  <code className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">
                    X-RateLimit-Reset
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Error Codes */}
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
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        400
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">BAD_REQUEST</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Missing or invalid parameters</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        401
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">UNAUTHORIZED</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Invalid or missing API key</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        404
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">NOT_FOUND</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Portfolio or user not found</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        429
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">RATE_LIMITED</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Too many requests</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        500
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">SERVER_ERROR</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Internal server error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Sign up for free and get your API key in minutes. Start building your portfolio API integration today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/auth/create-account"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Get Your API Key
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-lg font-medium text-white hover:bg-white/10 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}