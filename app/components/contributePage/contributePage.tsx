// app/contribute/page.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CodeBracketIcon,
  RocketLaunchIcon,
  UsersIcon,
  BugAntIcon,
  SparklesIcon,
  DocumentTextIcon,
  LinkIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  CommandLineIcon,
  GlobeAltIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Step {
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  title: string;
  description: string;
  color: string;
  badge?: string;
}

interface ContributorRole {
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  title: string;
  description: string;
  skills: string[];
  color: string;
  emoji: string;
}

interface BranchRule {
  type: string;
  pattern: string;
  example: string;
  description: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  color: string;
}

interface PrChecklistItem {
  text: string;
  required: boolean;
}

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
  subscribers: number;
}

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
}

interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface CachedData {
  stats: GitHubStats | null;
  contributors: GitHubContributor[];
  openIssues: GitHubIssue[];
  goodFirstIssues: GitHubIssue[];
  timestamp: number;
}

const REPO_OWNER = "ShaneKolkoto";
const REPO_NAME = "folioflow";
const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const CACHE_KEY = "github_contribute_cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Helper functions for caching
const getCachedData = (): CachedData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CachedData = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid (less than 30 minutes old)
    if (now - data.timestamp < CACHE_DURATION) {
      return data;
    }
    
    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
};

const setCachedData = (data: Omit<CachedData, 'timestamp'>) => {
  try {
    const cacheData: CachedData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

// Helper function to determine text color based on background color
const getContrastColor = (hexColor: string): string => {
  // Remove the # if present
  const hex = hexColor.replace("#", "");
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

export default function ContributePage() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [branchType, setBranchType] = useState<string>("feature");
  const [prChecklist, setPrChecklist] = useState<Record<string, boolean>>({});
  const [starCount, setStarCount] = useState<number>(0);
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [openIssues, setOpenIssues] = useState<GitHubIssue[]>([]);
  const [goodFirstIssues, setGoodFirstIssues] = useState<GitHubIssue[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheTime, setCacheTime] = useState<number | null>(null);
  const [usingCache, setUsingCache] = useState<boolean>(false);

  const fetchGitHubData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first (unless forced refresh)
      if (!forceRefresh) {
        const cached = getCachedData();
        if (cached) {
          console.log("Using cached GitHub data");
          setStats(cached.stats);
          setContributors(cached.contributors);
          setOpenIssues(cached.openIssues);
          setGoodFirstIssues(cached.goodFirstIssues);
          setStarCount(cached.stats?.stars || 0);
          setCacheTime(cached.timestamp);
          setUsingCache(true);
          setLoading(false);
          return;
        }
      }

      setUsingCache(false);
      console.log("Fetching fresh GitHub data");

      // Fetch repository stats
      const repoResponse = await fetch(GITHUB_API, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      if (!repoResponse.ok) {
        if (repoResponse.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Using cached data.");
        }
        throw new Error("Failed to fetch repository data");
      }
      
      const repoData = await repoResponse.json();

      // Fetch contributors
      const contributorsResponse = await fetch(`${GITHUB_API}/contributors`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      const contributorsData = contributorsResponse.ok 
        ? await contributorsResponse.json() 
        : [];

      // Fetch open issues (exclude pull requests)
      const issuesResponse = await fetch(
        `${GITHUB_API}/issues?state=open&per_page=10&sort=created&direction=desc`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );
      
      const issuesData = issuesResponse.ok 
        ? await issuesResponse.json() 
        : [];

      // Filter good first issues
      const goodFirstIssuesData = issuesData.filter((issue: GitHubIssue) => 
        issue.labels?.some(label => 
          label.name.toLowerCase().includes('good first issue') ||
          label.name.toLowerCase().includes('good-first-issue') ||
          label.name.toLowerCase().includes('beginner friendly')
        )
      );

      // Update state
      const newStats = {
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        watchers: repoData.watchers_count || 0,
        open_issues: repoData.open_issues_count || 0,
        subscribers: repoData.subscribers_count || 0,
      };
      
      setStats(newStats);
      setContributors(contributorsData);
      setOpenIssues(issuesData);
      setGoodFirstIssues(goodFirstIssuesData);
      setStarCount(newStats.stars);
      setCacheTime(Date.now());

      // Cache the data
      setCachedData({
        stats: newStats,
        contributors: contributorsData,
        openIssues: issuesData,
        goodFirstIssues: goodFirstIssuesData,
      });

    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      
      // Try to use cache if fresh fetch fails
      const cached = getCachedData();
      if (cached) {
        console.log("Falling back to cached data");
        setStats(cached.stats);
        setContributors(cached.contributors);
        setOpenIssues(cached.openIssues);
        setGoodFirstIssues(cached.goodFirstIssues);
        setStarCount(cached.stats?.stars || 0);
        setCacheTime(cached.timestamp);
        setUsingCache(true);
        
        if (err instanceof Error && err.message.includes("rate limit")) {
          setError("GitHub API rate limit exceeded. Showing cached data.");
        } else {
          setError("Failed to fetch fresh data. Showing cached data.");
        }
      } else {
        setError("Failed to load GitHub data. Please check your internet connection.");
        
        // Fallback to mock data for development
        if (process.env.NODE_ENV === "development") {
          console.log("Using development mock data");
          setStarCount(42);
          setContributors([
            { id: 1, login: "ShaneKolkoto", avatar_url: "", html_url: "https://github.com/ShaneKolkoto", contributions: 100 },
            { id: 2, login: "contributor1", avatar_url: "", html_url: "#", contributions: 50 },
            { id: 3, login: "contributor2", avatar_url: "", html_url: "#", contributions: 25 },
          ]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const contributionSteps: Step[] = useMemo(
    () => [
      {
        icon: BugAntIcon,
        title: "Find an Issue",
        description: "Browse existing issues or create a new one for your feature/fix",
        color: "from-orange-500 to-orange-600",
        badge: "Step 1",
      },
      {
        icon: LinkIcon,
        title: "Branch & Link",
        description: "Create a branch linked to the issue using the naming convention",
        color: "from-blue-500 to-blue-600",
        badge: "Step 2",
      },
      {
        icon: CodeBracketIcon,
        title: "Code Magic",
        description: "Make your changes with clear, commented code and tests",
        color: "from-green-500 to-green-600",
        badge: "Step 3",
      },
      {
        icon: DocumentTextIcon,
        title: "PR Description",
        description: "Create a PR with detailed description linking to the issue",
        color: "from-purple-500 to-purple-600",
        badge: "Step 4",
      },
      {
        icon: ChatBubbleLeftRightIcon,
        title: "Review & Discuss",
        description: "Engage in PR discussions, address feedback, and iterate",
        color: "from-pink-500 to-pink-600",
        badge: "Step 5",
      },
      {
        icon: RocketLaunchIcon,
        title: "Merge & Deploy",
        description: "Once approved, your code gets merged and deployed!",
        color: "from-indigo-500 to-indigo-600",
        badge: "Step 6",
      },
    ],
    []
  );

  const contributorRoles: ContributorRole[] = useMemo(
    () => [
      {
        icon: CodeBracketIcon,
        title: "Feature Builder",
        description: "Create new features and enhance existing ones",
        skills: ["React", "TypeScript", "API Design"],
        color: "from-blue-500 to-blue-600",
        emoji: "🚀",
      },
      {
        icon: BugAntIcon,
        title: "Bug Hunter",
        description: "Find and fix pesky bugs in the codebase",
        skills: ["Debugging", "Testing", "Problem Solving"],
        color: "from-green-500 to-green-600",
        emoji: "🐛",
      },
      {
        icon: WrenchScrewdriverIcon,
        title: "Code Refactorer",
        description: "Improve code quality and structure",
        skills: ["Clean Code", "Performance", "Best Practices"],
        color: "from-purple-500 to-purple-600",
        emoji: "🔧",
      },
      {
        icon: GlobeAltIcon,
        title: "Documentation Guru",
        description: "Write clear docs and improve developer experience",
        skills: ["Technical Writing", "UX", "Communication"],
        color: "from-yellow-500 to-yellow-600",
        emoji: "📚",
      },
      {
        icon: SparklesIcon,
        title: "UI/UX Wizard",
        description: "Design beautiful interfaces and user experiences",
        skills: ["Tailwind", "Framer Motion", "Design"],
        color: "from-pink-500 to-pink-600",
        emoji: "🎨",
      },
    ],
    []
  );

  const branchRules: BranchRule[] = useMemo(
    () => [
      {
        type: "feature",
        pattern: "feature/issue-{number}-short-description",
        example: `feature/issue-${goodFirstIssues[0]?.number || 42}-add-dark-mode`,
        description: "New features and enhancements",
        icon: SparklesIcon,
        color: "bg-gradient-to-r from-green-500 to-emerald-600",
      },
      {
        type: "bugfix",
        pattern: "bugfix/issue-{number}-short-description",
        example: `bugfix/issue-${openIssues.find(i => i.title.toLowerCase().includes('bug'))?.number || 23}-fix-mobile-nav`,
        description: "Bug fixes and patches",
        icon: BugAntIcon,
        color: "bg-gradient-to-r from-red-500 to-pink-600",
      },
      {
        type: "hotfix",
        pattern: "hotfix/issue-{number}-critical-fix",
        example: `hotfix/issue-${openIssues.find(i => i.title.toLowerCase().includes('critical'))?.number || 99}-security-patch`,
        description: "Critical fixes for production",
        icon: ExclamationTriangleIcon,
        color: "bg-gradient-to-r from-orange-500 to-red-600",
      },
      {
        type: "docs",
        pattern: "docs/issue-{number}-documentation",
        example: `docs/issue-${openIssues.find(i => i.title.toLowerCase().includes('documentation'))?.number || 15}-update-readme`,
        description: "Documentation improvements",
        icon: DocumentTextIcon,
        color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      },
      {
        type: "refactor",
        pattern: "refactor/issue-{number}-code-cleanup",
        example: `refactor/issue-${openIssues.find(i => i.title.toLowerCase().includes('refactor'))?.number || 8}-cleanup-api`,
        description: "Code refactoring and cleanup",
        icon: WrenchScrewdriverIcon,
        color: "bg-gradient-to-r from-purple-500 to-pink-600",
      },
    ],
    [goodFirstIssues, openIssues]
  );

  const prChecklistItems: PrChecklistItem[] = useMemo(
    () => [
      { text: "Linked to GitHub issue", required: true },
      { text: "Follows coding standards", required: true },
      { text: "Includes tests (if applicable)", required: true },
      { text: "Updated documentation", required: true },
      { text: "No console logs/debug code", required: true },
      { text: "Works on mobile & desktop", required: false },
      { text: "Added TypeScript types", required: false },
      { text: "Performance considered", required: false },
    ],
    []
  );

  const handleCheckboxToggle = (index: number) => {
    setPrChecklist((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getProgressPercentage = () => {
    const requiredItems = prChecklistItems.filter((item) => item.required);
    const checkedRequired = requiredItems.filter((_, index) => prChecklist[index]).length;
    return Math.round((checkedRequired / requiredItems.length) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    return formatDate(new Date(timestamp).toISOString());
  };

  const handleRefreshData = (force = false) => {
    fetchGitHubData(force);
  };

  const handleClearCache = () => {
    clearCache();
    handleRefreshData(true);
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cache Status & Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-blue-800">
                  {usingCache ? "Using cached data" : "Using live data"}
                  {cacheTime && (
                    <span className="text-blue-600 ml-2">
                      • Last updated {formatTimeAgo(cacheTime)}
                    </span>
                  )}
                </p>
                <p className="text-xs text-blue-600">
                  Data is cached for 30 minutes to prevent GitHub API rate limits
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRefreshData(true)}
                disabled={loading}
                className="flex items-center px-3 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg text-sm hover:bg-blue-50 disabled:opacity-50"
              >
                <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh Now
              </button>
              <button
                onClick={handleClearCache}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </motion.div>

        {/* GitHub Data Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-yellow-700">{error}</p>
              </div>
              <button
                onClick={() => handleRefreshData(true)}
                className="text-sm text-yellow-600 hover:text-yellow-800"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* ... Hero Section Content (same as before) ... */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mr-4">
              <UsersIcon className="h-8 w-8 text-white" />
            </div>
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center -ml-4">
              <CodeBracketIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              FolioFlow
            </span>{" "}
            Builders
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let&apos;s build the future of portfolio management together! Whether you&apos;re a
            seasoned developer or just starting out, there&apos;s a place for you in our community.
          </p>

          {/* GitHub Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <motion.a
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-xl hover:shadow-xl transition-shadow"
            >
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </motion.a>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stats?.subscribers || 0}</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <StarIcon className="h-4 w-4 mr-1" />
                  Watchers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stats?.stars || starCount}</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <StarIcon className="h-4 w-4 mr-1" />
                  Stars
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stats?.forks || 0}</div>
                <div className="text-sm text-gray-600">Forks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stats?.open_issues || 0}</div>
                <div className="text-sm text-gray-600">Open Issues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{contributors.length}</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  Contributors
                </div>
              </div>
            </div>
          </div>

          {/* Contributors List */}
          {contributors.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Our Amazing Contributors
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {contributors.slice(0, 10).map((contributor) => (
                  <motion.a
                    key={contributor.id}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border-2 border-white shadow-sm">
                      {contributor.avatar_url ? (
                        <img
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                          <UsersIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{contributor.login}</span>
                    <span className="text-xs text-gray-500">{contributor.contributions} commits</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>


        {/* Contribution Journey */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Your Contribution Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributionSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mr-4`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    {step.badge && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 mb-2">
                        {step.badge}
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Good First Issues */}
        {goodFirstIssues.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🎯 Good First Issues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goodFirstIssues.map((issue) => (
                <motion.a
                  key={issue.id}
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        #{issue.number} - {issue.title}
                      </h3>
                      <div className="flex items-center mt-2">
                        <img
                          src={issue.user.avatar_url}
                          alt={issue.user.login}
                          className="h-6 w-6 rounded-full mr-2"
                          loading="lazy"
                        />
                        <span className="text-sm text-gray-600">{issue.user.login}</span>
                        <span className="text-sm text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">{formatDate(issue.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {issue.labels?.slice(0, 3).map((label) => (
                        <span
                          key={label.name}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: `#${label.color}`,
                            color: getContrastColor(label.color),
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    Perfect for new contributors! Click to view details and start working.
                  </p>
                </motion.a>
              ))}
            </div>
            <div className="text-center mt-6">
              <motion.a
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/issues?q=is:open+is:issue+label:"good+first+issue"`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-shadow"
              >
                <BugAntIcon className="h-5 w-5 mr-2" />
                View All Good First Issues
              </motion.a>
            </div>
          </div>
        )}

           {/* Branch Naming Rules */}
        <div className="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🌿 Branch Naming Rules
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Every branch must be linked to a GitHub issue. This helps us track changes and
            maintain a clean commit history.
          </p>

          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              {branchRules.map((rule) => (
                <button
                  key={rule.type}
                  onClick={() => setBranchType(rule.type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    branchType === rule.type
                      ? `${rule.color} text-white`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <rule.icon className="h-5 w-5 inline mr-2" />
                  {rule.type}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {branchRules
                .filter((rule) => rule.type === branchType)
                .map((rule) => (
                  <motion.div
                    key={rule.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-4 max-w-2xl mx-auto">
                      <div className="font-mono text-lg">
                        <span className="text-green-400">git checkout -b </span>
                        <span className="text-yellow-300">{rule.example}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Pattern</h4>
                        <code className="text-sm bg-gray-100 p-2 rounded block">
                          {rule.pattern}
                        </code>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Use For</h4>
                        <p className="text-gray-600">{rule.description}</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <p className="text-gray-600">
                          Must reference GitHub issue #
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Issue Linking Example */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
              Issue & Branch Linking Example
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Create an issue: <strong>&quot;Add dark mode support&quot;</strong>
                  </p>
                  <p className="text-sm text-gray-500">Issue #{openIssues[0]?.number || 42}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Create branch:{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      feature/issue-{openIssues[0]?.number || 42}-add-dark-mode
                    </code>
                  </p>
                  <p className="text-sm text-gray-500">Includes issue number in branch name</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    In PR description:{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      Closes #{openIssues[0]?.number || 42}
                    </code>
                  </p>
                  <p className="text-sm text-gray-500">Automatically links and closes issue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Make Your First Contribution?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join a growing community of developers building the future of portfolio management.
              Your code could help thousands of developers showcase their work!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-shadow"
              >
                <BugAntIcon className="h-6 w-6 mr-2" />
                Browse Open Issues
              </motion.a>
              <motion.a
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/discussions`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                Join Discussions
              </motion.a>
            </div>

            <div className="mt-12 pt-8 border-t border-blue-500/30">
              <h3 className="text-xl font-semibold text-white mb-6">
                Need Help Getting Started?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <CommandLineIcon className="h-10 w-10 text-white mb-4" />
                  <h4 className="font-semibold text-white mb-2">Development Setup</h4>
                  <p className="text-blue-100 text-sm">
                    Follow our detailed setup guide in the README
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <LightBulbIcon className="h-10 w-10 text-white mb-4" />
                  <h4 className="font-semibold text-white mb-2">Good First Issues</h4>
                  <p className="text-blue-100 text-sm">
                    Look for issues tagged &quot;good first issue&quot;
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <CalendarIcon className="h-10 w-10 text-white mb-4" />
                  <h4 className="font-semibold text-white mb-2">Office Hours</h4>
                  <p className="text-blue-100 text-sm">
                    Join our weekly contributor sync calls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}