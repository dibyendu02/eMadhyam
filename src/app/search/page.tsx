"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";
import { Product } from "@/commons/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";
import { PriceRange, ProductSeason } from "@/commons/constants";
import {
  fetchColors,
  fetchPlantTypes,
  fetchProductTypes,
} from "@/store/slices/commonSlice";
import ProductGrid from "./components/ProductGrid";
import ProductTypeHeader from "./components/ProductTypeHeader";
import ProductFilters from "./components/ProductFilters";
import MobileFilterDrawer from "./components/MobileFilterDrawer";

export interface FilterState {
  colors: string[];
  plantTypes?: string[];
  seasons: string[];
  priceRange: number[];
  inStock: boolean;
}

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const dispatch = useAppDispatch();

  // Access products and categories from Redux store
  const allProducts = useAppSelector((state) => state.products.items);
  const loading = useAppSelector((state) => state.products.loading);
  const { colors } = useAppSelector((state) => state.common);

  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [PriceRange.zero, PriceRange.nineThousandFiveHundred],
    colors: [],
    seasons: [],
    inStock: false,
  });

  // Fetch products and common data if not already loaded
  useEffect(() => {
    if (allProducts.length === 0 && !loading) {
      dispatch(fetchProducts());
    }

    // Load colors for filters
    dispatch(fetchColors());
    dispatch(fetchProductTypes());
    dispatch(fetchPlantTypes());
  }, [dispatch, allProducts.length, loading]);

  // Apply search and filters to get results
  useEffect(() => {
    if (!query && allProducts.length === 0) return;

    const lowerCaseQuery = query.toLowerCase();

    // First filter by search query
    let filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        (product.category?.name?.toLowerCase() || "").includes(
          lowerCaseQuery
        ) ||
        (product.shortDescription?.toLowerCase() || "").includes(
          lowerCaseQuery
        ) ||
        (product.productType?.name?.toLowerCase() || "").includes(
          lowerCaseQuery
        )
    );

    // Apply price range filter
    if (
      filters.priceRange[0] !== PriceRange.zero ||
      filters.priceRange[1] !== PriceRange.nineThousandFiveHundred
    ) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.color && filters.colors.includes(product.color.name)
      );
    }

    // Apply season filter - Fixed to handle ProductSeason properly
    if (filters.seasons.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.seasons.includes(product.season || "All")
      );
    }

    // Apply in-stock filter
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter((product) => product.inStock);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      // 'relevance' is the default sort (or rather, no specific sort)
    }

    setSearchResults(filteredProducts);
  }, [query, allProducts, filters, sortOption]);

  // Handle filter changes
  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string | boolean | number[]
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterType === "priceRange" && Array.isArray(value)) {
        newFilters.priceRange = value as number[];
      } else if (filterType === "inStock" && typeof value === "boolean") {
        newFilters.inStock = value;
      } else if (typeof value === "string") {
        // Handle array-based filters (colors, seasons)
        const arrayValue = value as string;
        const currentArray = newFilters[filterType] as string[];

        if (currentArray.includes(arrayValue)) {
          // Remove value if already selected
          newFilters[filterType] = currentArray.filter(
            (item) => item !== arrayValue
          ) as any;
        } else {
          // Add value if not selected
          newFilters[filterType] = [...currentArray, arrayValue] as any;
        }
      }

      return newFilters;
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      priceRange: [PriceRange.zero, PriceRange.nineThousandFiveHundred],
      colors: [],
      seasons: [],
      inStock: false,
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <SubHeader />

      {/* Product Type Header with search info */}
      <ProductTypeHeader
        productTypeName={`Search results for "${query}"`}
        productCount={searchResults.length}
        onSortChange={setSortOption}
        currentSort={sortOption}
        setFilterDrawerOpen={setIsFilterDrawerOpen}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <ProductFilters
                onFilterChange={handleFilterChange}
                selectedFilters={filters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Results grid using ProductGrid component */}
          <div className="flex-1">
            <ProductGrid products={searchResults} />

            {/* No results message - only show when not loading and no results */}
            {!loading && searchResults.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">
                  No products found
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any products that match your search. Try
                  using different keywords or browse our categories.
                </p>
                <a
                  href="/"
                  className="inline-block py-2 px-6 bg-green-600 text-white rounded-lg font-medium"
                >
                  Return to Homepage
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
        onClearFilters={handleClearFilters}
      />

      <Footer />
      <WhatsAppButton phoneNumber="919564259220" />
      <BottomNavbar />
    </div>
  );
};

export default SearchResultsPage;
