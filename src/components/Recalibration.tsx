import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { recalibration } from "../content";
import { Eyebrow, RevealWords, Rise } from "./primitives";
import { Portrait } from "./Portrait";

export function Recalibration() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(q(".recal-mark"), {
        yPercent: -22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      // slow zoom on the portrait for life
      gsap.fromTo(
        q(".recal-portrait img"),
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="recalibration"
      className="relative overflow-hidden border-t border-border bg-bg/82 py-28 sm:py-40"
    >
      <span
        className="recal-mark pointer-events-none absolute -left-4 top-6 select-none font-editorial italic text-fg/[0.05]"
        style={{ fontSize: "clamp(6rem, 20vw, 18rem)", lineHeight: 0.8 }}
        aria-hidden
      >
        Begin.
      </span>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* Portrait */}
        <Rise className="lg:col-span-5">
          <div className="recal-portrait relative aspect-[4/5] overflow-hidden rounded-[14px] border border-border shadow-[var(--shadow-soft)]">
            <Portrait
              src="gia/gia-warm.jpg"
              alt="Gia Smart"
              className="h-full w-full"
              label="Save as public/gia/gia-warm.jpg"
              objectPosition="center 20%"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-bg/85 px-3 py-1 font-editorial text-sm italic text-fg/70 backdrop-blur-sm">
              {recalibration.chapter}
            </span>
          </div>
        </Rise>

        {/* Editorial text */}
        <div className="lg:col-span-7 lg:pl-4">
          <Eyebrow>{recalibration.eyebrow}</Eyebrow>
          <h2
            className="mt-5 font-display font-semibold leading-[1.06] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}
          >
            <RevealWords as="span" text={recalibration.lead} className="text-fg" />{" "}
            <RevealWords as="span" text={recalibration.body} className="text-muted" delay={0.15} />
          </h2>

          <figure className="mt-12 max-w-[52ch]">
            <blockquote className="border-l-2 border-accent pl-6 font-editorial text-2xl italic leading-snug text-fg sm:text-[1.7rem]">
              “{recalibration.quote}”
            </blockquote>
            <figcaption className="mt-4 pl-6 font-body text-sm uppercase tracking-[0.22em] text-accent-secondary">
              — {recalibration.attribution}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
