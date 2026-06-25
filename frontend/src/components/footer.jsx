import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const footer = () => {
  return (
    <div className="bg-gray-50 mt-20">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-8 sm:gap-14 py-10 text-sm">
        <div>
          <Link to="/" className="inline-block mb-5">
            <img src={assets.logo} className="w-32 hover:opacity-80 transition-opacity cursor-pointer" alt="Logo" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            We are committed to providing high-quality products and excellent customer service. Our team works tirelessly to ensure your shopping experience is nothing short of exceptional.
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold mb-5 text-gray-900">Quick Links</p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/collection" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                Collection
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-semibold mb-5 text-gray-900">Get in Touch</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-gray-400">📞</span>
              <a href="tel:01331759272" className="hover:text-blue-600 transition-colors">
                01331759272
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">✉️</span>
              <a href="mailto:theboysware@gmail.com" className="hover:text-blue-600 transition-colors">
                theboysware@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <p className="py-5 text-sm text-center text-gray-500">
          Copyright 2025&copy; - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default footer;
