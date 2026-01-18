// components/sections/DataSchemaSection.tsx
'use client';

export default function DataSchemaSection() {
  const schemaExample = `// Complete Portfolio Schema
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

  return (
    <div id="schema" className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Schema</h2>
      <p className="text-gray-600 mb-6">
        The portfolio data follows this structure. All fields are optional and will be filled with default values if not provided.
      </p>
      
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300">
          <code>{schemaExample}</code>
        </pre>
      </div>
    </div>
  );
}