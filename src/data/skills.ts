import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaNpm,
  FaFigma,
  FaDatabase,
  FaCode,
} from "react-icons/fa6";
import { RiNextjsLine, RiTailwindCssLine } from "react-icons/ri";
import { SiMongodb, SiExpress, SiTypescript } from "react-icons/si";
import type { Skill } from "@/types";

export type SkillCategory = {
  title: string;
  items: readonly Skill[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", icon: FaHtml5, category: "Frontend" },
      { name: "CSS3", icon: FaCss3Alt, category: "Frontend" },
      { name: "JavaScript", icon: FaJs, category: "Frontend" },
      { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
      { name: "React", icon: FaReact, category: "Frontend" },
      { name: "Next.js", icon: RiNextjsLine, category: "Frontend" },
      { name: "Tailwind CSS", icon: RiTailwindCssLine, category: "Frontend" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs, category: "Backend" },
      { name: "Express.js", icon: SiExpress, category: "Backend" },
      { name: "REST APIs", icon: FaDatabase, category: "Backend" },
      { name: "MongoDB", icon: SiMongodb, category: "Backend" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: FaGitAlt, category: "Tools" },
      { name: "GitHub", icon: FaGithub, category: "Tools" },
      { name: "VS Code", icon: FaCode, category: "Tools" },
      { name: "npm", icon: FaNpm, category: "Tools" },
      { name: "Figma", icon: FaFigma, category: "Tools" },
    ],
  },
];
