import "./globals.css";
import packageJson from "../package.json";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieProvider } from "./contexts/CookieContext";

// Handlers
import ProtectedRoute from "./components/ProtectedRoute";
import HomePageHandler from "./components/HomePageHandler";

// Components
import CookieBanner from "./components/cookies/CookieBanner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./contexts/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${packageJson.displayName} | API-Driven CV Platform for Developers`,
  description:
    "Build, manage, and sync your professional CV across multiple portfolios with a single API. No more manual updates or git commits for resume changes.",
  keywords: [
    "CV builder",
    "API portfolio",
    "developer resume",
    "automated CV",
    "resume API",
    "portfolio management",
    "career tools",
    "developer tools",
  ],
  openGraph: {
    title: `${packageJson.displayName} - Update Once, Sync Everywhere`,
    description:
      "Stop pushing git commits for resume updates. A modern CV platform with API superpowers for developers.",
    type: "website",
    url: "https://folioflow.dev",
    siteName: "FolioFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FolioFlow - API-Driven CV Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${packageJson.displayName} | Build Your CV with API Superpowers`,
    description:
      "One update → Every portfolio. The end of manual resume maintenance.",
    images: ["/twitter-image.png"],
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        {/* <ErrorBoundary> */}
          <Suspense fallback={<LoadingFallback />}>
            <AuthProvider>
              <ProtectedRoute>
                <CookieProvider>
                  <HomePageHandler />
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                  <ScrollToTop />
                  <Footer />
                  <CookieBanner />
                </CookieProvider>
              </ProtectedRoute>
            </AuthProvider>
          </Suspense>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
