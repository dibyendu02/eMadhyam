import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AppIcons from "../../../../public/icons/appIcons";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileDrawer from "../MobileDrawer";
import { AuthService } from "@/services/api/authService";
import { logout } from "@/store/slices/userSlice";
import { Product } from "@/commons/types/product";

const Navbar = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.user);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  // Access products from the correct Redux state path
  const allProducts = useAppSelector((state) => state.products.items);
  const categories = useAppSelector((state) => state.categories.items);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

  const handleWishListButtonClick = () => {
    router.push(`/wishlist`);
  };

  const handleCartButtonClick = () => {
    router.push(`/cart`);
  };

  const cartTotalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const menuItems = [
    { id: "plants", label: "Plants", count: "200+" },
    { id: "seeds", label: "Seeds", count: "150+" },
    { id: "pots", label: "Pots and Planters", count: "100+" },
    { id: "new", label: "New Arrivals", count: "50+" },
    { id: "care", label: "Plant Care", count: "80+" },
    { id: "blog", label: "Blog", count: "30+" },
  ];

  // Close dropdown and search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }

      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current !== event.target
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when search bar is shown
  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout());
    router.push("/");
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Perform search
  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    try {
      // Use the products from Redux store for frontend filtering
      const lowerCaseQuery = query.toLowerCase();
      const localResults = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          (product.category?.name?.toLowerCase() || "").includes(
            lowerCaseQuery
          ) ||
          (product.productType?.name?.toLowerCase() || "").includes(
            lowerCaseQuery
          ) ||
          (product.shortDescription?.toLowerCase() || "").includes(
            lowerCaseQuery
          )
      );

      // Limit to top 5 results for the dropdown
      setSearchResults(localResults.slice(0, 5));
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchBar(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchResults([]);
      setShowSearchBar(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white flex justify-between items-center shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 h-16 flex-1">
        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsDrawerOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo */}
        <Link href="/" className="hover:text-gray-700">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className={showSearchBar ? "hidden md:block" : ""}
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-lg">
          <form className="relative w-full" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for plants, pots, and more..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900" // Added text-gray-900 for visible text
              value={searchQuery}
              onChange={handleSearchInputChange}
              ref={searchInputRef}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div
              ref={searchResultsRef}
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-96 overflow-y-auto z-50 max-w-lg mx-auto"
            >
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Search Results ({searchResults.length})
                </h3>
                <div className="divide-y divide-gray-100">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="py-2 flex items-center gap-3 hover:bg-gray-50 cursor-pointer p-2 rounded"
                      onClick={() => handleProductClick(product._id)}
                    >
                      {product.imageUrls?.[0] && (
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={product.imageUrls[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category?.name || ""}
                          {product.productType?.name
                            ? ` • ${product.productType.name}`
                            : ""}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₹{product.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 p-2">
                <button
                  className="w-full py-2 text-center text-sm text-green-600 hover:text-green-700 font-medium"
                  onClick={handleSearchSubmit}
                >
                  View all results
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Bar (toggleable) */}
        {showSearchBar && (
          <div className="flex-1 md:hidden">
            <form className="relative w-[95%]" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900" // Added text-gray-900
                value={searchQuery}
                onChange={handleSearchInputChange}
                ref={searchInputRef}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={toggleSearchBar}
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Search Results */}
            {searchResults.length > 0 && (
              <div
                ref={searchResultsRef}
                className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-md max-h-80 overflow-y-auto z-50"
              >
                <div className="p-2">
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((product) => (
                      <div
                        key={product._id}
                        className="py-2 flex items-center gap-3 hover:bg-gray-50 cursor-pointer p-2"
                        onClick={() => handleProductClick(product._id)}
                      >
                        {product.imageUrls?.[0] && (
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={product.imageUrls[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.category?.name || ""}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{product.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 p-2">
                  <button
                    className="w-full py-2 text-center text-sm text-green-600 hover:text-green-700 font-medium"
                    onClick={handleSearchSubmit}
                  >
                    View all results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right side icons */}
        <div className="flex items-center gap-5">
          {/* Search Icon (Mobile) */}
          {!showSearchBar && (
            <button className="md:hidden" onClick={toggleSearchBar}>
              <Search className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={handleCartButtonClick}
          >
            <Image
              src={AppIcons.cartIcon}
              alt="cart"
              className="w-6 h-6"
              height={2}
              width={2}
              style={{
                filter:
                  "invert(60%) sepia(90%) saturate(1000%) hue-rotate(360deg) brightness(100%) contrast(100%)",
              }}
            />
            {cartTotalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartTotalQuantity}
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-5">
            {/* Wishlist Icon */}
            <div
              className="relative cursor-pointer"
              onClick={handleWishListButtonClick}
            >
              <Image
                src={AppIcons.favouriteIcon}
                alt="wishlist"
                className="w-6 h-6"
                height={2}
                width={2}
              />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </div>

            {/* Profile / Login */}
            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                <div
                  className="cursor-pointer w-6 h-6 rounded-full overflow-hidden"
                  onClick={handleProfileClick}
                >
                  <Image
                    src={
                      currentUser.imageUrl != ""
                        ? currentUser.imageUrl
                        : AppIcons.profileIcon
                    }
                    alt="profile"
                    className="w-6 h-6"
                    height={2}
                    width={2}
                  />
                </div>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">
                        {currentUser.firstName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo("/profile")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigateTo("/my-orders")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                isSolid={true}
                title="Login"
                onClick={() => {
                  router.push(`/auth/signin`);
                }}
                color="primary"
              />
            )}
          </div>
        </div>

        {/* Mobile Drawer */}
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          menuItems={menuItems}
        />
      </div>
    </div>
  );
};

export default Navbar;
