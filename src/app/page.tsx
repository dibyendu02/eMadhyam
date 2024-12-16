"use client";
import Button from "@/commons/components/button/Button";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import HeroSection from "@/components/herosection/HeroSection";
import React from "react";

const App: React.FC = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <Navbar />
      <SubHeader />
      <HeroSection />
    </div>
  );
};

export default App;
