import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#0F1035] text-white py-6" id='footer'>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              We are a company dedicated to providing the best products and services to our customers. Our mission is to improve your shopping experience with high-quality products and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/product" className="hover:underline">Shop</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="text-2xl flex gap-1">
              <a
                href="https://www.linkedin.com/in/makwana-nikunj/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-600 duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Nikuunj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-600 duration-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:maxultron301@gmail.com"
                className="hover:text-zinc-600 duration-300"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
          &copy; 2024 Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
