"use client";

import { ProfileHeader } from "@/app/profile/components/ProfileHeader";
import { TabSection } from "@/app/profile/components/TabSection";
import LoginRequired from "@/commons/components/loginRequired.LoginRequired";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";
import { useAppSelector } from "@/store/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <SubHeader />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto space-y-6">
          {user && user._id ? (
            <>
              <ProfileHeader user={user} />
              <TabSection user={user} />
            </>
          ) : (
            <LoginRequired
              message="Please login to view your profile"
              redirectUrl="/profile"
            />
          )}
        </div>
      </main>
      <WhatsAppButton phoneNumber="919641131615" />
      <BottomNavbar />
      <Footer />
    </div>
  );
};

export default ProfilePage;
