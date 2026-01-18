import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Collection Details
        const colRes = await fetch(`/api/collections/${collectionId}`);
        if (colRes.ok) {
          const colData = await colRes.json();
          setCollection(colData);
        }

        // Fetch Products for this Collection
        const prodRes = await fetch(`/api/products?collection_id=${collectionId}`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (collectionId) {
      fetchData();
    }
  }, [collectionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-center px-4">
        <h2 className="text-3xl font-serif mb-4 text-gray-800">Collection Not Found</h2>
        <Link to="/collection" className="text-primary hover:underline">Return to Galleries</Link>
      </div>
    );
  }

  return (
    <div className="pt-0 bg-background-light dark:bg-background-dark min-h-screen">
      {/* Immersive Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt={collection.name}
            className="w-full h-full object-cover animate-fade-in transition-transform duration-[10s] hover:scale-110"
            src={collection.image_url ? `/${collection.image_url}` : "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop"}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background-light dark:to-background-dark"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary text-[10px] uppercase tracking-[0.4em] mb-8 transition-all"
          >
            <span className="material-icons-outlined text-sm">west</span> Back
            to Galleries
          </Link>
          <span className="text-primary text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6 block animate-fade-in-up font-bold">
            Fine Jewelry Curation
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif mb-8 leading-tight animate-fade-in-up">
            The{" "}
            <span className="font-script text-primary text-7xl md:text-9xl lg:text-[11rem] block -mt-6 italic">
              {collection.name}
            </span>
          </h1>
          <div className="w-px h-24 bg-primary mx-auto opacity-50 animate-fade-in [animation-delay:0.5s]"></div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-background-dark relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="material-icons-outlined text-primary text-4xl mb-8 opacity-30">
            diamond
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-text-main-light dark:text-text-main-dark mb-10 leading-relaxed">
            "{collection.subtitle || "Timeless elegance"}"
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed text-lg tracking-wide max-w-2xl mx-auto mb-16">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div>
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">
                Catalogue
              </span>
              <h3 className="text-2xl md:text-3xl font-serif">The Pieces</h3>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted-light">
              Showing {products.length} Curated Treasures
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group luxury-frame block"
              >
                <div className="relative aspect-[4/5] bg-white dark:bg-surface-dark flex items-center justify-center p-12 overflow-hidden shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <div className="shimmer-effect"></div>
                  {product.main_image || product.image ? (
                    <img
                      alt={product.name}
                      className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
                      src={product.main_image ? `/${product.main_image}` : product.image}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-center border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">
                      Discover Details
                    </span>
                  </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                  <h4 className="text-xl font-serif text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] font-medium">
                    {product.material}
                  </p>

                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="py-32 text-center">
              <span className="material-icons-outlined text-6xl text-gray-200 dark:text-gray-800 mb-6">
                diamond
              </span>
              <p className="text-text-muted-light font-serif text-xl italic">
                This collection is currently being prepared for the next
                unveiling.
              </p>
              <Link
                to="/collection"
                className="mt-8 inline-block text-primary text-[10px] font-bold uppercase tracking-[0.3em] border-b border-primary/20 pb-1 hover:border-primary transition-all"
              >
                Explore Other Galleries
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionDetail;
