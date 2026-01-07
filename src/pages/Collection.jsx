import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";

const FilterDropdown = ({ label, options, selected, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border-b-2 border-transparent hover:border-primary/40 transition-all group whitespace-nowrap"
      >
        <span className="material-icons-outlined text-sm text-primary">
          {icon}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-main-light dark:text-text-main-dark">
          {selected === label ? label : selected}
        </span>
        <span
          className={`material-icons-outlined text-xs transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 z-[60] animate-fade-in-up origin-top-left overflow-hidden">
          <div className="p-3 bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-800">
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 material-icons-outlined text-xs text-text-muted-light">
                search
              </span>
              <input
                type="text"
                placeholder={`Search ${label}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-sm py-1.5 pl-7 pr-3 text-[10px] focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto no-scrollbar py-2">
            <button
              onClick={() => {
                onChange(label);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-2.5 text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors ${
                selected === label
                  ? "text-primary font-bold"
                  : "text-text-muted-light"
              }`}
            >
              All {label}s
            </button>
            {filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-2.5 text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors ${
                  selected === option
                    ? "text-primary font-bold"
                    : "text-text-muted-light"
                }`}
              >
                {option}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-5 py-4 text-[10px] text-text-muted-light italic">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterType, setFilterType] = useState("Type");
  const [filterMaterial, setFilterMaterial] = useState("Material");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isGridLoading, setIsGridLoading] = useState(false);

  const query = searchParams.get("q") || "";

  const types = ["Earrings", "Necklaces", "Rings"];
  const materials = ["Gold", "Silver", "Platinum", "Rose Gold", "White Gold"];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filterType !== "Type") {
      result = result.filter((p) => p.category === filterType);
    }

    if (filterMaterial !== "Material") {
      result = result.filter((p) =>
        p.material.toLowerCase().includes(filterMaterial.toLowerCase())
      );
    }

    return result;
  }, [filterType, filterMaterial, query]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Animation trigger for grid updates
  useEffect(() => {
    setIsGridLoading(true);
    const timer = setTimeout(() => setIsGridLoading(false), 400);
    setVisibleCount(8);
    return () => clearTimeout(timer);
  }, [filterType, filterMaterial, query]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const clearSearch = () => {
    setSearchParams({});
    setFilterType("Type");
    setFilterMaterial("Material");
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Collection Banner"
            className="w-full h-full object-cover object-center scale-105"
            src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <span className="text-primary text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block animate-fade-in font-bold">
            The House of Gems Muse
          </span>
          <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 leading-tight">
            {query ? "Search" : "The"}{" "}
            <span className="font-script text-primary text-6xl md:text-[8rem] block -mt-2 italic">
              {query ? "Results" : "Collection"}
            </span>
          </h1>
          {query && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <p className="text-white text-sm tracking-widest uppercase font-light">
                Showing results for "
                <span className="text-primary font-bold">{query}</span>"
              </p>
              <button
                onClick={clearSearch}
                className="text-[10px] text-white/60 hover:text-white uppercase tracking-widest border-b border-white/20 pb-1 flex items-center gap-2 transition-all"
              >
                <span className="material-icons-outlined text-sm">close</span>
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[73px] md:top-[125px] z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4 w-full md:w-auto flex-wrap md:flex-nowrap py-2">
              <div className="flex items-center gap-2 pr-2 border-r border-gray-100 dark:border-gray-800">
                <span className="material-icons-outlined text-text-muted-light text-sm">
                  filter_alt
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:inline-block text-text-muted-light">
                  Filters
                </span>
              </div>

              <FilterDropdown
                label="Type"
                options={types}
                selected={filterType}
                onChange={setFilterType}
                icon="category"
              />

              <FilterDropdown
                label="Material"
                options={materials}
                selected={filterMaterial}
                onChange={setFilterMaterial}
                icon="diamond"
              />

              {(filterType !== "Type" || filterMaterial !== "Material") && (
                <button
                  onClick={() => {
                    setFilterType("Type");
                    setFilterMaterial("Material");
                  }}
                  className="text-[9px] uppercase tracking-widest font-bold text-primary flex items-center gap-1 hover:opacity-70 ml-2"
                >
                  <span className="material-icons-outlined text-xs">
                    refresh
                  </span>
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end pb-2 md:pb-0">
              <span className="text-[10px] text-text-muted-light tracking-widest uppercase font-medium">
                {filteredProducts.length} Treasures Found
              </span>
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-[10px] text-text-muted-light uppercase tracking-widest">
                  Sort:
                </span>
                <select className="appearance-none bg-transparent border-none text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer focus:ring-0 pr-0 py-1 hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark text-right">
                  <option>Featured</option>
                  <option>Newest Arrival</option>
                  <option>Value: High to Low</option>
                  <option>Value: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-background-light dark:bg-background-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 transition-all duration-500 ${
              isGridLoading
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {visibleProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-white dark:bg-surface-dark mb-5 aspect-[4/5] flex items-center justify-center shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <div className="shimmer-effect"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-primary text-white text-[8px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-lg">
                        New
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-black text-white text-[8px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-lg">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <img
                    alt={product.name}
                    className="w-2/3 h-2/3 object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
                    src={product.image}
                  />

                  <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <button className="bg-white/90 dark:bg-black/80 p-2.5 rounded-full hover:bg-primary hover:text-white transition-all shadow-md">
                      <span className="material-icons-outlined text-sm">
                        favorite_border
                      </span>
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 text-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">
                      Discover Details
                    </span>
                  </div>
                </div>
                <div className="text-center px-2">
                  <h3 className="text-base font-serif mb-1.5 text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] mb-2 font-medium">
                    {product.material}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < filteredProducts.length && !isGridLoading && (
            <div className="text-center mt-24">
              <button
                onClick={handleLoadMore}
                className="group relative bg-transparent hover:bg-primary hover:text-white text-text-main-light dark:text-text-main-dark border border-gray-200 dark:border-gray-700 px-14 py-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                View More Treasures
              </button>
            </div>
          )}

          {filteredProducts.length === 0 && !isGridLoading && (
            <div className="text-center py-24 bg-white/50 dark:bg-surface-dark/20 border border-dashed border-gray-200 dark:border-gray-800 rounded-sm animate-fade-in">
              <span className="material-icons-outlined text-6xl text-primary/10 mb-6">
                diamond
              </span>
              <p className="text-text-muted-light font-serif text-2xl italic mb-6">
                No pieces match your current curation.
              </p>
              <button
                onClick={clearSearch}
                className="bg-primary text-white px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg hover:bg-primary-hover transition-all"
              >
                Reveal All Collections
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collection;
