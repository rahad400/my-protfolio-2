"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";

const PROFILE_IMAGE = "/image/rahad.png";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      {/* Darker top-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(0,0,0,0.9),transparent_75%)]"
      />
      {/* Balanced bottom corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(to_right,rgba(8,10,8,0.98)_0%,rgba(8,10,8,0.85)_25%,rgba(8,10,8,0.35)_42%,transparent_55%,rgba(8,10,8,0.35)_68%,rgba(8,10,8,0.85)_82%,rgba(8,10,8,0.98)_100%)]"
      />
      {/* Left bottom matched to right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-56 w-1/2 bg-[linear-gradient(to_right,rgba(8,10,8,0.95),rgba(8,10,8,0.65)_45%,transparent_100%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16 lg:px-8 lg:pt-40 lg:pb-28">
        {/* Copy */}
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-secondary uppercase backdrop-blur-sm"
          >
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-neon shadow-[0_0_10px_rgba(194,248,0,0.9)]"
            />
            Open to Opportunities
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            id="hero-heading"
            className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="text-neon">Rahad</span>
            <span className="mt-3 block text-xl font-semibold leading-snug text-secondary sm:text-2xl lg:text-3xl">
              Full-Stack Developer
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-5 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl"
          >
            I build web experiences that solve real problems.
          </motion.p>

          <motion.p
            {...fadeUp(0.24)}
            className="mt-4 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
          >
            I&apos;m a developer who enjoys turning ideas into functional web
            applications. I work with modern frontend technologies and explore
            backend development to understand how complete applications work.
          </motion.p>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              href="#projects"
              icon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              View My Work
            </Button>
            <a
              href="/resume/Rahad-CV.pdf"
              download="Rahad-CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neon/60 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              Download CV
              <Download className="size-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-8">
            <SocialLinks />
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: [0, -10, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.7, delay: 0.2, ease: "easeOut" }
              : {
                  opacity: { duration: 0.7, delay: 0.2, ease: "easeOut" },
                  y: {
                    duration: 6,
                    delay: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="relative mx-auto h-[26rem] w-full max-w-sm sm:h-[32rem] lg:-mt-12 lg:h-[48rem] lg:max-w-none"
        >
          <div className="relative z-10 h-full w-full [mask-image:linear-gradient(to_bottom,black_78%,rgba(8,10,8,0.85)_90%,transparent_100%)]">
            <Image
              src={PROFILE_IMAGE}
              alt="Rahad — Full-Stack Developer"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 46vw"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background/90 via-background/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background/90 via-background/60 to-transparent"
          />
        </motion.div>
      </div>

    </section>
  );
}
