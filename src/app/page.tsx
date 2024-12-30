"use client";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import HeroSection from "@/components/herosection/HeroSection";
import NewArrivals from "@/components/newarrivals/NewArrivals";
import React from "react";
import { collections, dummyProductData } from "./dummydata";
import SaleBanner from "@/components/salebanner/SaleBanner";
import TrendingAndBestSellers from "@/components/trending/TrndingSection";
import Footer from "@/components/footer/Footer";
import CollectionsGrid from "@/components/collection/CollectionSection";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <Navbar />
      <SubHeader />
      <HeroSection />
      <CollectionsGrid collections={collections} />
      <NewArrivals products={dummyProductData} />
      <SaleBanner />
      <TrendingAndBestSellers />
      <Footer />
    </div>
  );
};

export default App;
