
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { saveApiKey, hasApiKey, clearApiKey } from "@/services/aiService";
import { toast } from "@/components/ui/sonner";

interface ApiKeyModalProps {
  open: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ open, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasKey = hasApiKey();

  const handleSave = () => {
    if (!apiKey.trim() && !hasKey) {
      toast.error("Please enter a valid API key");
      return;
    }

    setIsLoading(true);
    
    try {
      if (apiKey.trim()) {
        saveApiKey(apiKey);
        toast.success("Your API key has been saved");
      }
      setApiKey("");
      onClose();
    } catch (error) {
      toast.error("Failed to save API key");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setIsLoading(true);
    
    try {
      clearApiKey();
      setApiKey("");
      toast.success("Your API key has been removed");
      onClose();
    } catch (error) {
      toast.error("Failed to remove API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Key Settings</DialogTitle>
          <DialogDescription>
            {hasKey 
              ? "Your API key is securely stored. You can update or remove it."
              : "Enter your Gemini API key to enable the AI assistant features."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            placeholder={hasKey ? "••••••••••••••••••••••" : "Enter your Gemini API key"}
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
        
        <DialogFooter>
          {hasKey && (
            <Button 
              variant="outline" 
              onClick={handleRemove} 
              disabled={isLoading}
              className="mr-auto"
            >
              Remove Key
            </Button>
          )}
          <Button onClick={handleSave} disabled={isLoading}>
            {hasKey ? "Update Key" : "Save Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
