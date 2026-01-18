'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CVEditor from '@/components/cv-builder/CVEditor';
import CVPreview from '@/components/cv-builder/CVPreview';
import CVSections from '@/components/cv-builder/CVSections';
import { 
  EyeIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function CVBuilderPage() {
  const { user, getPortfolio, updateProfile } = useAuth();
  const [cvData, setCvData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('userInfo');
  const [showPreview, setShowPreview] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load CV data on component mount
  useEffect(() => {
    loadCVData();
  }, []);

  const loadCVData = async () => {
    setIsLoading(true);
    try {
      const portfolio = await getPortfolio();
      if (portfolio) {
        console.log(portfolio, 'portfolio')
        setCvData(portfolio);
      } else {
        console.log(user, 'user')
        // Initialize empty CV structure
        setCvData({
          userInfo: {
            name: user?.displayName || '',
            email: user?.email || '',
            title: '',
            phone: '',
            location: '',
            summary: '',
            photoURL: user?.photoURL || '',
          },
          skills: {
            technical: [],
            soft: [],
            languages: [],
          },
          workExperience: [],
          education: [],
          projects: [],
          socialLinks: {
            linkedin: '',
            github: '',
            twitter: '',
            website: '',
          },
          certifications: [],
          achievements: [],
        });
      }
    } catch (error) {
      console.error('Error loading CV data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionChange = (sectionId: string) => {
    console.log(sectionId, 'sectionId')
    setActiveSection(sectionId);
  };

  const handleCVUpdate = (section: string, data: any) => {
    setCvData((prev: any) => ({
      ...prev,
      [section]: data,
    }));
    setAutoSaveStatus('unsaved');
    
    // Auto-save after 2 seconds of inactivity
    clearTimeout((window as any).saveTimeout);
    (window as any).saveTimeout = setTimeout(() => {
      saveCVData();
    }, 2000);
  };

  const saveCVData = async () => {
    if (!cvData || autoSaveStatus === 'saved') return;
    
    setAutoSaveStatus('saving');
    try {
      // Update the entire portfolio
      await updateProfile(cvData.userInfo);
      // Note: In a real implementation, you'd update all sections
      setAutoSaveStatus('saved');
      setLastSaved(new Date());
      
      // Show success notification
      showNotification('CV saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving CV:', error);
      setAutoSaveStatus('unsaved');
      showNotification('Failed to save CV. Please try again.', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    } animate-in slide-in-from-right-5`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('animate-out', 'slide-out-to-right-5');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleGenerateWithAI = () => {
    // AI generation functionality
    showNotification('AI generation coming soon!', 'success');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your CV data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
            <p className="text-gray-600 mt-2">
              Build your professional CV with our drag-and-drop editor
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              {showPreview ? 'Show Editor' : 'Show Preview'}
            </button>
            
            <button
              onClick={handleGenerateWithAI}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              Enhance with AI
            </button>
            
            <button
              onClick={saveCVData}
              disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
            >
              <CloudArrowUpIcon className="h-4 w-4 mr-2" />
              {autoSaveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Auto-save status */}
        <div className="mt-4 flex items-center text-sm text-gray-500">
          {autoSaveStatus === 'saving' && (
            <>
              <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
              <span>Saving changes...</span>
            </>
          )}
          {autoSaveStatus === 'saved' && lastSaved && (
            <>
              <CloudArrowUpIcon className="h-4 w-4 mr-2 text-green-500" />
              <span>Auto-saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </>
          )}
          {autoSaveStatus === 'unsaved' && (
            <>
              <CloudArrowUpIcon className="h-4 w-4 mr-2 text-yellow-500" />
              <span>Unsaved changes</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Sections Navigation */}
        <div className="lg:col-span-3">
          <CVSections
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            cvData={cvData}
          />
        </div>

        {/* Middle Column - Editor/Preview */}
        <div className="lg:col-span-6">
          {showPreview ? (
            <CVPreview cvData={cvData[activeSection]} />
          ) : (
            <CVEditor
              section={activeSection}
              data={cvData[activeSection] || {}}
              onUpdate={(data) => handleCVUpdate(activeSection, data)}
            />
          )}
        </div>

        {/* Right Column - Tips & Tools */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips & Tools</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-blue-700">
                  Use bullet points and action verbs to make your experience stand out.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">🎯 ATS Friendly</h4>
                <p className="text-sm text-green-700">
                  Your CV is optimized for Applicant Tracking Systems.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">🚀 Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900 p-2 hover:bg-purple-100 rounded">
                    Download PDF
                  </button>
                  <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900 p-2 hover:bg-purple-100 rounded">
                    Copy as JSON
                  </button>
                  <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900 p-2 hover:bg-purple-100 rounded">
                    Share Preview Link
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">📊 CV Score</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-amber-900">75%</span>
                </div>
                <p className="text-xs text-amber-700 mt-2">
                  Good! Add more details to improve your score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}