"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CodeXml } from "lucide-react";
import { isPlaceholderHref, type Project } from "@/types";
import ProjectPreviewFrame from "@/components/ui/ProjectPreviewFrame";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  const livePlaceholder = isPlaceholderHref(project.liveUrl);
  const githubPlaceholder = isPlaceholderHref(project.githubUrl);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card/60 transition-colors hover:border-neon/50 hover:bg-card"
    >
      {/* Responsive Browser-Style Iframe Preview */}
      <ProjectPreviewFrame project={project} />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
        <p className="text-sm leading-relaxed text-secondary">{project.description}</p>

        <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.liveUrl ?? "#"}
            {...(livePlaceholder ? { "aria-disabled": "true" } : { target: "_blank", rel: "noreferrer noopener" })}
            className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none aria-disabled:opacity-60"
          >
            Live Demo
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={project.githubUrl ?? "#"}
            {...(githubPlaceholder ? { "aria-disabled": "true" } : { target: "_blank", rel: "noreferrer noopener" })}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-neon/60 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none aria-disabled:opacity-60"
          >
            <CodeXml className="size-4" aria-hidden="true" />
            GitHub
          </a>
        </div>
        {livePlaceholder || githubPlaceholder ? (
          <p className="font-mono text-[10px] tracking-widest text-secondary uppercase">
            Placeholder links — replace in src/data/projects.ts
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}
