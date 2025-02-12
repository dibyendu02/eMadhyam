"use client";

import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/2 space-y-8 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2  items-center justify-between ">
            <h2 className="text-4xl font-medium text-gray-900">Get Started</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign up to access all data
            </p>
          </div>
          <form className="w-full mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter a username"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your mail"
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>

            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-500">Already have an account?</span>
              <Link
                href="/auth/signin"
                className="ml-1 text-green-600 hover:text-green-500"
              >
                Login now
              </Link>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 h-screen py-24">
          <div className="relative w-full h-full">
            <Image
              src="/images/auth_page_image.png"
              alt="Decorative plant"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
