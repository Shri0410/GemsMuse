import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { MOCK_PRODUCTS } from "../constants";

const ShopContext = createContext();

export const useShop = () => {
  return useContext(ShopContext);
};

export const ShopProvider = ({ children }) => {
  const [bag, setBag] = useState(() => {
    try {
      const savedBag = localStorage.getItem("gems_muse_bag");
      return savedBag ? JSON.parse(savedBag) : [];
    } catch (error) {
      console.error("Error parsing bag from local storage", error);
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("gems_muse_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing wishlist from local storage", error);
      return [];
    }
  });
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(false);

  // Save bag to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("gems_muse_bag", JSON.stringify(bag));
    window.dispatchEvent(new Event("bag-updated"));
  }, [bag]);

  // Save wishlist to local storage
  useEffect(() => {
    localStorage.setItem("gems_muse_wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist-updated"));
  }, [wishlist]);

  // Fetch product details for items in bag OR wishlist that aren't in cache
  useEffect(() => {
    const fetchMissingProducts = async () => {
      // Collect IDs from both bag and wishlist
      const bagIds = bag.map((item) => String(item.id));
      const wishlistIds = wishlist.map((id) => String(id));
      const allIds = [...new Set([...bagIds, ...wishlistIds])];

      const missingIds = allIds.filter((id) => !productsCache[id]);

      if (missingIds.length === 0) return;

      setLoading(true);
      const newCache = { ...productsCache };

      // First check MOCK_PRODUCTS for instant access (legacy support)
      missingIds.forEach((id) => {
        const mock = MOCK_PRODUCTS.find((p) => String(p.id) === String(id));
        if (mock) {
          newCache[id] = mock;
        }
      });

      const idsToFetch = missingIds.filter((id) => !newCache[id]);

      if (idsToFetch.length > 0) {
        try {
          await Promise.all(
            idsToFetch.map(async (id) => {
              try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                  const data = await res.json();
                  let imageUrl = null;
                  if (data.main_image) {
                    imageUrl = `/${data.main_image}`;
                  } else if (data.image) {
                    imageUrl = `/${data.image}`;
                  } else if (data.media && Array.isArray(data.media)) {
                    const foundImage = data.media.find(
                      (m) => m.media_type === "image",
                    );
                    if (foundImage) imageUrl = `/${foundImage.url}`;
                  }

                  const normalized = {
                    ...data,
                    image: imageUrl || "https://via.placeholder.com/150",
                    price:
                      typeof data.price === "string"
                        ? parseFloat(data.price)
                        : data.price,
                  };
                  newCache[id] = normalized;
                }
              } catch (err) {
                console.error(`Failed to fetch product ${id}`, err);
              }
            }),
          );
        } catch (error) {
          console.error("Error fetching items", error);
        }
      }

      setProductsCache(newCache);
      setLoading(false);
    };

    fetchMissingProducts();
  }, [bag, wishlist, productsCache]);

  const addToBag = (id, quantity = 1, productDetails = null) => {
    if (productDetails) {
      setProductsCache((prev) => ({ ...prev, [id]: productDetails }));
    }
    setBag((prev) => {
      const existing = prev.find((item) => String(item.id) === String(id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(id)
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prev, { id, quantity }];
      }
    });
  };

  const removeFromBag = (id) => {
    setBag((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromBag(id);
      return;
    }
    setBag((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const clearBag = () => {
    setBag([]);
  };

  const addToWishlist = (id, productDetails = null) => {
    if (productDetails) {
      setProductsCache((prev) => ({ ...prev, [id]: productDetails }));
    }
    setWishlist((prev) => {
      if (prev.includes(String(id))) return prev;
      return [...prev, String(id)];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== String(id)));
  };

  const isWishlisted = (id) => {
    return wishlist.includes(String(id));
  };

  const toggleWishlist = (id, productDetails = null) => {
    if (isWishlisted(id)) {
      removeFromWishlist(id);
      return false; // indicated removed
    } else {
      addToWishlist(id, productDetails);
      return true; // indicated added
    }
  };

  const wishlistItems = useMemo(() => {
    return wishlist.map((id) => productsCache[id]).filter(Boolean);
  }, [wishlist, productsCache]);

  const bagItems = useMemo(() => {
    return bag
      .map((item) => {
        const product = productsCache[item.id];
        if (!product) return null;
        return { ...product, quantity: item.quantity };
      })
      .filter(Boolean);
  }, [bag, productsCache]);

  const subtotal = useMemo(() => {
    return bagItems.reduce(
      (acc, curr) => acc + (curr.price || 0) * curr.quantity,
      0,
    );
  }, [bagItems]);

  const bagCount = useMemo(() => {
    return bag.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [bag]);

  const getCheckoutUrl = () => {
    const phoneNumber = "85254665089";
    if (bagItems.length === 0) return "";

    let message =
      "Hello, I would like to inquire about the following pieces from GEMS MUSE:\n\n";
    bagItems.forEach((item) => {
      message += `- ${item.name} (Qty: ${item.quantity})\n`;
    });

    message += "\nPlease confirm availability.";
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <ShopContext.Provider
      value={{
        bag,
        bagItems,
        addToBag,
        removeFromBag,
        updateQuantity,
        clearBag,
        bagCount,
        subtotal,
        loading,
        checkout,
        getCheckoutUrl,
        wishlist,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
