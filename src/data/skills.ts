import {
  Braces,
  CodeXml,
  GitBranch,
  Globe,
  Hammer,
  Layers,
  Palette,
  Terminal,
  WandSparkles,
  Zap,
} from "lucide-react";
import type { Skill } from "@/types";

export type SkillCategory = {
  title: string;
  items: readonly Skill[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: CodeXml, category: "Frontend" },
      { name: "CSS", icon: Palette, category: "Frontend" },
      { name: "JavaScript", icon: Braces, category: "Frontend" },
      { name: "TypeScript", icon: Zap, category: "Frontend" },
      { name: "React", icon: Layers, category: "Frontend" },
      { name: "Next.js", icon: Globe, category: "Frontend" },
      { name: "Tailwind CSS", icon: WandSparkles, category: "Frontend" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: GitBranch, category: "Tools" },
      { name: "GitHub", icon: CodeXml, category: "Tools" },
      { name: "VS Code", icon: Hammer, category: "Tools" },
      { name: "npm", icon: Terminal, category: "Tools" },
    ],
  },
];
