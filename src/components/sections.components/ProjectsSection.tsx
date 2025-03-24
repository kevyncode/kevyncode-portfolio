import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

interface ProjectsSectionProps {
  repositories: Repository[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ repositories }) => {
  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {repositories.map((repo) => (
        <SpotlightCard
          key={repo.id}
          className="custom-spotlight-card"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <motion.div className="flex flex-col" whileHover={{ scale: 1.05 }}>
            <h3 className="text-lg font-semibold">{repo.name}</h3>
            <p className="text-sm text-zinc-400">{repo.description}</p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <button className="px-4 py-2 bg-transparent text-white border border-zinc-600 rounded-lg hover:bg-zinc-700">
                GitHub Repository
              </button>
            </a>
          </motion.div>
        </SpotlightCard>
      ))}
    </motion.div>
  );
};

export default ProjectsSection;
