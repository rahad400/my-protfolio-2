import type { Project } from "@/types";

export const projects: readonly Project[] = [

  {
    title: "Bazar-Dor",
    description:
      "A web application focused on making everyday shopping information easier to explore and manage.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/bazar-dor.png",
    liveUrl: "https://bazar-dor-hazel-xi.vercel.app",
    githubUrl: "https://github.com/rahad400/bazar-dor",
    featured: true,
  },
  {
    title: "HireLoop",
    description:
      "A job platform project designed around job discovery, user roles, and application workflows.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },

];
