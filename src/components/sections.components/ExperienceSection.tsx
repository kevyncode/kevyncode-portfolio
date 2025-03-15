import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  description: string;
  details: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  expandedExperience: number | null;
  onExperienceClick: (index: number) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  expandedExperience,
  onExperienceClick,
}) => {
  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-4"
    >
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="flex flex-col p-4 border-l-4 border-white bg-transparent mb-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onExperienceClick(index)}
        >
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{experience.title}</h3>
            <p className="text-sm text-zinc-400">{experience.company}</p>
            <p className="text-sm text-zinc-400">• {experience.description}</p>
            <AnimatePresence>
              {expandedExperience === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <p className="text-sm text-zinc-400">{experience.details}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExperienceSection;
