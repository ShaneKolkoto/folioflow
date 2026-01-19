"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import packageJson from "../../package.json";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  ChartBarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  console.log(process.env.NEXT_PUBLIC_STATUS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Function to handle smooth scroll on home page
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const element = document.getElementById(id);

      if (id === "api-docs" || id === "api-demo") {
        window.location.href = `/${id}`;
      }

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMenuOpen(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Navigation items
  const navItems = [
    { href: "/#features", label: "Features", id: "features" },
    { href: "/#how-it-works", label: "How It Works", id: "how-it-works" },
    { href: "/api-demo", label: "API Demo", id: "api-demo" },
    { href: "/api-docs", label: "API Docs", id: "api-docs" },
  ];

  // Dashboard navigation items (shown when logged in)
  const dashboardItems = [
    { href: "/dashboard", label: "Dashboard", icon: ChartBarIcon },
    { href: "/cv-builder", label: "CV Builder", icon: DocumentTextIcon },
    { href: "/api-docs", label: "API Docs", icon: CodeBracketIcon },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  // User menu items
  const userMenuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: ChartBarIcon,
      description: "Overview & analytics",
    },
    {
      href: "/cv-builder",
      label: "CV Builder",
      icon: DocumentTextIcon,
      description: "Edit your CV",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Cog6ToothIcon,
      description: "Account preferences",
    },
  ];

  // Don't show navbar on auth pages
  // if (pathname.startsWith('/auth/')) {
  //   return null;
  // }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-[#1D1D26]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200 dark:from-blue-700 dark:to-blue-800 dark:group-hover:from-blue-600 dark:group-hover:to-blue-700">
                <span className="text-xl font-bold text-white">CV</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline dark:text-white">
                {packageJson.displayName}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated
              ? dashboardItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400 ${
                        pathname === item.href
                          ? "text-blue-600 font-medium dark:text-blue-400"
                          : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })
              : navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.id)}
                    className={`text-gray-700 hover:text-blue-600 transition-colors cursor-pointer dark:text-gray-300 dark:hover:text-blue-400 ${
                      pathname === item.href
                        ? "text-blue-600 font-medium dark:text-blue-400"
                        : ""
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-8 w-8 rounded-full border-2 border-gray-200 group-hover:border-blue-500 dark:border-gray-600 dark:group-hover:border-blue-400 transition-colors"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {user?.displayName?.[0]?.toUpperCase() ||
                            user?.email?.[0]?.toUpperCase() ||
                            "U"}
                        </span>
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[120px] dark:text-white">
                        {user?.displayName ||
                          user?.email?.split("@")[0] ||
                          "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px] dark:text-gray-400">
                        {user?.subscriptionTier === "free"
                          ? "Free Plan"
                          : user?.subscriptionTier === "pro"
                            ? "Pro Plan"
                            : "Unlimited Plan"}
                      </p>
                    </div>
                    <ChevronDownIcon
                      className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1D1D26] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in slide-in-from-top-5">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user?.displayName?.[0]?.toUpperCase() ||
                                user?.email?.[0]?.toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                user?.subscriptionTier === "free"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900"
                                  : user?.subscriptionTier === "pro"
                                    ? "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900"
                                    : "bg-yellow-100 text-red-800 dark:bg-yellow-200 dark:text-red-900"
                              }`}
                            >
                              {user?.subscriptionTier === "free"
                                ? "Free Plan"
                                : user?.subscriptionTier === "pro"
                                  ? "Pro Plan"
                                  : "Unlimited Plan"}
                            </span>
                            {user?.apiKey && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900">
                                API Ready
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="py-2">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-700 transition-colors">
                                <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.label}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout Button */}
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-600 hover:text-red-700 dark:hover:text-red-200 transition-colors group">
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              {isAuthenticated
                ? dashboardItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))
                : navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        handleScroll(e, item.id);
                        setIsMenuOpen(false);
                      }}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      {item.label}
                    </a>
                  ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
