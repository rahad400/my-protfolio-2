import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export type NavLink = {
  label: string;
  href: string;
  id: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type Skill = {
  name: string;
  icon: LucideIcon;
  category: string;
};

export type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  /** Use "#" as a placeholder until real URLs are provided. */
  liveUrl?: string;
  /** Use "#" as a placeholder until real URLs are provided. */
  githubUrl?: string;
  image?: string;
  featured?: boolean;
};

export function isPlaceholderHref(href: string | undefined): boolean {
  return !href || href === "#";
}
