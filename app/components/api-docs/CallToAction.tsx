// components/CallToAction.tsx
export default function CallToAction() {
  return (
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
  );
}