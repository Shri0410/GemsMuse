import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const InquiryModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.full_name || '',
        email: initialData?.email || '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md p-8 rounded-xl shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif text-text-main-light dark:text-text-main-dark">Inquiry Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>

                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
                    Please provide your contact details so we can formalize your inquiry.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-4 mt-4 text-sm uppercase tracking-[0.2em] font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Proceed to WhatsApp'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const Bag = () => {
    const { bagItems, removeFromBag, updateQuantity, subtotal, checkout, getCheckoutUrl, bagCount } = useShop();
    const { user } = useCustomerAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInquiryClick = () => {
        setIsModalOpen(true);
    };

    const handleInquirySubmit = async (contactData) => {
        // Prepare WhatsApp URL and open window immediately to avoid popup blocker
        const whatsappUrl = getCheckoutUrl();
        // Open a new tab immediately (it might be blank initially)
        const newWindow = window.open(whatsappUrl, '_blank');

        // Close modal immediately
        setIsModalOpen(false);

        try {
            // 1. Save to Database & Send Email (Async)
            await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer_name: contactData.name,
                    customer_email: contactData.email,
                    customer_phone: contactData.phone,
                    items: bagItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        sku: item.sku,
                        quantity: item.quantity
                    }))
                })
            });
            console.log("Inquiry saved successfully");

        } catch (error) {
            console.error("Error submitting inquiry:", error);
            // If fetch fails, the window is already opened, so the user is still redirected.
        }
    };

    return (
        <div className="pt-40 pb-24 bg-background-light dark:bg-background-dark min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase block mb-4">
                        Your Selection
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif text-text-main-light dark:text-text-main-dark">
                        Shopping Bag
                    </h1>
                    <div className="w-16 h-px bg-primary mx-auto mt-8 opacity-40"></div>
                </div>

                {bagItems.length > 0 ? (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl p-8 md:p-12">
                            <div className="space-y-8">
                                {bagItems.map((item) => (
                                    <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0">
                                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-gray-50 dark:bg-black/20 p-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                            />
                                        </div>

                                        <div className="flex-grow text-center md:text-left">
                                            <h3 className="text-xl font-serif text-text-main-light dark:text-text-main-dark mb-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-[10px] text-text-muted-light uppercase tracking-widest mb-4">
                                                {item.collection || "Fine Jewelry"}
                                            </p>

                                        </div>

                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 px-4 py-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="text-text-muted-light hover:text-primary transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="text-text-muted-light hover:text-primary transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromBag(item.id)}
                                                className="text-[10px] uppercase tracking-widest text-text-muted-light hover:text-red-500 transition-colors flex items-center gap-2"
                                            >
                                                <span className="material-icons-outlined text-sm">delete_outline</span>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">


                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleInquiryClick}
                                        className="w-full bg-primary hover:bg-primary-hover text-white py-5 text-sm uppercase tracking-[0.3em] font-bold transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                                    >
                                        Proceed to Inquire
                                    </button>
                                    <p className="text-center text-[10px] text-text-muted-light italic mt-4">
                                        Availability and final pricing will be confirmed via WhatsApp.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Link to="/collection" className="text-xs uppercase tracking-widest font-bold border-b border-primary text-primary pb-1 hover:text-primary-hover transition-colors">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto text-center py-20 bg-white/50 dark:bg-surface-dark/30 border border-dashed border-gray-200 dark:border-gray-800 p-12">
                        <span className="material-icons-outlined text-5xl text-primary/30 mb-6">
                            shopping_bag
                        </span>
                        <h2 className="text-2xl font-serif mb-4">
                            Your bag is currently empty
                        </h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark font-light text-sm leading-relaxed mb-10">
                            Discover our collections to find the perfect piece for your journey.
                        </p>
                        <Link
                            to="/collection"
                            className="inline-block bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            <InquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleInquirySubmit}
                initialData={user}
            />
        </div>
    );
};

export default Bag;
