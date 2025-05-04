
import { Card, CardContent } from "@/components/ui/card";

export function MobileTourCard() {
  return (
    <Card className="overflow-hidden shadow-lg border-2 border-white/20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="aspect-[16/9] rounded-lg bg-gradient-to-r from-lavender-light to-blush-light flex items-center justify-center">
          <p className="text-sm font-medium">App tour preview (coming soon)</p>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-white/40 animate-pulse"></div>
          <div className="h-2 w-1/2 rounded-full bg-white/30 animate-pulse"></div>
          <div className="h-2 w-5/6 rounded-full bg-white/20 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}
