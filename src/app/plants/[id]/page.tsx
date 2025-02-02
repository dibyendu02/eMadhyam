"use client";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import React from "react";
import ProductSection from "./components/ProductSection";
import TabbedInterface from "./components/TabSection";
import Footer from "@/components/footer/Footer";
import RelatedProducts from "./components/RelatedProducts";
import { dummyProductData } from "@/app/dummydata";

const page = () => {
  return (
    <div className=" bg-white ">
      <Navbar />
      <SubHeader />
      {/* <ProductSection
        title="Custom Title"
        price={150}
        rating={4.5}
        reviewCount={100}
      /> */}
      <ProductSection />
      <TabbedInterface />
      <RelatedProducts products={dummyProductData} />
      <Footer />
    </div>
  );
};

export default page;
