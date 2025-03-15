import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechnologySection from "@/components/sections.components/TechnologySection";
import SkillsSection from "@/components/sections.components/SkillsSection";
import ProjectsSection from "@/components/sections.components/ProjectsSection";
import ExperienceSection from "@/components/sections.components/ExperienceSection";
import {
  FaCode,
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaGitAlt,
  FaCogs,
  FaBug,
  FaLanguage,
} from "react-icons/fa";
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
  { name: "Problem Solving", icon: <FaCode /> },
  { name: "Team Collaboration", icon: <FaUsers /> },
  { name: "Project Management", icon: <FaProjectDiagram /> },
  { name: "Agile Methodologies", icon: <FaTasks /> },
  { name: "Version Control (Git)", icon: <FaGitAlt /> },
  { name: "Continuous Integration", icon: <FaCogs /> },
  { name: "Test-Driven Development", icon: <FaBug /> },
  { name: "Code Review", icon: <FaCode /> },
  { name: "Debugging", icon: <FaBug /> },
  { name: "Inglês B2", icon: <FaLanguage /> },
];

const experiences = [
  {
    title: "Desenvolvedor e Engenheiro de Software",
    company: "Projeto pessoal - Projeto 'Appetito'",
    description: "12/2024 – Em Andamento",
    details: `
Ferramentas Utilizadas: TypeScript | React | Next.js | Tailwind CSS | Firebase | Git | GitHub | Scrum
• Fundador e desenvolvedor principal de uma aplicação web para gerenciamento de pedidos em restaurantes, utilizando React e Next.js para a criação de interfaces dinâmicas e responsivas.
• Criando componentes reutilizáveis e estilizados com Tailwind CSS, garantindo uma experiência de usuário consistente e moderna.
• Integrando a aplicação com Firebase para autenticação e armazenamento de dados, assegurando a segurança e a escalabilidade do projeto.
• Usando Visual Studio Code e gerenciando a integração com repositórios Git, utilizando GitHub para controle de versão e colaboração.
• Facilitando reuniões diárias, revisões de sprint e retrospectivas, garantindo entregas incrementais e a comunicação entre a equipe.
    `,
  },
  {
    title: "Estudante e Pesquisador",
    company: "Atividades Acadêmicas – Sistemas Operacionais e Redes",
    description: "07/2024 – Finalizado",
    details: `
Ferramentas Utilizadas: VirtualBox | C | Linux | Scrum | Git
• Documentei e executei tarefas de instalação de máquinas virtuais e programação em C, sempre utilizando práticas ágeis para organização e interação rápida.
• Como Scrum Master em atividades de laboratório, gerenciei sprints curtos para entrega de experimentos práticos, como a execução de processos com fork e exec no Linux.
• Facilitar a comunicação entre os membros do grupo, garantindo que todos seguissem o cronograma.
    `,
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
    if (activeSection === "Projects") {
      fetch(
        "https://api.github.com/users/kevyncode/repos?sort=created&per_page=5"
      )
        .then((response) => response.json())
        .then((data) => setRepositories(data));
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
