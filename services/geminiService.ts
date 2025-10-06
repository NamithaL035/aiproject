import { GoogleGenAI, Type } from "@google/genai";
import { GROCERY_PLANNER_SYSTEM_INSTRUCTION } from '../constants';

// Ensure the API key is available
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface VendorPrice {
    vendor: string;
    price: number;
    url?: string;
    quality_notes?: string;
}

export interface GroceryItem {
    name: string;
    quantity: string;
    approx_cost: number;
    category: string;
    price_comparison: VendorPrice[];
}

export interface GroceryList {
    total_budget: number;
    estimated_total: number;
    items: GroceryItem[];
}

export const getGroceryAdvice = async (query: string): Promise<GroceryList> => {
    let rawText = '';
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: GROCERY_PLANNER_SYSTEM_INSTRUCTION,
                temperature: 0.3,
                responseMimeType: "application/json",
            }
        });
        
        rawText = response.text;
        // The response text is expected to be a JSON string due to responseMimeType.
        return JSON.parse(rawText);

    } catch (error) {
        console.error("Error getting advice from Gemini API. Raw text was:", rawText, "Error:", error);
        
        if (error instanceof SyntaxError) {
             // This indicates a JSON parsing error
             throw new Error(`The AI returned an invalid response that could not be parsed. Please try again.`);
        }

        if (error instanceof Error) {
             // This is likely an API or network error. Provide a more user-friendly message.
             throw new Error(`Failed to get a response from the AI. The service may be temporarily unavailable or there might be a network issue.`);
        }
        
        throw new Error("An unexpected error occurred while communicating with the AI.");
    }
};