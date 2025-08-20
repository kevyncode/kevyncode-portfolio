import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingButtonProps {
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  href,
  icon,
  tooltip = "View Resume",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonContent = (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl border border-zinc-700 backdrop-blur-sm"
            style={{
              background: "rgba(24, 24, 27, 0.95)",
              backdropFilter: "blur(8px)",
            }}
          >
            {tooltip}
            {/* Arrow */}
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
              <div className="w-0 h-0 border-l-6 border-l-zinc-900 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 rounded-full p-4 shadow-2xl border border-zinc-700 cursor-pointer group backdrop-blur-sm">
        {icon ? (
          icon
        ) : (
          <svg
            className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  return <button onClick={onClick}>{buttonContent}</button>;
};

export default FloatingButton;
