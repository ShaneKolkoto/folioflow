const steps = [
  {
    number: "1",
    title: "Sign Up & Create CV",
    description:
      "Register for free and build your CV using our intuitive editor.",
  },
  {
    number: "2",
    title: "Get Your API Key",
    description: "We automatically generate a unique API key for your account.",
  },
  {
    number: "3",
    title: "Store & Manage Data",
    description: "Your CV data is securely stored in our cloud database.",
  },
  {
    number: "4",
    title: "Fetch or Export",
    description: "Use our API or export in multiple formats whenever needed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-[#1D1D1F]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Simple steps to manage your professional CV with API capabilities.
          </p>
        </div>
        <div className="mt-20">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-600 md:left-1/2 md:-ml-0.5" />

            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-lg">
                        {step.number}
                      </div>
                      <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
