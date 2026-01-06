import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);

  const loadWishlist = () => {
    const saved = JSON.parse(
      localStorage.getItem("gems_muse_wishlist") || "[]"
    );
    setWishlistIds(saved);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlist-updated", loadWishlist);
    return () => window.removeEventListener("wishlist-updated", loadWishlist);
  }, []);

  const wishlistProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const removeFromWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = wishlistIds.filter((item) => item !== id);
    localStorage.setItem("gems_muse_wishlist", JSON.stringify(updated));
    setWishlistIds(updated);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <div className="pt-40 pb-24 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase block mb-4">
            Your Private Gallery
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-text-main-light dark:text-text-main-dark">
            The Wishlist
          </h1>
          <div className="w-16 h-px bg-primary mx-auto mt-8 opacity-40"></div>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group relative animate-fade-in">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden bg-white dark:bg-surface-dark mb-6 aspect-[4/5] flex items-center justify-center shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img
                      alt={product.name}
                      className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-110"
                      src={product.image}
                    />
                    <button
                      onClick={(e) => removeFromWishlist(product.id, e)}
                      className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 p-2.5 rounded-full text-primary shadow-sm hover:bg-primary hover:text-white transition-all transform hover:rotate-12"
                      title="Remove from Wishlist"
                    >
                      <span className="material-icons-outlined text-sm">
                        close
                      </span>
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-primary/95 backdrop-blur-sm text-center">
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                        View Masterpiece
                      </span>
                    </div>
                  </div>
                  <div className="text-center px-2">
                    <h3 className="text-lg font-serif mb-1 text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest mb-2">
                      {product.material}
                    </p>
                    <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center py-20 bg-white/50 dark:bg-surface-dark/30 border border-dashed border-gray-200 dark:border-gray-800 p-12">
            <span className="material-icons-outlined text-5xl text-primary/30 mb-6">
              favorite_border
            </span>
            <h2 className="text-2xl font-serif mb-4">
              A Sanctuary Awaiting Your Selection
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark font-light text-sm leading-relaxed mb-10">
              Your wishlist is currently a canvas of possibilities. Explore our
              collections to discover the pieces that resonate with your unique
              story.
            </p>
            <Link
              to="/collection"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-lg hover:-translate-y-0.5"
            >
              Discover The Collection
            </Link>
          </div>
        )}

        {wishlistProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="material-icons-outlined text-primary">
                auto_awesome
              </span>
              <p className="text-xs text-text-muted-light italic">
                Refining your selections for a bespoke future.
              </p>
            </div>
            <div className="flex gap-6">
              <button className="text-[10px] uppercase tracking-widest font-bold border-b border-gray-300 dark:border-gray-700 pb-1 hover:border-primary transition-colors">
                Share My Selections
              </button>
              <Link
                to="/bespoke"
                className="text-[10px] uppercase tracking-widest font-bold text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors"
              >
                Discuss Customizations
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
