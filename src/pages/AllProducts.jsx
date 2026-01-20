import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    // Filter States
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedMetals, setSelectedMetals] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Initialize filters from URL query params (optional enhancement)
    useEffect(() => {
        const typeParam = searchParams.get("type");
        if (typeParam) {
            setSelectedTypes([typeParam]);
        }
    }, [searchParams]);

    // Extract Unique Filter Options
    const filterOptions = useMemo(() => {
        const collections = [...new Set(products.map((p) => p.collection_name).filter(Boolean))];
        const types = [...new Set(products.map((p) => p.product_type).filter(Boolean))];
        const metals = [...new Set(products.map((p) => p.metal_type).filter(Boolean))];
        const colors = [...new Set(products.map((p) => p.metal_color).filter(Boolean))];

        return { collections, types, metals, colors };
    }, [products]);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchCollection =
                selectedCollections.length === 0 ||
                selectedCollections.includes(product.collection_name);
            const matchType =
                selectedTypes.length === 0 || selectedTypes.includes(product.product_type);
            const matchMetal =
                selectedMetals.length === 0 || selectedMetals.includes(product.metal_type);
            const matchColor =
                selectedColors.length === 0 || selectedColors.includes(product.metal_color);

            return matchCollection && matchType && matchMetal && matchColor;
        });
    }, [products, selectedCollections, selectedTypes, selectedMetals, selectedColors]);

    const toggleFilter = (setter, value) => {
        setter((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const clearFilters = () => {
        setSelectedCollections([]);
        setSelectedTypes([]);
        setSelectedMetals([]);
        setSelectedColors([]);
    };

    const FilterSection = ({ title, options, selected, setter }) => {
        if (options.length === 0) return null;
        return (
            <div className="mb-8 animate-fade-in">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-text-main-light dark:text-text-main-dark">
                    {title}
                </h3>
                <div className="space-y-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => toggleFilter(setter, option)}
                                    className="peer sr-only"
                                />
                                <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded-sm peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                                <svg
                                    className="absolute top-0.5 left-0.5 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className={`text-sm font-light transition-colors ${selected.includes(option) ? 'text-primary' : 'text-text-muted-light group-hover:text-text-main-light dark:group-hover:text-text-main-dark'}`}>
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20 text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-background-light dark:bg-background-dark">
            <div className="max-w-[1600px] mx-auto"> {/* Wider container for sidebar layout */}
                <header className="mb-12 text-center animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-serif mb-6 text-text-main-light dark:text-text-main-dark">
                        All Products
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                    <p className="mt-6 text-text-muted-light max-w-2xl mx-auto font-light">
                        Discover our complete collection of exquisite jewelry.
                    </p>
                </header>

                {/* Mobile Filter Button */}
                <div className="md:hidden mb-6 flex justify-between items-center">
                    <span className="text-sm text-text-muted-light">
                        {filteredProducts.length} Results
                    </span>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 text-primary uppercase font-bold text-xs tracking-widest border border-primary/20 px-4 py-2 rounded-sm"
                    >
                        <span className="material-icons-outlined text-sm">filter_list</span>
                        Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside
                        className={`md:w-64 flex-shrink-0 ${isFilterOpen ? "block" : "hidden md:block"
                            }`}
                    >
                        <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 no-scrollbar">
                            <div className="flex justify-between items-center mb-6 md:hidden">
                                <h2 className="text-xl font-serif">Filters</h2>
                                <button onClick={() => setIsFilterOpen(false)}>
                                    <span className="material-icons-outlined">close</span>
                                </button>
                            </div>

                            <FilterSection
                                title="Collections"
                                options={filterOptions.collections}
                                selected={selectedCollections}
                                setter={setSelectedCollections}
                            />
                            <FilterSection
                                title="Product Type"
                                options={filterOptions.types}
                                selected={selectedTypes}
                                setter={setSelectedTypes}
                            />
                            <FilterSection
                                title="Metal"
                                options={filterOptions.metals}
                                selected={selectedMetals}
                                setter={setSelectedMetals}
                            />
                            <FilterSection
                                title="Color"
                                options={filterOptions.colors}
                                selected={selectedColors}
                                setter={setSelectedColors}
                            />

                            {(selectedCollections.length > 0 ||
                                selectedTypes.length > 0 ||
                                selectedMetals.length > 0 ||
                                selectedColors.length > 0) && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-xs tracking-widest uppercase text-text-muted-light hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-0.5"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-sm">
                                <p className="text-text-muted-light font-serif text-xl">No products match your filters.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-primary hover:underline text-sm uppercase tracking-widest"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group relative animate-slide-up"
                                    >
                                        <Link to={`/product/${product.id}`} className="block">
                                            <div className="luxury-frame aspect-[4/5] bg-white dark:bg-surface-dark overflow-hidden mb-4 relative">
                                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 z-10" />
                                                <img
                                                    src={
                                                        product.main_image
                                                            ? `http://localhost:5000/${product.main_image}`
                                                            : "/placeholder.jpg"
                                                    }
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                {/* Overlay Tags */}
                                                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                                    {product.collection_name && (
                                                        <span className="bg-white/90 dark:bg-black/90 text-[10px] px-2 py-1 uppercase tracking-widest backdrop-blur-sm shadow-sm">
                                                            {product.collection_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <h3 className="text-sm font-serif tracking-wide text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors truncate px-2">
                                                    {product.name}
                                                </h3>
                                                <div className="flex justify-center items-center gap-2 mt-1">
                                                    <p className="text-[10px] text-text-muted-light uppercase tracking-[0.2em]">
                                                        {product.product_type}
                                                    </p>
                                                    {product.metal_color && (
                                                        <>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <p className="text-[10px] text-text-muted-light uppercase tracking-[0.2em]">
                                                                {product.metal_color}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
