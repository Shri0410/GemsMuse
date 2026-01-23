import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JournalPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetch the specific post
                const res = await fetch(`/api/journals/${id}`);
                if (!res.ok) throw new Error('Post not found');
                const data = await res.json();

                // Parse content if needed
                if (typeof data.content === 'string') {
                    try {
                        data.content = JSON.parse(data.content);
                    } catch (e) {
                        data.content = [];
                    }
                }
                setPost(data);

                // Fetch other posts for "Related Stories"
                const allRes = await fetch('/api/journals');
                const allData = await allRes.json();
                if (Array.isArray(allData)) {
                    const related = allData
                        .filter(entry => entry.id !== parseInt(id))
                        .slice(0, 3);
                    setRelatedPosts(related);
                }

                window.scrollTo(0, 0);
            } catch (error) {
                console.error(error);
                navigate("/journal");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        return <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">Loading...</div>;
    }

    if (!post) return null;

    // Render content blocks based on type
    const renderContent = (content) => {
        if (!Array.isArray(content)) return null;

        return content.map((block, index) => {
            switch (block.type) {
                case "paragraph":
                    return (
                        <p key={index} className="text-lg md:text-xl font-light leading-relaxed text-text-secondary-light dark:text-text-secondary-dark mb-8">
                            {block.text}
                        </p>
                    );
                case "heading":
                    return (
                        <h3 key={index} className="text-2xl md:text-3xl font-serif text-text-main-light dark:text-text-main-dark mt-12 mb-6">
                            {block.text}
                        </h3>
                    );
                case "quote":
                    return (
                        <blockquote key={index} className="border-l-4 border-primary pl-6 my-10 italic text-2xl font-serif text-text-main-light dark:text-text-main-dark">
                            "{block.text}"
                        </blockquote>
                    );
                case "image":
                    return (
                        <figure key={index} className="my-12">
                            <img
                                src={block.url}
                                alt={block.caption || "Article image"}
                                className="w-full h-auto object-cover max-h-[600px]"
                            />
                            {block.caption && (
                                <figcaption className="text-center text-sm text-text-muted-light dark:text-text-muted-dark mt-4 italic">
                                    {block.caption}
                                </figcaption>
                            )}
                        </figure>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark pt-20 transition-colors duration-300">

            {/* Hero Header */}
            <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-20 pb-12 text-center">
                <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{formatDate(post.created_at)}</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-serif text-text-main-light dark:text-text-main-dark mb-8 leading-tight break-words max-w-full">
                    {post.title}
                </h1>

                <div className="flex items-center justify-center gap-3 text-sm text-text-muted-light dark:text-text-muted-dark font-light">
                    <span>By <span className="font-medium text-text-main-light dark:text-text-main-dark">{post.author || "Gems Muse"}</span></span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{post.read_time}</span>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden mb-20">
                <img
                    src={post.image_url ? `/${post.image_url}` : "/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-6 mb-24">
                {renderContent(post.content)}

                {/* Share / Tags section could go here */}
                <div className="border-t border-gray-100 dark:border-gray-800 mt-16 pt-10 flex justify-between items-center">
                    <Link
                        to="/journal"
                        className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-text-muted-light hover:text-primary transition-colors"
                    >
                        <span className="material-icons-outlined">arrow_back</span>
                        Back to Journal
                    </Link>
                </div>
            </article>

            {/* Related Stories */}
            <section className="bg-gray-50 dark:bg-surface-dark py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-serif text-text-main-light dark:text-text-main-dark mb-12 text-center">
                        More Stories
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedPosts.map((related) => (
                            <Link to={`/journal/${related.id}`} key={related.id} className="group block">
                                <div className="aspect-[4/3] overflow-hidden mb-6">
                                    <img
                                        src={related.image_url ? `/${related.image_url}` : "/placeholder.jpg"}
                                        alt={related.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary block mb-3">
                                    {related.category}
                                </span>
                                <h4 className="text-xl font-serif text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors line-clamp-2">
                                    {related.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JournalPost;
