import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductTypes } from "@/store/slices/commonSlice";

// Helper function to create slug from name
const createSlugFromName = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const SubHeader = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { productTypes, loading } = useAppSelector((state) => state.common);

  useEffect(() => {
    // Fetch product types when component mounts if they're not already loaded
    if (productTypes.length === 0 && !loading) {
      dispatch(fetchProductTypes());
    }
  }, [dispatch, productTypes.length, loading]);

  return (
    <nav className="bg-[#24670d] w-full py-8 mt-16 px-0 hidden md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 ">
        <ul className="flex items-center justify-start gap-24 flex-wrap">
          {loading
            ? // Show loading placeholders
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <li key={`loading-${index}`} className="relative">
                    <div className="w-20 h-6 bg-green-600/40 animate-pulse rounded"></div>
                  </li>
                ))
            : // Show product types as menu items
              productTypes.map((type) => (
                <li
                  key={type._id || type.id || `type-${type.name}`}
                  className="relative"
                >
                  <div
                    className="relative group cursor-pointer"
                    onMouseEnter={() =>
                      setHoveredItem(String(type._id || type.id || type.name))
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={`/product-type/${
                        type.slug || createSlugFromName(type.name)
                      }`}
                      className="flex items-center"
                    >
                      <span className="text-white/90 hover:text-white transition-colors duration-200 text-base">
                        {type.name}
                      </span>
                    </Link>

                    {/* Hover Underline Effect */}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 
                    transition-all duration-300 group-hover:w-full"
                    />

                    {/* Active Indicator */}
                    {hoveredItem ===
                      String(type._id || type.id || type.name) && (
                      <span
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                      w-1 h-1 bg-green-400 rounded-full"
                      />
                    )}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </nav>
  );
};

export default SubHeader;
