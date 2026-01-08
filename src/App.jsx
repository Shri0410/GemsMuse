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
      className={`fixed bottom-28 right-8 z-[90] w-12 h-12 bg-white dark:bg-surface-dark text-primary border border-primary/20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${
        isVisible
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

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <ScrollToTop />
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route
              path="/collections/:collectionId"
              element={<CollectionDetail />}
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/bespoke" element={<Bespoke />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </HashRouter>
  );
};

export default App;
