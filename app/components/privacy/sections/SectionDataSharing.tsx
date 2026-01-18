"use client";

import { motion } from "framer-motion";
import {
  UsersIcon,
  DocumentCheckIcon,
  BuildingLibraryIcon,
  HandRaisedIcon,
  // ScaleIcon,
  // ShareIcon,
  // UserIcon,
  XMarkIcon,
  // CheckCircleIcon,
  EyeIcon,
  // TrashIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  LockClosedIcon,
  ServerIcon,
  KeyIcon,
  MegaphoneIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export interface SectionDataSharingProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionDataSharing({ ref }: SectionDataSharingProps) {
  const sharingScenarios = [
    {
      icon: DocumentCheckIcon,
      title: "With Your Consent",
      description: "We only share data when you explicitly give us permission",
      example: "Sharing your CV with a specific employer",
      color: "from-green-500 to-green-600",
    },
    {
      icon: BuildingLibraryIcon,
      title: "Service Providers",
      description: "Trusted partners who help us operate FolioFlow",
      example: "Payment processors, hosting providers, analytics",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: UsersIcon,
      title: "Business Transfers",
      description: "In case of merger, acquisition, or sale",
      example: "Company acquisition where data transfer is required",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: HandRaisedIcon,
      title: "Legal Requirements",
      description: "When required by law or legal process",
      example: "Court orders, government requests",
      color: "from-red-500 to-red-600",
    },
  ];

  // FlowStage Component
  const FlowStage = ({
    icon = null,
    title = null,
    description = null,
    color = null,
    position = null,
    pulse = false,
  }) => {
    const colors = {
      emerald: "from-emerald-500 to-emerald-600",
      blue: "from-blue-500 to-blue-600",
      indigo: "from-indigo-500 to-indigo-600",
      purple: "from-purple-500 to-purple-600",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: position === "left" ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${position === "left" ? "flex-row" : "flex-row-reverse"} items-center max-w-xs`}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          animate={pulse ? { scale: [1, 1.05, 1] } : {}}
          transition={pulse ? { repeat: Infinity, duration: 2 } : {}}
          className={`h-14 w-14 rounded-2xl bg-linear-to-br ${colors[color]} flex items-center justify-center shadow-lg z-10`}
        >
          <div className="text-white">{icon}</div>
        </motion.div>
        <div
          className={`${position === "left" ? "ml-4 text-left" : "mr-4 text-right"}`}
        >
          <h5 className="font-bold text-gray-900">{title}</h5>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </motion.div>
    );
  };

  // RightCard Component
  const RightCard = ({ icon, title, description, color }) => {
    const colorClasses = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
    };

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`p-2 rounded-xl border-2 ${colorClasses[color]} transition-all duration-200`}
      >
        <div className="flex items-start">
          <div
            className={`p-2 rounded-lg ${colorClasses[color].split(" ")[0]} bg-opacity-50 mr-4`}
          >
            {icon}
          </div>
          <div>
            <h4 className="font-bold mb-1">{title}</h4>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-4">
            <UsersIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-600">
              When and how we share your information
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-5 bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 text-lg mb-1">
                We Do Not Sell Your Data
              </h3>
              <p className="text-yellow-700">
                FolioFlow does not sell, rent, or trade your personal
                information to third parties for marketing purposes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sharing Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sharingScenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start mb-3">
                <div
                  className={`h-10 w-10 rounded-lg bg-linear-to-br ${scenario.color} flex items-center justify-center mr-3`}
                >
                  <scenario.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {scenario.description}
                  </p>
                </div>
              </div>
              <div className="pl-13">
                <div className="text-xs text-gray-500 mb-1">Example:</div>
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {scenario.example}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Sharing Flow Visualization */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-6 flex items-center">
            <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
            Your Data's Secure Journey Through FolioFlow
          </h3>

          {/* Main Visualization - Circular Flow Design */}
          <div className="relative bg-linear-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200 p-8 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1.5px, transparent 0)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Central Security Core */}
            <div className="relative flex flex-col items-center justify-center mb-0">
              <div className="relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear",
                    },
                    scale: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative"
                >

                  <div className="h-40 w-40 rounded-full border-8 border-blue-200/50 bg-linear-to-br from-blue-50 to-white shadow-xl">
                    <div className="absolute inset-8 rounded-full border-6 border-blue-300/70 bg-linear-to-br from-blue-100 to-white">
                      <div className="absolute inset-8 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 shadow-2xl flex items-center justify-center">
                        <ShieldCheckIcon className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>

                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        x: [0, Math.cos((i * 60 * Math.PI) / 180) * 120],
                        y: [0, Math.sin((i * 60 * Math.PI) / 180) * 120],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                      className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-blue-400"
                    />
                  ))}
                </motion.div>
              </div>

              <div className="mt-6 text-center">
                <h4 className="text-xl font-bold text-blue-800 mb-2">
                  FolioFlow Security Core
                </h4>
                <p className="text-sm text-gray-600 max-w-md">
                  End-to-end encrypted processing with your explicit consent
                  required for any data movement
                </p>
              </div>
            </div>

            {/* Flow Stages - Circular Layout */}
            <div className="relative grid grid-cols-2 h-52">
              <div className="absolute top-4 left-4 md:left-8">
                <FlowStage
                  icon={<UserCircleIcon className="h-8 w-8" />}
                  title="Your Input"
                  description="You add CV data"
                  color="emerald"
                  position="left"
                  pulse={true}
                />
              </div>

              {/* Stage 2: Encryption */}
              <div className="absolute top-4 right-4 md:right-8">
                <FlowStage
                  icon={<LockClosedIcon className="h-8 w-8" />}
                  title="Secure Encryption"
                  description="Data is encrypted"
                  color="blue"
                  position="right"
                />
              </div>

              {/* Stage 3: Storage */}
              <div className="absolute bottom-4 left-4 md:left-8">
                <FlowStage
                  icon={<ServerIcon className="h-8 w-8" />}
                  title="Protected Storage"
                  description="EU-based secure servers"
                  color="indigo"
                  position="left"
                />
              </div>

              {/* Stage 4: Controlled Access */}
              <div className="absolute bottom-4 right-4 md:right-8">

                <div className="mb-1 flex flex-wrap gap-2 justify-end">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    With Consent
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Service Needs
                  </span>
                </div>
                <FlowStage
                  icon={<KeyIcon className="h-8 w-8" />}
                  title="Controlled Access"
                  description="You decide who accesses"
                  color="purple"
                  position="right"
                />

                
              </div>
            </div>

            {/* Never Shared Section - Clear Visual Barrier */}
            <div className="mt-0 pt-8 border-t-2 border-dashed border-gray-300 relative">
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-4">
        <div className="h-8 w-8 rounded-full bg-linear-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-lg">
          <XMarkIcon className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-bold text-gray-700 mb-4">Data Never Leaves For</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: "Advertising", icon: <MegaphoneIcon className="h-5 w-5" /> },
            { label: "Data Sales", icon: <CurrencyDollarIcon className="h-5 w-5" /> },
            { label: "Marketing", icon: <ChartBarIcon className="h-5 w-5" /> },
            { label: "Third-Party Sharing", icon: <ArrowRightOnRectangleIcon className="h-5 w-5" /> }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="p-4 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300"
            >
              <div className="text-gray-500 mb-2 flex justify-center">{item.icon}</div>
              <div className="text-sm font-medium text-gray-700">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
      <RightCard
        icon={<EyeIcon className="h-6 w-6" />}
        title="Full Transparency"
        description="See exactly where your data goes and who accesses it"
        color="blue"
      />
      <RightCard
        icon={<ArrowPathIcon className="h-6 w-6" />}
        title="Complete Control"
        description="Update, export, or delete your data at any time"
        color="emerald"
      />
      <RightCard
        icon={<BellAlertIcon className="h-6 w-6" />}
        title="Instant Alerts"
        description="Get notified of any data access or sharing"
        color="purple"
      />
    </div>
          </div>
        </div>

        {/* Data Processing Agreements */}
        <div className="p-5 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">
            Data Processing Agreements
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            All service providers who process your data on our behalf are bound
            by strict data processing agreements that require them to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-700">
                Maintain confidentiality of your data
              </span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-700">
                Implement appropriate security measures
              </span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-700">
                Only process data as instructed by us
              </span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-700">
                Delete data when no longer needed
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
