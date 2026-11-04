"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative overflow-hidden py-20 lg:py-28">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_70%_15%,rgba(194,248,0,0.06),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="What I work with"
          title="Skills & Tools"
          description="The technologies and tools I use to build modern web experiences."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title}>
              <motion.h3
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-6 flex items-center gap-3"
              >
                <span aria-hidden="true" className="h-6 w-1 rounded-full bg-neon shadow-[0_0_10px_rgba(194,248,0,0.8)]" />
                <span className="font-mono text-sm tracking-[0.25em] text-white uppercase">
                  {category.title}
                </span>
              </motion.h3>

              <ul className="grid gap-4 sm:grid-cols-2">
                {category.items.map((skill, index) => (
                  <motion.li
                    key={skill.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.1 + index * 0.06,
                      ease: "easeOut",
                    }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 transition-colors hover:border-neon/50 hover:bg-card"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon transition-colors group-hover:border-neon/50">
                      <skill.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-base font-medium text-white">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
