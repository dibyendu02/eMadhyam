import Button from "@/commons/components/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const navigate = useRouter();
  function handleClick(): void {
    // Implement your click handler
    navigate.push("/collections/outdoor-plant");
  }

  return (
    <div className="h-[80vh] w-full relative overflow-hidden">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />

      {/* Background Image */}
      <Image
        src="/images/hero_bg.png"
        fill
        priority
        alt="hero"
        className="object-cover object-center transform scale-105 animate-subtle-zoom"
        sizes="100vw"
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-8 animate-slide-up">
            {/* Main Heading */}
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              A Revolution
              <span className="block mt-2 text-green-400">Like No Others</span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-lg sm:text-xl max-w-xl">
              Transform your space with our curated collection of premium indoor
              plants, designed to bring life and beauty to your home.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                isSolid={true}
                title="Shop Now"
                onClick={handleClick}
                color="primary"
                className="text-lg px-8 py-3 shadow-lg hover:shadow-green-500/20"
              />
              <Button
                isSolid={false}
                title="Learn More"
                onClick={handleClick}
                color="primary"
                className="text-lg px-8 py-3 border-2 text-white hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 z-10 p-8 hidden lg:block">
        <div className="flex items-center gap-8 text-white/80">
          <div className="text-center">
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm">Plant Species</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">98%</p>
            <p className="text-sm">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
