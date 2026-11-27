"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Let in-page anchors (e.g. #projects) keep their native behaviour.
    if (window.location.hash) return;

    // Prevent the browser from restoring a previous page's scroll position.
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    // Override the global CSS smooth scroll so route changes land at 0 instantly.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    // Re-assert after paint in case the router started its own smooth scroll.
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousBehavior;
    });

    return () => {
      cancelAnimationFrame(frame);
      history.scrollRestoration = previousRestoration;
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  return null;
}
