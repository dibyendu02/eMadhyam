// src/components/profile/TabSection.tsx
import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { AddressSection } from "./AddressSection";
import { PasswordSection } from "./PasswordSection";
import { TabSectionProps } from "@/commons/types/profile";
import { User, MapPin, Lock } from "lucide-react";

type TabId = "profile" | "address" | "password";

export const TabSection: React.FC<TabSectionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    { id: "profile", label: "My Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "address",
      label: "Delivery Address",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "password",
      label: "Password Manage",
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  const handleSubmit = async (data: any) => {
    // Implement your submit logic here
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex ">
      {/* Vertical Tabs Sidebar */}
      <div className="w-64 bg-green-600 rounded-lg p-2 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors
                            ${
                              activeTab === tab.id
                                ? "bg-green-700 text-white"
                                : "text-white/80 hover:bg-green-700/50"
                            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 pl-6">
        {activeTab === "profile" && (
          <ProfileForm user={user} onSubmit={handleSubmit} />
        )}
        {activeTab === "address" && (
          <AddressSection
            addresses={user.addresses}
            onAddAddress={async (address) =>
              console.log("Add address:", address)
            }
            onUpdateAddress={async (index, address) =>
              console.log("Update address:", index, address)
            }
            onDeleteAddress={async (index) =>
              console.log("Delete address:", index)
            }
          />
        )}
        {activeTab === "password" && (
          <PasswordSection
            onPasswordChange={async (data) =>
              console.log("Password change:", data)
            }
          />
        )}
      </div>
    </div>
  );
};
