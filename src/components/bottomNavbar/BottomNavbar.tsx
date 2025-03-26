import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, HelpCircle, User } from "lucide-react";

const BottomNavbar = () => {
  const pathname = usePathname();

  // Check if the current path matches to apply active styling
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50 md:hidden">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center">
          <div
            className={`p-1 rounded-full ${
              isActive("/") ? "bg-green-50 text-green-600" : "text-gray-500"
            }`}
          >
            <Home size={20} />
          </div>
          <span
            className={`text-xs mt-1 ${
              isActive("/") ? "text-green-600 font-medium" : "text-gray-500"
            }`}
          >
            Home
          </span>
        </Link>

        <Link href="/my-orders" className="flex flex-col items-center">
          <div
            className={`p-1 rounded-full ${
              isActive("/my-orders")
                ? "bg-green-50 text-green-600"
                : "text-gray-500"
            }`}
          >
            <Package size={20} />
          </div>
          <span
            className={`text-xs mt-1 ${
              isActive("/my-orders")
                ? "text-green-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Orders
          </span>
        </Link>

        <Link href="/" className="flex flex-col items-center">
          <div
            className={`p-1 rounded-full ${
              isActive("/help") ? "bg-green-50 text-green-600" : "text-gray-500"
            }`}
          >
            <HelpCircle size={20} />
          </div>
          <span
            className={`text-xs mt-1 ${
              isActive("/help") ? "text-green-600 font-medium" : "text-gray-500"
            }`}
          >
            Help
          </span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center">
          <div
            className={`p-1 rounded-full ${
              isActive("/profile")
                ? "bg-green-50 text-green-600"
                : "text-gray-500"
            }`}
          >
            <User size={20} />
          </div>
          <span
            className={`text-xs mt-1 ${
              isActive("/profile")
                ? "text-green-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Account
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
