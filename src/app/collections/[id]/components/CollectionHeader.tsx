import React from "react";
import Link from "next/link";
import { ChevronDown, Filter } from "lucide-react";

interface CollectionHeaderProps {
  categoryName: string;
  productCount: number;
  onSortChange: (value: string) => void;
  currentSort: string;
  setFilterDrawerOpen: (value: boolean) => void;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  categoryName,
  productCount,
  onSortChange,
  currentSort,
  setFilterDrawerOpen,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/plants" className="hover:text-gray-700">
            Plants
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Categories</span>
        </nav>

        <div className="md:hidden sticky top-0 z-10  pb-4">
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Header Content */}
        <div className="flex items-center justify-end md:justify-between">
          <h1 className="hidden md:block text-2xl font-semibold text-gray-900">
            {categoryName}
          </h1>

          <div className="flex flex-1 md:flex-none justify-between md:justify-start items-center gap-4 ">
            <div className="relative inline-block text-left">
              <select
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full min-w-[200px] appearance-none bg-white text-gray-700 border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer shadow-sm transition-colors duration-200"
              >
                <option value="name-asc">Name, A-Z</option>
                <option value="name-desc">Name, Z-A</option>
                <option value="price-asc">Price, Low to High</option>
                <option value="price-desc">Price, High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors duration-200 group-hover:text-green-500" />
            </div>

            <span className="text-md text-gray-500">
              {productCount} products
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
