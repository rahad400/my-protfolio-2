import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    title: "Bazar-Dor",
    description:
      "A Bengali-focused online marketplace interface built with Next.js and TypeScript.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/bazar-dor.svg",
    // PLACEHOLDER — replace with your real URLs when ready.
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Fit-Log",
    description:
      "A fitness and workout tracking website built with modern frontend technologies.",
    tags: ["React", "Next.js", "TypeScript"],
    image: "/projects/fit-log.svg",
    // PLACEHOLDER — replace with your real URLs when ready.
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
];
