"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs tracking-[0.3em] text-neon uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          className="mt-4 text-base leading-relaxed text-secondary sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
