import Button from "@/commons/components/button/Button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="h-[80vh] w-full  relative">
      {/* Image positioned in the background */}
      <Image
        src="/images/hero_bg.png"
        width={800}
        height={200}
        alt="hero"
        className="w-full h-full object-cover absolute top-0 z-0" // Image at the bottom (z-0)
      />

      {/* Content above the image */}
      <div className=" absolute top-[25%] left-0 z-20 p-8 flex flex-col gap-4">
        <h1 className="text-white text-6xl font-semibold w-3/4">
          A revolution like no others
        </h1>
        <Button
          isSolid={true}
          title="Shop Now"
          onClick={handleClick}
          color="primary"
          className="w-1/3"
        />
      </div>
    </div>
  );
};

export default HeroSection;
