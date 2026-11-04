import Link from "next/link";
import SocialLinks from "@/components/shared/SocialLinks";
import type { NavLink } from "@/types";

const FOOTER_LINKS: readonly NavLink[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-sm text-secondary transition-colors hover:text-neon focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks align="center" />

        <p className="text-center text-sm text-secondary">
          © {year} rahad.
        </p>
      </div>
    </footer>
  );
}
