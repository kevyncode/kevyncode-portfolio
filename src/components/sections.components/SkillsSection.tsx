import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";


interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {skills.map((skill) => (
        <SpotlightCard
          key={skill.name}
          className="custom-spotlight-card"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="mr-4">{skill.icon}</span>
            <span className="text-lg font-semibold">{skill.name}</span>
          </motion.div>
        </SpotlightCard>
      ))}
    </motion.div>
  );
};

export default SkillsSection;
