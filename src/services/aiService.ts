
import { toast } from "@/components/ui/sonner";

// Types for AI service
export interface AIMessage {
  content: string;
  role: "user" | "assistant";
}

export interface AIResponse {
  message: string;
  success: boolean;
}

// Function to get API key (temporary solution)
const getApiKey = (): string | null => {
  return localStorage.getItem("ai_api_key");
};

// Function to save API key (temporary solution)
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem("ai_api_key", apiKey);
};

// Function to clear API key
export const clearApiKey = (): void => {
  localStorage.removeItem("ai_api_key");
};

// Function to check if API key exists
export const hasApiKey = (): boolean => {
  return !!getApiKey();
};

// Function to make secure API call
export const getChatResponse = async (
  message: string,
  previousMessages: AIMessage[] = []
): Promise<AIResponse> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      return {
        message: "Please add your API key in settings first.",
        success: false,
      };
    }

    // Format conversation for the API
    const messages = [
      ...previousMessages,
      { role: "user", content: message }
    ];

    // Make API request to Gemini API
    // Using the correct API endpoint and model name format
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: messages.map(msg => ({
          role: msg.role === "assistant" ? "MODEL" : "USER",
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API error:", data);
      return {
        message: data.error?.message || "Error getting response. Please check your API key.",
        success: false,
      };
    }

    return {
      message: data.candidates[0].content.parts[0].text || "No response generated.",
      success: true,
    };
  } catch (error) {
    console.error("Error in AI service:", error);
    return {
      message: "Failed to connect to AI service. Please try again later.",
      success: false,
    };
  }
};
