'use client';

import {
  UserCircleIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  WrenchIcon,
  GlobeAltIcon,
  TrophyIcon,
  LinkIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface CVSectionsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  cvData: any;
}

const sections = [
  {
    id: 'userInfo',
    name: 'Personal Info',
    icon: UserCircleIcon,
    description: 'Name, contact, summary',
    fields: ['name', 'email', 'title', 'phone', 'location', 'summary'],
  },
  {
    id: 'workExperience',
    name: 'Work Experience',
    icon: BriefcaseIcon,
    description: 'Jobs, positions, responsibilities',
    fields: ['companies', 'positions', 'dates', 'descriptions'],
  },
  {
    id: 'education',
    name: 'Education',
    icon: AcademicCapIcon,
    description: 'Degrees, institutions, dates',
    fields: ['degrees', 'institutions', 'dates', 'grades'],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: WrenchIcon,
    description: 'Technical, soft skills, languages',
    fields: ['technical', 'soft', 'languages'],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: StarIcon,
    description: 'Personal and professional projects',
    fields: ['projects', 'technologies', 'descriptions'],
  },
  {
    id: 'certifications',
    name: 'Certifications',
    icon: TrophyIcon,
    description: 'Certificates and achievements',
    fields: ['certificates', 'issuers', 'dates'],
  },
  {
    id: 'socialLinks',
    name: 'Social Links',
    icon: LinkIcon,
    description: 'LinkedIn, GitHub, portfolio',
    fields: ['linkdin', 'github', 'medium', 'portfolio', 'instagram', 'facebook'],
  },
  {
    id: 'achievements',
    name: 'Achievements',
    icon: GlobeAltIcon,
    description: 'Awards, publications, speaking',
    fields: ['awards', 'publications', 'talks'],
  },
];

export default function CVSections({ activeSection, onSectionChange, cvData }: CVSectionsProps) {
  const getSectionProgress = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section || !cvData) return 0;
    
    const sectionData = cvData[sectionId];
    if (!sectionData) return 0;
    
    // Calculate completion percentage based on filled fields
    let filledFields = 0;
    let totalFields = 0;
    
    section.fields.forEach(field => {
      totalFields++;
      if (sectionId === 'skills' && typeof sectionData === 'object') {
        if (sectionData[field] && Array.isArray(sectionData[field]) && sectionData[field].length > 0) {
          filledFields++;
        }
      } else if (Array.isArray(sectionData)) {
        if (sectionData.length > 0) filledFields++;
      } else if (typeof sectionData === 'object' && sectionData[field]) {
        if (Array.isArray(sectionData[field]) ? sectionData[field].length > 0 : sectionData[field].toString().trim() !== '') {
          filledFields++;
        }
      }
    });
    
    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">CV Sections</h2>
        <p className="text-sm text-gray-600 mt-1">Complete all sections for a perfect CV</p>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const progress = getSectionProgress(section.id);
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    isActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        isActive ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {section.name}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        progress === 100
                          ? 'bg-green-100 text-green-800'
                          : progress > 50
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {progress}%
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-1">
                      {section.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            progress === 100
                              ? 'bg-green-500'
                              : progress > 50
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Overall Progress */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">Overall Progress</h4>
            <span className="text-sm font-bold text-blue-700">
              {Math.round(
                sections.reduce((acc, section) => acc + getSectionProgress(section.id), 0) / sections.length
              )}%
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ 
                width: `${Math.round(
                  sections.reduce((acc, section) => acc + getSectionProgress(section.id), 0) / sections.length
                )}%` 
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Complete all sections to unlock premium templates
          </p>
        </div>
      </div>
    </div>
  );
}