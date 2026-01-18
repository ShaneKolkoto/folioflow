'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrivacyHeader from '@/components/privacy/PrivacyHeader';
import PrivacySidebar from '@/components/privacy/PrivacySidebar';
import PrivacyProgressBar from '@/components/privacy/PrivacyProgressBar';
import SectionIntroduction, { SectionIntroductionProps } from '@/components/privacy/sections/SectionIntroduction';
import SectionInformationCollect, { SectionInformationCollectProps } from '@/components/privacy/sections/SectionInformationCollect';
import SectionHowWeUseInfo, { SectionHowWeUseInfoProps } from '@/components/privacy/sections/SectionHowWeUseInfo';
import SectionApiSecurity, { SectionApiSecurityProps } from '@/components/privacy/sections/SectionApiSecurity';
import SectionDataStorage, { SectionDataStorageProps } from '@/components/privacy/sections/SectionDataStorage';
import SectionDataSharing, { SectionDataSharingProps } from '@/components/privacy/sections/SectionDataSharing';
import SectionYourRights, { SectionYourRightsProps } from '@/components/privacy/sections/SectionYourRights';
import SectionContact, { SectionContactProps } from '@/components/privacy/sections/SectionContact';

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeSection, setActiveSection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get section title helper
  const getSectionTitle = useCallback((sectionId: number): string => {
    const sections = {
      1: "Introduction",
      2: "Information We Collect",
      3: "How We Use Your Information",
      4: "API Key Usage and Security",
      5: "Data Storage and Security",
      6: "Data Sharing and Disclosure",
      7: "Your Rights and Choices",
      8: "Data Retention",
      9: "Third-Party Services",
      10: "Children's Privacy",
      11: "International Data Transfers",
      12: "Changes to This Policy",
      13: "Contact Us"
    };
    return sections[sectionId as keyof typeof sections] || `Section ${sectionId}`;
  }, []);

  useEffect(() => {
    // Set lastUpdated on mount (not in render)
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    // Use requestAnimationFrame to avoid synchronous state update in effect
    requestAnimationFrame(() => {
      setLastUpdated(currentDate);
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollTop(scrollTop > 300);
      
      // Handle scroll debouncing
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      setIsScrolling(true);
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handleSectionClick = useCallback((sectionId: number) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrevSection = useCallback(() => {
    if (activeSection > 1) {
      setActiveSection(prev => prev - 1);
    }
  }, [activeSection]);

  const handleNextSection = useCallback(() => {
    if (activeSection < 13) {
      setActiveSection(prev => prev + 1);
    }
  }, [activeSection]);

  // Create refs for each section
  const sectionRef = useRef<HTMLDivElement>(null);

  // Render the active section with proper props
  const renderActiveSection = useCallback(() => {
    const commonProps = {
      ref: sectionRef,
      id: `section-${activeSection}`,
      className: "w-full"
    };

    switch(activeSection) {
      case 1:
        return <SectionIntroduction {...commonProps as unknown as SectionIntroductionProps} />;
      case 2:
        return <SectionInformationCollect {...commonProps as unknown as SectionInformationCollectProps} />;
      case 3:
        return <SectionHowWeUseInfo {...commonProps as unknown as SectionHowWeUseInfoProps} />;
      case 4:
        return <SectionApiSecurity {...commonProps as unknown as SectionApiSecurityProps} />;
      case 5:
        return <SectionDataStorage {...commonProps as unknown as SectionDataStorageProps} />;
      case 6:
        return <SectionDataSharing {...commonProps as unknown as SectionDataSharingProps} />;
      case 7:
        return <SectionYourRights {...commonProps as unknown as SectionYourRightsProps} />;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        // You can add more sections as needed
        return (
          <div 
            ref={sectionRef}
            id={`section-${activeSection}`}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {getSectionTitle(activeSection)}
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>Content for this section is currently being developed.</p>
              <p>Please check back soon for updates, or contact us if you need specific information.</p>
            </div>
          </div>
        );
      case 13:
        return <SectionContact {...commonProps as unknown as SectionContactProps} />;
      default:
        return <SectionIntroduction {...commonProps as unknown as SectionIntroductionProps} />;
    }
  }, [activeSection, getSectionTitle]);

  const currentSectionTitle = getSectionTitle(activeSection);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 relative overflow-hidden"
    >
      <PrivacyProgressBar activeSection={activeSection} />
      
      <div className="relative mx-auto px-4 sm:px-6 lg:px-6">
        <PrivacyHeader lastUpdated={lastUpdated} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <PrivacySidebar
            activeSection={activeSection}
            isScrolling={isScrolling}
            onSectionClick={handleSectionClick}
            // getSectionTitle={getSectionTitle}
          />
          
          <div className="lg:col-span-3">
            {/* Active Section Indicator */}
            <motion.div
              key={`section-indicator-${activeSection}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Section {activeSection}
                  </h2>
                  <p className="text-gray-600 text-sm font-bold">
                    {currentSectionTitle}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevSection}
                    disabled={activeSection === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextSection}
                    disabled={activeSection === 13}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === 13
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Active Section Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>

            {/* Section Navigation Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <div className="flex justify-between">
                <button
                  onClick={handlePrevSection}
                  disabled={activeSection === 1}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                    activeSection === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  ← Previous Section
                </button>
                
                <button
                  onClick={handleNextSection}
                  disabled={activeSection === 13}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                    activeSection === 13
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Next Section →
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
}