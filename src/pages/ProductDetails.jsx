import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";
import SEO from "../components/SEO";
import { useShop } from "../context/ShopContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeMedia, setActiveMedia] = useState("photo");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);

        // Fetch related products (e.g., same collection or just recent)
        // Ideally backend would support better recommendations, for now fetch all and filter client side or use collection_id if available
        if (data.collection_id) {
          const relatedRes = await fetch(
            `/api/products?collection_id=${data.collection_id}`,
          );
          const relatedData = await relatedRes.json();
          setRelatedProducts(
            relatedData.filter((p) => p.id !== parseInt(id)).slice(0, 4),
          );
        } else {
          // Fallback to recent products
          const allRes = await fetch("/api/products");
          const allData = await allRes.json();
          setRelatedProducts(
            allData.filter((p) => p.id !== parseInt(id)).slice(0, 4),
          );
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const { addToBag: addItemToBag, toggleWishlist, isWishlisted } = useShop();
  const isLiked = isWishlisted(id);

  const handleToggleWishlist = () => {

    // Normalize logic duplicated for safekeeping
    let imageUrl = null;
    if (product.main_image) {
      imageUrl = `/${product.main_image}`;
    } else if (product.image) {
      imageUrl = `/${product.image}`;
    } else if (product.media && Array.isArray(product.media)) {
      const foundImage = product.media.find(m => m.media_type === 'image');
      if (foundImage) imageUrl = `/${foundImage.url}`;
    }

    const productInfo = {
      ...product,
      image: imageUrl || "https://via.placeholder.com/150"
    };

    const added = toggleWishlist(id, productInfo);
    if (added) {
      setToastMessage("Added to your wishlist");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };


  const addToBag = () => {
    if (!id) return;

    // Normalize product info for the context cache
    let imageUrl = null;
    if (product.main_image) {
      imageUrl = `/${product.main_image}`;
    } else if (product.image) {
      imageUrl = `/${product.image}`;
    } else if (product.media && Array.isArray(product.media)) {
      const foundImage = product.media.find(m => m.media_type === 'image');
      if (foundImage) imageUrl = `/${foundImage.url}`;
    }

    const productInfo = {
      ...product,
      image: imageUrl || "https://via.placeholder.com/150"
    };

    addItemToBag(id, quantity, productInfo);

    setToastMessage(`Added ${quantity} item(s) to bag`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-40 px-6 text-center">
        <h2 className="text-3xl font-serif mb-4">Masterpiece Not Found</h2>
        <Link
          to="/collection"
          className="bg-primary text-white px-10 py-4 uppercase text-[10px] tracking-widest font-bold"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  // Parse media from backend
  // Assuming backend returns product.media array from the join
  const photos = product.media
    ? product.media
      .filter((m) => m.media_type === "image")
      .map((m) => `/${m.url}`)
    : [];

  // If no specific media, try legacy image_url or placeholder
  if (photos.length === 0 && product.image_url) {
    photos.push(`/${product.image_url}`);
  }
  // Fallback if absolutely nothing
  if (photos.length === 0) {
    photos.push("https://via.placeholder.com/600x600?text=No+Image");
  }

  const videoUrl = product.media
    ? product.media.find((m) => m.media_type === "video")?.url
    : null; // Assuming url needs / prefix if local, or is absolute logic



  return (
    <div className="pt-24 bg-white dark:bg-background-dark min-h-screen relative">
      <SEO
        title={product.name}
        description={product.description}
        image={product.main_image ? `/${product.main_image}` : (product.image ? `/${product.image}` : undefined)}
      />
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

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Left Column: Photos / Video (Look of Jewelry) */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-40 space-y-8">
              {/* Media Toggle */}
              <div className="flex justify-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <button
                  onClick={() => setActiveMedia("photo")}
                  className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${activeMedia === "photo" ? "text-primary" : "text-gray-400"}`}
                >
                  Photos / Look
                </button>
                {videoUrl && (
                  <button
                    onClick={() => setActiveMedia("video")}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${activeMedia === "video" ? "text-primary" : "text-gray-400"}`}
                  >
                    Videos / Look
                  </button>
                )}
              </div>

              {/* Display Area */}
              <div className="relative aspect-square bg-[#FAF8F5] dark:bg-surface-dark flex items-center justify-center p-8 overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                {activeMedia === "photo" ? (
                  <img
                    src={photos[currentPhotoIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-all duration-700 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col">
                    <video
                      src={`/${videoUrl}`}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted
                      loop
                    />
                  </div>
                )}

                <button
                  onClick={handleToggleWishlist}
                  className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isLiked ? "bg-primary text-white" : "bg-white/90 dark:bg-black/80 text-text-main-light dark:text-text-main-dark"}`}
                >
                  <span className="material-icons-outlined text-lg">
                    {isLiked ? "favorite" : "favorite_border"}
                  </span>
                </button>
              </div>

              {/* Thumbnails (Multiple Angles) */}
              {activeMedia === "photo" && (
                <div className="grid grid-cols-5 gap-3">
                  {photos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`aspect-square bg-white dark:bg-surface-dark border transition-all p-2 ${currentPhotoIndex === idx ? "border-primary" : "border-gray-100 dark:border-gray-800 opacity-60"}`}
                    >
                      <img
                        src={img}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Information (The List) */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              {/* Header Info */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-serif text-text-main-light dark:text-text-main-dark mb-2 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-primary text-[11px] font-bold tracking-[0.5em] uppercase mb-6">
                  {product.collection_name || "Main Collection"}
                </p>
              </div>

              {/* Specification List */}
              <div className="grid grid-cols-1 gap-4 text-sm border-t border-gray-100 dark:border-gray-800 pt-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800/50">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted-light font-bold">
                    Style / SKU No
                  </span>
                  <span className="font-medium">{product.sku || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800/50">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted-light font-bold">
                    Product Type
                  </span>
                  <span className="font-medium">
                    {product.product_type || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800/50">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted-light font-bold">
                    Set Info
                  </span>
                  <span className="font-medium italic">
                    {product.set_name || "Standalone Piece"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-12 mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Metal
                      </span>
                      <span className="text-sm">
                        {product.metal_type || "Gold"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Metal Purity
                      </span>
                      <span className="text-sm">
                        {product.metal_purity || "18K"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Metal Color
                      </span>
                      <span className="text-sm">
                        {product.metal_color || "Yellow"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Metal Weight
                      </span>
                      <span className="text-sm">
                        {product.metal_weight
                          ? `${product.metal_weight}g`
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Gem Stones
                      </span>
                      <span className="text-sm">
                        {product.gem_stones || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Centre Stone
                      </span>
                      <span className="text-sm">
                        {product.center_stone_weight
                          ? `${product.center_stone_weight} cts`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Total Stone Wt.
                      </span>
                      <span className="text-sm">
                        {product.total_stone_weight
                          ? `${product.total_stone_weight} cts`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-1">
                        Diamond Weight
                      </span>
                      <span className="text-sm">
                        {product.total_diamond_weight
                          ? `${product.total_diamond_weight} cts`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col py-4 bg-gray-50 dark:bg-black/20 px-4 border-l-2 border-primary">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted-light font-bold mb-2">
                    Available Size
                  </span>
                  <span className="text-sm font-medium">
                    {product.size || "Custom Fit Available"}
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted-light font-bold">
                    Description
                  </span>
                  <p className="text-sm font-light leading-relaxed text-text-muted-light dark:text-text-muted-dark break-words whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-10 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex items-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-5 py-3 font-bold hover:text-primary transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-5 py-3 font-bold hover:text-primary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={addToBag}
                    className="flex-grow bg-primary hover:bg-primary-hover text-white py-4 text-[11px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Add to Selection
                  </button>
                </div>
                <Link
                  to="/bespoke"
                  className="w-full text-center py-4 border border-gray-200 dark:border-gray-800 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-50 dark:hover:bg-black/20 transition-all"
                >
                  Request Private Customization
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Section */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#151515] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase block mb-4">
              You May Also Desire
            </span>
            <h2 className="text-3xl font-serif">Refined Pairings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="group text-center"
              >
                <div className="relative overflow-hidden bg-white dark:bg-surface-dark mb-6 aspect-square flex items-center justify-center p-8 transition-all duration-500 hover:shadow-xl border border-gray-50 dark:border-gray-800/50">
                  <img
                    alt={p.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    src={
                      p.main_image
                        ? `/${p.main_image}`
                        : p.image ||
                        "https://via.placeholder.com/300x300?text=No+Image"
                    }
                  />
                </div>
                <h3 className="text-lg font-serif mb-1 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
