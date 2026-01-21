import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import CollectionDetail from "./pages/CollectionDetail";
import ProductDetails from "./pages/ProductDetails";
import Bespoke from "./pages/Bespoke";
import Repairs from "./pages/Repairs";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Bag from "./pages/Bag";
import AllProducts from "./pages/AllProducts";

// Dashboard Imports
import { AuthProvider } from "./context/AuthContext";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";
import { ShopProvider } from "./context/ShopContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import DashboardCollections from "./pages/dashboard/Collections";
import DashboardProducts from "./pages/dashboard/Products";
import ProductForm from "./pages/dashboard/ProductForm";
import DashboardHome from "./pages/dashboard/Collections"; // Reuse Collections as home for now or create a simple one
import FeaturedCollections from "./pages/dashboard/FeaturedCollections";
import UserManagement from "./pages/dashboard/UserManagement";
import ManageAttributes from "./pages/dashboard/ManageAttributes";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return null;
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-28 right-8 z-[90] w-12 h-12 bg-white dark:bg-surface-dark text-primary border border-primary/20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${isVisible
        ? "translate-y-0 opacity-100 scale-100"
        : "translate-y-10 opacity-0 scale-50 pointer-events-none"
        } hover:bg-primary hover:text-white group`}
      aria-label="Back to top"
    >
      <span className="material-icons-outlined text-xl group-hover:animate-bounce">
        arrow_upward
      </span>
    </button>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Helper to allow existing routes to have Navbar/Footer
  const MainLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <ScrollToTop />
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );

  return (
    <AuthProvider>
      <CustomerAuthProvider>
        <ShopProvider>
          <HashRouter>
            <Routes>
              {/* Dashboard Routes (No Navbar/Footer) */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardCollections />} /> {/* Default to collections */}
                <Route path="collections" element={<DashboardCollections />} />
                <Route path="products" element={<DashboardProducts />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductForm />} />
                <Route path="featured" element={<FeaturedCollections />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="attributes" element={<ManageAttributes />} />
              </Route>

              {/* Public Website Routes */}
              <Route path="*" element={
                <MainLayout>
                  <Routes>
                    {/* Public Access Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/auth" element={<Auth />} />

                    {/* Restricted Access Routes (Customer Login Required) */}
                    <Route path="/collection" element={<CustomerProtectedRoute><Collection /></CustomerProtectedRoute>} />
                    <Route path="/all-products" element={<CustomerProtectedRoute><AllProducts /></CustomerProtectedRoute>} />
                    <Route path="/collections/:collectionId" element={<CustomerProtectedRoute><CollectionDetail /></CustomerProtectedRoute>} />
                    <Route path="/product/:id" element={<CustomerProtectedRoute><ProductDetails /></CustomerProtectedRoute>} />
                    <Route path="/bespoke" element={<CustomerProtectedRoute><Bespoke /></CustomerProtectedRoute>} />
                    <Route path="/repairs" element={<CustomerProtectedRoute><Repairs /></CustomerProtectedRoute>} />
                    <Route path="/services" element={<CustomerProtectedRoute><Services /></CustomerProtectedRoute>} />
                    <Route path="/profile" element={<CustomerProtectedRoute><Profile /></CustomerProtectedRoute>} />
                    <Route path="/wishlist" element={<CustomerProtectedRoute><Wishlist /></CustomerProtectedRoute>} />
                    <Route path="/bag" element={<CustomerProtectedRoute><Bag /></CustomerProtectedRoute>} />
                  </Routes>
                </MainLayout>
              } />
            </Routes>
          </HashRouter>
        </ShopProvider>
      </CustomerAuthProvider>
    </AuthProvider>
  );
};

export default App;
