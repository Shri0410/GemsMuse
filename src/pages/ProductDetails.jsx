import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Details");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const product = useMemo(() => MOCK_PRODUCTS.find((p) => p.id === id), [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const collectionProducts = useMemo(() => {
    if (!product || !product.collection) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.collection === product.collection && p.id !== product.id
    );
  }, [product]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const wishlist = JSON.parse(
      localStorage.getItem("gems_muse_wishlist") || "[]"
    );
    if (id && wishlist.includes(id)) {
      setIsLiked(true);
    }
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(
      localStorage.getItem("gems_muse_wishlist") || "[]"
    );
    let updatedWishlist;

    if (isLiked) {
      updatedWishlist = wishlist.filter((item) => item !== id);
      setIsLiked(false);
    } else {
      updatedWishlist = [...wishlist, id];
      setIsLiked(true);
      setToastMessage("Added to your wishlist");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }

    localStorage.setItem("gems_muse_wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const addToBag = () => {
    if (!id) return;
    const bag = JSON.parse(localStorage.getItem("gems_muse_bag") || "[]");
    const existingIndex = bag.findIndex((item) => item.id === id);

    if (existingIndex > -1) {
      bag[existingIndex].quantity += quantity;
    } else {
      bag.push({ id, quantity });
    }

    localStorage.setItem("gems_muse_bag", JSON.stringify(bag));
    setToastMessage(`Added ${quantity} item(s) to bag`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    window.dispatchEvent(new Event("bag-updated"));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-40 px-6 text-center">
        <h2 className="text-3xl font-serif mb-4">Masterpiece Not Found</h2>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
          The piece you are looking for may have moved or is currently out of
          stock.
        </p>
        <Link
          to="/collection"
          className="bg-primary text-white px-10 py-4 uppercase text-[10px] tracking-widest font-bold"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white dark:bg-background-dark min-h-screen relative">
      {/* Feedback Toast */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[200] animate-fade-in-up">
          <div className="bg-black/90 text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-2xl flex items-center gap-3">
            <span className="material-icons-outlined text-primary text-sm">
              {toastMessage.includes("bag") ? "shopping_bag" : "favorite"}
            </span>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted-light font-bold">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="material-icons-outlined text-[10px]">
            chevron_right
          </span>
          <Link to="/collection" className="hover:text-primary">
            Collection
          </Link>
          <span className="material-icons-outlined text-[10px]">
            chevron_right
          </span>
          <span className="text-text-main-light dark:text-text-main-dark">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24 lg:pb-32">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-3/5">
            <div className="sticky top-40 space-y-8">
              <div className="relative aspect-[4/5] bg-[#FAF8F5] dark:bg-surface-dark flex items-center justify-center p-12 overflow-hidden shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-1000 hover:scale-110"
                />
                <button
                  onClick={toggleWishlist}
                  className={`absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-md transform hover:scale-110 ${
                    isLiked
                      ? "bg-primary text-white"
                      : "bg-white/90 dark:bg-black/80 hover:bg-white text-text-main-light dark:text-text-main-dark"
                  }`}
                  aria-label={
                    isLiked ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <span
                    className={`material-icons-outlined text-xl transition-all duration-300 ${
                      isLiked ? "favorite" : "favorite_border"
                    }`}
                  >
                    {isLiked ? "favorite" : "favorite_border"}
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[#FAF8F5] dark:bg-surface-dark p-4 flex items-center justify-center cursor-pointer border-b-2 border-transparent hover:border-primary transition-all"
                  >
                    <img
                      src={product.image}
                      alt="Detail view"
                      className="w-full h-full object-contain opacity-60 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="w-full lg:w-2/5 space-y-10">
            <div>
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-serif text-text-main-light dark:text-text-main-dark mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-xl font-medium tracking-wide">
                  ${product.price.toLocaleString()}
                </p>
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-icons-outlined text-xs"
                    >
                      star
                    </span>
                  ))}
                  <span className="text-text-muted-light text-[10px] ml-2 font-bold uppercase tracking-widest">
                    (12 Reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 py-4 border-y border-gray-100 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted-light mb-1">
                    Material
                  </span>
                  <span className="text-sm font-medium">
                    {product.material}
                  </span>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted-light mb-1">
                    Ethical Cert
                  </span>
                  <span className="text-sm font-medium">GIA Certified</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed tracking-wide">
                {product.description} A testament to timeless elegance, this
                piece is meticulously hand-forged in our Mumbai atelier using
                only the most exceptional materials.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:text-primary transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="px-6 text-sm font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 hover:text-primary transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={addToBag}
                  className="flex-grow bg-primary hover:bg-primary-hover text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl hover:-translate-y-0.5 transform flex items-center justify-center gap-2"
                >
                  <span className="material-icons-outlined text-sm">
                    shopping_bag
                  </span>
                  Add to Bag
                </button>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Link
                  to="/bespoke"
                  className="flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-50 dark:hover:bg-black/20 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                  Request Customization
                </Link>
                <div className="flex items-center justify-center gap-8 py-2">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted-light">
                    <span className="material-icons-outlined text-lg">
                      local_shipping
                    </span>
                    Insured Shipping
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted-light">
                    <span className="material-icons-outlined text-lg">
                      workspace_premium
                    </span>
                    Authenticity Cert
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs / Accordion */}
            <div className="pt-8 space-y-6">
              <div className="flex items-center gap-10 border-b border-gray-100 dark:border-gray-800">
                {["Details", "Shipping", "Ethics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[10px] uppercase tracking-widest font-bold transition-all border-b-2 ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-text-muted-light"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="animate-fade-in text-[13px] leading-relaxed font-light text-text-muted-light dark:text-text-muted-dark tracking-wide min-h-[100px]">
                {activeTab === "Details" && (
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-gray-50 dark:border-gray-800 pb-2">
                      <span>Ref Number</span>
                      <span className="font-medium text-text-main-light dark:text-text-main-dark">
                        GM-2024-{product.id}
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-gray-50 dark:border-gray-800 pb-2">
                      <span>Gemstone Weight</span>
                      <span className="font-medium text-text-main-light dark:text-text-main-dark">
                        2.45 Carats Total
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-gray-50 dark:border-gray-800 pb-2">
                      <span>Metal Weight</span>
                      <span className="font-medium text-text-main-light dark:text-text-main-dark">
                        12.50 Grams
                      </span>
                    </li>
                  </ul>
                )}
                {activeTab === "Shipping" && (
                  <p>
                    Complimentary insured worldwide shipping on all orders. Each
                    piece is delivered in our signature hand-crafted display
                    case with a certificate of authenticity. Standard lead time:
                    3-5 business days.
                  </p>
                )}
                {activeTab === "Ethics" && (
                  <p>
                    All Gems Muse creations are crafted with ethically sourced
                    gemstones and conflict-free diamonds. We are committed to
                    environmental sustainability and fair-trade practices across
                    our global supply chain.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-[#FAF8F5] dark:bg-[#151515] border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-16">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">
                Complete the Look
              </span>
              <h2 className="text-3xl font-serif">You May Also Love</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedProducts.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="group cursor-pointer text-center"
                >
                  <div className="relative overflow-hidden bg-white dark:bg-surface-dark mb-6 aspect-square flex items-center justify-center p-8 transition-all duration-500 hover:shadow-xl">
                    <img
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      src={p.image}
                    />
                  </div>
                  <h3 className="text-lg font-serif mb-2">{p.name}</h3>
                  <p className="text-sm font-medium tracking-wide">
                    ${p.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products From Sets */}
      {collectionProducts.length > 0 && (
        <section className="py-24 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-16">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">
                The Collection Suite
              </span>
              <h2 className="text-3xl font-serif">Products From Sets</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {collectionProducts.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="group cursor-pointer text-center"
                >
                  <div className="relative overflow-hidden bg-[#FAF8F5] dark:bg-surface-dark mb-6 aspect-square flex items-center justify-center p-8 transition-all duration-500 hover:shadow-xl">
                    <img
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      src={p.image}
                    />
                  </div>
                  <h3 className="text-lg font-serif mb-2">{p.name}</h3>
                  <p className="text-sm font-medium tracking-wide">
                    ${p.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Book a Private Session */}
      <section className="py-20 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#121212] dark:bg-surface-dark p-12 md:p-16 text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Desire a{" "}
              <span className="italic text-primary">Personal Touch?</span>
            </h2>
            <p className="text-gray-400 font-light mb-10 max-w-lg mx-auto text-sm leading-relaxed">
              Schedule a virtual session or an in-person viewing at our Mumbai
              atelier to explore this piece in greater detail.
            </p>
            <Link
              to="/bespoke"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl"
            >
              Book Private Viewing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
