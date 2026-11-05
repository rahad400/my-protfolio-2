"use client";

import { useId, useMemo, useState } from "react";
import {
  ExternalLink,
  Globe,
  Lock,
  MousePointerClick,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { isPlaceholderHref, type Project } from "@/types";

type ProjectPreviewFrameProps = {
  project: Project;
};

export default function ProjectPreviewFrame({
  project,
}: ProjectPreviewFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const titleId = useId();

  const isPlaceholder = isPlaceholderHref(project.liveUrl);

  const displayUrl = useMemo(() => {
    if (!project.liveUrl || isPlaceholder) {
      return "preview.local";
    }
    try {
      const parsed = new URL(project.liveUrl);
      return parsed.hostname + (parsed.pathname === "/" ? "" : parsed.pathname);
    } catch {
      return project.liveUrl.replace(/^https?:\/\//, "");
    }
  }, [project.liveUrl, isPlaceholder]);

  const activeFallback = isPlaceholder || hasError || showFallback;

  return (
    <div className="relative w-full overflow-hidden rounded-t-3xl border-b border-border bg-card">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 bg-neon/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Browser-style window header */}
      <div className="relative flex h-10 w-full items-center justify-between gap-2 border-b border-border bg-[#0d100d] px-3 sm:px-4">
        {/* Window controls (macOS / browser style) */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-500/80 transition-opacity hover:opacity-100" />
          <span className="size-2.5 rounded-full bg-amber-500/80 transition-opacity hover:opacity-100" />
          <span className="size-2.5 rounded-full bg-emerald-500/80 transition-opacity hover:opacity-100" />
        </div>

        {/* Address bar */}
        <div className="flex min-w-0 max-w-[55%] flex-1 items-center justify-center sm:max-w-[65%]">
          <div className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] font-mono text-secondary">
            <Lock className="size-3 shrink-0 text-neon" aria-hidden="true" />
            <span className="truncate text-white/90" title={project.liveUrl}>
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1.5">
          {!isPlaceholder && project.liveUrl ? (
            <>
              {/* Toggle embedding fallback if needed */}
              <button
                type="button"
                onClick={() => setShowFallback((prev) => !prev)}
                title={showFallback ? "Switch back to iframe" : "Preview blocked? Switch to fallback"}
                aria-label={showFallback ? "Show iframe preview" : "Show fallback preview"}
                className="hidden rounded p-1 text-secondary transition-colors hover:bg-background/80 hover:text-white sm:inline-flex"
              >
                {showFallback ? (
                  <RefreshCw className="size-3.5" aria-hidden="true" />
                ) : (
                  <ShieldAlert className="size-3.5" aria-hidden="true" />
                )}
              </button>

              {/* Direct Open in new tab link */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${project.title} live site in a new tab`}
                title="Open live site in new tab"
                className="flex items-center gap-1 rounded p-1 text-secondary transition-colors hover:bg-background/80 hover:text-neon"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </>
          ) : (
            <span className="font-mono text-[10px] tracking-wider text-secondary uppercase">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Responsive fixed-aspect-ratio viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {activeFallback ? (
          /* Embedding Block / Placeholder Fallback UI */
          <div
            role="region"
            aria-label={`${project.title} preview placeholder`}
            className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-neon shadow-[0_0_20px_rgba(194,248,0,0.1)]">
              <Globe className="size-6" aria-hidden="true" />
            </div>

            <div className="max-w-xs space-y-1">
              <h4 className="text-sm font-semibold text-white">
                {isPlaceholder
                  ? "Live Preview Coming Soon"
                  : "Embedded Preview Protected"}
              </h4>
              <p className="text-xs leading-relaxed text-secondary">
                {isPlaceholder
                  ? "This project is currently in active development or awaiting deployment."
                  : "Direct embedding is restricted by browser security policies for this deployment."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {!isPlaceholder && project.liveUrl ? (
                <>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-neon px-4 py-2 text-xs font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                  >
                    Open Live Website
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                  {showFallback ? (
                    <button
                      type="button"
                      onClick={() => setShowFallback(false)}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card/60 px-3 py-2 text-xs font-medium text-secondary transition-colors hover:border-neon/50 hover:text-white"
                    >
                      <RefreshCw className="size-3" aria-hidden="true" />
                      Try Iframe
                    </button>
                  ) : null}
                </>
              ) : (
                <span className="rounded-full border border-border bg-card/40 px-3 py-1 font-mono text-[11px] text-secondary">
                  Awaiting Live URL
                </span>
              )}
            </div>
          </div>
        ) : (
          /* Live HTML Iframe Preview */
          <>
            {/* Loading Skeleton */}
            {isLoading ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/90 backdrop-blur-sm"
              >
                <div className="size-6 animate-spin rounded-full border-2 border-border border-t-neon" />
                <span className="font-mono text-[11px] text-secondary">
                  Connecting live preview...
                </span>
              </div>
            ) : null}

            {/* The HTML Iframe */}
            <iframe
              id={titleId}
              src={project.liveUrl}
              title={`${project.title} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className="h-full w-full border-0 bg-background"
            />

            {/* Scroll protection & interaction toggle overlay */}
            <div
              className={`absolute inset-0 transition-colors ${
                isInteractive
                  ? "pointer-events-none bg-transparent"
                  : "bg-black/10 backdrop-blur-[0.5px]"
              }`}
            >
              {/* Interaction button positioned at bottom-right */}
              <div className="pointer-events-auto absolute right-3 bottom-3">
                <button
                  type="button"
                  onClick={() => setIsInteractive((prev) => !prev)}
                  aria-pressed={isInteractive}
                  aria-label={
                    isInteractive
                      ? "Lock preview to resume normal page scroll"
                      : "Interact directly with live preview"
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium shadow-md transition-all focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none ${
                    isInteractive
                      ? "bg-neon text-black hover:bg-neon/90"
                      : "border border-border bg-card/90 text-white hover:border-neon/50 hover:bg-card"
                  }`}
                >
                  <MousePointerClick className="size-3" aria-hidden="true" />
                  <span>{isInteractive ? "Scroll Mode" : "Interact"}</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Featured ribbon if applicable */}
        {project.featured ? (
          <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-neon px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.2em] text-black uppercase shadow-[0_0_12px_rgba(194,248,0,0.5)]">
            Featured
          </span>
        ) : null}
      </div>
    </div>
  );
}

