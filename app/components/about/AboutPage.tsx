/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
// app/about/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  SparklesIcon,
  CommandLineIcon,
  ServerIcon,
  UserGroupIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  BoltIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  BeakerIcon,
  // HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutPage() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "git push origin anxiety";
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      if (typingIndex < fullText.length) {
        setTypingIndex(typingIndex + 1);
      } else {
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setTypingIndex(0);
            setIsTyping(true);
          }, 3000);
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [typingIndex, isTyping, fullText]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const floatAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className=" bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-50 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="inline-block p-4 rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8"
            >
              <RocketLaunchIcon className="h-16 w-16 text-blue-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Built by Developers,
              </span>
              <br />
              <span className="bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                For Developers
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Tired of the endless cycle of updating your portfolio? 
              <span className="text-blue-300 font-semibold"> We get it.</span>
            </p>

            {/* Animated Git Command */}
            <motion.div
              className="inline-block bg-gray-900 border border-gray-700 rounded-xl p-4 mb-8 font-mono"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400">→</span>
                <span className="text-gray-400">git commit -m &ldquo;</span>
                <span className="text-yellow-300">
                  {fullText.substring(0, typingIndex)}
                  <span className={`inline-block w-2 h-6 bg-yellow-300 ml-1 ${isTyping ? 'animate-pulse' : ''}`} />
                </span>
                <span className="text-gray-400">&ldquo;</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16"
          >
            {[
              { label: "Git Commits Saved", value: "10,000+", icon: <ArrowPathIcon className="h-6 w-6" /> },
              { label: "Hours of Dev Time", value: "5,000+", icon: <BoltIcon className="h-6 w-6" /> },
              { label: "Portfolios Managed", value: "2,500+", icon: <UserGroupIcon className="h-6 w-6" /> },
              { label: "API Calls/Day", value: "1M+", icon: <ServerIcon className="h-6 w-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-linear-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm text-center"
              >
                <div className="inline-block p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 mb-4">
                  <div className="text-blue-400">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-800/50 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp as any} className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-red-500/20 to-orange-500/20 text-red-400 border border-red-500/30">
                <LightBulbIcon className="h-5 w-5 mr-2" />
                The Frustration
              </span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp as any} className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-red-400">Pain</span> We Felt
            </motion.h2>
            
            <motion.p variants={fadeInUp as any} className="text-xl text-gray-300 max-w-3xl mx-auto">
              As developers, we&apos;ve all been there. That sinking feeling when you need to update your portfolio...
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "The Git Dance",
                description: "Add job → Commit → Push → Wait for deployment → Repeat",
                emoji: "💃",
                color: "from-red-500/20 to-orange-500/20",
                border: "border-red-500/30"
              },
              {
                title: "Broken Formatting",
                description: "Spend hours fixing CSS instead of actually building your portfolio",
                emoji: "💔",
                color: "from-orange-500/20 to-yellow-500/20",
                border: "border-orange-500/30"
              },
              {
                title: "Inconsistent Updates",
                description: "Forget to update one portfolio while another stays current",
                emoji: "😵‍💫",
                color: "from-yellow-500/20 to-green-500/20",
                border: "border-yellow-500/30"
              },
            ].map((pain, index) => (
              <motion.div
                key={index}
                variants={fadeInUp as any}
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                className={`bg-linear-to-br ${pain.color} p-8 rounded-2xl border ${pain.border} backdrop-blur-sm`}
              >
                <motion.div
                  animate={floatAnimation.animate as any}
                  className="text-4xl mb-4"
                >
                  {pain.emoji}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{pain.title}</h3>
                <p className="text-gray-300">{pain.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-green-500/20 to-cyan-500/20 text-green-400 border border-green-500/30">
                <SparklesIcon className="h-5 w-5 mr-2" />
                The Magic
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              One Update,{' '}
              <span className="bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Everywhere
              </span>
            </motion.h2>
          </motion.div>

          {/* The Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Connection Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-32" viewBox="0 0 800 100">
                <defs>
                  <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,50 Q200,50 250,50 Q400,50 450,50 Q600,50 750,50"
                  stroke="url(#flow-gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,10"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>

            {/* Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  step: "1",
                  title: "Update Once",
                  description: "Add your new job/education/skill to FolioFlow",
                  icon: <CloudArrowUpIcon className="h-8 w-8" />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "2",
                  title: "API Magic",
                  description: "Your portfolio pulls fresh data automatically",
                  icon: <CpuChipIcon className="h-8 w-8" />,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "3",
                  title: "Live Everywhere",
                  description: "All your portfolios update instantly",
                  icon: <GlobeAltIcon className="h-8 w-8" />,
                  color: "from-green-500 to-emerald-500"
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div
                    animate={pulseAnimation.animate as any}
                    className={`h-20 w-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                  >
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </motion.div>
                  <div className="inline-block px-3 py-1 rounded-full bg-gray-800 text-sm font-medium mb-3">
                    Step {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Developer Love Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ rotateY: 90 }}
              whileInView={{ rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Built with{' '}
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1 
                }}
                className="inline-block text-red-400"
              >
                ❤️
              </motion.span>
              {' '}for Developers
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  title: "No More Manual Updates",
                  description: "Update your CV in one place, and watch it propagate everywhere automatically.",
                  icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />
                },
                {
                  title: "API-First Design",
                  description: "Built from the ground up for developers who want programmatic control.",
                  icon: <CodeBracketIcon className="h-6 w-6 text-blue-400" />
                },
                {
                  title: "Security Focused",
                  description: "Your data is encrypted, secure, and always under your control.",
                  icon: <ShieldCheckIcon className="h-6 w-6 text-purple-400" />
                },
                {
                  title: "Always Evolving",
                  description: "We're developers too. We build the features we wish we had.",
                  icon: <BeakerIcon className="h-6 w-6 text-cyan-400" />
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-linear-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Code Editor Animation */}
              <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
                <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-4 text-sm text-gray-400 font-mono">portfolio-api.js</div>
                </div>
                <div className="p-6 font-mono text-sm">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-gray-400">{"// Update your portfolio in one line"}</div>
                    <div className="text-blue-400 mt-4">const</div>
                    <div className="text-green-400 ml-4">response</div>
                    <div className="text-gray-300 ml-4">=</div>
                    <div className="text-yellow-300 ml-4">await</div>
                    <div className="text-cyan-400 ml-4">folioflow</div>
                    <div className="text-gray-300 ml-4">.</div>
                    <div className="text-purple-400 ml-4">updateCV</div>
                    <div className="text-gray-300 ml-4">(</div>
                    <div className="text-gray-400 ml-4">{'{'}</div>
                    <div className="text-gray-300 ml-8">
                      <span className="text-green-400">job</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-yellow-300">&ldquo;Senior Developer @ AwesomeCo&ldquo;</span>
                    </div>
                    <div className="text-gray-400 ml-4">{'}'}</div>
                    <div className="text-gray-300 ml-4">)</div>
                    <div className="text-gray-400 ml-4">;</div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={floatAnimation.animate as any}
                className="absolute -top-6 -right-6 h-12 w-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl"
              >
                <BoltIcon className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-6 -left-6 h-12 w-12 rounded-xl bg-linear-to-br from-green-500 to-cyan-600 flex items-center justify-center shadow-xl"
              >
                <SparklesIcon className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-900/20 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ 
                backgroundSize: '200% 100%',
                backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399, #60a5fa)'
              }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
            >
              Ready to Stop Pushing?
            </motion.h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who&apos;ve ditched the git push anxiety.
              Focus on what matters — building amazing things.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Link
              href="/auth/create-account"
              className="group inline-flex items-center px-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-2xl"
            >
              <span>Start Building Smarter</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-3"
              >
                <CommandLineIcon className="h-6 w-6" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Final Quote */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-8 rounded-2xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm max-w-lg mx-auto"
          >
            <motion.div
              animate={floatAnimation.animate}
              className="text-4xl mb-4"
            >
              💻
            </motion.div>
            <p className="text-gray-300 italic">
              "FolioFlow saved me from doing 100+ unnecessary git commits last year. 
              Now I actually enjoy updating my portfolio."
            </p>
            <div className="mt-4 text-gray-400">
              — A Happy Developer
            </div>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
}