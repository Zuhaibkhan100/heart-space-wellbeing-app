
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
      {
        role: "system",
        content: "You are a supportive wellness coach. Be empathetic, encouraging, and provide helpful advice for mental wellbeing. Keep responses concise and actionable."
      },
      ...previousMessages,
      { role: "user", content: message }
    ];

    // Make API request to DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",  // Using DeepSeek chat model
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
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
      message: data.choices[0].message.content,
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
