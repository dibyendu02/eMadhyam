import React from "react";
import { AppImages } from "../../../public/images/images";
import Image from "next/image";

const SaleBanner = () => {
  return (
    <div className="w-full h-[30vh] md:h-[80vh]">
      <Image
        src={AppImages.saleBannerImg}
        height={1000}
        width={1500}
        alt="sale-banner"
        className="w-full h-full object-contain md:object-cover"
      />
    </div>
  );
};

export default SaleBanner;
