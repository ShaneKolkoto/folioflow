// app/cookies/page.tsx
import { ShieldCheckIcon, CircleStackIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
              <CircleStackIcon className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Cookie Policy
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Learn how FolioFlow uses cookies and similar technologies to enhance your experience,
              analyze usage, and improve our services.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <nav className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">On this page</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#what-are-cookies" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        What Are Cookies?
                      </a>
                    </li>
                    <li>
                      <a href="#how-we-use" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        How We Use Cookies
                      </a>
                    </li>
                    <li>
                      <a href="#types-of-cookies" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        Types of Cookies We Use
                      </a>
                    </li>
                    <li>
                      <a href="#third-party" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        Third-Party Cookies
                      </a>
                    </li>
                    <li>
                      <a href="#your-choices" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        Your Cookie Choices
                      </a>
                    </li>
                    <li>
                      <a href="#cookie-duration" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        Cookie Duration
                      </a>
                    </li>
                    <li>
                      <a href="#updates" className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2">
                        Policy Updates
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a href="#manage-cookies" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      <ShieldCheckIcon className="h-5 w-5 mr-2" />
                      Manage Cookie Preferences
                    </a>
                    <p className="text-sm text-gray-600">Control how cookies are used on your account.</p>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-12 lg:mt-0 lg:col-span-8">
            <div className="prose prose-lg prose-blue max-w-none">
              {/* Introduction */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
                <p className="text-lg text-gray-600">
                  This Cookie Policy explains how FolioFlow ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website or use our services. By using FolioFlow, you consent to the use of cookies as described in this policy.
                </p>
              </div>

              {/* Section 1: What Are Cookies */}
              <section id="what-are-cookies" className="scroll-mt-24">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mr-4">
                    <InformationCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">What Are Cookies?</h2>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 mb-6">
                  <p className="text-gray-700">
                    Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Small Text Files</h3>
                    <p className="text-sm text-gray-600">Cookies are tiny pieces of data stored on your device.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Website Memory</h3>
                    <p className="text-sm text-gray-600">They help websites remember your preferences and actions.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Enhanced Experience</h3>
                    <p className="text-sm text-gray-600">Cookies make your browsing experience smoother and more personalized.</p>
                  </div>
                </div>
              </section>

              {/* Section 2: How We Use Cookies */}
              <section id="how-we-use" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Cookies</h2>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Essential Operation",
                        description: "Cookies necessary for the website to function properly, such as maintaining your session and keeping you logged in.",
                        icon: "🔒"
                      },
                      {
                        title: "Performance & Analytics",
                        description: "Cookies that help us understand how visitors interact with our website, allowing us to improve functionality and user experience.",
                        icon: "📊"
                      },
                      {
                        title: "Functionality",
                        description: "Cookies that remember your preferences and settings to provide enhanced, more personalized features.",
                        icon: "⚙️"
                      },
                      {
                        title: "Security",
                        description: "Cookies that help us detect and prevent security threats and malicious activities.",
                        icon: "🛡️"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Types of Cookies */}
              <section id="types-of-cookies" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
                
                <div className="overflow-hidden rounded-xl border border-gray-200 mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Cookie Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Purpose
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          type: "Session Cookies",
                          purpose: "Temporary cookies that expire when you close your browser",
                          duration: "Session"
                        },
                        {
                          type: "Authentication Cookies",
                          purpose: "Keep you logged in and maintain your session",
                          duration: "Up to 30 days"
                        },
                        {
                          type: "Preference Cookies",
                          purpose: "Remember your language, theme, and other settings",
                          duration: "1 year"
                        },
                        {
                          type: "Security Cookies",
                          purpose: "Support security features and detect malicious activity",
                          duration: "Session"
                        },
                        {
                          type: "Analytics Cookies",
                          purpose: "Help us understand how our website is used",
                          duration: "2 years"
                        }
                      ].map((cookie, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{cookie.type}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600">{cookie.purpose}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {cookie.duration}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Third-Party Cookies */}
              <section id="third-party" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
                
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 mb-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-amber-600">⚠️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Important Note</h3>
                      <p className="text-gray-700">
                        Some cookies on our website are set by third-party services we use, such as analytics providers. These third parties have their own privacy policies and may use your information for their own purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      provider: "Google Analytics",
                      purpose: "Website traffic analysis and user behavior",
                      link: "https://policies.google.com/privacy"
                    },
                    {
                      provider: "Stripe",
                      purpose: "Payment processing and fraud prevention",
                      link: "https://stripe.com/privacy"
                    },
                    {
                      provider: "Cloudflare",
                      purpose: "Security and performance optimization",
                      link: "https://www.cloudflare.com/privacypolicy/"
                    },
                    {
                      provider: "Intercom",
                      purpose: "Customer support and communication",
                      link: "https://www.intercom.com/legal/privacy"
                    }
                  ].map((service, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.provider}</h3>
                      <p className="text-sm text-gray-600 mb-3">{service.purpose}</p>
                      <a 
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                      >
                        View Privacy Policy
                        <span className="ml-1">↗</span>
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Your Cookie Choices */}
              <section id="your-choices" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cookie Choices</h2>
                
                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">You Have Control</h3>
                  <p className="text-gray-700 mb-4">
                    You can manage your cookie preferences at any time. However, please note that disabling certain cookies may affect the functionality of our website.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {[
                    {
                      title: "Browser Settings",
                      description: "Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 'Options' or 'Preferences' menu of your browser.",
                      steps: ["Chrome: Settings > Privacy and security > Cookies", "Firefox: Options > Privacy & Security > Cookies", "Safari: Preferences > Privacy"]
                    },
                    {
                      title: "Cookie Consent Banner",
                      description: "When you first visit our website, you can choose which types of cookies to accept through our cookie consent banner.",
                      steps: ["Click 'Cookie Settings' in the banner", "Toggle categories on/off", "Save your preferences"]
                    },
                    {
                      title: "Account Settings",
                      description: "Logged-in users can manage certain cookie preferences through their account settings.",
                      steps: ["Navigate to Account Settings", "Go to Privacy & Security", "Adjust your cookie preferences"]
                    }
                  ].map((choice, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mr-4">
                          <span className="text-emerald-600 font-bold">{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{choice.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{choice.description}</p>
                      <ul className="space-y-2">
                        {choice.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-600 text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Cookie Management Button */}
                <div id="manage-cookies" className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-center mb-8">
                  <ShieldCheckIcon className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">Manage Your Cookie Preferences</h3>
                  <p className="text-blue-100 mb-6 max-w-md mx-auto">
                    Take control of your privacy settings and customize how cookies are used on your account.
                  </p>
                  <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
                    Manage Cookie Settings
                  </button>
                </div>
              </section>

              {/* Section 6: Cookie Duration */}
              <section id="cookie-duration" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookie Duration</h2>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Session Cookies</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Temporary cookies</span>
                          <span className="text-sm font-medium text-gray-900">Browser Session</span>
                        </div>
                        <p className="text-sm text-gray-600">Deleted when you close your browser</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Persistent Cookies</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Preference cookies</span>
                          <span className="text-sm font-medium text-gray-900">Up to 1 year</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Analytics cookies</span>
                          <span className="text-sm font-medium text-gray-900">Up to 2 years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Policy Updates */}
              <section id="updates" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Policy Updates</h2>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-gray-600">📢</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Staying Informed</h3>
                      <p className="text-gray-700 mb-4">
                        We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Notification:</strong> We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mt-12">
                <h2 className="text-2xl font-bold text-white mb-4">Questions About Our Cookie Policy?</h2>
                <p className="text-gray-300 mb-6">
                  If you have any questions about how we use cookies or your privacy choices, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/contact" 
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/privacy" 
                    className="bg-transparent border-2 border-gray-300 text-white hover:bg-gray-800 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                  >
                    View Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}