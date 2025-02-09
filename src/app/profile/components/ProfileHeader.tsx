import { User, Upload, LogOut } from "lucide-react";
import Image from "next/image";
import { ProfileHeaderProps } from "@/commons/types/profile";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onImageUpload }) => {
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
      // Clear local storage
      localStorage.removeItem("eMadhyam-token");
      localStorage.removeItem("eMadhyam-userData");

      // Clear Redux state
      dispatch(logout());

      // Redirect to home page
      router.push("/");
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Check file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('File size should be less than 5MB');
            return;
        }

        onImageUpload(file);
    };

    return (
      <div className="bg-green-600 p-4 rounded-lg text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="relative w-16 h-16 rounded-full overflow-hidden bg-white cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            {user.imageUrl ? (
              <>
                <Image
                  src={user.imageUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                {isHovered && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                )}
              </>
            ) : (
              <div className="relative w-full h-full">
                <User className="w-full h-full p-2 text-green-600" />
                {isHovered && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
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