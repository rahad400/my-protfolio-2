type SectionDividerProps = {
  position?: "top" | "bottom";
  className?: string;
};

export default function SectionDivider({
  position = "bottom",
  className = "",
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(194,248,0,0.18)_25%,rgba(194,248,0,0.7)_50%,rgba(194,248,0,0.18)_75%,transparent_100%)]" />
        <div className="-mt-px h-[3px] bg-[linear-gradient(90deg,transparent_0%,rgba(194,248,0,0.1)_25%,rgba(194,248,0,0.4)_50%,rgba(194,248,0,0.1)_75%,transparent_100%)] blur-[4px]" />
        <span className="absolute -bottom-px left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-neon shadow-[0_0_12px_rgba(194,248,0,0.9)]" />
      </div>
    </div>
  );
}


