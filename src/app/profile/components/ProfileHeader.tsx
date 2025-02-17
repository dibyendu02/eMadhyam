import { User, Upload, LogOut } from "lucide-react";
import Image from "next/image";
import { ProfileHeaderProps } from "@/commons/types/profile";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout, updateUser } from "@/store/slices/userSlice";
import { AuthService } from "@/services/api/authService";
import { ProfileService } from "@/services/api/profileService";
import toast from "react-hot-toast";

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout());
    router.push("/");
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file", {
        duration: 2000,
      });
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size should be less than 5MB", {
        duration: 2000,
      });
      return;
    }

    try {
      setIsUploading(true);

      // Create FormData with just the image
      const formData = new FormData();
      formData.append("file", file);

      const response = await ProfileService.updateProfile(user._id, formData);

      dispatch(updateUser(response.user));
      toast.success("Profile picture updated successfully", {
        duration: 2000,
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Failed to update profile picture";
      toast.error(errorMsg, {
        duration: 2000,
      });
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-green-600 p-4 rounded-lg text-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="relative w-16 h-16 rounded-full overflow-hidden bg-white cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {user.imageUrl ? (
            <>
              <Image
                src={user.imageUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
              {isHovered && !isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </>
          ) : (
            <div className="relative w-full h-full">
              <User className="w-full h-full p-2 text-green-600" />
              {isHovered && !isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-green-100">{user.email}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};
