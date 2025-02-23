import React from 'react';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* About the Chatbot */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About the <span className="text-blue-600">Chatbot</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            This AI-powered chatbot is designed to enhance user interactions by understanding and responding to text and images. 
            It leverages advanced natural language processing and computer vision technologies to provide intelligent, context-aware responses. 
            Whether you`re looking for quick answers, detailed explanations, or creative assistance, this chatbot is equipped to help.
          </p>
        </section>

        <hr className="border-gray-700 mb-12" />

        {/* About Me */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Hey! I`m Ahmad Hassan, a passionate web developer with expertise in TypeScript, Next.js, and AI-focused projects. 
            Currently, I`m exploring the capabilities of artificial intelligence to create powerful, user-centric digital experiences. 
            This chatbot is a reflection of my passion for technology and my commitment to making information accessible and engaging.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mt-4">
            When I`m not coding, you can find me learning about the latest advancements in AI or sharing my knowledge as a TypeScript teacher. 
            Feel free to connect with me through the contact page or explore more of my work on my portfolio.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
