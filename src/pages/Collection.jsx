import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          console.error('Failed to fetch collections');
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="pt-20">
      {/* Editorial Header */}
      <section className="relative h-[60vh] flex items-center justify-center bg-background-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="The Collections"
            className="w-full h-full object-cover opacity-60"
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-primary text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block animate-fade-in font-bold">
            The House of Gems Muse
          </span>
          <h1 className="text-6xl md:text-8xl text-white font-serif mb-6 leading-tight">
            The{" "}
            <span className="font-script text-primary text-7xl md:text-[10rem] block -mt-4 italic">
              Galleries
            </span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto font-light tracking-widest leading-relaxed">
            Explore our curated collections, each a distinct narrative of
            artistry, heritage, and refined luxury.
          </p>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.id}`}
                  className="group luxury-frame block relative overflow-hidden bg-white dark:bg-surface-dark shadow-sm hover:shadow-2xl transition-all duration-700"
                >
                  <div className="aspect-[16/9] md:aspect-[4/3] relative overflow-hidden">
                    <div className="shimmer-effect"></div>
                    {collection.image_url ? (
                      <img
                        src={`/${collection.image_url}`}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                  </div>

                  <div className="p-8 md:p-12 text-center relative z-20">
                    <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-3 group-hover:tracking-[0.6em] transition-all duration-500">
                      {collection.subtitle || "Exclusive Collection"}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif text-text-main-light dark:text-text-main-dark mb-6 group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <div className="inline-block border-b border-primary/20 pb-1 group-hover:border-primary transition-all">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                        Discover the Narrative
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bespoke Invitation */}
      <section className="py-32 bg-[#121212] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid-bg"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#C5A065"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-bg)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
            Beyond the <span className="italic text-primary">Galleries</span>
          </h2>
          <p className="text-gray-400 font-light mb-12 max-w-lg mx-auto text-sm tracking-widest leading-relaxed">
            Each collection is a starting point. We invite you to collaborate
            with our master artisans to create a bespoke piece that is uniquely
            yours.
          </p>
          <Link
            to="/bespoke"
            className="bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl transition-all duration-500"
          >
            Start Your Bespoke Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collection;
