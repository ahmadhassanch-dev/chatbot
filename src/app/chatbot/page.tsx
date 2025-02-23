'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as IconImage } from 'lucide-react';
import NextImage from 'next/image';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string; imageUrl?: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; data: string } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chatId] = useState(() => Math.random().toString(36).substring(7));

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      { text: "Hi! I'm your AI assistant powered by Gemini. I can help you with both text and images!", sender: 'bot' }
    ]);
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { 
        text: input, 
        sender: 'user',
        imageUrl: selectedImage?.url 
      };
      setMessages(prev => [...prev, userMessage]);
      setLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: input,
            chat_id: chatId,
            image_data: selectedImage?.data || null
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response not ok:', response.status, errorText);
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received response:', data);
        
        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.response) {
          throw new Error('No response received from server');
        }

        setMessages(prev => [...prev, { 
          text: data.response, 
          sender: 'bot' 
        }]);
      } catch (err) {
        console.error('Error in handleSend:', err);
        setMessages(prev => [...prev, { 
          text: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`, 
          sender: 'bot' 
        }]);
      } finally {
        setLoading(false);
        setInput('');
        setSelectedImage(null);
      }
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 4MB)
      if (file.size > 4 * 1024 * 1024) {
        alert('Image size should be less than 4MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage({
          url: imageUrl,
          data: e.target?.result as string
        });
      };
      reader.onerror = () => {
        alert('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Hassan<span className="text-blue-500"> AI Assistant</span>
      </h1>

      <div className="bg-black border border-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-xl ${
                msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                {msg.imageUrl && (
                  <div className="mt-2">
                    <NextImage
                      src={msg.imageUrl}
                      alt="Selected image"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-blue-400">
              Thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            {selectedImage && (
              <div className="relative w-12 h-12">
                <NextImage
                  src={selectedImage.url}
                  alt="Selected image"
                  fill
                  className="rounded-lg object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            )}
            <textarea
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              suppressHydrationWarning
            />
            <label
              htmlFor="imageUpload"
              className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
              aria-label="Upload image"
            >
              <IconImage className="w-6 h-6" />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              aria-label="Image upload input"
              title="Upload an image"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              aria-label="Send message"
              title="Send message"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
