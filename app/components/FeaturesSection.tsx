import { 
  CloudArrowUpIcon, 
  CodeBracketIcon, 
  DocumentArrowDownIcon, 
  LockClosedIcon,
  CpuChipIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Persistent CV Storage',
    description: 'Your CV data is securely stored in the cloud. Access it from anywhere, anytime.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'API Access',
    description: 'Get a personal API key to fetch your CV data programmatically for integrations.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Multiple Export Formats',
    description: 'Export your CV as PDF, DOCX, JSON, or XML with professional templates.',
    icon: DocumentArrowDownIcon,
  },
  {
    name: 'Secure & Private',
    description: 'Your data is encrypted and private. You control who can access your information.',
    icon: LockClosedIcon,
  },
  {
    name: 'Real-time Updates',
    description: 'Update your CV once and see changes reflected across all exports and API responses.',
    icon: CpuChipIcon,
  },
  {
    name: 'Easy Sharing',
    description: 'Share a public link to your CV or integrate it directly into your portfolio.',
    icon: ShareIcon,
  },
];

export default function FeaturesSection() {
  return (
    <section id='features' className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for Your CV
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From creation to distribution, we&apos;ve got you covered with powerful features.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-4 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}