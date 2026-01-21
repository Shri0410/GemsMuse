import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { useShop } from "../context/ShopContext";
import Wishlist from "./Wishlist"; // Re-using Wishlist component logic if possible, or just linking.
// Actually, Wishlist component is a full page. I can just render it if active tab, or link to it.
// User checking profile might want to see it here. Let's try to render content based on active tab.

const Profile = () => {
  const { customer, logout } = useCustomerAuth();
  const { bagItems, removeFromBag, subtotal, checkout } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!customer) {
      navigate('/auth');
    }
  }, [customer, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!customer) return null;

  return (
    <div className="pt-32 pb-24 bg-background-light dark:bg-[#121212] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div>
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase block mb-3 animate-fade-in">
              Welcome Back
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-text-main-light dark:text-text-main-dark mb-4">
              {customer.fullName || 'Valued Member'}
            </h1>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm tracking-wide">
              {customer.email}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-8 mb-12 border-b border-gray-100 dark:border-gray-800">
          {['Dashboard', 'Wishlist', 'Bag'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 text-xs uppercase tracking-[0.2em] font-bold transition-all ${activeTab === tab.toLowerCase()
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-muted-light hover:text-text-main-light dark:hover:text-text-main-dark'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder Dashboard Widgets */}
              <div className="bg-white dark:bg-surface-dark p-8 shadow-sm border border-gray-50 dark:border-gray-800">
                <h3 className="text-xl font-serif mb-4">Account Details</h3>
                <div className="space-y-2 text-sm text-text-muted-light">
                  <p><strong>Name:</strong> {customer.fullName}</p>
                  <p><strong>Email:</strong> {customer.email}</p>
                  <p><strong>Member Since:</strong> {new Date().getFullYear()}</p>
                </div>
                <button className="mt-6 text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">Edit Details</button>
              </div>

              <div className="bg-white dark:bg-surface-dark p-8 shadow-sm border border-gray-50 dark:border-gray-800">
                <h3 className="text-xl font-serif mb-4">Order History</h3>
                <p className="text-sm text-text-muted-light mb-6">You haven't placed any orders yet.</p>
                <Link to="/collection" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">Start Shopping</Link>
              </div>

              <div className="bg-white dark:bg-surface-dark p-8 shadow-sm border border-gray-50 dark:border-gray-800">
                <h3 className="text-xl font-serif mb-4">Bookings</h3>
                <p className="text-sm text-text-muted-light mb-6">No upcoming appointments.</p>
                <Link to="/bespoke" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">Book Consultation</Link>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="animate-fade-in">
              {/* Embed Wishlist Logic simplified or just a redirect prompt */}
              <div className="bg-white dark:bg-surface-dark p-12 text-center border dashed border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-serif mb-4">Your Wishlist</h3>
                <p className="text-text-muted-light mb-8">View and manage your saved masterpieces.</p>
                <Link to="/wishlist" className="bg-primary text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold">Go to Wishlist Page</Link>
              </div>
            </div>
          )}

          {activeTab === 'bag' && (
            <div className="animate-fade-in">
              {bagItems.length > 0 ? (
                <div className="bg-white dark:bg-surface-dark p-8 shadow-sm border border-gray-50 dark:border-gray-800">
                  <h3 className="text-2xl font-serif mb-8">Shopping Bag</h3>
                  <div className="space-y-8">
                    {bagItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0 last:pb-0">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-black/20 flex-shrink-0 p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-serif font-bold hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                {item.name}
                              </h4>
                              <p className="text-xs text-text-muted-light mt-1">{item.collection_name || "Exclusive Collection"}</p>
                            </div>
                            <button
                              onClick={() => removeFromBag(item.id)}
                              className="text-text-muted-light hover:text-red-500 transition-colors"
                              title="Remove"
                            >
                              <span className="material-icons-outlined">delete_outline</span>
                            </button>
                          </div>
                          <div className="flex justify-between items-end mt-4">
                            <div className="text-xs uppercase tracking-widest font-bold">
                              Quantity: {item.quantity}
                            </div>
                            <div className="text-sm font-bold">
                              ${(item.price || 0).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-end gap-4">

                    <button
                      onClick={checkout}
                      className="bg-primary hover:bg-primary-hover text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-surface-dark p-12 text-center border dashed border-gray-200 dark:border-gray-800">
                  <h3 className="text-2xl font-serif mb-4">Your Bag is Empty</h3>
                  <p className="text-text-muted-light mb-8">Discover our masterpiece collection today.</p>
                  <Link to="/collection" className="bg-primary text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold">
                    Cleanse Your Palate & Shop
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
