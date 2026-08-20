import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { comparison } from "../content";
import { Eyebrow, Rise } from "./primitives";

export function Comparison() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative overflow-hidden border-t border-border py-28 sm:py-36"
      style={{ background: "linear-gradient(165deg, #e7efec 0%, #d3e0db 55%, #c2d3cd 100%)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Rise>
          <Eyebrow>{comparison.eyebrow}</Eyebrow>
          <h2
            className="mt-4 max-w-[18ch] font-display font-semibold leading-[1.06] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}
          >
            {comparison.title}
          </h2>
        </Rise>

        {/* Split panels */}
        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-[12px] border border-border md:grid-cols-2">
          <Rise className="bg-surface p-8 sm:p-10">
            <p className="font-body text-[0.72rem] font-bold uppercase tracking-[0.22em] text-muted">
              {comparison.columns.old.kicker}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-snug text-fg/70">
              {comparison.columns.old.title}
            </h3>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              {comparison.columns.old.note}
            </p>
          </Rise>
          <Rise
            delay={0.1}
            className="relative border-t border-border p-8 sm:p-10 md:border-l md:border-t-0"
            style={{ background: "linear-gradient(180deg,#faf9f4 0%,#f3f1e6 100%)" }}
          >
            <span className="absolute right-6 top-6 text-accent/50">✦</span>
            <p className="font-body text-[0.72rem] font-bold uppercase tracking-[0.22em] text-accent-secondary">
              {comparison.columns.new.kicker}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-snug text-fg">
              {comparison.columns.new.title}
            </h3>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-fg/70">
              {comparison.columns.new.note}
            </p>
          </Rise>
        </div>

        {/* Interactive shifts */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {comparison.shifts.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.to}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex items-center justify-between gap-4 py-6 text-left transition-colors"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={`font-display text-2xl font-semibold transition-colors sm:text-3xl ${
                        isActive ? "text-fg/35" : "text-fg/25"
                      } line-through decoration-1`}
                    >
                      {s.from}
                    </span>
                    <span aria-hidden className="text-accent">→</span>
                    <span
                      className={`font-display text-2xl font-semibold tracking-[-0.02em] transition-colors sm:text-3xl ${
                        isActive ? "text-accent" : "text-fg"
                      }`}
                    >
                      {s.to}
                    </span>
                  </span>
                  <span
                    className={`hidden h-2 w-2 rounded-full transition-all sm:block ${
                      isActive ? "scale-100 bg-accent" : "scale-0 bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[9rem] rounded-[12px] border border-border bg-surface p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-editorial text-lg italic text-accent-secondary">
                  {comparison.shifts[active].from} becomes {comparison.shifts[active].to}
                </p>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-fg/80">
                  {comparison.shifts[active].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
