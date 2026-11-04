"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";

const ROLES: readonly string[] = [
  "Frontend Developer",
  "UI Designer",
  "Creative Coder",
];

const PROFILE_IMAGE = "/images/profile.jpeg";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const activeRole = ROLES[roleIndex] ?? ROLES[0] ?? "Frontend Developer";

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(194,248,0,0.08),transparent_70%)]"
      />
      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-40 lg:pb-28">
        {/* Copy */}
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-secondary uppercase"
          >
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-neon shadow-[0_0_10px_rgba(194,248,0,0.9)]"
            />
            Available for opportunities
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            id="hero-heading"
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-neon">RAHAD</span>
            <span className="block text-secondary">
              I build
              <span aria-live="polite" className="block min-h-[1.] text-white">
                <motion.span
                  key={activeRole}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  {activeRole}
                </motion.span>
              </span>{" "}
              experiences.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
          >
            I craft fast, accessible, and visually striking web products with
            Next.js, TypeScript, and modern design systems — ready for job
            applications, freelancing, and personal branding.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              href="#contact"
              icon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              Get in touch
            </Button>
            <Button
              href="#projects"
              variant="secondary"
              icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
            >
              View projects
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="mt-8">
            <SocialLinks />
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-neon/10 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_0_60px_rgba(194,248,0,0.08)]">
            {/* Placeholder frame for profile photo */}
            <div className="flex aspect-[4/5] items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(194,248,0,0.12),transparent_60%)]">
              <Image
                src={PROFILE_IMAGE}
                alt="Profile portrait"
                width={640}
                height={800}
                priority
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-5">
              <p className="font-mono text-xs tracking-[0.2em] text-neon uppercase">
                Frontend Developer
              </p>
              <p className="text-sm text-white">Building the future web</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
