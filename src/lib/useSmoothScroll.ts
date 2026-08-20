import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Lenis smooth scroll wired into GSAP's ticker and ScrollTrigger.
 * This is the single source of truth for scroll position, so every
 * ScrollTrigger (parallax, pinned horizontal scroll) stays in sync
 * with the fluid inertia. Respects prefers-reduced-motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });

    // Drive Lenis from GSAP's ticker for perfectly synced frames.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor navigation.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Refresh once fonts settle so pin distances are measured correctly.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);
}

/** Smoothly scroll to an anchor id via Lenis (falls back to native). */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(target, { offset: -12, duration: 1.4 });
  else target.scrollIntoView({ behavior: "smooth" });
}
