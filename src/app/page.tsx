// pages/home/App.tsx
"use client";
import Navbar from "@/commons/components/navbar/Navbar";
import CollectionsGrid from "@/components/collection/CollectionSection";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/herosection/HeroSection";
// import NewArrivals from "@/components/newarrivals/NewArrivals";
import SaleBanner from "@/components/salebanner/SaleBanner";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import React, { useEffect } from "react";

import { fetchCategories } from "@/store/slices/categorySlice";
import { fetchBanners } from "@/store/slices/bannerSlice";
import SubHeader from "@/commons/components/subheader/SubHeader";
import TrendingSection from "@/components/trending/TrndingSection";
import BestsellerSection from "@/components/bestseller/BestSeller";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Navbar />
      <SubHeader />
      <HeroSection />
      <CollectionsGrid />
      {/* <NewArrivals /> */}
      <TrendingSection />
      <SaleBanner />
      <BestsellerSection />
      <Footer />
      <WhatsAppButton />
      <BottomNavbar />
    </div>
  );
};

export default App;
