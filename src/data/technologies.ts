import { Technology } from "@/types";
import javascriptIcon from "@/assets/jsicon.svg";
import typescriptIcon from "@/assets/tsicon.svg";
import reactIcon from "@/assets/reacticon.svg";
import nextjsIcon from "@/assets/nexticon.svg";
import nodejsIcon from "@/assets/nodeicon.svg";
import tailwindcssIcon from "@/assets/tailicon.svg";
import gitIcon from "@/assets/giticon.svg";
import dockerIcon from "@/assets/dockericon.svg";
import postrGreeSql from "@/assets/postgreeicon.svg";

export const technologies: Technology[] = [
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
