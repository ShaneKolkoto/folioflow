// components/APIDocsContent.tsx
'use client';

import ApiDocHeader from './ApiDocHeader';
import ApiDocsSidebar from './ApiDocSideBar';
import EndpointDetail from './EndpointDetail';
import AuthenticationSection from './sections/AuthenticationSection';
import DataSchemaSection from './sections/DataSchemaSection';
import RateLimitingSection from './sections/RateLimitingSection';
import ErrorCodesSection from './sections/ErrorCodesSection';
import CallToAction from './CallToAction';

export default function APIDocsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <ApiDocHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <ApiDocsSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Selected Endpoint Details */}
          <EndpointDetail />

          {/* Authentication Section */}
          <AuthenticationSection />

          {/* Data Schema Section */}
          <DataSchemaSection />

          {/* Rate Limiting Section */}
          <RateLimitingSection />

          {/* Error Codes */}
          <ErrorCodesSection />
        </div>
      </div>

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}