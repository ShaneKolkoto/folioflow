'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

interface EmailSignUpFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function EmailSignUpForm({ 
  onSuccess, 
  onError, 
  className = '' 
}: EmailSignUpFormProps) {
  const { signUpWithEmail, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [formError, setFormError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (!formData.acceptTerms) {
      setFormError('Please accept the terms and conditions');
      return;
    }

    if (passwordStrength < 75) {
      setFormError('Please use a stronger password');
      return;
    }

    const result = await signUpWithEmail(
      formData.email,
      formData.password,
      formData.name
    );

    if (result.success) {
      onSuccess?.();
      // Redirect is handled by AuthContext
    } else {
      setFormError(result.error || 'Sign up failed');
      onError?.(result.error || 'Sign up failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {formError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full pl-10 pr-10 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none"
            placeholder="Create a strong password"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={loading}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
            )}
          </button>
        </div>

        {formData.password && (
          <div className="mt-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Password strength</span>
              <span className="text-sm font-medium text-gray-900">{passwordStrength}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getStrengthColor()} transition-all duration-500`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
          Confirm Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`block w-full pl-10 pr-10 py-3.5 border-2 rounded-xl focus:ring-2 outline-none transition-all duration-200 ${
              formData.confirmPassword && formData.password !== formData.confirmPassword
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="Confirm your password"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={loading}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5 mt-0.5">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            required
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 transition-colors"
            disabled={loading}
          />
        </div>
        <label htmlFor="acceptTerms" className="text-sm text-gray-700">
          I agree to the Terms of Service and Privacy Policy
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}