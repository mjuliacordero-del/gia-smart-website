import { motion } from "motion/react";
import { future } from "../content";
import { Eyebrow, Rise } from "./primitives";

/** Future-pacing — an asymmetric bento so it doesn't read as a uniform card row. */
export function Future() {
  const [feature, ...rest] = future.cards;

  return (
    <section className="relative border-t border-border bg-soft-taupe/85 py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Rise className="max-w-[46ch]">
          <Eyebrow>{future.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-semibold leading-[1.04] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}
          >
            {future.title}
          </h2>
        </Rise>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Feature outcome */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-accent/30 p-9 md:col-span-2 md:flex-row md:items-end md:gap-10"
            style={{ background: "linear-gradient(135deg, #f4f1e6 0%, #ece6d2 100%)" }}
          >
            <span
              className="pointer-events-none absolute -right-4 -top-8 select-none font-display font-semibold leading-none text-accent/10"
              style={{ fontSize: "12rem" }}
              aria-hidden
            >
              01
            </span>
            <div className="relative max-w-[46ch]">
              <span className="font-body text-[0.7rem] font-bold uppercase tracking-[0.24em] text-accent-secondary">
                The first shift
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-4xl">
                {feature.t}
              </h3>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-fg/70">{feature.d}</p>
            </div>
            <img
              src="chrome/orb_1.png"
              alt=""
              aria-hidden
              className="relative mt-6 w-28 shrink-0 drop-shadow-[0_10px_24px_rgba(50,43,25,0.2)] md:mt-0 md:w-40"
            />
          </motion.article>

          {/* Supporting outcomes */}
          {rest.map((c, i) => (
            <motion.article
              key={c.t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-[16px] border border-border bg-surface p-8 transition-shadow duration-500 hover:shadow-[var(--shadow-soft)]"
            >
              <img
                src={`chrome/orb_${i + 2}.png`}
                alt=""
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 w-20 opacity-95 md:w-24"
              />
              <span className="font-display text-5xl font-semibold text-accent/25">0{i + 2}</span>
              <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-fg">{c.t}</h3>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-muted">{c.d}</p>
              <span className="mt-6 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
