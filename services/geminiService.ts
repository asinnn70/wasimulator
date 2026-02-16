
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY || '';

export const extractSheetData = async (message: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Extract order details from this WhatsApp message: "${message}". 
               Current date is ${new Date().toLocaleDateString()}.
               If details are missing, guess logically or leave as "Unknown".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          customerName: { type: Type.STRING },
          item: { type: Type.STRING },
          quantity: { type: Type.NUMBER },
          price: { type: Type.NUMBER },
          total: { type: Type.NUMBER },
        },
        required: ["customerName", "item", "quantity", "price", "total"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};

export const generateBotReply = async (message: string, extractedData: any) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `A user sent: "${message}". 
                  We extracted this data for our Google Sheet: ${JSON.stringify(extractedData)}.
                  Write a professional, friendly WhatsApp reply in Indonesian confirming the order and saying it has been recorded in our system.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });

  return response.text || "Terima kasih! Pesanan Anda telah kami catat.";
};
