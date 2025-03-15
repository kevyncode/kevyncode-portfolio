import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import javascriptIcon from "@/assets/jsicon.svg";
import typescriptIcon from "@/assets/tsicon.svg";
import reactIcon from "@/assets/reacticon.png";
import nextjsIcon from "@/assets/nexticon.svg";
import nodejsIcon from "@/assets/nodeicon.svg";
import tailwindcssIcon from "@/assets/tailicon.svg";
import gitIcon from "@/assets/giticon.svg";
import dockerIcon from "@/assets/dockericon.svg";
import postrGreeSql from "@/assets/postgreeicon.svg";

const technologies = [
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextjsIcon },
  { name: "Node.js", icon: nodejsIcon },
  { name: "Tailwind CSS", icon: tailwindcssIcon },
  { name: "Git", icon: gitIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "PostgreeSQL", icon: postrGreeSql },
];

const skills = [
  { name: "Problem Solving" },
  { name: "Team Collaboration" },
  { name: "Project Management" },
  { name: "Agile Methodologies" },
  { name: "Version Control (Git)" },
  { name: "Continuous Integration" },
  { name: "Test-Driven Development" },
  { name: "Code Review" },
  { name: "Debugging" },
];

const experiences = [
  {
    title: "Software Engineer",
    company: "Tech Company",
    description:
      "Developed and maintained web applications using React and Node.js.",
    details:
      "Worked on various projects including e-commerce platforms, internal tools, and customer-facing applications. Collaborated with cross-functional teams to deliver high-quality software solutions.",
  },
  {
    title: "Frontend Developer",
    company: "Web Agency",
    description:
      "Created responsive websites and web applications using HTML, CSS, and JavaScript.",
    details:
      "Developed custom themes and plugins for WordPress, optimized websites for performance and SEO, and provided technical support to clients.",
  },
  {
    title: "Backend Developer",
    company: "Startup",
    description: "Built and maintained RESTful APIs using Node.js and Express.",
    details:
      "Designed and implemented database schemas, integrated third-party services, and ensured the scalability and security of the backend systems.",
  },
];

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

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

  useEffect(() => {
    if (selectedTechnology) {
      fetch(
        "https://api.github.com/users/kevyncode/repos?sort=created&per_page=5"
      )
        .then((response) => response.json())
        .then((data) => setRepositories(data));
    }
  }, [selectedTechnology]);

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
                onClick={() => handleTechnologyClick(tech.name)}
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
                {repositories
                  .filter((repo) =>
                    repo.description?.includes(selectedTechnology)
                  )
                  .map((repo) => (
                    <div
                      key={repo.id}
                      className="flex flex-col p-4 border border-zinc-400 rounded-lg bg-transparent"
                    >
                      <h3 className="text-lg font-semibold">{repo.name}</h3>
                      <p className="text-sm text-zinc-400">
                        {repo.description}
                      </p>
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
        {activeSection === "Skills" && (
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
        )}
        {activeSection === "Projects" && !selectedTechnology && (
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
        )}
        {activeSection === "Experience" && (
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
                onClick={() => handleExperienceClick(index)}
              >
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <p className="text-sm text-zinc-400">{experience.company}</p>
                  <p className="text-sm text-zinc-400">
                    • {experience.description}
                  </p>
                  <AnimatePresence>
                    {expandedExperience === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <p className="text-sm text-zinc-400">
                          {experience.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionsBar;
