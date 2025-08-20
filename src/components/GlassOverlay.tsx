import React from "react";

interface GlassOverlayProps {
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  opacity?: number;
  glassColor?: "white" | "black" | "transparent";
}

const GlassOverlay: React.FC<GlassOverlayProps> = ({
  className = "",
  blur = "md",
  opacity = 0.02,
  glassColor = "white",
}) => {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
    "2xl": "backdrop-blur-2xl",
    "3xl": "backdrop-blur-3xl",
  };

  const getBackgroundColor = () => {
    switch (glassColor) {
      case "black":
        return `rgba(0, 0, 0, ${opacity})`;
      case "transparent":
        return `rgba(255, 255, 255, ${opacity * 0.5})`;
      default:
        return `rgba(255, 255, 255, ${opacity})`;
    }
  };

  return (
    <div
      className={`absolute inset-0 ${blurClasses[blur]} ${className}`}
      style={{
        background: getBackgroundColor(),
        backdropFilter: `blur(${
          blur === "sm"
            ? "4px"
            : blur === "md"
            ? "8px"
            : blur === "lg"
            ? "12px"
            : blur === "xl"
            ? "16px"
            : blur === "2xl"
            ? "24px"
            : "32px"
        })`,
        WebkitBackdropFilter: `blur(${
          blur === "sm"
            ? "4px"
            : blur === "md"
            ? "8px"
            : blur === "lg"
            ? "12px"
            : blur === "xl"
            ? "16px"
            : blur === "2xl"
            ? "24px"
            : "32px"
        })`,
        border: `1px solid rgba(255, 255, 255, ${opacity * 2})`,
        boxShadow: `0 4px 16px 0 rgba(31, 38, 135, ${opacity * 3})`,
      }}
    />
  );
};

export default GlassOverlay;
