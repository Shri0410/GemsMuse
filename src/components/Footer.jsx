import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/White.jpg";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 text-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="">
            <div className="mb-3">
              <img
                src={logo}
                alt="GEMS MUSE"
                className="h-20 w-auto object-contain invert"
              />
            </div>
            <p className="mb-6 font-light leading-relaxed text-xs">
              Crafting timeless pieces that celebrate love, artistry, and the
              beauty of precious gemstones since our inception in 1985.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined text-sm">
                  camera_alt
                </span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined text-sm">
                  facebook
                </span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
              Collections
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link
                  to="/collection"
                  className="hover:text-primary transition-colors"
                >
                  Koi Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
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
              Support
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-xs font-light">
              <li className="flex items-start gap-3">
                <span className="material-icons-outlined text-primary text-sm mt-0.5">
                  location_on
                </span>
                <span>123 Luxury Lane, Jewelry District, Mumbai</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-sm">
                  call
                </span>
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-sm">
                  email
                </span>
                <span>hello@gemsmuse.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light">
          <p>© 2024 Gems Muse. All rights reserved.</p>
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
