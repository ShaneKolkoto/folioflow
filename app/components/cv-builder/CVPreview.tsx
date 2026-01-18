'use client';

import { useState } from 'react';
import { 
  UserCircleIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  TrophyIcon,
  DocumentTextIcon,
  LinkIcon,
  StarIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  CheckBadgeIcon,
  ArrowDownTrayIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

interface CVPreviewProps {
  cvData: any;
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('userInfo');
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('blue');
  console.log(cvData, 'cvData')
  if (!cvData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No CV Data</h3>
        <p className="text-gray-500">Start building your CV using the editor</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getColorClasses = () => {
    switch (colorScheme) {
      case 'blue': return 'from-blue-600 to-blue-800 text-blue-600 border-blue-600';
      case 'green': return 'from-green-600 to-green-800 text-green-600 border-green-600';
      case 'purple': return 'from-purple-600 to-purple-800 text-purple-600 border-purple-600';
      case 'gray': return 'from-gray-700 to-gray-900 text-gray-600 border-gray-600';
      default: return 'from-blue-600 to-blue-800 text-blue-600 border-blue-600';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'medium': return 'text-base';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const handleDownloadPDF = () => {
    // PDF generation logic would go here
    alert('PDF download functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  const colorClasses = getColorClasses();
  const fontSizeClass = getFontSizeClass();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Preview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CV Preview</h2>
          <p className="text-gray-600">See how your CV will look to employers</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Template:</label>
            <select 
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="professional">Professional</option>
              <option value="modern">Modern</option>
              <option value="creative">Creative</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Font:</label>
            <select 
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Color:</label>
            <div className="flex space-x-1">
              {['blue', 'green', 'purple', 'gray'].map((color) => (
                <button
                  key={color}
                  onClick={() => setColorScheme(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    colorScheme === color 
                      ? 'border-gray-400' 
                      : 'border-transparent'
                  }`}
                  style={{ 
                    backgroundColor: color === 'gray' ? '#4B5563' : 
                                   color === 'blue' ? '#2563EB' : 
                                   color === 'green' ? '#059669' : 
                                   '#7C3AED' 
                  }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <PrinterIcon className="h-4 w-4 mr-2" />
          Print
        </button>
      </div>

      {/* CV Preview Content */}
      <div className={`${fontSizeClass} bg-white border border-gray-200 rounded-lg shadow-sm p-8`}>
        {/* Header with Personal Info */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {cvData?.photoURL ? (
              <img 
                src={cvData.photoURL} 
                alt={cvData?.name || 'Profile'}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <UserCircleIcon className="h-20 w-20 text-gray-400" />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {cvData.name || 'Your Name'}
              </h1>
              <div className={`text-xl font-semibold bg-gradient-to-r bg-clip-text text-transparent ${colorClasses.split(' ').slice(0, 2).join(' ')}`}>
                {cvData?.title || 'Professional Title'}
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-3">
                {cvData.email && (
                  <div className="flex items-center text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    <span>{cvData.email}</span>
                  </div>
                )}
                {cvData?.phone && (
                  <div className="flex items-center text-gray-600">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    <span>{cvData.phone}</span>
                  </div>
                )}
                {cvData?.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span>{cvData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {cvData?.bio && (
            <div className="mt-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
              <p className="text-gray-700 leading-relaxed">{cvData.bio}</p>
            </div>
          )}
        </div>

        {/* Work Experience */}
        {cvData.workExperience && cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <BriefcaseIcon className={`h-6 w-6 mr-3 ${colorClasses.split(' ')[2]}`} />
              <h2 className={`text-2xl font-bold ${colorClasses.split(' ')[2]}`}>Work Experience</h2>
            </div>
            
            <div className="space-y-6">
              {cvData.workExperience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-4 ml-2" style={{ borderColor: colorScheme === 'blue' ? '#2563EB' : colorScheme === 'green' ? '#059669' : colorScheme === 'purple' ? '#7C3AED' : '#4B5563' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium mb-2">{exp.company}</div>
                  {exp.location && (
                    <div className="text-gray-600 text-sm mb-3">{exp.location}</div>
                  )}
                  {exp.description && (
                    <div className="text-gray-700">
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <div key={i} className="flex items-start mb-1">
                          <div className="mr-2 mt-2 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          </div>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-column layout for Education, Skills, etc. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Education */}
            {cvData.education && cvData.education.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <AcademicCapIcon className={`h-6 w-6 mr-3 ${colorClasses.split(' ')[2]}`} />
                  <h2 className={`text-xl font-bold ${colorClasses.split(' ')[2]}`}>Education</h2>
                </div>
                
                <div className="space-y-4">
                  {cvData.education.map((edu: any, index: number) => (
                    <div key={index} className="pb-3">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <div className="text-gray-700">{edu.institution}</div>
                      {edu.field && (
                        <div className="text-gray-600 text-sm">{edu.field}</div>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-gray-600 text-sm">
                          {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </div>
                        {edu.gpa && (
                          <div className="text-sm font-medium text-gray-700">
                            GPA: {edu.gpa}/{edu.gpaScale || '4.0'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(cvData.skills?.technical?.length > 0 || cvData.skills?.soft?.length > 0) && (
              <div>
                <div className="flex items-center mb-4">
                  <StarIcon className={`h-6 w-6 mr-3 ${colorClasses.split(' ')[2]}`} />
                  <h2 className={`text-xl font-bold ${colorClasses.split(' ')[2]}`}>Skills</h2>
                </div>
                
                <div className="space-y-4">
                  {cvData.skills.technical && cvData.skills.technical.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.technical.map((skill: any, index: number) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {cvData.skills.soft && cvData.skills.soft.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Soft Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.soft.map((skill: any, index: number) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Projects */}
            {cvData.projects && cvData.projects.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <CodeBracketIcon className={`h-6 w-6 mr-3 ${colorClasses.split(' ')[2]}`} />
                  <h2 className={`text-xl font-bold ${colorClasses.split(' ')[2]}`}>Projects</h2>
                </div>
                
                <div className="space-y-4">
                  {cvData.projects.map((project: any, index: number) => (
                    <div key={index} className="pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-gray-700 text-sm">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.technologies.map((tech: string, i: number) => (
                            <span 
                              key={i}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {cvData.certifications && cvData.certifications.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <CheckBadgeIcon className={`h-6 w-6 mr-3 ${colorClasses.split(' ')[2]}`} />
                  <h2 className={`text-xl font-bold ${colorClasses.split(' ')[2]}`}>Certifications</h2>
                </div>
                
                <div className="space-y-3">
                  {cvData.certifications.map((cert: any, index: number) => (
                    <div key={index} className="pb-2">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <div className="text-gray-700 text-sm">{cert.issuer}</div>
                      <div className="text-gray-600 text-xs">
                        Issued {formatDate(cert.issueDate)}
                        {cert.expiryDate && ` • Expires ${formatDate(cert.expiryDate)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {cvData.achievements && cvData.achievements.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <TrophyIcon className={`h-6 w-6 mr-3 ${colorClasses.split(' ')[2]}`} />
                  <h2 className={`text-xl font-bold ${colorClasses.split(' ')[2]}`}>Achievements</h2>
                </div>
                
                <div className="space-y-3">
                  {cvData.achievements.map((achievement: any, index: number) => (
                    <div key={index} className="pb-2">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <div className="text-gray-700 text-sm">{achievement.issuer}</div>
                      <div className="text-gray-600 text-xs">
                        {formatDate(achievement.date)}
                      </div>
                      {achievement.description && (
                        <p className="text-gray-700 text-sm mt-1">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {cvData.socialLinks && (
              <div>
                <h2 className={`text-xl font-bold mb-3 ${colorClasses.split(' ')[2]}`}>Connect</h2>
                <div className="flex space-x-4">
                  {cvData.socialLinks.linkedin && (
                    <a 
                      href={cvData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700"
                      title="LinkedIn"
                    >
                      <span className="font-medium">in</span>
                    </a>
                  )}
                  {cvData.socialLinks.github && (
                    <a 
                      href={cvData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                      title="GitHub"
                    >
                      <span className="font-medium">gh</span>
                    </a>
                  )}
                  {cvData.socialLinks.twitter && (
                    <a 
                      href={cvData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400"
                      title="Twitter"
                    >
                      <span className="font-medium">𝕏</span>
                    </a>
                  )}
                  {cvData.socialLinks.website && (
                    <a 
                      href={cvData.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600"
                      title="Website"
                    >
                      <span className="font-medium">🌐</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Generated with CV Builder • Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Print-only elements (hidden on screen) */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}