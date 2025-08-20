import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechnologySection from "@/components/sections.components/TechnologySection";
import SkillsSection from "@/components/sections.components/SkillsSection";
import ProjectsSection from "@/components/sections.components/ProjectsSection";
import ExperienceSection from "@/components/sections.components/ExperienceSection";

// Import data from organized data files
import { technologies } from "@/data/technologies";
import { skillsData } from "@/data/skills";
import { experiences } from "@/data/experiences";
import { Repository, Skill } from "@/types";
import {
  fetchRepositories,
  filterRepositoriesByTechnology,
} from "@/utils/helpers";
import { skillIcons } from "@/utils/icons";
const SectionsBar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(
    "Technologies"
  );
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(
    null
  );
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );

  // Convert skills data to proper format with icons
  const skills: Skill[] = skillsData.map((skill) => ({
    name: skill.name,
    icon: React.createElement(
      skillIcons[skill.iconKey as keyof typeof skillIcons]
    ),
  }));

  useEffect(() => {
    if (activeSection === "Projects") {
      fetchRepositories().then(setRepositories);
    }
  }, [activeSection]);

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setSelectedTechnology(null);
    setExpandedExperience(null);
  };

  const handleTechnologyClick = (technology: string) => {
    setSelectedTechnology(technology);
  };

  const handleClosePopup = () => {
    setSelectedTechnology(null);
  };

  const handleExperienceClick = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-around w-full text-zinc-400 bg-zinc-800 rounded-lg p-1">
        {["Technologies", "Skills", "Projects", "Experience"].map((section) => (
          <div
            key={section}
            className={`flex-1 text-center p-1 m-1 rounded-lg cursor-pointer ${
              activeSection === section
                ? "bg-black text-white"
                : "bg-transparent"
            }`}
            onClick={() => handleSectionClick(section)}
          >
            <h2 className="text-base sm:text-lg lg:text-xl font-bold">
              {section}
            </h2>
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeSection === "Technologies" && !selectedTechnology && (
          <TechnologySection
            technologies={technologies}
            onTechnologyClick={handleTechnologyClick}
          />
        )}
        {selectedTechnology && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-zinc-800 p-6 rounded-lg w-11/12 sm:w-3/4 lg:w-1/2 relative">
              <button
                className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={handleClosePopup}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">
                {selectedTechnology} Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filterRepositoriesByTechnology(
                  repositories,
                  selectedTechnology
                ).map((repo) => (
                  <div
                    key={repo.id}
                    className="flex flex-col p-4 border border-zinc-400 rounded-lg bg-transparent"
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
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {activeSection === "Skills" && <SkillsSection skills={skills} />}
        {activeSection === "Projects" && !selectedTechnology && (
          <ProjectsSection repositories={repositories} />
        )}
        {activeSection === "Experience" && (
          <ExperienceSection
            experiences={experiences}
            expandedExperience={expandedExperience}
            onExperienceClick={handleExperienceClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionsBar;
