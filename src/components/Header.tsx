import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { nav } from "../content";
import { scrollToId } from "../lib/useSmoothScroll";
import { Wordmark } from "./primitives";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-border/70"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Legibility scrim so the nav stays readable over the hero video */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/90 via-bg/45 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <button onClick={() => go("top")} className="cursor-pointer" aria-label="Back to top">
            <Wordmark />
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="group relative font-body text-[0.82rem] font-medium text-fg transition-colors hover:text-accent-secondary"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => go("enroll")} className="btn btn-primary hidden h-11 sm:inline-flex">
              Enroll
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-fg transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-6 bg-fg transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-fg transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-b border-border/70 bg-bg/95 backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 py-4">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="py-2 text-left font-display text-lg text-fg"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => go("enroll")} className="btn btn-primary mt-3 w-full">
            Enroll
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
