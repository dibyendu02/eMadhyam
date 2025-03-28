import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductTypes } from "@/store/slices/commonSlice";

const SubHeader = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { productTypes } = useAppSelector((state) => state.common);

  useEffect(() => {
    // Fetch product types when component mounts if they're not already loaded
    if (productTypes.length === 0) {
      dispatch(fetchProductTypes());
    }
  }, [dispatch, productTypes.length]);

  const menuItems = [
    { id: "plants", label: "Plants" },
    { id: "planter", label: "Planter" },
    { id: "home-decor", label: "Home Decor" },
    { id: "gadgets", label: "Viral Gadgets" },
    { id: "others", label: "Others" },
  ];

  return (
    <nav className="bg-[#24670d] w-full py-8 mt-16 px-0 hidden md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 ">
        <ul className="flex items-center justify-start gap-24 flex-wrap">
          {menuItems.map((item) => (
            <li key={item.id} className="relative">
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Menu Item */}
                <div className="flex items-center">
                  <span className="text-white/90 hover:text-white transition-colors duration-200 text-base">
                    {item.label}
                  </span>
                </div>

                {/* Hover Underline Effect */}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 
                  transition-all duration-300 group-hover:w-full"
                />

                {/* Active Indicator */}
                {hoveredItem === item.id && (
                  <span
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                    w-1 h-1 bg-green-400 rounded-full"
                  />
                )}

                {/* Dropdown for Plants category showing product types */}
                {item.id === "plants" && hoveredItem === "plants" && (
                  <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {productTypes.map((type) => (
                        <Link
                          key={type._id || type.id}
                          href={`/product-type/${
                            type.slug ||
                            type.name.toLowerCase().replace(/\s+/g, "-")
                          }`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                        >
                          {type.name}
                        </Link>
                      ))}
                    </div>
                  </div>
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
