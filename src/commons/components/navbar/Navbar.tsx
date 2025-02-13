import Image from "next/image";
import React, { useState } from "react";
import Button from "../button/Button";
import AppIcons from "../../../../public/icons/appIcons";
// Modified Navbar.tsx
import { Menu } from "lucide-react";
import MobileDrawer from "../MobileDrawer";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.user);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const handleWishListButtonClick = () => {
    router.push(`/wishlist`);
  };

  const handleCartButtonClick = () => {
    router.push(`/cart`);
  };

  const cartTotalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuItems = [
    { id: "plants", label: "Plants", count: "200+" },
    { id: "seeds", label: "Seeds", count: "150+" },
    { id: "pots", label: "Pots and Planters", count: "100+" },
    { id: "new", label: "New Arrivals", count: "50+" },
    { id: "care", label: "Plant Care", count: "80+" },
    { id: "blog", label: "Blog", count: "30+" },
  ];

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
              className="w-6 h-6"
              height={2}
              width={2}
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
              <div
                className="relative cursor-pointer w-6 h-6 rounded-full overflow-hidden"
                onClick={() => router.push(`/profile`)}
              >
                <Image
                  src={
                    currentUser.imageUrl != ""
                      ? currentUser.imageUrl
                      : AppIcons.profileIcon
                  }
                  alt="profile"
                  className="w-6 h-6 "
                  height={2}
                  width={2}
                />
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
