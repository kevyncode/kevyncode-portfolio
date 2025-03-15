import React from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
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
        <motion.div
          key={skill.name}
          className="flex items-center p-4 border border-zinc-400 rounded-lg bg-transparent"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-lg font-semibold">{skill.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsSection;
