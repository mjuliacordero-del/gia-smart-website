import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Portrait } from "./Portrait";

/** Full-bleed conviction band — faith is the foundation of Premium Enrollment. */
export function FaithBand() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(q(".faith-img"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden text-bg"
      style={{ background: "linear-gradient(160deg, #414d20 0%, #2f3915 60%, #262e10 100%)" }}
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
        <div className="relative min-h-[52vh] overflow-hidden lg:min-h-[80vh]">
          <Portrait
            src="gia/gia-faith.jpg"
            alt="Gia Smart holding scripture — faith before the evidence"
            className="faith-img absolute inset-0 h-[118%] w-full"
            label="Save as public/gia/gia-faith.jpg"
            objectPosition="center 25%"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-fg/40 lg:to-fg/60" />
        </div>

        <div className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:py-0 lg:pl-16 lg:pr-[7vw]">
          <p className="eyebrow mb-6" style={{ color: "var(--accent-light)" }}>
            The foundation before the framework
          </p>
          <blockquote
            className="font-display font-semibold leading-[1.08] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)" }}
          >
            “Everything I have is because God asked me to move with faith{" "}
            <span className="font-editorial font-normal italic text-accent-light">
              before the evidence appeared
            </span>
            . And I did.”
          </blockquote>
          <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-bg/70">
            Faith is the foundation of this work — the radical certainty that this framework can guide
            you into your own next highest level, too.
          </p>
          <p className="mt-6 font-body text-sm uppercase tracking-[0.24em] text-bg/50">— Gia Smart</p>
        </div>
      </div>
    </section>
  );
}
