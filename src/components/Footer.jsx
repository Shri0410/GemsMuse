import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/shashi.me/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/ShashiJeweled",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shashi-bhushan-11083b14/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com/gemsmuse",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#121212] text-gray-400 py-16 text-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <Link to="/">
                <img
                  src={logo}
                  alt="GEMS MUSE"
                  className="h-20 w-auto object-contain invert"
                />
              </Link>
            </div>
            <p className="mb-6 font-light leading-relaxed text-xs">
              Crafting timeless pieces that celebrate love, artistry, and the
              beauty of precious gemstones since our inception in 2021.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 hover:bg-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
              Collections
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link
                  to="/collections/koi"
                  className="hover:text-primary transition-colors"
                >
                  Koi Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/arc"
                  className="hover:text-primary transition-colors"
                >
                  Colour ARC
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="hover:text-primary transition-colors"
                >
                  Maa Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="hover:text-primary transition-colors"
                >
                  Cuddle Kids
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-xs font-light">
              {/* <li className="flex items-start gap-3">
                <span className="material-icons-outlined text-primary text-sm mt-0.5">
                  location_on
                </span>
                <span>123 Luxury Lane, Jewelry District, Mumbai</span>
              </li> */}
              <li className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-sm">
                  call
                </span>
                <span>+852 54665089</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-sm">
                  email
                </span>
                <span>jewelery@gemsmuse.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p>© 2026 Gems Muse. All rights reserved.</p>
            <p className="hidden md:block text-light">|</p>
            <p>Design & Developed by Syntiaro</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
