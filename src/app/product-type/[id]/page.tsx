// src/app/product-types/[id]/page.tsx

"use client";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import { PriceRange } from "@/commons/constants";
import Footer from "@/components/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import ProductFilters from "./components/ProductFilters";
import ProductGrid from "./components/ProductGrid";
import {
  fetchColors,
  fetchPlantTypes,
  fetchProductTypes,
} from "@/store/slices/commonSlice";
import { fetchProductsByProductType } from "@/store/slices/productSlice";
import ProductTypeHeader from "./components/ProductTypeHeader";

export interface FilterState {
  colors: string[];
  plantTypes: string[];
  seasons: string[];
  priceRange: number[];
  inStock: boolean;
}

const formatProductTypeName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Create slug from name if slug doesn't exist
const createSlugFromName = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const ProductTypePage = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const productTypeSlug = params.id as string;

  const { productTypes, loading: typesLoading } = useAppSelector(
    (state) => state.common
  );

  const defaultFilters: FilterState = {
    colors: [],
    plantTypes: [],
    seasons: [],
    priceRange: [PriceRange.zero, PriceRange.nineThousandFiveHundred],
    inStock: false,
  };
  const dispatch = useAppDispatch();

  const { typeProducts, loading: productsLoading } = useAppSelector(
    (state) => state.products
  );

  // State for sorting and filters
  const [currentSort, setCurrentSort] = useState("name-asc");
  const [selectedFilters, setSelectedFilters] =
    useState<FilterState>(defaultFilters);

  // Get filtered and sorted products
  const processedProducts = useMemo(() => {
    let filtered = [...(typeProducts || [])];

    // Apply filters
    filtered = filtered.filter((product) => {
      // Color filter
      if (
        selectedFilters.colors.length > 0 &&
        !selectedFilters.colors.includes(product.color.name)
      ) {
        return false;
      }

      // Plant type filter
      if (
        selectedFilters.plantTypes.length > 0 &&
        !selectedFilters.plantTypes.includes(product.plantType?.name ?? "")
      ) {
        return false;
      }

      // Season filter
      if (
        selectedFilters.seasons.length > 0 &&
        !selectedFilters.seasons.includes(product.season)
      ) {
        return false;
      }

      // Price range filter
      if (
        product.price < selectedFilters.priceRange[0] ||
        product.price > selectedFilters.priceRange[1]
      ) {
        return false;
      }

      // In stock filter
      if (selectedFilters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });

    // Apply sorting
    return [...filtered].sort((a, b) => {
      switch (currentSort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [selectedFilters, currentSort, typeProducts]);

  const handleClearFilters = () => {
    setSelectedFilters(defaultFilters);
  };

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string | boolean | number[]
  ) => {
    setSelectedFilters((prev) => {
      switch (filterType) {
        case "priceRange":
          return {
            ...prev,
            priceRange: value as number[],
          };

        case "inStock":
          return {
            ...prev,
            inStock: value as boolean,
          };

        case "colors":
        case "plantTypes":
        case "seasons":
          const currentArray = prev[filterType];
          const valueStr = value as string;

          if (currentArray.includes(valueStr)) {
            return {
              ...prev,
              [filterType]: currentArray.filter((item) => item !== valueStr),
            };
          } else {
            return {
              ...prev,
              [filterType]: [...currentArray, valueStr],
            };
          }

        default:
          return prev;
      }
    });
  };

  const handleSortChange = (sortValue: string) => {
    setCurrentSort(sortValue);
  };

  // First fetch all product types if they're not already loaded
  useEffect(() => {
    if (productTypes.length === 0) {
      dispatch(fetchProductTypes());
    }
  }, [dispatch, productTypes.length]);

  // Once product types are loaded, find the one that matches our slug and fetch its products
  useEffect(() => {
    if (productTypes.length > 0 && !typesLoading) {
      // Find the product type by slug or by generated slug from name
      let productType = productTypes.find(
        (type) =>
          type.slug === productTypeSlug ||
          createSlugFromName(type.name) === productTypeSlug
      );

      if (!productType) {
        console.error(`Product type with slug "${productTypeSlug}" not found`);
        // You might want to redirect to a 404 page or handle this case differently
        return;
      }

      // Fetch related data for filters
      dispatch(fetchColors());
      dispatch(fetchPlantTypes());

      // Fix for TypeScript error: ensure we have a valid ID string
      const productTypeId = productType._id || productType.id;
      if (productTypeId) {
        dispatch(fetchProductsByProductType(productTypeId));
      } else {
        console.error("Product type has no valid ID");
      }
    }
  }, [dispatch, productTypes, productTypeSlug, typesLoading]);

  // Get the display name from the product type or format it from the slug
  const displayName = useMemo(() => {
    if (productTypes.length === 0)
      return formatProductTypeName(productTypeSlug);

    const productType = productTypes.find(
      (type) =>
        type.slug === productTypeSlug ||
        createSlugFromName(type.name) === productTypeSlug
    );

    return productType
      ? productType.name
      : formatProductTypeName(productTypeSlug);
  }, [productTypes, productTypeSlug]);

  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <SubHeader />
      <ProductTypeHeader
        productTypeName={displayName}
        productCount={processedProducts.length}
        onSortChange={handleSortChange}
        currentSort={currentSort}
        setFilterDrawerOpen={setIsFilterDrawerOpen}
      />

      <main className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters sidebar */}
          <div className="hidden md:block flex-shrink-0">
            <ProductFilters
              onFilterChange={handleFilterChange}
              selectedFilters={selectedFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Mobile filter drawer */}
          <MobileFilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Product grid */}
          <div className="flex-1">
            <ProductGrid products={processedProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductTypePage;
