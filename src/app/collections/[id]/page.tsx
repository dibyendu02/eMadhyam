"use client";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import CollectionHeader from "./components/CollectionHeader";
import ProductFilters from "./components/ProductFilters";
import ProductGrid from "./components/ProductGrid";
import { PriceRange } from "@/commons/constants";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCurrentCategory } from "@/store/slices/categorySlice";

export interface FilterState {
  colors: string[];
  plantTypes: string[];
  seasons: string[];
  priceRange: number[];
  inStock: boolean;
}

const formatCategoryName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//Bug - filters not working do not know why

const CollectionPage = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const params = useParams();
  const categorySlug = params.id as string;

  const defaultFilters: FilterState = {
    colors: [],
    plantTypes: [],
    seasons: [],
    priceRange: [PriceRange.zero, PriceRange.nineThousandFiveHundred],
    inStock: false,
  };
  const dispatch = useAppDispatch();

  const { items: allProducts } = useAppSelector((state) => state.products);
  const { currentCategory } = useAppSelector((state) => state.categories);

  const categoryProducts = useMemo(() => {
    return allProducts.filter(
      (product) => product.category._id === currentCategory?.id
    );
  }, [allProducts, currentCategory]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentCategory());
    };
  }, [dispatch]);

  // State for sorting and filters
  const [currentSort, setCurrentSort] = useState("name-asc");
  const [selectedFilters, setSelectedFilters] =
    useState<FilterState>(defaultFilters);

  // Get filtered and sorted products
  const processedProducts = useMemo(() => {
    let filtered = [...categoryProducts];

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
      // if (
      //   selectedFilters.plantTypes.length > 0 &&
      //   !selectedFilters.plantTypes.includes(product.plantType)
      // ) {
      //   return false;
      // }

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
  }, [categorySlug, selectedFilters, currentSort, categoryProducts]);

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

  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <SubHeader />
      <CollectionHeader
        categoryName={formatCategoryName(categorySlug)}
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

export default CollectionPage;
