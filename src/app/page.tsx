import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex bg-black min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">
          An <span className="text-blue-600">AI-powered</span> platform for reading text and images
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Upload your content and let our AI help you understand it better
        </p>
        <Link href="/chatbot">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Try Our Chatbot
          </button>
        </Link>
      </div>
    </main>
  );
}
