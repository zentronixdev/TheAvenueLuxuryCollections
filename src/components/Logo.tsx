import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  const imageSize = isSm ? "h-12 w-32" : isLg ? "h-24 w-64" : "h-16 w-44";

  return (
    <div className={`flex items-center select-none mix-blend-screen bg-transparent ${className}`}>
      {/* Visual Logo Image from assets */}
      <img
        src="/assets/images/Logo.jpg"
        alt="The Avenue"
        referrerPolicy="no-referrer"
        className={`${imageSize} object-contain max-w-full rounded-none shadow-sm hover:opacity-95 transition-opacity duration-300 mix-blend-screen bg-transparent`}
      />
    </div>
  );
}
