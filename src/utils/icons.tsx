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

export const skillIcons = {
  "Problem Solving": FaCode,
  "Team Collaboration": FaUsers,
  "Project Management": FaProjectDiagram,
  "Agile Methodologies": FaTasks,
  "Version Control (Git)": FaGitAlt,
  "Continuous Integration": FaCogs,
  "Test-Driven Development": FaBug,
  "Code Review": FaCode,
  Debugging: FaBug,
  "English B2": FaLanguage,
} as const;
