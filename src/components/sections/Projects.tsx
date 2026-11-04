"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_30%_10%,rgba(194,248,0,0.06),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Selected work"
          title="Featured Projects"
          description="A look at what I'm building — real projects with live demos and source code."
        />
        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.title}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
