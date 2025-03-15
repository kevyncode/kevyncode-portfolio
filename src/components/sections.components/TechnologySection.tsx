import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Technology {
  name: string;
  icon: string;
}

interface TechnologySectionProps {
  technologies: Technology[];
  onTechnologyClick: (technology: string) => void;
}

const TechnologySection: React.FC<TechnologySectionProps> = ({
  technologies,
  onTechnologyClick,
}) => {
  return (
    <motion.div
      key="technologies"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          className="flex items-center p-4 border border-zinc-400 rounded-lg bg-transparent cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onTechnologyClick(tech.name)}
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={32}
            height={32}
            className="mr-4"
          />
          <span className="text-lg font-semibold">{tech.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechnologySection;
