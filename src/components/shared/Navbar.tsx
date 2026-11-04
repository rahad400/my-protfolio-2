"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import type { NavLink } from "@/types";

type NavbarProps = {
  brand?: string;
  links?: readonly NavLink[];
  cvHref?: string;
};

const DEFAULT_LINKS: readonly NavLink[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  // { label: "Journey", href: "#journey", id: "journey" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar({
  brand = "DEV.",
  links = DEFAULT_LINKS,
  cvHref = "/resume/Rahad-CV.pdf",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(links[0]?.id ?? "home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, closeMenu]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-md"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="#home"
          onClick={() => setActiveId("home")}
          className="font-mono text-sm font-bold tracking-[0.25em] text-white uppercase focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
          aria-label="Back to home"
        >
          {brand}
          <span className="text-neon">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={() => setActiveId(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none ${
                    isActive ? "text-white" : "text-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-neon shadow-[0_0_12px_rgba(194,248,0,0.8)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CV CTA */}
        <div className="hidden md:block">
          <a
            href={cvHref}
            download="Rahad-CV.pdf"
            aria-label="Download CV"
            className="inline-flex items-center gap-1.5 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
          >
            Download CV
            <Download className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none md:hidden"
        >
          {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-4 py-4 sm:px-6">
              {links.map((link, index) => {
                const isActive = activeId === link.id;
                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveId(link.id);
                        closeMenu();
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none ${
                        isActive
                          ? "bg-card text-white shadow-[inset_0_0_0_1px_rgba(194,248,0,0.35)]"
                          : "text-secondary hover:bg-card hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive ? <span aria-hidden="true" className="size-2 rounded-full bg-neon shadow-[0_0_10px_rgba(194,248,0,0.9)]" /> : null}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="pt-2">
                <a
                  href={cvHref}
                  download="Rahad-CV.pdf"
                  onClick={closeMenu}
                  aria-label="Download CV"
                  className="flex items-center justify-center gap-2 rounded-xl bg-neon px-4 py-3 text-base font-semibold text-black focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                >
                  Download CV
                  <Download className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
