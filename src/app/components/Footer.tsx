import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Brand Name */}
        <div className="cursor-pointer text-2xl font-bold">
          Hassan AI
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link className='hover:text-blue-600 ease-in-out duration-300' href="/">Home</Link>
          <Link className='hover:text-blue-600 ease-in-out duration-300' href="/about">About</Link>
          <Link className='hover:text-blue-600 ease-in-out duration-300' href="/contact">Contact</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <Facebook className="hover:text-blue-600" />
          </a>
          <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <Twitter className="hover:text-blue-400" />
          </a>
          <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin className="hover:text-blue-800" />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-4 text-gray-400">
        © {new Date().getFullYear()} Hassan AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
