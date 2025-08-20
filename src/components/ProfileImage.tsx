import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ProfileImageProps {
  primaryImage: string | StaticImageData;
  hoverImage?: string | StaticImageData;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  primaryImage,
  hoverImage,
  alt,
  size = "lg",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: "w-36 h-36",
    md: "w-44 h-44 sm:w-52 sm:h-52",
    lg: "w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60",
    xl: "w-60 h-60 sm:w-68 sm:h-68 lg:w-76 lg:h-76",
  };

  // Mouse events (desktop)
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Touch events (mobile)
  const handleTouchStart = () => {
    touchTimeout.current = setTimeout(() => setIsHovered(true), 250); // 250ms para "segurar"
  };
  const handleTouchEnd = () => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
    setIsHovered(false);
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className} perspective-1000`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: "1000px" }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Coin flip container */}
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: isHovered ? 180 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Front side - Primary Image */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <Image
              src={primaryImage}
              alt={alt}
              fill
              className="object-cover scale-120"
              priority
            />
          </div>
          {/* Overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
        </motion.div>

        {/* Back side - Hover Image */}
        {hoverImage && (
          <motion.div
            className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-2 rounded-full overflow-hidden">
              <Image
                src={hoverImage}
                alt={`${alt} - alternate`}
                fill
                className="object-cover scale-100"
              />
            </div>
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
          </motion.div>
        )}
      </motion.div>

      {/* Animated border ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4))",
          padding: "3px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          },
          opacity: {
            duration: 0.3,
          },
        }}
      />
    </motion.div>
  );
};

export default ProfileImage;
