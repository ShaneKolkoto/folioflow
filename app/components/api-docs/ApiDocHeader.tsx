import { 
  CheckCircleIcon, 
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function ApiDocHeader() {
  return (
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
  );
}