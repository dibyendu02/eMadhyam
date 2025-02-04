"use client";

import { ProfileHeader } from "@/app/profile/components/ProfileHeader";
import { TabSection } from "@/app/profile/components/TabSection";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import { useAppSelector } from "@/store/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);

  const handleImageUpload = async (file: File) => {
    try {
      console.log("Uploading image:", file);
      // Create FormData
      const formData = new FormData();
      formData.append("image", file);

      // // Make API call to upload image
      // const response = await fetch('/api/upload-profile-image', {
      //   method: 'POST',
      //   body: formData
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to upload image');
      // }

      // const data = await response.json();
      // Update user profile image URL in your state/storage
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <SubHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <ProfileHeader user={user} onImageUpload={handleImageUpload} />
          <TabSection user={user} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
