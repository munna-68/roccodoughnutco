"use client";

import React from "react";

interface DoughnutGraphicProps {
  name: string;
  category?: string;
  gradient: {
    base: string;
    frosting: string;
    accent?: string;
  };
  image?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Drawn stand-in for a product photo, in the flavour's own colours.
 * The hole shows var(--surface), so set that on the card behind it.
 */
export const DoughnutGraphic: React.FC<DoughnutGraphicProps> = ({
  name,
  category = "yeast-raised",
  gradient,
  image,
  size = "md",
  className = "",
}) => {
  if (image) {
    return (
      <div className={`overflow-hidden rounded-2xl bg-mist ${className}`}>
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
    );
  }

  const isFilled = category === "fills";
  const isGiantCake = category === "specials" && name.toLowerCase().includes("cake");

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-28 h-28 sm:w-32 sm:h-32",
    lg: "w-44 h-44 sm:w-52 sm:h-52",
    xl: "w-56 h-56 sm:w-64 sm:h-64",
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}
      role="img"
      aria-label={name}
    >
      {/* contact shadow */}
      <div className="absolute inset-x-[12%] -bottom-[6%] h-[14%] rounded-[50%] bg-black/25 blur-md" />

      {/* Dough */}
      <div
        className={`relative w-full h-full rounded-full bg-gradient-to-br ${gradient.base} p-[10%] flex items-center justify-center transition-transform duration-500 group-hover:rotate-[24deg]`}
        style={{
          boxShadow:
            "inset 0 4px 10px rgba(255,255,255,0.45), inset 0 -8px 14px rgba(0,0,0,0.35), 0 10px 18px rgba(0,0,0,0.14)",
        }}
      >
        {/* Frosting */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: gradient.frosting,
            boxShadow: "inset 0 2px 6px rgba(255,255,255,0.45), 0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <div className="absolute -top-1 left-2 right-2 h-1/3 rounded-full bg-white/25 blur-[1px] -rotate-12 pointer-events-none" />

          {gradient.accent && (
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-90 pointer-events-none">
              <circle cx="28" cy="26" r="3.2" fill={gradient.accent} />
              <rect x="68" y="24" width="7" height="3" rx="1.5" transform="rotate(35 68 24)" fill={gradient.accent} />
              <rect x="74" y="52" width="7" height="3" rx="1.5" transform="rotate(-25 74 52)" fill={gradient.accent} />
              <rect x="24" y="68" width="7" height="3" rx="1.5" transform="rotate(45 24 68)" fill={gradient.accent} />
              <circle cx="48" cy="18" r="2.8" fill="#ffffff" opacity="0.8" />
              <circle cx="52" cy="82" r="3" fill={gradient.accent} />
              <circle cx="80" cy="40" r="2.5" fill="#ffffff" opacity="0.9" />
              <rect x="36" y="78" width="6" height="2.8" rx="1.4" transform="rotate(15 36 78)" fill="#ffffff" opacity="0.8" />
            </svg>
          )}

          {!isFilled ? (
            <div
              className={`rounded-full ${isGiantCake ? "w-[24%] h-[24%]" : "w-[34%] h-[34%]"}`}
              style={{
                background: "var(--surface, #f7f7f6)",
                boxShadow: "inset 0 3px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.6)",
              }}
            />
          ) : (
            <div className="w-3 h-3 rounded-full bg-white/30 blur-[0.5px]" />
          )}
        </div>
      </div>
    </div>
  );
};
