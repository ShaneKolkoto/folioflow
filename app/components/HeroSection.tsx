"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// CV image data with positions and animations
const cvImages = [
  {
    id: 1,
    rotation: -15,
    color: "from-blue-100 to-blue-50",
    border: "border-blue-200",
    title: "Modern Tech CV",
    position: "Software Engineer",
  },
  {
    id: 2,
    rotation: 15,
    color: "from-green-100 to-green-50",
    border: "border-green-200",
    title: "Design Portfolio",
    position: "UX Designer",
  },
  {
    id: 3,
    rotation: -15,
    color: "from-purple-100 to-purple-50",
    border: "border-purple-200",
    title: "Executive CV",
    position: "Product Manager",
  },
  {
    id: 4,
    rotation: 15,
    color: "from-amber-100 to-amber-50",
    border: "border-amber-200",
    title: "Academic CV",
    position: "Data Scientist",
  },
];

// Floating CV Card Component
function FloatingCVCard({
  rotation,
  color,
  border,
  title,
  position,
  index,
}: {
  rotation: number;
  color: string;
  border: string;
  title: string;
  position: string;
  index: number;
}) {
  return (
    <div
      className={`absolute w-40 h-56 md:w-48 md:h-64 rounded-lg ${color} border ${border} shadow-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
      style={{
        transform: `rotate(${rotation}deg)`,
        animation: `float 8s ease-in-out infinite`,
        animationDelay: `${index * 1}s`,
      }}
    >
      <div className="h-2 w-full bg-gradient-to-r from-gray-300 to-gray-100 rounded mb-3"></div>
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        <div>
          <div className="h-3 w-20 bg-gradient-to-r from-gray-400 to-gray-300 rounded">
            <p className="ml-1 text-[8px] font-bold">{title}</p>
          </div>
          <div className="h-2 w-16 bg-gradient-to-r from-gray-300 to-gray-200 rounded mt-1">
            <p className="ml-0 text-[6px] text-nowrap px-1">{position}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
        <div className="h-2 w-4/5 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
        <div className="h-2 w-3/4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-300">
        <div className="h-2 w-16 bg-gradient-to-r from-gray-400 to-gray-300 rounded"></div>
        <div className="h-2 w-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded mt-1"></div>
      </div>
      {/* <div className="absolute -bottom-2 -right-2 w-12 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-[10px] font-medium text-white">API</span>
      </div> */}
      <div className="absolute -top-2 -left-2 w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
        <span className="text-[10px] font-medium text-white">✓</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Add floating animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotation));
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating CV Images in Hero Section */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {cvImages.map((cv, index) => {
            // Calculate positions for hero section
            let positionClass = "";
            let zIndex = "";

            switch (index) {
              case 0:
                positionClass = "top-20 left-4 md:left-1/7";
                zIndex = "z-0";
                break;
              case 1:
                positionClass = "top-20 right-4 md:right-1/4";
                zIndex = "z-0";
                break;
              case 2:
                positionClass = "top-1/2 left-8 md:left-20";
                zIndex = "z-0";
                break;
              case 3:
                positionClass = "top-1/2 right-8 md:right-1/5";
                zIndex = "z-0";
                break;
            }

            return (
              <div
                key={cv.id}
                className={`absolute ${positionClass} ${zIndex}`}
                style={
                  { "--rotation": `${cv.rotation}deg` } as React.CSSProperties
                }
              >
                <FloatingCVCard {...cv} index={index} />
              </div>
            );
          })}
        </div>
      )}

  {/* Main Hero Content */}
  <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32 z-10">
    <div className="text-center">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
        Build Your Professional
        <span className="block text-blue-500">CV with API Superpowers</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
        Create, manage, and export beautiful CVs. Plus, get a dedicated API to fetch your CV data anytime, anywhere.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/auth/create-account"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-lg font-medium text-white hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg hover:shadow-xl"
        >
          Start Building Free
        </Link>
        <Link
          href="/api-demo"
          className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-8 py-3 text-lg font-medium text-gray-300 hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
        >
          Try API Demo
        </Link>
      </div>

      <p className="mt-12 text-gray-400">
        No credit card required • Free forever
      </p>
    </div>
  </div>

  {/* Main CV Preview */}
  <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12 lg:mt-20 lg:pb-20 z-10">
    <div className="overflow-hidden rounded-2xl border border-[#2C2C2E] bg-gradient-to-br from-[#1D1D1F] to-[#242426] shadow-2xl">
      <div className="p-8">
        <div className="flex items-center justify-between border-b border-[#3A3A3C] pb-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">CV</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">John Doe</h3>
              <p className="text-gray-400">Senior Software Engineer</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <span className="rounded-full bg-green-700 px-3 py-1 text-sm text-green-300">API Ready</span>
            <span className="rounded-full bg-blue-700 px-3 py-1 text-sm text-blue-300">Live</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Contact Info</h4>
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-700 rounded"></div>
              <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Experience</h4>
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-700 rounded"></div>
              <div className="h-2 w-4/5 bg-gray-700 rounded"></div>
              <div className="h-2 w-2/3 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {["React","Node.js","TypeScript","AWS","Docker","MongoDB"].map(skill => (
                <span key={skill} className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-800 to-blue-700 text-blue-200 border border-blue-600">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="rounded-lg border border-[#3A3A3C] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2C2C2E] transition-colors shadow-sm hover:shadow">
            Export PDF
          </button>
          <button className="rounded-lg border border-[#3A3A3C] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2C2C2E] transition-colors shadow-sm hover:shadow">
            Export JSON
          </button>
          <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg hover:shadow-xl">
            API Fetch Example
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
