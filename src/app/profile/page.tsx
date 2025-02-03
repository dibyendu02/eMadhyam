"use client";

import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import { ProfileHeader } from "@/app/profile/components/ProfileHeader";
import { TabSection } from "@/app/profile/components/TabSection";
import { IUser } from "@/commons/types/profile";

const ProfilePage = () => {
  // Mock user data - replace with actual data from your backend
  const user: IUser = {
    name: "Sonia Dutta",
    email: "example@gmail.com",
    firstName: "Sonia",
    lastName: "Dutta",
    phone: "+91 8343805693",
    gender: "female",
    addresses: [
      {
        type: "Home",
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
        country: "India"
      },
      {
        type: "Office",
        street: "456 Business Park",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400002",
        country: "India"
      }
    ]
  };

  const handleImageUpload = async (file: File) => {
    try {
      console.log('Uploading image:', file);
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

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
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
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