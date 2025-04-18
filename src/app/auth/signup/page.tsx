"use client";

import { AuthService } from "@/services/api/authService";
import { ProfileService } from "@/services/api/profileService";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess, updateUser } from "@/store/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // setSelectedFile(file);
      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const registerUser = async (formdata: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      // First, register the user
      const authResponse = await AuthService.register(formdata);

      // Update Redux with initial auth data
      dispatch(loginSuccess(authResponse));

      // Then fetch the full profile
      const profileData = await ProfileService.getProfile(
        authResponse.user._id
      );

      // Update Redux with complete profile data
      dispatch(updateUser(profileData));

      // Redirect to home page
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //image optional

    // if (!selectedFile) {
    //   setError("Please select a profile image");
    //   return;
    // }

    const formData = new FormData(event.currentTarget);

    registerUser(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/2 space-y-8 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-between">
            <h2 className="text-4xl font-medium text-gray-900">Get Started</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign up to access all data
            </p>
          </div>

          {error && (
            <div className="w-full p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Photo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-image"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <label
                  htmlFor="profile-image"
                  className="cursor-pointer text-sm text-green-600 hover:text-green-500"
                >
                  Upload Profile Picture
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    required
                    disabled={isLoading}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    required
                    disabled={isLoading}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  disabled={isLoading}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Email address"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  maxLength={10}
                  disabled={isLoading}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Phone Number"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isLoading}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing up..." : "Sign up"}
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
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
