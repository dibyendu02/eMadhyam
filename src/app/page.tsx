"use client";
import Navbar from "@/commons/components/navbar/Navbar";
// import SubHeader from "@/commons/components/subheader/SubHeader";
import CollectionsGrid from "@/components/collection/CollectionSection";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/herosection/HeroSection";
import NewArrivals from "@/components/newarrivals/NewArrivals";
import SaleBanner from "@/components/salebanner/SaleBanner";
import TrendingAndBestSellers from "@/components/trending/TrndingSection";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import React, { useEffect } from "react";

import { fetchCategories } from "@/store/slices/categorySlice";
import SubHeader from "@/commons/components/subheader/SubHeader";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Navbar />
      <SubHeader />
      <HeroSection />
      <CollectionsGrid />
      <NewArrivals />
      <SaleBanner />
      <TrendingAndBestSellers />
      <Footer />
    </div>
  );
};

export default App;
