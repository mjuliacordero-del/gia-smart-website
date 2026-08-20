import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { language } from "../content";
import { Eyebrow, Rise } from "./primitives";

/**
 * Editorial "language" section — a sticky heading beside a refined vocabulary
 * list (not a uniform card grid). Hover to expand the reasoning. A soft mineral
 * wash sets it apart from the neighbouring cream sections.
 */
export function PrecisionVocabulary() {
  const [active, setActive] = useState(0);

  return (
    <section id="language" className="relative overflow-hidden border-t border-border bg-bg/82 py-28 sm:py-36">
      {/* restrained mineral wash for tonal variety */}
      <div
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(70% 60% at 88% 0%, rgba(228,233,236,0.55) 0%, rgba(245,245,241,0) 55%)",
        }}
      />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Sticky heading */}
          <Rise className="lg:sticky lg:top-28">
            <Eyebrow>{language.eyebrow}</Eyebrow>
            <h2
              className="mt-4 font-display font-semibold leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)" }}
            >
              Precision{" "}
              <span className="font-editorial font-normal italic text-accent">vocabulary</span>.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[1.02rem] leading-relaxed text-muted">
              {language.intro}
            </p>
            <p className="mt-8 font-editorial text-lg italic text-accent-secondary">
              Recalibrate the language, and the room recalibrates with it.
            </p>
          </Rise>

          {/* Refined vocabulary list */}
          <div className="border-t border-border">
            {language.pairs.map((p, i) => {
              const isActive = active === i;
              return (
                <button
                  key={p.use}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group grid w-full grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-border py-7 text-left transition-colors sm:gap-x-10"
                >
                  <span className="font-body text-[0.72rem] font-bold tabular-nums text-muted">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3
                        className={`font-display font-semibold tracking-[-0.02em] transition-colors duration-400 ${
                          isActive ? "text-accent" : "text-fg"
                        }`}
                        style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
                      >
                        {p.use}
                      </h3>
                      <span className="font-body text-sm text-muted line-through decoration-1">
                        instead of “{p.instead}”
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden text-[1rem] leading-relaxed text-muted"
                        >
                          {p.note}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
