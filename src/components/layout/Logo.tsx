
import { Heart } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: {
      icon: "h-8 w-8",
      iconInner: "h-4 w-4",
      text: "text-xl"
    },
    md: {
      icon: "h-10 w-10",
      iconInner: "h-5 w-5",
      text: "text-2xl"
    },
    lg: {
      icon: "h-12 w-12",
      iconInner: "h-6 w-6",
      text: "text-3xl"
    },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size].icon} rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden group`}>
        <Heart 
          className={`${sizes[size].iconInner} text-primary fill-blush-light transition-transform duration-300 group-hover:scale-110`} 
        />
      </div>
      <h1 className={`font-heading font-bold ${sizes[size].text} gradient-text`}>Lovable</h1>
    </div>
  );
}
