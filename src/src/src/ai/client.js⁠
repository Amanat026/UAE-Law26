import { GoogleGenAI } from '@google/genai';

export async function sendChatMessage(messages) {
  const apiKey = localStorage.getItem('GEMINI_API_KEY') || import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please set it in localStorage or environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const systemPrompt = `You are an expert, professional UAE Legal AI Assistant. Your role is to provide accurate, helpful information regarding United Arab Emirates laws, regulations, labor laws, civil/commercial codes, and legal procedures. Always maintain a professional tone, remind users that your answers are for informational guidance and not formal legal counsel, and structure your points clearly.`;

  const formattedMessages = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      }
    });

    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
