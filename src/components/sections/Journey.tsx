"use client";

import { motion, useReducedMotion } from "framer-motion";
import { journeyMilestones } from "@/data/journey";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Journey() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 24 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgba(194,248,0,0.06),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="My Journey"
          title="Every step taught me something new."
          description="A timeline of my growth as a developer."
        />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical timeline line */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-5 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-neon/60 via-neon/20 to-transparent md:left-1/2 md:-translate-x-px"
          />

          <ol className="space-y-10 md:space-y-14">
            {journeyMilestones.map((milestone, index) => {
              const isRight = index % 2 !== 0;
              return (
                <motion.li
                  key={milestone.title}
                  {...reveal(index * 0.08)}
                  className="relative pl-12 md:pl-0"
                >
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-5 top-6 z-10 size-3 -translate-x-1/2 rounded-full border-2 md:left-1/2 ${
                      milestone.highlight
                        ? "border-neon bg-neon shadow-[0_0_12px_rgba(194,248,0,0.8)]"
                        : "border-neon/60 bg-background"
                    }`}
                  />

                  {/* Card wrapper — alternates sides on md+ */}
                  <div
                    className={`md:w-[calc(50%-2rem)] ${
                      isRight ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border p-5 transition-colors hover:border-neon/50 hover:bg-card ${
                        milestone.highlight
                          ? "border-neon/40 bg-card/80 shadow-[0_0_24px_rgba(194,248,0,0.06)]"
                          : "border-border bg-card/60"
                      }`}
                    >
                      <span className="font-mono text-xs tracking-[0.25em] text-neon uppercase">
                        {milestone.date}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-secondary">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
