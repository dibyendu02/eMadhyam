import Image from "next/image";
import React, { useState } from "react";
import Button from "../button/Button";
import AppIcons from "../../../../public/icons/appIcons";
// Modified Navbar.tsx
import { Menu } from "lucide-react";
import MobileDrawer from "../MobileDrawer";

const Navbar = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

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
    <div className="w-full bg-white flex justify-between items-center p-4 h-16">
      {/* Mobile menu button */}
      <button className="md:hidden p-2" onClick={() => setIsDrawerOpen(true)}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <Image src="/logo.png" alt="logo" width={100} height={100} />

      <div className="flex items-center gap-5">
        <Image
          src={AppIcons.cartIcon}
          alt="cart"
          className="w-6 h-6 "
          height={2}
          width={2}
        />

        <div className="hidden md:flex items-center gap-5">
          <Image
            src={AppIcons.favouriteIcon}
            alt="wishlist"
            className="w-6 h-6"
            height={2}
            width={2}
          />
          <Image
            src={AppIcons.profileIcon}
            alt="profile"
            className="w-6 h-6"
            height={2}
            width={2}
          />
          <Button
            isSolid={true}
            title="Login"
            onClick={() => {}}
            color="primary"
          />
        </div>
      </div>
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Navbar;
