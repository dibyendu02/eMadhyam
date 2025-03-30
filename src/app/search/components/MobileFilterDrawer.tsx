// src/app/product-types/[id]/components/MobileFilterDrawer.tsx
import React from "react";
import { X } from "lucide-react";
import { FilterState } from "../page";
import ProductFilters from "./ProductFilters";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (
    filterType: keyof FilterState,
    value: string | boolean | number[]
  ) => void;
  selectedFilters: FilterState;
  onClearFilters: () => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  onFilterChange,
  selectedFilters,
  onClearFilters,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
        fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex justify-end items-center">
            <button onClick={onClose} className="p-2 ">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ProductFilters
              onFilterChange={onFilterChange}
              selectedFilters={selectedFilters}
              onClearFilters={onClearFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
