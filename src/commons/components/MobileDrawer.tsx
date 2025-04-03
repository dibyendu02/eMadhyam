// MobileDrawer.tsx
import React, { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import AppIcons from "../../../public/icons/appIcons";
import Button from "./button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/api/authService";
import { logout } from "@/store/slices/userSlice";
import { fetchProductTypes } from "@/store/slices/commonSlice";

// Helper function to create slug from name
const createSlugFromName = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems?: Array<{
    id: string;
    label: string;
    count: string;
  }>;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.user);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  const { productTypes, loading: typesLoading } = useAppSelector(
    (state) => state.common
  );

  // Fetch product types when the drawer opens if they're not already loaded
  useEffect(() => {
    if (isOpen && productTypes.length === 0 && !typesLoading) {
      dispatch(fetchProductTypes());
    }
  }, [dispatch, isOpen, productTypes.length, typesLoading]);

  const handleWishListButtonClick = () => {
    router.push(`/wishlist`);
    onClose();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout());
    router.push("/");
    onClose();
  };

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
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Section */}
            <div className="p-4 border-b border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-3 mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      {currentUser.firstName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email || ""}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-3 mb-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                    onClick={() => handleNavigate("/profile")}
                  >
                    <Image
                      src={AppIcons.profileIcon}
                      alt="profile"
                      className="w-6 h-6"
                      height={2}
                      width={2}
                    />
                    <span className="text-gray-700">My Profile</span>
                  </div>

                  <div
                    className="flex items-center gap-3 mb-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                    onClick={() => handleNavigate("/my-orders")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-gray-700"
                    >
                      <path d="M9 11V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
                      <path d="M5 15H4a2 2 0 0 0-2 2v4" />
                      <path d="M22 15h-1a2 2 0 0 0-2 2v4" />
                      <path d="M9 19h6" />
                      <path d="M5 11h14v4H5z" />
                    </svg>
                    <span className="text-gray-700">My Orders</span>
                  </div>

                  <div
                    className="flex items-center gap-3 mb-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                    onClick={handleWishListButtonClick}
                  >
                    <div className="relative">
                      <Image
                        src={AppIcons.favouriteIcon}
                        alt="wishlist"
                        className="w-6 h-6"
                        height={2}
                        width={2}
                      />
                      {wishlistItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {wishlistItems.length}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-700">Wishlist</span>
                  </div>

                  <div
                    className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-red-500"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span className="text-red-500">Logout</span>
                  </div>
                </>
              ) : (
                <Button
                  isSolid={true}
                  title="Login"
                  onClick={() => {
                    router.push(`/auth/signin`);
                  }}
                  color="primary"
                  className="w-full"
                />
              )}
            </div>

            {/* Product Types Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Product Types</h3>
              {typesLoading ? (
                // Loading skeleton
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`loading-${index}`}
                      className="h-10 bg-gray-100 rounded mb-2 animate-pulse"
                    ></div>
                  ))
              ) : productTypes.length > 0 ? (
                // Product types list
                productTypes.map((type) => (
                  <div
                    key={type._id || type.id}
                    className="mb-2 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                    onClick={() =>
                      handleNavigate(
                        `/product-type/${
                          type.slug || createSlugFromName(type.name)
                        }`
                      )
                    }
                  >
                    <span className="text-gray-700">{type.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No product types available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
