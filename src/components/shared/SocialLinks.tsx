import { AtSign, BriefcaseBusiness, CodeXml, Mail, MessageCircle } from "lucide-react";
import type { SocialLink } from "@/types";
import { contactInfo } from "@/data/contact";

type SocialLinksProps = {
  links?: readonly SocialLink[];
  align?: "start" | "center";
};

const DEFAULT_SOCIALS: readonly SocialLink[] = [
  { label: "GitHub", href: contactInfo.github, icon: CodeXml },
  { label: "LinkedIn", href: contactInfo.linkedin, icon: BriefcaseBusiness },
  { label: "Twitter / X", href: "https://x.com/", icon: AtSign },
  { label: "Email", href: contactInfo.email, icon: Mail },
  { label: "WhatsApp", href: contactInfo.whatsapp, icon: MessageCircle },
];

export default function SocialLinks({
  links = DEFAULT_SOCIALS,
  align = "start",
}: SocialLinksProps) {
  return (
    <ul
      aria-label="Social links"
      className={`flex flex-wrap items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      {links.map(({ label, href, icon: Icon }) => {
        const isExternal = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card/60 text-secondary transition-colors hover:border-neon/60 hover:text-neon focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
