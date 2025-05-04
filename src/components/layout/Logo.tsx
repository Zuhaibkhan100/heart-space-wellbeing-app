
import { Heart } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
        <Heart className="h-5 w-5 text-primary fill-blush-light" />
      </div>
      <h1 className="font-heading font-bold text-2xl gradient-text">Lovable</h1>
    </div>
  );
}
