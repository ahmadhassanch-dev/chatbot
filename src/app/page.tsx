'use client';
import Link from 'next/link';


const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          An <span className="text-blue-600"> AI-powered</span> platform for reading text and images
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Unleash the power of artificial intelligence to interpret and understand content from minimal input.
        </p>
        <Link href="/chatbot">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-2xl font-semibold transition duration-300">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
