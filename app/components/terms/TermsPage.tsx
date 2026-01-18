// app/terms/page.tsx
import {
  ScaleIcon,
  DocumentTextIcon,
  UserIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-grid-white/10 [mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-2xl mb-6 border border-white/10">
              <ScaleIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Please read these terms carefully before using FolioFlow. By
              accessing or using our services, you agree to be bound by these
              terms.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Effective Date:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Important Legal Document</span>
            </div>
            <div className="text-sm">
              By using FolioFlow, you agree to these terms. If you disagree,
              please do not use our services.
            </div>
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
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Table of Contents
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { id: "acceptance", label: "Acceptance of Terms" },
                      { id: "eligibility", label: "Eligibility" },
                      { id: "account", label: "Account Registration" },
                      { id: "services", label: "Our Services" },
                      { id: "usage", label: "Acceptable Use" },
                      { id: "content", label: "Your Content" },
                      { id: "intellectual", label: "Intellectual Property" },
                      // { id: "fees", label: "Fees & Payments" },
                      // { id: "termination", label: "Termination" },
                      { id: "liability", label: "Liability" },
                      { id: "governing", label: "Governing Law" },
                      { id: "changes", label: "Changes to Terms" },
                    ].map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors block py-2 border-l-2 border-transparent hover:border-blue-500 hover:pl-4 pl-2 text-sm"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Points */}
                <div className="bg-linear-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Key Points
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">
                        You own your content
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">
                        Monthly subscription model
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">
                        30-day money-back guarantee
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">
                        Cancel anytime
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Contact Legal */}
                {/* <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Legal Questions?</h3>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Contact our legal team
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </a>
                </div> */}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-12 lg:mt-0 lg:col-span-8">
            <div className="prose prose-lg prose-gray max-w-none">
              {/* Introduction Notice */}
              <div className="bg-linear-to-br from-amber-50 to-white rounded-xl p-6 mb-8 border border-amber-200">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 mr-3 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-gray-700 text-sm">
                      These Terms of Service constitute a legally binding
                      agreement between you and FolioFlow. Please read them
                      carefully. If you do not agree with these terms, you may
                      not use our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1: Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-24">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center mr-4">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    1. Acceptance of Terms
                  </h2>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    By accessing or using FolioFlow&apos;s website, services, or
                    applications (collectively, the &ldquo;Services&ldquo;), you
                    agree to be bound by these Terms of Service and all
                    applicable laws and regulations.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> If you are using our Services on
                      behalf of an organization, you are agreeing to these terms
                      on behalf of that organization and you represent that you
                      have the authority to bind the organization to these
                      terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Eligibility */}
              <section id="eligibility" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  2. Eligibility
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      To use our Services, you must:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Be at least 18 years old
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Have the legal capacity to enter into a binding
                          agreement
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Not be prohibited from receiving our Services under
                          applicable laws
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3: Account Registration */}
              <section id="account" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  3. Account Registration
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                      <UserIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Account Security
                        </h3>
                        <p className="text-gray-600 text-sm">
                          You are responsible for maintaining the
                          confidentiality of your account credentials and for
                          all activities that occur under your account.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center mb-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">
                            You Must
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Provide accurate information</li>
                          <li>• Keep credentials secure</li>
                          <li>• Notify us of unauthorized access</li>
                          <li>• Maintain only one account</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-center mb-2">
                          <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">
                            You Must Not
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Share account credentials</li>
                          <li>• Use others&apos; accounts</li>
                          <li>• Create false identities</li>
                          <li>• Violate others&apos; privacy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Our Services */}
              <section id="services" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  4. Our Services
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      FolioFlow provides a platform for creating, managing, and
                      distributing professional CVs and resumes through web
                      interfaces and APIs. Our Services include:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          title: "CV Builder",
                          description:
                            "Create professional CVs with our editor",
                        },
                        {
                          title: "API Access",
                          description: "Programmatic access to your CV data",
                        },
                        {
                          title: "Hosting",
                          description: "Public hosting of your CV profiles",
                        },
                        {
                          title: "Analytics",
                          description: "View who accessed your CV",
                        },
                        {
                          title: "Templates",
                          description: "Professional CV templates",
                        },
                        {
                          title: "Export Tools",
                          description: "Export to PDF, DOCX, JSON",
                        },
                      ].map((service, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                        >
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {service.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-sm text-gray-700">
                        <strong>Service Changes:</strong> We reserve the right
                        to modify, suspend, or discontinue any part of our
                        Services at any time. We will provide reasonable notice
                        for any material changes that negatively affect your use
                        of the Services.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Acceptable Use */}
              <section id="usage" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  5. Acceptable Use
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      You agree not to use our Services to:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Prohibited Activities
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "Violate any laws or regulations",
                            "Infringe intellectual property rights",
                            "Spread malware or viruses",
                            "Attempt unauthorized access",
                            "Interfere with service operations",
                            "Harass or threaten others",
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          API Usage Limits
                        </h4>
                        <ul className="space-y-3">
                          {[
                            { limit: "Free Tier", calls: "1000 calls/month" },
                            { limit: "Pro Tier", calls: "10,000 calls/month" },
                            { limit: "Business", calls: "100,000 calls/month" },
                            { limit: "Rate Limit", calls: "10 calls/second" },
                          ].map((item, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                              <span className="text-gray-700">
                                {item.limit}
                              </span>
                              <span className="font-medium text-gray-900">
                                {item.calls}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Your Content */}
              <section id="content" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  6. Your Content
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            You Own Your Content
                          </h4>
                          <p className="text-gray-700 text-sm">
                            You retain all ownership rights to the content you
                            upload to FolioFlow, including your CV data,
                            documents, and any other materials.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Licensing to FolioFlow
                      </h4>
                      <p className="text-gray-600">
                        By uploading content, you grant us a worldwide,
                        non-exclusive, royalty-free license to:
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>
                          • Store, process, and display your content to provide
                          our Services
                        </li>
                        <li>• Back up and secure your content</li>
                        <li>• Generate derivative works (like PDF exports)</li>
                        <li>• Use for diagnostic and improvement purposes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Intellectual Property */}
              <section id="intellectual" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  7. Intellectual Property
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Our Property
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "FolioFlow trademarks and logos",
                            "Website design and layout",
                            "Software and source code",
                            "Documentation and guides",
                            "Analytics and algorithms",
                            "Brand assets and styling",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Your Property
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "Your CV content and data",
                            "Personal information",
                            "Uploaded documents",
                            "Custom styling choices",
                            "Profile information",
                            "Portfolio materials",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 8: Fees & Payments */}
              {/* <section id="fees" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Fees & Payments</h2>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Free Tier</h4>
                        <p className="text-2xl font-bold text-gray-900">$0</p>
                        <p className="text-sm text-gray-600 mt-2">Basic CV features with limited API calls</p>
                      </div>
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <h4 className="font-semibold text-gray-900 mb-2">Pro Tier</h4>
                        <p className="text-2xl font-bold text-gray-900">$9.99<span className="text-sm font-normal text-gray-600">/month</span></p>
                        <p className="text-sm text-gray-600 mt-2">Advanced features & API access</p>
                      </div>
                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <h4 className="font-semibold text-gray-900 mb-2">Business</h4>
                        <p className="text-2xl font-bold text-gray-900">$29.99<span className="text-sm font-normal text-gray-600">/month</span></p>
                        <p className="text-sm text-gray-600 mt-2">Team features & priority support</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-900 mb-2">30-Day Money-Back Guarantee</h4>
                        <p className="text-sm text-gray-700">
                          If you're not satisfied with our Pro or Business plans, you can request a full refund within 30 days of purchase.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• All fees are billed in advance monthly</li>
                          <li>• Automatic renewal unless cancelled</li>
                          <li>• Taxes additional where applicable</li>
                          <li>• No refunds for partial months</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}

              {/* Section 9: Termination */}
              {/* <section id="termination" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Termination</h2>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">You May Cancel</h4>
                        <p className="text-gray-600 mb-3">You can terminate your account at any time through your account settings.</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Access to Services ends immediately</li>
                          <li>• No prorated refunds</li>
                          <li>• Data deleted after 30 days</li>
                          <li>• Can export data before deletion</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">We May Suspend</h4>
                        <p className="text-gray-600 mb-3">We may suspend or terminate your access if you:</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Violate these terms</li>
                          <li>• Engage in illegal activities</li>
                          <li>• Threaten our security</li>
                          <li>• Fail to pay fees</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}

              {/* Section 10: Liability */}
              <section id="liability" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  10. Limitation of Liability
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-3 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Important Limitation
                          </h4>
                          <p className="text-gray-700 text-sm">
                            To the maximum extent permitted by law, FolioFlow
                            shall not be liable for any indirect, incidental,
                            special, consequential, or punitive damages, or any
                            loss of profits or revenues.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Maximum Liability
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 text-center">
                          In no event shall FolioFlow&apos;s total liability
                          exceed the amount paid by you to FolioFlow in the six
                          months preceding the claim.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 11: Governing Law */}
              <section id="governing" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  11. Governing Law
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Jurisdiction</span>
                      <span className="font-medium text-gray-900">
                        Republic of South Africa
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Governing Law</span>
                      <span className="font-medium text-gray-900">
                        South African Law
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Dispute Resolution</span>
                      <span className="font-medium text-gray-900">
                        Arbitration in Cape Town
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 12: Changes to Terms */}
              <section id="changes" className="scroll-mt-24 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  12. Changes to Terms
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      We may update these Terms of Service from time to time. We
                      will notify you of any material changes by:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></div>
                        <span className="text-gray-600">
                          Posting the new terms on this page with updated
                          effective date
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></div>
                        <span className="text-gray-600">
                          Sending an email notification to registered users
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></div>
                        <span className="text-gray-600">
                          Displaying a notice in our Services
                        </span>
                      </li>
                    </ul>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>Continued Use:</strong> Your continued use of
                        our Services after changes become effective constitutes
                        acceptance of the updated terms.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Summary */}
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mt-12">
                <div className="text-center">
                  <ShieldCheckIcon className="h-12 w-12 text-white mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Summary of Key Terms
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
                    <div className="text-left">
                      <h4 className="font-semibold text-white mb-2">
                        Your Rights
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Own your content</li>
                        <li>• Cancel anytime</li>
                        {/* <li>• 30-day refund guarantee</li> */}
                        <li>• Control your data</li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white mb-2">
                        Your Responsibilities
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Follow acceptable use policy</li>
                        <li>• Maintain account security</li>
                        {/* <li>• Pay subscription fees</li> */}
                        <li>• Comply with laws</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/privacy"
                      className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      View Privacy Policy
                    </a>
                    {/* <a 
                      href="/contact" 
                      className="bg-transparent border-2 border-gray-300 text-white hover:bg-gray-800 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      Contact Legal Team
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
