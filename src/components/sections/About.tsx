"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layers,
  Lightbulb,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";

const DEV_INFO: readonly { label: string; value: string; icon: LucideIcon }[] =
  [
    { label: "Current Focus", value: "Full-Stack Development", icon: Layers },
    {
      label: "Main Stack",
      value: "Next.js, React, TypeScript, Node.js",
      icon: Code2,
    },
    {
      label: "Mindset",
      value: "Building through practical projects",
      icon: Lightbulb,
    },
  ];

export default function About() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <SectionDivider  position="top" />
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_10%,rgba(194,248,0,0.06),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left — text */}
          <div>
            <motion.p
              {...reveal(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs tracking-[0.25em] text-neon uppercase"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              About Me
            </motion.p>

            <motion.h2
              {...reveal(0.08)}
              id="about-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              A little about how I build.
            </motion.h2>

            <motion.p
              {...reveal(0.16)}
              className="mt-5 text-base leading-relaxed text-white sm:text-lg"
            >
              I&apos;m interested in building useful things for the web. My
              journey started with learning programming fundamentals, and over
              time I became curious about how websites work beyond what users
              see.
            </motion.p>

            <motion.p
              {...reveal(0.24)}
              className="mt-4 text-base leading-relaxed text-secondary"
            >
              I enjoy working on interfaces, connecting them with backend
              functionality, and learning how different parts of an application
              fit together.
            </motion.p>

            <motion.p
              {...reveal(0.32)}
              className="mt-4 text-base leading-relaxed text-secondary"
            >
              I&apos;m still growing as a developer, and every project gives me
              something new to understand and improve.
            </motion.p>
          </div>

          {/* Right — dev info card */}
          <div className="space-y-4">
            {DEV_INFO.map((item, index) => (
              <motion.div
                key={item.label}
                {...reveal(0.15 + index * 0.08)}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-neon/50 hover:bg-card"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                    {item.label}
                  </span>
                  <p className="mt-1 text-base font-medium text-white">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
