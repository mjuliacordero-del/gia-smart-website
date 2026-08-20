import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { recognition } from "../content";
import { Rise } from "./primitives";

/**
 * Dark, cinematic self-recognition moment — editorial rows (not cards), oversized
 * numerals, the golden ribbon glowing through the translucent charcoal. Breaks
 * the cream rhythm and gives emotional weight to "what's holding you back".
 */
export function SelfRecognition() {
  const [active, setActive] = useState<number>(0);

  return (
    <section
      className="relative overflow-hidden border-t border-black/15 py-28 text-bg sm:py-36"
      style={{ background: "linear-gradient(180deg, #3a3320 0%, #2c2615 100%)" }}
    >
      {/* oversized ghost numeral of the active item */}
      <span
        className="pointer-events-none absolute -right-6 bottom-4 select-none font-display font-semibold leading-none text-bg/[0.05] sm:-right-4"
        style={{ fontSize: "clamp(12rem, 30vw, 30rem)" }}
        aria-hidden
      >
        0{active + 1}
      </span>

      <div className="relative mx-auto max-w-[1160px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left — heading */}
          <Rise className="lg:sticky lg:top-28">
            <p className="font-body text-[0.72rem] font-bold uppercase tracking-[0.24em] text-accent-light">
              {recognition.eyebrow}
            </p>
            <h2
              className="mt-5 font-display font-semibold leading-[1.04] tracking-[-0.02em] text-bg"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.2rem)" }}
            >
              {recognition.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-[1.02rem] leading-relaxed text-bg/70">
              {recognition.intro}
            </p>
          </Rise>

          {/* Right — editorial rows */}
          <div className="border-t border-bg/12">
            {recognition.items.map((item, i) => {
              const isActive = active === i;
              return (
                <button
                  key={item.k}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-start gap-5 border-b border-bg/12 py-7 text-left sm:gap-8"
                >
                  <span
                    className={`mt-1 font-display text-2xl font-semibold tabular-nums transition-colors duration-500 sm:text-3xl ${
                      isActive ? "text-accent-light" : "text-bg/45"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`font-display font-semibold leading-tight tracking-[-0.01em] transition-colors duration-500 ${
                        isActive ? "text-accent-light" : "text-bg/90 group-hover:text-bg"
                      }`}
                      style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}
                    >
                      {item.k}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden text-[1.02rem] leading-relaxed text-bg/70"
                        >
                          {item.d}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <span
                    className={`mt-2 text-lg transition-all duration-500 ${
                      isActive ? "translate-x-0 text-accent-light opacity-100" : "-translate-x-2 opacity-0"
                    }`}
                    aria-hidden
                  >
                    ✦
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resolve */}
        <Rise delay={0.1} className="mt-16 max-w-[62ch] border-l-2 border-accent-light pl-6 sm:mt-20 sm:pl-8">
          <p className="font-editorial text-2xl italic leading-snug text-bg sm:text-[1.8rem]">
            {recognition.resolve}
          </p>
        </Rise>
      </div>
    </section>
  );
}
