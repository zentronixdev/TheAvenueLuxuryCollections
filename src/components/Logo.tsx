import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  const imageSize = isSm ? "h-12 w-32" : isLg ? "h-24 w-64" : "h-16 w-44";

  // Query logo path from static index.html element dynamically with fallback
  const logoSrc = typeof document !== "undefined"
    ? document.getElementById("static-logo")?.getAttribute("src") || "/images/Logo.jpg"
    : "/images/Logo.jpg";

  return (
    <div className={`flex items-center select-none bg-transparent ${className}`}>
      {/* Visual Logo Image from assets with custom filters to turn background transparent and render deep dark red */}
      <img
        src={logoSrc}
        alt="The Avenue"
        referrerPolicy="no-referrer"
        className={`${imageSize} object-contain max-w-full rounded-none shadow-sm hover:opacity-95 transition-all duration-300 bg-transparent`}
      />
    </div>
  );
}
