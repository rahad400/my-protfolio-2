"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";

const PROFILE_IMAGE = "/images/profile.jpeg";

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
            Open to Opportunities
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            id="hero-heading"
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-neon">Rahad</span>
            <span className="mt-2 block text-lg font-medium text-secondary sm:text-xl lg:text-2xl">
              Junior Full-Stack Developer
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl"
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
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 1, scale: 1, y: [0, -12, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.7, delay: 0.2, ease: "easeOut" }
              : {
                  opacity: { duration: 0.7, delay: 0.2, ease: "easeOut" },
                  scale: { duration: 0.7, delay: 0.2, ease: "easeOut" },
                  y: {
                    duration: 6,
                    delay: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0.35, scale: 0.98 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.35, 0.75, 0.35],
                    scale: [0.98, 1.02, 0.98],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute -inset-6 rounded-[2rem] bg-neon/10 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_0_60px_rgba(194,248,0,0.08)]">
            <div className="flex aspect-[4/5] items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(194,248,0,0.12),transparent_60%)]">
              <motion.div
                className="h-full w-full"
                initial={reduceMotion ? false : { scale: 1.08 }}
                animate={
                  reduceMotion ? undefined : { scale: [1.08, 1, 1.08] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <Image
                  src={PROFILE_IMAGE}
                  alt="Rahad — Junior Full-Stack Developer"
                  width={640}
                  height={800}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </motion.div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-5">
              <p className="font-mono text-xs tracking-[0.2em] text-neon uppercase">
                Junior Full-Stack Developer
              </p>
              <p className="text-sm text-white">Building the future web</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
