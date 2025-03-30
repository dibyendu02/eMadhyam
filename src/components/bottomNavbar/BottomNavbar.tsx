import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, HelpCircle, User, Mail, Phone, X } from "lucide-react";

const BottomNavbar = () => {
  const pathname = usePathname();
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState(false);

  // Check if the current path matches to apply active styling
  const isActive = (path: any) => {
    return pathname === path;
  };

  const toggleHelpDrawer = () => {
    setIsHelpDrawerOpen(!isHelpDrawerOpen);
  };

  return (
    <>
      {/* Help Drawer */}
      {isHelpDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-5 z-50 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Help & Support
              </h3>
              <button
                onClick={toggleHelpDrawer}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:test@gmail.com"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="bg-green-50 p-2 rounded-full mr-3">
                  <Mail size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email Support</h4>
                  <p className="text-sm text-green-600">test@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919564259220"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="bg-green-50 p-2 rounded-full mr-3">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Call Support</h4>
                  <p className="text-sm text-green-600">+91 9564 259 220</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-40 md:hidden">
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

          <button
            onClick={toggleHelpDrawer}
            className="flex flex-col items-center"
          >
            <div
              className={`p-1 rounded-full ${
                isHelpDrawerOpen
                  ? "bg-green-50 text-green-600"
                  : "text-gray-500"
              }`}
            >
              <HelpCircle size={20} />
            </div>
            <span
              className={`text-xs mt-1 ${
                isHelpDrawerOpen
                  ? "text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              Help
            </span>
          </button>

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
    </>
  );
};

export default BottomNavbar;
