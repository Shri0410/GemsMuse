import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import journal from "../assets/Banner/journal.jpg";

const Journal = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const res = await fetch('/api/journals');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setJournals(data);
                }
            } catch (error) {
                console.error("Error fetching journals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

    // Helper to format date if stored as timestamp/string
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) return <div className="min-h-screen bg-white dark:bg-background-dark pt-32 text-center">Loading stories...</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark pt-20 transition-colors duration-300">

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src={journal}
                        alt="The Muse Journal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                </div>

                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in-up">
                    <span className="block text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-90">
                        Editorial & Stories
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                        The Muse Journal
                    </h1>
                    <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90 leading-relaxed">
                        Curated stories on design, craftsmanship, and the art of living beautifully.
                    </p>
                </div>
            </section>

            {/* Journal Entries Grid */}
            <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-20">
                    {journals.map((entry, index) => (
                        <Link
                            to={`/journal/${entry.id}`}
                            key={entry.id}
                            className={`group cursor-pointer flex flex-col gap-6 ${index % 2 !== 0 ? "md:translate-y-12" : ""}`}
                        >
                            <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] w-full">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                                <img
                                    src={entry.image_url ? `/${entry.image_url}` : "/placeholder.jpg"}
                                    alt={entry.title}
                                    className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
                                        {entry.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4 text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                                    <span>{formatDate(entry.created_at)}</span>
                                    <span className="w-1 h-1 bg-primary rounded-full" />
                                    <span>{entry.read_time}</span>
                                </div>

                                <h2 className="text-3xl font-serif text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                    {entry.title}
                                </h2>

                                <p className="text-text-secondary-light dark:text-text-secondary-dark font-light leading-relaxed line-clamp-3 text-ellipsis overflow-hidden">
                                    {entry.excerpt}
                                </p>

                                <div className="mt-4">
                                    <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-primary pb-1 group-hover:text-primary transition-colors">
                                        Read Story
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {journals.length === 0 && (
                        <div className="col-span-1 md:col-span-2 text-center text-gray-400 py-12">
                            No stories published yet.
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="bg-primary/5 dark:bg-white/5 py-24 px-6 mt-12">
                <div className="max-w-xl mx-auto text-center">
                    <span className="material-icons-outlined text-4xl text-primary mb-6">
                        auto_awesome
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif mb-4 text-text-main-light dark:text-text-main-dark">
                        Join the Inner Circle
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 font-light">
                        Receive exclusive stories, early access to collections, and styling tips directly to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 bg-transparent border border-text-muted-light/30 dark:border-white/20 px-6 py-3 focus:border-primary focus:ring-0 outline-none transition-colors text-text-main-light dark:text-text-main-dark placeholder-text-muted-light/50"
                        />
                        <button className="bg-primary text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-primaryHover transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default Journal;
