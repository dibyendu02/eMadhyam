// components/salebanner/SaleBanner.tsx
"use client";
import React from "react";
import { AppImages } from "../../../public/images/images";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const SaleBanner = () => {
  const { offerBanner } = useAppSelector((state) => state.banners);

  return (
    <div className="w-full h-[30vh] md:h-[80vh] relative">
      <Image
        src={offerBanner?.imageUrl || AppImages.saleBannerImg}
        fill
        alt={offerBanner?.description || "sale-banner"}
        className="w-full h-full object-contain md:object-cover"
      />
    </div>
  );
};

export default SaleBanner;
