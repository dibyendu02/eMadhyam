// components/auth/LoginRequired.tsx
"use client";

import React from "react";
import Link from "next/link";

interface LoginRequiredProps {
  message?: string;
  redirectUrl?: string;
  showSignUp?: boolean;
  className?: string;
}

const LoginRequired: React.FC<LoginRequiredProps> = ({
  message = "Please login to continue",
  redirectUrl = "/",
  showSignUp = true,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-8 text-center ${className}`}>
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-gray-900 mb-4">{message}</h2>
      <p className="text-gray-600 mb-6">
        You need to be logged in to access this content.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href={`/auth/signin?redirect=${encodeURIComponent(redirectUrl)}`}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
        >
          Login
        </Link>
        {showSignUp && (
          <Link
            href="/auth/signup"
            className="inline-block border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
          >
            Create an Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginRequired;
