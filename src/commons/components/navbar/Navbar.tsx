import Image from "next/image";
import React from "react";
import Button from "../button/Button";
import AppIcons from "../../../../public/icons/appIcons";

const Navbar = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };
  return (
    <div className="w-full bg-white flex justify-between items-center p-4 h-16">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <div className="flex items-center gap-5">
        <Image
          src={AppIcons.cartIcon}
          alt="cart"
          className="w-6 h-6 "
          height={2}
          width={2}
        />

        <Image
          src={AppIcons.favouriteIcon}
          alt="cart"
          className="w-6 h-6"
          height={2}
          width={2}
        />
        <Image
          src={AppIcons.profileIcon}
          alt="cart"
          className="w-6 h-6"
          height={2}
          width={2}
        />

        <Button
          isSolid={true}
          title="Login"
          onClick={handleClick}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Navbar;
