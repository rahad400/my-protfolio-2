"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Braces,
  MonitorSmartphone,
  RefreshCcw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const PROFILE = {
  name: "Rahad",
  role: "Frontend Developer",
  focus: "React, Next.js and TypeScript",
  interests: "UI Development, Web Design and Modern Web Technologies",
  image: "/images/profile.jpeg",
};

const HIGHLIGHTS: readonly { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Clean Code",
    description: "Readable, typed and maintainable code.",
    icon: Braces,
  },
  {
    title: "Responsive Design",
    description: "Interfaces that work beautifully on every screen.",
    icon: MonitorSmartphone,
  },
  {
    title: "Continuous Learning",
    description: "Always exploring new tools and better patterns.",
    icon: RefreshCcw,
  },
];

const INFO_CARDS: readonly { label: string; value: string }[] = [
  { label: "Name", value: PROFILE.name },
  { label: "Role", value: PROFILE.role },
  { label: "Focus", value: PROFILE.focus },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden py-20 lg:py-28">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_30%_10%,rgba(194,248,0,0.06),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left — heading, intro, description */}
          <div>
            <motion.p
              {...reveal(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs tracking-[0.25em] text-neon uppercase"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              Get to know me
            </motion.p>

            <motion.h2
              {...reveal(0.08)}
              id="about-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              About Me
            </motion.h2>

            <motion.p
              {...reveal(0.16)}
              className="mt-5 text-base leading-relaxed text-white sm:text-lg"
            >
              I&apos;m a passionate Frontend Developer who enjoys building modern, responsive
              and user-friendly web applications.
            </motion.p>

            <motion.p
              {...reveal(0.24)}
              className="mt-4 max-w-2xl text-base leading-relaxed text-secondary"
            >
              I focus on creating clean user interfaces and meaningful digital experiences
              using React, Next.js and TypeScript. I enjoy learning new technologies, solving
              problems and continuously improving my development skills.
            </motion.p>

            {/* Highlights */}
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((item, index) => (
                <motion.li
                  key={item.title}
                  {...reveal(0.3 + index * 0.08)}
                  className="group rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-neon/50 hover:bg-card"
                >
                  <item.icon className="size-6 text-neon" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{item.description}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right — info cards + profile */}
          <div className="space-y-4">
            {INFO_CARDS.map((card, index) => (
              <motion.div
                key={card.label}
                {...reveal(0.15 + index * 0.08)}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/60 px-5 py-4 transition-colors hover:border-neon/50"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                  {card.label}
                </span>
                <span className="text-right text-base font-semibold text-white">{card.value}</span>
              </motion.div>
            ))}

            <motion.div
              {...reveal(0.35)}
              className="rounded-2xl border border-border bg-card/60 px-5 py-4 transition-colors hover:border-neon/50"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                Interests
              </span>
              <p className="mt-2 text-base text-white">{PROFILE.interests}</p>
            </motion.div>

            {/* Profile photo */}
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div aria-hidden="true" className="absolute -inset-6 bg-neon/10 blur-2xl" />
              <Image
                src={PROFILE.image}
                alt={`Profile portrait of ${PROFILE.name}`}
                width={640}
                height={480}
                className="relative h-64 w-full object-cover object-top sm:h-72"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <figcaption className="relative flex items-center justify-between border-t border-border bg-card px-5 py-4">
                <span className="text-sm font-medium text-white">{PROFILE.name}</span>
                <span className="font-mono text-xs tracking-widest text-neon uppercase">
                  {PROFILE.role}
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
