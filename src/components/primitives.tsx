import { motion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Typographic wordmark lockup. The brand rule is "never type the wordmark" —
 * this is a faithful stand-in until the real asset (wordmark-stacked.png) is
 * dropped in at /public/logo. Swap <Wordmark> internals for an <img> then.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-[0.5ch] select-none" aria-label="She Sells Premium">
      <span
        className="font-display font-semibold tracking-[-0.02em] text-fg"
        style={{ fontSize: compact ? "1.02rem" : "1.12rem", lineHeight: 1 }}
      >
        She Sells
      </span>
      <span
        className="font-editorial italic text-accent"
        style={{ fontSize: compact ? "1.05rem" : "1.18rem", lineHeight: 1 }}
      >
        Premium
      </span>
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Word-by-word rise reveal, triggered when scrolled into view. */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "0.9em", opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const MotionTag = motion[as] as typeof motion.span;
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Simple fade-and-rise for blocks. */
export function Rise({
  children,
  className = "",
  delay = 0,
  y = 26,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
