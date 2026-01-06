import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";
import logo from "../assets/White.jpg";

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [bag, setBag] = useState([]);
  const [showBagDropdown, setShowBagDropdown] = useState(false);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const bagRef = useRef(null);
  const menuRef = useRef(null);

  const updateCounts = () => {
    const wishlist = JSON.parse(
      localStorage.getItem("gems_muse_wishlist") || "[]"
    );
    setWishlistCount(wishlist.length);

    const savedBag = JSON.parse(localStorage.getItem("gems_muse_bag") || "[]");
    setBag(savedBag);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("wishlist-updated", updateCounts);
    window.addEventListener("bag-updated", updateCounts);
    return () => {
      window.removeEventListener("wishlist-updated", updateCounts);
      window.removeEventListener("bag-updated", updateCounts);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const filtered = MOCK_PRODUCTS.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
      }
      if (bagRef.current && !bagRef.current.contains(event.target)) {
        setShowBagDropdown(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsSearchOpen(false);
      navigate(`/collection?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleSearch = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else if (searchQuery.trim()) {
      handleSearchSubmit({ preventDefault: () => {} });
    } else {
      setIsSearchOpen(false);
    }
  };

  const removeFromBag = (id) => {
    const updatedBag = bag.filter((item) => item.id !== id);
    localStorage.setItem("gems_muse_bag", JSON.stringify(updatedBag));
    updateCounts();
    window.dispatchEvent(new Event("bag-updated"));
  };

  const bagProducts = useMemo(() => {
    return bag
      .map((item) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === item.id);
        return { ...product, quantity: item.quantity };
      })
      .filter((p) => p.id !== undefined);
  }, [bag]);

  const subtotal = useMemo(() => {
    return bagProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }, [bagProducts]);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300 py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center relative">
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-4 md:gap-8 lg:w-1/3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 hover:text-primary transition-colors group"
            >
              <span className="material-icons-outlined text-2xl">menu</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:inline-block">
                Menu
              </span>
            </button>

            <div ref={searchRef} className="flex items-center relative">
              <button
                type="button"
                onClick={toggleSearch}
                className="flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span
                  className={`material-icons-outlined text-xl transition-colors ${
                    isSearchOpen
                      ? "text-primary"
                      : "text-text-main-light dark:text-text-main-dark hover:text-primary"
                  }`}
                >
                  search
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                  isSearchOpen
                    ? "w-32 md:w-48 opacity-100 ml-2"
                    : "w-0 opacity-0 ml-0"
                }`}
              >
                <form onSubmit={handleSearchSubmit}>
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-0 px-0 py-1 w-full text-xs text-text-main-light dark:text-text-main-dark placeholder-gray-400"
                    placeholder="Search treasures..."
                    type="text"
                  />
                </form>
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 mt-6 w-80 bg-white dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden z-[110]">
                  <div className="p-3 bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
                      Suggestions
                    </span>
                  </div>
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors text-left border-b border-gray-50 dark:border-gray-800 last:border-0"
                    >
                      <div className="w-10 h-10 bg-gray-50 dark:bg-black/20 p-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-[10px] font-bold uppercase tracking-wide">
                          {product.name}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="lg:w-1/3 flex justify-center">
            <Link to="/" className="cursor-pointer group">
              <img
                src={logo}
                alt="GEMS MUSE"
                className="h-20 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105 dark:invert"
              />
            </Link>
          </div>

          {/* Right: Theme, Account, Wishlist, Bag */}
          <div className="flex items-center justify-end gap-5 md:gap-7 lg:w-1/3">
            <button
              onClick={toggleDarkMode}
              className="hover:text-primary transition-colors flex items-center"
              title="Toggle Theme"
            >
              <span className="material-icons-outlined text-xl">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="hover:text-primary transition-colors flex items-center"
              title="My Account"
            >
              <span className="material-icons-outlined text-xl">person</span>
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="hover:text-primary transition-colors relative flex items-center"
              title="Favorites"
            >
              <span className="material-icons-outlined text-xl">
                favorite_border
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <div ref={bagRef} className="relative flex items-center">
              <button
                onClick={() => setShowBagDropdown(!showBagDropdown)}
                className="hover:text-primary transition-colors relative flex items-center"
                title="Selections"
              >
                <span className="material-icons-outlined text-xl">
                  shopping_bag
                </span>
                {bag.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                    {bag.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </span>
                )}
              </button>

              {showBagDropdown && (
                <div className="absolute top-full right-0 mt-6 w-80 md:w-96 bg-white dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 z-[120] animate-fade-in-up origin-top-right">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                        My Selections ({bag.length})
                      </span>
                      <button
                        onClick={() => setShowBagDropdown(false)}
                        className="text-text-muted-light hover:text-primary"
                      >
                        <span className="material-icons-outlined text-sm">
                          close
                        </span>
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto pr-2 no-scrollbar">
                      {bagProducts.length > 0 ? (
                        <div className="space-y-6">
                          {bagProducts.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                              <div className="w-16 h-16 bg-gray-50 dark:bg-black/20 flex-shrink-0 p-2">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                  <h4 className="text-xs font-serif font-bold group-hover:text-primary transition-colors">
                                    {item.name}
                                  </h4>
                                  <button
                                    onClick={() => removeFromBag(item.id)}
                                    className="text-text-muted-light hover:text-red-500"
                                  >
                                    <span className="material-icons-outlined text-xs">
                                      delete_outline
                                    </span>
                                  </button>
                                </div>
                                <p className="text-[9px] text-text-muted-light uppercase tracking-widest mt-1">
                                  ${item.price.toLocaleString()} x{" "}
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center text-text-muted-light italic text-xs">
                          Your bag is empty.
                        </div>
                      )}
                    </div>

                    {bagProducts.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                            Subtotal
                          </span>
                          <span className="text-sm font-bold">
                            ${subtotal.toLocaleString()}
                          </span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl">
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Navigation Menu */}
      <div
        className={`fixed  inset-0 bg-white/70 z-[200] transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          ref={menuRef}
          className={`absolute top-0 left-0 h-full w-full  max-w-sm bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-10 flex flex-col h-auto bg-white">
            <div className="flex justify-between items-center mb-16 px-10">
              <img src={logo} alt="GEMS MUSE" className="h-14 w-auto" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-text-muted-light hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined text-2xl">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-8 bg-white p-10">
              <Link
                to="/collection"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif text-[#121212] hover:text-primary transition-all hover:pl-2 bg-white"
              >
                Collection
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif text-[#121212] hover:text-primary transition-all hover:pl-2 bg-white"
              >
                Our Essence
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
