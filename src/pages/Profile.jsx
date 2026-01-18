import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import Wishlist from "./Wishlist"; // Re-using Wishlist component logic if possible, or just linking.
// Actually, Wishlist component is a full page. I can just render it if active tab, or link to it.
// User checking profile might want to see it here. Let's try to render content based on active tab.

const Profile = () => {
  const { customer, logout } = useCustomerAuth();
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
              <div className="bg-white dark:bg-surface-dark p-12 text-center border dashed border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-serif mb-4">Shopping Bag</h3>
                <p className="text-text-muted-light mb-8">Review your selection before acquiring.</p>
                {/* In a real app, we would duplicate the Bag UI here or make it a component */}
                <button
                  onClick={() => { /* Trigger Bag Drawer if possible, or just show empty state */ }}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] uppercase tracking-widest font-bold"
                >
                  View Bag in Navbar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
