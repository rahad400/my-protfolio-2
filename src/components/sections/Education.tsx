"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { educationEntries } from "@/data/education";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Education() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <SectionDivider  position="top" />
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_10%,rgba(194,248,0,0.06),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Education"
          title="Learning is part of the journey."
        />

        <div className="mx-auto mt-14 max-w-2xl space-y-6">
          {educationEntries.map((entry, index) => (
            <motion.div
              key={entry.qualification}
              {...reveal(index * 0.1)}
              className="rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-neon/50 hover:bg-card sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon">
                  <GraduationCap className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {entry.qualification}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-neon shadow-[0_0_6px_rgba(194,248,0,0.8)]"
                    />
                    {entry.status}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    {entry.description}
                  </p>
                  {entry.institution ? (
                    <p className="mt-2 font-mono text-xs tracking-widest text-secondary/70 uppercase">
                      {entry.institution}
                    </p>
                  ) : null}
                  {entry.group ? (
                    <p className="mt-1 font-mono text-xs tracking-widest text-secondary/70 uppercase">
                      Group: {entry.group}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
