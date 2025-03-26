"use client";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCurrentProduct,
  fetchProductById,
} from "@/store/slices/productSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductSection from "./components/ProductSection";
import RelatedProducts from "./components/RelatedProducts";
import TabbedInterface from "./components/TabSection";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";

const ProductPage = () => {
  const params = useParams();
  console.log(params);
  const productId = params.id as string;

  const dispatch = useAppDispatch();

  const { currentProduct, items: allProducts } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Fetch the product when the component mounts
    dispatch(fetchProductById(productId));

    // Clear the current product when unmounting
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  const relatedProducts = allProducts
    .filter((product) => product.category._id === currentProduct?.category._id)
    .filter((product) => product._id !== productId);

  return (
    <div className=" bg-white ">
      <Navbar />
      <SubHeader />
      <ProductSection />
      <TabbedInterface />
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
      <WhatsAppButton phoneNumber="919641131615" />
      <BottomNavbar />
      <Footer />
    </div>
  );
};

export default ProductPage;
