import { useEffect, useState } from "react";
import { Gender, ProfileFormProps } from "@/commons/types/profile";
import { ProfileService } from "@/services/api/profileService";
import { updateUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/hooks";
import toast from "react-hot-toast";

const GENDER_OPTIONS: Gender[] = ["male", "female", "other"];

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGender, setSelectedGender] = useState<Gender>(user.gender);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.gender) {
      setSelectedGender(user.gender as Gender);
    }
  }, [user?.gender]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await ProfileService.updateProfile(user._id, formData);
      dispatch(updateUser(response.user));
      toast.success(response.message, {
        duration: 2000,
      });
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value as Gender);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 bg-white">
        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded-md">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            defaultValue={user.phoneNumber}
            required
            disabled
            className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="flex gap-4">
            {GENDER_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={selectedGender === option}
                  onChange={handleGenderChange}
                  disabled={isLoading}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
