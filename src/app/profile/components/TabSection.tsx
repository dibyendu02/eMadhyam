// src/components/profile/TabSection.tsx
import { TabSectionProps } from "@/commons/types/profile";
import { Lock, MapPin, User } from "lucide-react";
import { useState } from "react";
import { AddressSection } from "./AddressSection";
import { PasswordSection } from "./PasswordSection";
import { ProfileForm } from "./ProfileForm";

type TabId = "profile" | "address" | "password";

export const TabSection: React.FC<TabSectionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const tabs: Array<{
    id: TabId;
    label: string;
    mobileLabel: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "profile",
      label: "My Profile",
      mobileLabel: "Profile",
      icon: <User className="w-4 h-4 md:w-5 md:h-5" />,
    },
    {
      id: "address",
      label: "Delivery Address",
      mobileLabel: "Address",
      icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />,
    },
    {
      id: "password",
      label: "Password Manage",
      mobileLabel: "Password",
      icon: <Lock className="w-4 h-4 md:w-5 md:h-5" />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Tabs - Horizontal on mobile, Vertical on desktop */}
      <div className="md:w-64 bg-green-600 rounded-lg p-2 space-y-0 md:space-y-1 flex md:flex-col overflow-x-auto md:overflow-x-visible">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` w-full flex items-center justify-center md:justify-start gap-1 md:gap-3 px-1 py-2 md:px-4 md:py-3 text-sm font-medium rounded-md transition-colors     ${
              activeTab === tab.id
                ? "bg-green-700 text-white"
                : "text-white/80 hover:bg-green-700/50"
            }`}
          >
            {tab.icon}
            <span className="hidden md:inline">{tab.label}</span>
            <span className="md:hidden">{tab.mobileLabel}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 md:pl-6">
        {activeTab === "profile" && <ProfileForm user={user} />}
        {activeTab === "address" && (
          <AddressSection
            addresses={user.address}
            onUpdateAddress={async (index, address) =>
              console.log("Update address:", index, address)
            }
            onDeleteAddress={async (index) =>
              console.log("Delete address:", index)
            }
            user={user}
          />
        )}
        {activeTab === "password" && <PasswordSection />}
      </div>
    </div>
  );
};
