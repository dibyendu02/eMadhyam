// src/app/product-types/[id]/components/ProductFilters.tsx
import { ProductSeason, PriceRange, PriceRanges } from "@/commons/constants";
import React from "react";
import { FilterState } from "../page";
import { useAppSelector } from "@/store/hooks";

interface FilterProps {
  onFilterChange: (
    filterType: keyof FilterState,
    value: string | boolean | number[]
  ) => void;
  selectedFilters: FilterState;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<FilterProps> = ({
  onFilterChange,
  selectedFilters,
  onClearFilters,
}) => {
  const { colors, loading } = useAppSelector((state) => state.common);

  if (loading) {
    return (
      <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm animate-pulse">
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Filter</h3>
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-[#94A3B8] hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        </div>
        {/* Price Range Filter */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Price Range
          </h3>
          <div className="space-y-2">
            {PriceRanges.map((range) => (
              <label
                key={`${range.min}-${range.max}`}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={
                    selectedFilters.priceRange[0] === range.min &&
                    selectedFilters.priceRange[1] === range.max
                  }
                  onChange={() => {
                    // If this range is already selected, reset to full range (unselect)
                    if (
                      selectedFilters.priceRange[0] === range.min &&
                      selectedFilters.priceRange[1] === range.max
                    ) {
                      onFilterChange("priceRange", [
                        PriceRange.zero,
                        PriceRange.nineThousandFiveHundred,
                      ]); // Reset to full range
                    } else {
                      // Otherwise, select this range
                      onFilterChange("priceRange", [range.min, range.max]);
                    }
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">
                  ₹{range.min} - ₹{range.max}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Plant Type Filter */}
        {/* <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Plant Type</h3>
          <div className="space-y-2">
            {plantTypes.map((type) => (
              <label key={type._id} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={selectedFilters.plantTypes.includes(type.name)}
                  onChange={() => onFilterChange("plantTypes", type.name)}
                />
                <span className="ml-2 text-sm text-gray-600">{type.name}</span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Color Filter */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Color</h3>
          <div className="space-y-2">
            {colors.map((color) => (
              <label key={color._id} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={selectedFilters.colors.includes(color.name)}
                  onChange={() => onFilterChange("colors", color.name)}
                />
                <span className="ml-2 text-sm text-gray-600">{color.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Season Filter */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Season</h3>
          <div className="space-y-2">
            {Object.values(ProductSeason).map((season) => (
              <label key={season} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={selectedFilters.seasons.includes(season)}
                  onChange={() => onFilterChange("seasons", season)}
                />
                <span className="ml-2 text-sm text-gray-600">{season}</span>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              checked={selectedFilters.inStock}
              onChange={(e) => onFilterChange("inStock", e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
