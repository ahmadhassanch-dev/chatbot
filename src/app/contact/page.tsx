import React from 'react';
import { Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Contact Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Contact Me
        </h1>

        {/* Contact Form */}
        <form className="bg-black  p-6 rounded-2xl mb-12">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-2 rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-2 rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea 
              placeholder="Your Message" 
              className="w-full p-2 rounded-md text-black"
              rows={5}
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-2xl font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-4">Feel free to reach out via email or connect on social media.</p>

          {/* Email */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <Mail />
            <a href="mailto:your.email@example.com" className="hover:text-blue-400">
              ahmadhassanch.dev@gmail.com
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6">
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
      </div>
    </div>
  );
};

export default Contact;
