// context/ApiDocsProvider.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  exampleRequest: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };
  exampleResponse: any;
}

export interface QuickLink {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface ErrorCode {
  status: number;
  code: string;
  description: string;
}

export interface RateLimitTier {
  name: string;
  requests: string;
  description: string;
  color: string;
}

const API_ENDPOINTS: ApiEndpoint[] = [
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

const QUICK_LINKS: QuickLink[] = [
  { id: 'authentication', label: 'Authentication', icon: 'KeyIcon', href: '#authentication' },
  { id: 'schema', label: 'Data Schema', icon: 'DocumentTextIcon', href: '#schema' },
  { id: 'rate-limiting', label: 'Rate Limiting', icon: 'ExclamationTriangleIcon', href: '#rate-limiting' },
  { id: 'error-codes', label: 'Error Codes', icon: 'CodeBracketIcon', href: '#error-codes' },
];

const ERROR_CODES: ErrorCode[] = [
  { status: 400, code: 'BAD_REQUEST', description: 'Missing or invalid parameters' },
  { status: 401, code: 'UNAUTHORIZED', description: 'Invalid or missing API key' },
  { status: 404, code: 'NOT_FOUND', description: 'Portfolio or user not found' },
  { status: 429, code: 'RATE_LIMITED', description: 'Too many requests' },
  { status: 500, code: 'SERVER_ERROR', description: 'Internal server error' }
];

const RATE_LIMIT_TIERS: RateLimitTier[] = [
  { name: 'Free Tier', requests: '1,000', description: 'requests/day', color: 'green' },
  { name: 'Pro Tier', requests: '10,000', description: 'requests/day', color: 'blue' },
  { name: 'Enterprise', requests: 'Unlimited', description: 'custom limits', color: 'purple' }
];

const SCHEMA_EXAMPLE = `// Complete Portfolio Schema
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
}`;

interface ApiDocsContextType {
  // State
  activeEndpoint: number;
  copied: string | null;
  
  // Data
  endpoints: typeof API_ENDPOINTS;
  quickLinks: typeof QUICK_LINKS;
  errorCodes: typeof ERROR_CODES;
  rateLimitTiers: typeof RATE_LIMIT_TIERS;
  schemaExample: string;
  
  // Functions
  setActiveEndpoint: (index: number) => void;
  copyToClipboard: (text: string, id: string) => void;
  getEndpointMethodColor: (method: string) => { bg: string; text: string };
  
  // Computed
  currentEndpoint: ApiEndpoint;
}

const ApiDocsContext = createContext<ApiDocsContextType | undefined>(undefined);

export function ApiDocsProvider({ children }: { children: React.ReactNode }) {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  const getEndpointMethodColor = useCallback((method: string) => {
    switch (method) {
      case 'GET': return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'POST': return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'PUT': return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'DELETE': return { bg: 'bg-red-100', text: 'text-red-800' };
      default: return { bg: 'bg-purple-100', text: 'text-purple-800' };
    }
  }, []);

  const currentEndpoint = API_ENDPOINTS[activeEndpoint];

  const value: ApiDocsContextType = {
    // State
    activeEndpoint,
    copied,
    
    // Data
    endpoints: API_ENDPOINTS,
    quickLinks: QUICK_LINKS,
    errorCodes: ERROR_CODES,
    rateLimitTiers: RATE_LIMIT_TIERS,
    schemaExample: SCHEMA_EXAMPLE,
    
    // Functions
    setActiveEndpoint,
    copyToClipboard,
    getEndpointMethodColor,
    
    // Computed
    currentEndpoint,
  };

  return (
    <ApiDocsContext.Provider value={value}>
      {children}
    </ApiDocsContext.Provider>
  );
}

export function useApiDocs() {
  const context = useContext(ApiDocsContext);
  if (context === undefined) {
    throw new Error('useApiDocs must be used within an ApiDocsProvider');
  }
  return context;
}