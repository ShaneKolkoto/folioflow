"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import packageJson from '../../package.json'
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
  console.log(process.env.NEXT_PUBLIC_STATUS)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
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
    router.push('/');
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
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200">
                <span className="text-xl font-bold text-white">CV</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                {packageJson.displayName}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated
              ? // Dashboard navigation for logged in users
                dashboardItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors ${
                        pathname === item.href
                          ? "text-blue-600 font-medium"
                          : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })
              : // Public navigation for guests
                navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.id)}
                    className={`text-gray-700 hover:text-blue-600 transition-colors cursor-pointer ${
                      pathname === item.href ? "text-blue-600 font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              // Loading state
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              // User menu for logged in users
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-8 w-8 rounded-full border-2 border-gray-200 group-hover:border-blue-500 transition-colors"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {user?.displayName?.[0]?.toUpperCase() ||
                            user?.email?.[0]?.toUpperCase() ||
                            "U"}
                        </span>
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                        {user?.displayName ||
                          user?.email?.split("@")[0] ||
                          "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">
                        {user?.subscriptionTier === "free"
                          ? "Free Plan"
                          : user?.subscriptionTier === "pro" ? "Pro Plan" : "Unlimted Plan"}
                      </p>
                    </div>
                    <ChevronDownIcon
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-5">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="h-10 w-10 rounded-full border-2 border-gray-200"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user?.displayName?.[0]?.toUpperCase() ||
                                user?.email?.[0]?.toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                user?.subscriptionTier === "free"
                                  ? "bg-blue-100 text-blue-800"
                                  : user?.subscriptionTier === "pro" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-red-800"
                              }`}
                            >
                              {user?.subscriptionTier === "free"
                          ? "Free Plan"
                          : user?.subscriptionTier === "pro" ? "Pro Plan" : "Unlimted Plan"}
                            </span>
                            {user?.apiKey && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
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
                            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {item.label}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout Button */}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors group"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              null
              // Auth buttons for guests
              // <>
              //   <Link
              //     href="/auth/login"
              //     className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              //   >
              //     Log in
              //   </Link>
              //   <Link
              //     href="/auth/create-account"
              //     className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg shadow-md"
              //   >
              //     Sign up free
              //   </Link>
              // </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {isAuthenticated && !loading && (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 mr-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6" />
                )}
              </button>
            )}
            <button
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                // Mobile dashboard navigation for logged in users
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ChartBarIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/cv-builder"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>CV Builder</span>
                  </Link>
                  <Link
                    href="/api-docs"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CodeBracketIcon className="h-5 w-5" />
                    <span>API Docs</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                // Mobile public navigation for guests
                <>
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        handleScroll(e, item.id);
                        setIsMenuOpen(false);
                      }}
                      className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                    >
                      {item.label}
                    </a>
                  ))}
                  {/* <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <Link
                      href="/auth/login"
                      className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/auth/create-account"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up free
                    </Link>
                  </div> */}
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile user menu */}
        {isUserMenuOpen && !isMenuOpen && isAuthenticated && (
          <div className="md:hidden absolute right-4 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.displayName?.[0]?.toUpperCase() ||
                        user?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded ${
                      user?.subscriptionTier === "free"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {user?.subscriptionTier === "free"
                      ? "Free Plan"
                      : "Pro Plan"}
                  </span>
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
                    className="flex items-center px-4 py-3 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Logout Button */}
            <div className="px-4 py-3 border-t border-gray-100">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
