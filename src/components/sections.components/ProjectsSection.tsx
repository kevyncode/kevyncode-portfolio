import React from "react";
import { motion } from "framer-motion";

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
        <motion.div
          key={repo.id}
          className="flex flex-col p-4 border border-zinc-400 rounded-lg bg-transparent"
          whileHover={{ scale: 1.05 }}
        >
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
      ))}
    </motion.div>
  );
};

export default ProjectsSection;
