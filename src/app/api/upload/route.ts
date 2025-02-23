import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { image, mimeType } = await request.json();
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Remove the data:image/xxx;base64, prefix
    const base64Data = image.split(',')[1];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = "Analyze this image and describe what you see.";
    
    const result = await model.generateContent([
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });

  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Error processing image' },
      { status: 500 }
    );
  }
} 