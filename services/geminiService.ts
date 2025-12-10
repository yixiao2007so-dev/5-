import { GoogleGenAI } from "@google/genai";
import { Word } from "../types";

// Using the requested initialization pattern
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWordContext = async (word: Word): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a fun, short, and simple sentence for a 5th grader using the word "${word.english}" (meaning: ${word.chinese}). Keep it under 15 words. Just return the sentence.`,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `The word is ${word.english}.`; // Fallback
  }
};

export const checkPronunciationFeedback = async (word: string, recognizedText: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `I am a 5th grader. I tried to say "${word}" but the computer heard "${recognizedText}". Give me a very short, encouraging tip on how to say it better in 1 sentence.`,
        });
        return response.text.trim();
    } catch (e) {
        return "Keep practicing! You're doing great.";
    }
}