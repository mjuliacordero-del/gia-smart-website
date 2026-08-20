import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { authority } from "../content";
import { Eyebrow, Rise } from "./primitives";
import { Portrait } from "./Portrait";

/** Count-up that preserves a non-numeric prefix/suffix (e.g. "$25M+"). */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(value.replace(/[\d,]+/, "0"));

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/([^\d]*)([\d,]+)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(target * eased).toLocaleString("en-US");
      setDisplay(`${prefix}${current}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function Authority() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg/82 py-28 sm:py-36">
      {/* subtle mineral wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 90% 10%, rgba(228,233,236,0.6) 0%, rgba(245,245,241,0) 55%)",
        }}
      />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* Editorial portrait of Gia Smart */}
        <Rise className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] border border-border shadow-[var(--shadow-soft)]">
            <Portrait
              src="gia/gia-work.jpg"
              alt="Gia Smart — Luxury Business Consultant"
              className="h-full w-full"
              label="Save as public/gia/gia-work.jpg"
              objectPosition="center 18%"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-bg/85 px-3 py-1 font-body text-[0.62rem] uppercase tracking-[0.2em] text-fg/60 backdrop-blur-sm">
              Understated luxury · shallow depth
            </span>
          </div>
        </Rise>

        <div className="lg:col-span-7 lg:pl-4">
          <Eyebrow>{authority.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-semibold leading-[1.06] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {authority.name}
          </h2>
          <p className="mt-3 font-editorial text-xl italic text-accent-secondary">{authority.role}</p>
          <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-relaxed text-fg/80">
            {authority.body}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {authority.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-semibold tracking-[-0.02em] text-accent">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-[0.85rem] leading-snug text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-l-2 border-accent pl-6 font-editorial text-2xl italic leading-snug text-fg"
          >
            “{authority.quote}”
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
