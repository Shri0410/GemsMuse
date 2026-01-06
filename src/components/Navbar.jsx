import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";
import logo from "../assets/White.jpg";

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [bag, setBag] = useState([]);
  const [showBagDropdown, setShowBagDropdown] = useState(false);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const bagRef = useRef(null);

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <nav className="fixed top-0 w-full z-[100] bg-white/100 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center relative">
            <div className="flex items-center gap-6">
              <button className="md:hidden flex items-center gap-2 hover:text-primary transition-colors">
                <span className="material-icons-outlined text-2xl">menu</span>
              </button>

              <div
                ref={searchRef}
                className="hidden md:flex items-center relative group"
              >
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="flex items-center justify-center hover:scale-110 transition-transform z-10"
                  >
                    <span
                      className={`material-icons-outlined text-xl transition-colors ${
                        isSearchOpen
                          ? "text-primary"
                          : "text-text-muted-light hover:text-primary"
                      }`}
                    >
                      search
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                      isSearchOpen
                        ? "w-48 opacity-100 ml-2"
                        : "w-0 opacity-0 ml-0"
                    }`}
                  >
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() =>
                        searchQuery.length > 1 && setShowSuggestions(true)
                      }
                      className="bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-0 px-0 py-1 w-full text-xs text-text-main-light dark:text-text-main-dark placeholder-gray-400 cursor-text"
                      placeholder="Search masterpieces..."
                      type="text"
                    />
                    {isSearchOpen && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchOpen(false);
                        }}
                        className="ml-2 text-text-muted-light hover:text-red-500 transition-colors"
                      >
                        <span className="material-icons-outlined text-sm">
                          close
                        </span>
                      </button>
                    )}
                  </div>
                </form>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-6 w-80 bg-white dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden z-[110]">
                    <div className="p-3 bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
                        In Collections
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
                          <h4 className="text-[10px] font-bold text-text-main-light dark:text-text-main-dark uppercase tracking-wide">
                            {product.name}
                          </h4>
                        </div>
                        <span className="material-icons-outlined text-xs text-primary">
                          arrow_forward
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="cursor-pointer group">
                <img
                  src={logo}
                  alt="GEMS MUSE Logo"
                  className="h-20 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:opacity-80 dark:invert"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={toggleDarkMode}
                className="hover:text-primary transition-colors"
                title="Toggle Theme"
              >
                <span className="material-icons-outlined text-xl">
                  {isDarkMode ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="hover:text-primary transition-colors"
                title="My Account"
              >
                <span className="material-icons-outlined text-xl">person</span>
              </button>
              <button
                onClick={() => navigate("/wishlist")}
                className="hover:text-primary transition-colors relative"
                title="Favorites"
              >
                <span className="material-icons-outlined text-xl">
                  favorite_border
                </span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <div ref={bagRef} className="relative">
                <button
                  onClick={() => setShowBagDropdown(!showBagDropdown)}
                  className="hover:text-primary transition-colors relative"
                  title="Shopping Bag"
                >
                  <span className="material-icons-outlined text-xl">
                    shopping_bag
                  </span>
                  {bag.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                      {bag.reduce((acc, curr) => acc + curr.quantity, 0)}
                    </span>
                  )}
                </button>

                {/* Shopping Bag Dropdown */}
                {showBagDropdown && (
                  <div className="absolute top-full right-0 mt-6 w-96 bg-white dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 z-[120] animate-fade-in-up origin-top-right">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-main-light dark:text-text-main-dark">
                          Your Bag ({bag.length})
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
                                <div className="w-20 h-20 bg-gray-50 dark:bg-black/20 flex-shrink-0 p-2">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-xs font-serif font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
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
                                  <p className="text-[9px] text-text-muted-light uppercase tracking-widest mb-2">
                                    {item.material}
                                  </p>
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-text-muted-light">
                                      Qty: {item.quantity}
                                    </span>
                                    <span className="text-xs font-bold">
                                      $
                                      {(
                                        item.price * item.quantity
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-12 text-center">
                            <span className="material-icons-outlined text-4xl text-primary/20 mb-4">
                              shopping_bag
                            </span>
                            <p className="text-xs text-text-muted-light font-light italic">
                              Your bag is currently a sanctuary for future
                              treasures.
                            </p>
                          </div>
                        )}
                      </div>

                      {bagProducts.length > 0 && (
                        <div className="mt-8 space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted-light">
                              Subtotal
                            </span>
                            <span className="text-sm font-bold tracking-wider">
                              ${subtotal.toLocaleString()}
                            </span>
                          </div>
                          <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl">
                            Checkout
                          </button>
                          <button
                            onClick={() => {
                              setShowBagDropdown(false);
                              navigate("/wishlist");
                            }}
                            className="w-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 py-3 text-[9px] uppercase tracking-[0.2em] font-bold transition-all"
                          >
                            View All Saved Pieces
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center space-x-12 pt-2 border-t border-gray-50 dark:border-gray-800/50">
            <Link
              to="/collection"
              className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-primary transition-all duration-300 py-1 border-b-2 border-transparent hover:border-primary/60"
            >
              Collection
            </Link>
            <Link
              to="/about"
              className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-primary transition-all duration-300 py-1 border-b-2 border-transparent hover:border-primary/60"
            >
              Our Essence
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
