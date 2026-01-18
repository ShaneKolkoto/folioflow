// app/api-demo/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  CommandLineIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  BoltIcon,
  ExclamationCircleIcon,
  ServerIcon,
  CodeBracketSquareIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  LinkIcon,
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

// Demo API key
const DEMO_API_KEY =
  process.env.NEXT_PUBLIC_DEMO_API_KEY || "ff_siz7k9ypy9k_98poegf9ris";

// Endpoints - these should match your Firebase Function endpoints
const ENDPOINTS = [
  {
    id: "getCV",
    method: "GET",
    path: "/api/cv",
    description: "Fetch complete CV data",
    icon: <UserIcon className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "getExperience",
    method: "GET",
    path: "/api/experience",
    description: "Get work experience",
    icon: <BriefcaseIcon className="h-5 w-5" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "getEducation",
    method: "GET",
    path: "/api/education",
    description: "Get education history",
    icon: <AcademicCapIcon className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "getProjects",
    method: "GET",
    path: "/api/projects",
    description: "Get portfolio projects",
    icon: <BriefcaseIcon className="h-5 w-5" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "getSkills",
    method: "GET",
    path: "/api/skills",
    description: "Get skills by category",
    icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "getSocial",
    method: "GET",
    path: "/api/social",
    description: "Get social links",
    icon: <LinkIcon className="h-5 w-5" />,
    color: "from-indigo-500 to-violet-500",
  },
];

// Demo data - This is your actual user data from earlier
const DEMO_USER_DATA = {
  userInfo: {
    name: "Alex Johnson",
    photoURL: "https://ui-avatars.com/api/?name=Alex+Johnson&background=3b82f6&color=fff&size=256",
    bio: "Senior Full-Stack Developer with 8+ years of experience building scalable web applications. Passionate about clean code, UX design, and mentoring junior developers. Love turning complex problems into elegant solutions.",
    location: "San Francisco, CA",
    title: "Senior Full-Stack Developer",
    email: "alex.johnson@example.com",
    phone: "+1 (415) 555-0198",
    website: "https://alexjohnson.dev",
    availability: "Open to new opportunities",
    hourlyRate: "$150/hour",
    timezone: "PST",
    languages: ["English", "Spanish"]
  },
  workExperience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Lead Full-Stack Developer",
      startDate: "2021-03-01",
      endDate: "Present",
      location: "San Francisco, CA (Remote)",
      description: "Leading a team of 8 developers in building enterprise SaaS applications serving 50,000+ users.",
      technologies: ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "Docker", "Kubernetes", "PostgreSQL"],
      achievements: [
        "Reduced page load times by 65% through code optimization",
        "Led migration from monolith to microservices architecture",
        "Implemented CI/CD pipeline reducing deployment time by 80%",
        "Mentored 4 junior developers to senior level positions"
      ],
      impact: "Increased user retention by 40% and improved application performance metrics by 75%"
    },
    {
      id: "2",
      company: "StartUpLabs",
      position: "Full-Stack Developer",
      startDate: "2019-06-01",
      endDate: "2021-02-28",
      location: "New York, NY",
      description: "Built MVP for fintech startup from ground up, scaling from 0 to 10,000 users in first year.",
      technologies: ["Next.js", "Firebase", "Stripe API", "MongoDB", "Redis", "Tailwind CSS"],
      achievements: [
        "Built complete platform with payment processing in 6 months",
        "Implemented real-time dashboard for analytics",
        "Achieved 99.9% uptime for critical services",
        "Reduced infrastructure costs by 45% through optimization"
      ],
      impact: "Platform successfully acquired by larger company after 2 years"
    }
  ],
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Master of Computer Science",
      startDate: "2015-09-01",
      endDate: "2017-06-01",
      location: "Stanford, CA",
      description: "Specialized in Machine Learning and Distributed Systems. GPA: 3.9/4.0",
      honors: ["Summa Cum Laude", "Dean's List", "Research Scholarship Recipient"]
    },
    {
      id: "2",
      institution: "MIT",
      degree: "Bachelor of Computer Engineering",
      startDate: "2011-09-01",
      endDate: "2015-05-01",
      location: "Cambridge, MA",
      description: "Double major in Computer Science and Mathematics. President of Coding Club.",
      achievements: ["Published 2 research papers", "Won HackMIT 2014"]
    }
  ],
  projects: [
    {
      id: "1",
      title: "CodeFlow - Developer Collaboration Platform",
      description: "Real-time collaborative coding environment with 10,000+ monthly active users. Features include live code sharing, video calls, and integrated code review.",
      technologies: ["React", "WebSockets", "Node.js", "MongoDB", "Redis", "WebRTC"],
      githubUrl: "https://github.com/alexjohnson/codeflow",
      liveUrl: "https://codeflow.dev",
      status: "Active",
      highlights: ["100,000+ lines of code", "5,000+ GitHub stars", "Featured on Product Hunt"],
      metrics: "Reduced onboarding time for new teams by 70%"
    },
    {
      id: "2",
      title: "AI Resume Builder",
      description: "AI-powered resume optimization tool that analyzes job descriptions and suggests improvements. Used by 5,000+ job seekers.",
      technologies: ["Next.js", "OpenAI API", "Firebase", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/alexjohnson/ai-resume",
      liveUrl: "https://ai-resume.dev",
      status: "Active",
      highlights: ["95% user satisfaction", "Featured in TechCrunch", "Open source with 2,500+ stars"],
      metrics: "Users reported 40% increase in interview callbacks"
    },
    {
      id: "3",
      title: "EcoTrack - Carbon Footprint Calculator",
      description: "Mobile app that tracks personal carbon footprint and suggests sustainable alternatives. Winner of Climate Hack 2023.",
      technologies: ["React Native", "Firebase", "Google Maps API", "Chart.js"],
      githubUrl: "https://github.com/alexjohnson/ecotrack",
      liveUrl: "https://ecotrack.app",
      status: "Maintained",
      impact: "Helped 10,000+ users reduce carbon footprint by average 15%"
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "Go", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Django", "Spring Boot"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "MySQL"],
    tools: ["Git", "CI/CD", "GraphQL", "REST APIs", "WebSockets", "Jest"],
    methodologies: ["Agile", "Scrum", "TDD", "Microservices", "DevOps"],
    softSkills: ["Leadership", "Mentoring", "Public Speaking", "Project Management", "Technical Writing"],
    specializations: ["Performance Optimization", "Scalability", "Security", "API Design", "UX/UI"]
  },
  socialLinks: {
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjohnson_dev",
    portfolio: "https://alexjohnson.dev",
    medium: "https://medium.com/@alexjohnson",
    stackoverflow: "https://stackoverflow.com/users/alexjohnson",
    dribbble: "https://dribbble.com/alexjohnson"
  },
  achievements: [
    "Google Developer Expert (Web Technologies)",
    "AWS Certified Solutions Architect - Professional",
    "10x GitHub Star (2022, 2023)",
    "Speaker at React Conf 2023",
    "Top 1% Stack Overflow Contributor",
    "Published Author (2 technical books)",
    "Mentored 50+ developers through coding bootcamps"
  ],
  certifications: [
    {
      id: "1",
      category: "Cloud Architecture",
      issuer: "Amazon Web Services",
      name: "AWS Solutions Architect - Professional",
      issueDate: "2023-01-15",
      expiryDate: "2026-01-15",
      credentialUrl: "https://aws.amazon.com/certification",
      description: "Advanced technical skills and experience in designing distributed systems on AWS"
    },
    {
      id: "2",
      category: "Web Development",
      issuer: "Google",
      name: "Professional Cloud Developer",
      issueDate: "2022-08-01",
      expiryDate: "2025-08-01",
      credentialUrl: "https://cloud.google.com/certification",
      description: "Building scalable and reliable applications on Google Cloud Platform"
    },
    {
      id: "3",
      category: "Security",
      issuer: "ISC2",
      name: "Certified Information Systems Security Professional (CISSP)",
      issueDate: "2021-11-01",
      credentialUrl: "https://www.isc2.org/certifications",
      description: "World's premier cybersecurity certification"
    }
  ],
  publications: [
    {
      id: "1",
      title: "Building Scalable Microservices with Node.js",
      publisher: "O'Reilly Media",
      date: "2022-05-01",
      url: "https://oreilly.com/book/scalable-nodejs",
      description: "Comprehensive guide to building distributed systems with Node.js"
    },
    {
      id: "2",
      title: "The Future of Web Performance",
      publisher: "Smashing Magazine",
      date: "2023-03-15",
      url: "https://smashingmagazine.com/web-performance",
      description: "Research paper on modern web performance optimization techniques"
    }
  ],
  speaking: [
    {
      id: "1",
      event: "React Conf 2023",
      title: "Next.js 14 and the Future of Full-Stack",
      date: "2023-10-15",
      location: "Las Vegas, NV",
      url: "https://reactconf.com/sessions/alexjohnson"
    },
    {
      id: "2",
      event: "AWS re:Invent",
      title: "Serverless at Scale: Lessons from 1M Users",
      date: "2022-11-29",
      location: "Las Vegas, NV",
      url: "https://reinvent.awsevents.com"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Sarah Chen",
      role: "CTO, TechCorp",
      text: "Alex transformed our development process. Their architectural decisions saved us $500k in cloud costs.",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen"
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "Engineering Director, Google",
      text: "One of the most talented developers I've worked with. Exceptional problem-solving skills and leadership.",
      avatar: "https://ui-avatars.com/api/?name=Michael+Rodriguez"
    }
  ],
  metrics: {
    yearsExperience: 8,
    projectsCompleted: 42,
    codeCommits: "15,000+",
    linesOfCode: "2M+",
    mentoringHours: "500+",
    conferenceTalks: 12,
    openSourceContributions: 150,
    githubStars: "10,000+"
  },
  preferences: {
    remoteWork: true,
    contractWork: true,
    fullTimePositions: true,
    industries: ["Tech", "Fintech", "HealthTech", "EdTech", "Climate Tech"],
    techStack: ["React", "TypeScript", "Node.js", "Cloud Native"],
    teamSize: "10-50 people",
    companyStage: ["Series B+", "Enterprise", "Scale-up"]
  },
  apiKey: DEMO_API_KEY,
  subscriptionTier: "enterprise",
  updatedAt: new Date().toISOString(),
  dataPoints: {
    total: 156,
    lastUpdated: "Just now",
    completeness: "98%",
    viewsThisMonth: 2450,
    apiCalls: 12500
  }
};

export default function APIDemoPage() {
  const { user, getPortfolio } = useAuth();
  const [activeEndpoint, setActiveEndpoint] = useState(ENDPOINTS[0]);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const checkUser = async () => {
    const userData = await getPortfolio()
    
    console.log(userData, 'user')
  }
  // Initialize with demo data
  useEffect(() => {
    checkUser()
    handleEndpointClick(ENDPOINTS[0]);
  }, []);

  // Copy API key to clipboard
  const copyApiKey = () => {
    navigator.clipboard.writeText(DEMO_API_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy JSON to clipboard
  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle endpoint click - filter data based on endpoint
  const handleEndpointClick = (endpoint: (typeof ENDPOINTS)[0]) => {
    setActiveEndpoint(endpoint);
    setError(null);
    setLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      try {
        let data = {};

        switch (endpoint.id) {
          case "getCV":
            data = DEMO_USER_DATA;
            break;
          case "getExperience":
            data = {
              workExperience: DEMO_USER_DATA.workExperience,
              count: DEMO_USER_DATA.workExperience.length,
            };
            break;
          case "getEducation":
            data = {
              education: DEMO_USER_DATA.education,
              count: DEMO_USER_DATA.education.length,
            };
            break;
          case "getProjects":
            data = {
              projects: DEMO_USER_DATA.projects,
              count: DEMO_USER_DATA.projects.length,
            };
            break;
          case "getSkills":
            data = {
              skills: DEMO_USER_DATA.skills,
              categories: Object.keys(DEMO_USER_DATA.skills),
            };
            break;
          case "getSocial":
            data = {
              socialLinks: DEMO_USER_DATA.socialLinks,
              platforms: Object.keys(DEMO_USER_DATA.socialLinks),
            };
            break;
        }

        setResponse({
          success: true,
          endpoint: endpoint.path,
          method: endpoint.method,
          data: data,
          timestamp: new Date().toISOString(),
          note: "This is simulated API response. In production, this would come from your Firebase Function.",
        });
      } catch (err) {
        setError("Failed to fetch data for this endpoint");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  // Format response for display
  const formatResponse = () => {
    if (!response) return "{}";
    return JSON.stringify(response, null, 2);
  };

  // Highlight code
  useEffect(() => {
    if (response) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [response]);

  // Generate code examples
  const getCodeExamples = () => {
    const codeExamples = {
      javascript: `// Using fetch with the demo API key
const response = await fetch('https://your-firebase-function-url.com${activeEndpoint.path}', {
  headers: {
    'Authorization': 'Bearer ${DEMO_API_KEY}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,

      python: `import requests

headers = {
    'Authorization': 'Bearer ${DEMO_API_KEY}',
    'Content-Type': 'application/json'
}

response = requests.get('https://your-firebase-function-url.com${activeEndpoint.path}', headers=headers)
data = response.json()
print(data)`,

      curl: `curl -X ${activeEndpoint.method} \\
  "https://your-firebase-function-url.com${activeEndpoint.path}" \\
  -H "Authorization: Bearer ${DEMO_API_KEY}" \\
  -H "Content-Type: application/json"`,
    };

    return codeExamples;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <CommandLineIcon className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">API Demo Playground</h1>
                <p className="text-sm text-gray-400">
                  Simulated API responses with your real data
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEndpointClick(activeEndpoint)}
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Refresh
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - API Key & Endpoints */}
          <div className="lg:col-span-1 space-y-6">
            {/* API Key Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-500/20 mr-3">
                    <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">API Key</h3>
                    <p className="text-sm text-gray-400">
                      Simulated Environment
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyApiKey}
                  className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-sm font-medium"
                >
                  {copied ? (
                    <ClipboardDocumentCheckIcon className="h-4 w-4" />
                  ) : (
                    <ClipboardIcon className="h-4 w-4" />
                  )}
                </motion.button>
              </div>

              <div className="relative">
                {user ?
                (<code className="block w-full bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-sm break-all">
                  {user?.apiKey}
                </code>) : (
                  <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyApiKey}
                  className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-sm font-medium"
                >
                    <Link href="/auth/create-account">Create account now</Link>
                </motion.button>
                )
                
                }
                {/* <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                  DEMO
                </div> */}
              </div>

              <div className="mt-4 text-xs text-gray-400">
                <p>
                  This is a simulated API demo. Replace the URL with your actual api_token.
                </p>
              </div>
            </motion.div>

            {/* Endpoints List */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <ServerIcon className="h-5 w-5 mr-2 text-gray-400" />
                Available Endpoints
              </h3>
              <div className="space-y-3">
                {ENDPOINTS.map((endpoint) => (
                  <motion.button
                    key={endpoint.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEndpointClick(endpoint)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      activeEndpoint.id === endpoint.id
                        ? "border-cyan-500/50 bg-cyan-500/10"
                        : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${endpoint.color} mr-3`}
                        >
                          <div className="text-white">{endpoint.icon}</div>
                        </div>
                        <div>
                          <div className="font-medium">{endpoint.path}</div>
                          <div className="text-xs text-gray-400">
                            {endpoint.description}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          endpoint.method === "GET"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                {user ? "Account Information" : 'Demo User Profile'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {user ? user.displayName : DEMO_USER_DATA.userInfo.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {user ? user.displayName : DEMO_USER_DATA.userInfo.title}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 rounded-lg bg-gray-900/50">
                    <div className="text-gray-400">Work Experience</div>
                    <div className="font-medium">
                      {DEMO_USER_DATA.workExperience.length} positions
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-900/50">
                    <div className="text-gray-400">Projects</div>
                    <div className="font-medium">
                      {DEMO_USER_DATA.projects.length} projects
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  <CheckCircleIcon className="h-3 w-3 inline mr-1 text-green-400" />
                  Real data from your portfolio
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Response & Code Examples */}
          <div className="lg:col-span-2 space-y-6">
            {/* Response Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <BoltIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <h3 className="font-semibold">API Response</h3>
                  <div className="ml-4 flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        loading
                          ? "bg-yellow-500/20 text-yellow-400"
                          : error
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {loading ? "Loading..." : error ? "Error" : "Success"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {activeEndpoint.method} {activeEndpoint.path}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyResponse}
                    className="flex items-center px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
                  >
                    {copied ? (
                      <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ClipboardIcon className="h-4 w-4 mr-1" />
                    )}
                    Copy JSON
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Simulating API request...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-3" />
                      <div>
                        <div className="font-medium text-red-400">Error</div>
                        <div className="text-sm text-gray-300 mt-1">
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : response ? (
                  <div className="relative">
                    {response.note && (
                      <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-sm text-yellow-400">
                          {response.note}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                        Status: 200
                      </div>
                    </div>
                    <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="language-json hljs">
                        {formatResponse()}
                      </code>
                    </pre>
                  </div>
                ) : null}
              </div>
            </motion.div>

            {/* Code Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="border-b border-gray-700 px-6 py-4">
                <h3 className="font-semibold flex items-center">
                  <CodeBracketSquareIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  Integration Examples
                </h3>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-400">
                    Replace{" "}
                    <code className="bg-gray-900 px-1 py-0.5 rounded">
                      your-firebase-function-url.com
                    </code>{" "}
                    with your actual Firebase Function URL.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* JavaScript Example */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-2">
                          <span className="text-yellow-400 font-bold text-sm">
                            JS
                          </span>
                        </div>
                        <span className="font-medium">JavaScript</span>
                      </div>
                    </div>
                    <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="language-javascript hljs">
                        {getCodeExamples().javascript}
                      </code>
                    </pre>
                  </div>

                  {/* Python Example */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-2">
                          <span className="text-blue-400 font-bold text-sm">
                            PY
                          </span>
                        </div>
                        <span className="font-medium">Python</span>
                      </div>
                    </div>
                    <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="language-python hljs">
                        {getCodeExamples().python}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* cURL Example */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-gray-700 flex items-center justify-center mr-2">
                      <span className="font-bold text-sm">$</span>
                    </div>
                    <span className="font-medium">cURL</span>
                  </div>
                  <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="language-bash hljs">
                      {getCodeExamples().curl}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing DatabaseIcon component
function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  );
}
