import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AppIcons from "../../../../public/icons/appIcons";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileDrawer from "../MobileDrawer";
import { AuthService } from "@/services/api/authService";
import { logout } from "@/store/slices/userSlice";

const Navbar = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.user);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleWishListButtonClick = () => {
    router.push(`/wishlist`);
  };

  const handleCartButtonClick = () => {
    router.push(`/cart`);
  };

  const cartTotalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  const menuItems = [
    { id: "plants", label: "Plants", count: "200+" },
    { id: "seeds", label: "Seeds", count: "150+" },
    { id: "pots", label: "Pots and Planters", count: "100+" },
    { id: "new", label: "New Arrivals", count: "50+" },
    { id: "care", label: "Plant Care", count: "80+" },
    { id: "blog", label: "Blog", count: "30+" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full  bg-white flex justify-between items-center ">
      {/* Mobile menu button */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 h-16 flex-1">
        <button className="md:hidden p-2" onClick={() => setIsDrawerOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <Link href="/" className="hover:text-gray-700">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>

        <div className="flex items-center gap-5">
          <div
            className="relative cursor-pointer"
            onClick={handleCartButtonClick}
          >
            <Image
              src={AppIcons.cartIcon}
              alt="cart"
              className="w-6 h-6  text-orange-500"
              height={2}
              width={2}
              style={{
                filter:
                  "invert(60%) sepia(90%) saturate(1000%) hue-rotate(360deg) brightness(100%) contrast(100%)",
              }}
            />
            {cartTotalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartTotalQuantity}
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <div
              className="relative cursor-pointer"
              onClick={handleWishListButtonClick}
            >
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

            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                <div
                  className="cursor-pointer w-6 h-6 rounded-full overflow-hidden"
                  onClick={handleProfileClick}
                >
                  <Image
                    src={
                      currentUser.imageUrl != ""
                        ? currentUser.imageUrl
                        : AppIcons.profileIcon
                    }
                    alt="profile"
                    className="w-6 h-6"
                    height={2}
                    width={2}
                  />
                </div>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">
                        {currentUser.firstName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo("/profile")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigateTo("/my-orders")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                isSolid={true}
                title="Login"
                onClick={() => {
                  router.push(`/auth/signin`);
                }}
                color="primary"
              />
            )}
          </div>
        </div>
        {/* Mobile Drawer */}
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          menuItems={menuItems}
        />
      </div>
    </div>
  );
};

export default Navbar;
