// MobileDrawer.tsx
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import AppIcons from "../../../public/icons/appIcons";
import Button from "./button/Button";


interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    id: string;
    label: string;
    count: string;
  }>;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  menuItems,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <Image src="/logo.png" alt="logo" width={80} height={80} />
            <button onClick={onClose} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={AppIcons.profileIcon}
                  alt="profile"
                  className="w-6 h-6"
                  height={2}
                  width={2}
                />
                <span className="text-gray-700">Profile</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={AppIcons.favouriteIcon}
                  alt="wishlist"
                  className="w-6 h-6"
                  height={2}
                  width={2}
                />
                <span className="text-gray-700">Wishlist</span>
              </div>
              <Button
                isSolid={true}
                title="Login"
                onClick={() => {}}
                color="primary"
                className="w-full"
              />
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                >
                  <span className="text-gray-700">{item.label}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;