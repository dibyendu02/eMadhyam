import React, { useState } from "react";

const SubHeader = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: "plants", label: "Plants", count: "200+" },
    { id: "seeds", label: "Seeds", count: "150+" },
    { id: "pots", label: "Pots and Planters", count: "100+" },
    { id: "new", label: "New Arrivals", count: "50+" },
    { id: "care", label: "Plant Care", count: "80+" },
    { id: "blog", label: "Blog", count: "30+" },
  ];

  return (
    <nav className="bg-[#24670d] w-full py-8 px-0 hidden md:block">
      <div className="max-w-7xl mx-8 ">
        <ul className="flex items-center justify-start gap-12 flex-wrap">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Menu Item */}
                <div className="flex items-center gap-2">
                  <span className="text-white/90 hover:text-white transition-colors duration-200 text-base">
                    {item.label}
                  </span>

                  {/* Count Badge */}
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                    bg-green-400/20 text-green-200 text-xs px-2 py-0.5 rounded-full"
                  >
                    {item.count}
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SubHeader;
