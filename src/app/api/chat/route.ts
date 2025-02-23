import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';

// Define types for chat history
interface ChatHistory {
  chat: ChatSession;
  lastActive: number;
}

interface ChatHistories {
  [key: string]: ChatHistory;
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Store chat histories with types
const chatHistories: ChatHistories = {};

// Clean up old chat histories every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  Object.entries(chatHistories).forEach(([id, history]) => {
    if (history.lastActive < oneHourAgo) {
      delete chatHistories[id];
    }
  });
}, 60 * 60 * 1000);

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const { text, chat_id, image_data } = await req.json();

    if (!text || !chat_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create chat
    if (!chatHistories[chat_id]) {
      chatHistories[chat_id] = {
        chat: model.startChat(),
        lastActive: Date.now()
      };
    }

    const chatHistory = chatHistories[chat_id];
    chatHistory.lastActive = Date.now();

    let response;
    if (image_data) {
      // Handle image
      const imageBuffer = Buffer.from(image_data.split(',')[1], 'base64');
      response = await chatHistory.chat.sendMessage([
        text,
        {
          inlineData: {
            data: imageBuffer,
            mimeType: 'image/jpeg'
          }
        }
      ]);
    } else {
      // Text only
      response = await chatHistory.chat.sendMessage(text);
    }

    const responseText = await response.response.text();
    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 