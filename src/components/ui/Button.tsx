import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none";

  const styles =
    variant === "primary"
      ? "bg-neon text-black hover:scale-[1.03] transition-transform focus-visible:ring-white/70"
      : "border border-border bg-card/60 text-white hover:border-neon/60 transition-colors";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {icon}
    </Link>
  );
}
