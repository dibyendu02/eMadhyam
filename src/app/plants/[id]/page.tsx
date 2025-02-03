"use client";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import React from "react";
import ProductSection from "./components/ProductSection";
import TabbedInterface from "./components/TabSection";
import Footer from "@/components/footer/Footer";
import RelatedProducts from "./components/RelatedProducts";
import { dummyProductData } from "@/app/dummydata";
import { useParams } from "next/navigation";
import { defaultNullProduct } from "@/commons/constants";

const ProductPage = () => {
  const params = useParams();
  console.log(params);
  const productId = params.id as string;

  const productData = dummyProductData.find(
    (product) => product.id === productId
  );

  const relatedProducts = dummyProductData
    .filter((product) => product.plantType === productData?.plantType)
    .filter((product) => product.id !== productId);

  return (
    <div className="bg-white ">
      <Navbar />
      <SubHeader />

      <ProductSection productData={productData ?? defaultNullProduct} />

      <TabbedInterface />
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
