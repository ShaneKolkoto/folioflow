export default function CTASection() {
  return (
    <section id="cta" className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Power Your CV with API?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
            Start building your CV and get instant API access to your data.
          </p>
          
          {/* API Example */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400">API Example</span>
              </div>
              <div className="p-6">
                <code className="text-blue-300 text-sm">
                  <span className="text-green-400">GET</span>{' '}
                  <span className="text-white">https://api.folioflow.com/v1/cv</span>
                  <br />
                  <span className="text-gray-400">Authorization: Bearer YOUR_API_KEY</span>
                  <br /><br />
                  <span className="text-green-400">{'{'}</span>
                  <br />
                  <span className="text-gray-400 ml-4">&quot;success&quot;: </span>
                  <span className="text-blue-300">true</span>,
                  <br />
                  <span className="text-gray-400 ml-4">&quot;data&quot;: </span>
                  <span className="text-green-400">{'{'}</span>
                  <br />
                  <span className="text-gray-400 ml-8">&quot;name&quot;: </span>
                  <span className="text-yellow-300">&quot;John Doe&quot;</span>,
                  <br />
                  <span className="text-gray-400 ml-8">&quot;title&quot;: </span>
                  <span className="text-yellow-300">&quot;Senior Developer&quot;</span>,
                  <br />
                  <span className="text-gray-400 ml-8">&quot;experience&quot;: </span>
                  <span className="text-blue-300">[...]</span>
                  <br />
                  <span className="text-gray-400 ml-4">{"}"}</span>
                  <br />
                  <span className="text-green-400">{"}"}</span>
                </code>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/create-account"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/api-docs"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-lg font-medium text-white hover:bg-white/10 transition-colors"
            >
              Read API Documentation
            </a>
          </div>
          
          <p className="mt-8 text-blue-200">
            No credit card required • Pinky promise! 
          </p>
        </div>
      </div>
    </section>
  );
}