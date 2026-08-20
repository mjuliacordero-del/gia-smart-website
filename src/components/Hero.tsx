import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { hero } from "../content";
import { scrollToId } from "../lib/useSmoothScroll";

/**
 * Bold, motion-site hero — minimal text, oversized type, Gia large, and the
 * Blender-rendered golden ribbon threading between them. GSAP entrance + a
 * pointer-parallax that moves each layer at its own depth.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ---- Entrance -------------------------------------------------------
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(q(".h-eye"), { y: 18, opacity: 0, duration: 0.8 })
        .from(q(".h-line > span"), { yPercent: 115, duration: 1.15, stagger: 0.12 }, "-=0.4")
        .from(q(".h-gia"), { opacity: 0, xPercent: 8, scale: 1.04, duration: 1.3, ease: "power3.out" }, "-=1.0")
        .from(q(".h-cta"), { opacity: 0, y: 16, duration: 0.8 }, "-=0.7")
        .from(q(".h-side, .h-scroll"), { opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");

      if (reduce) return;

      // ---- Pointer parallax ----------------------------------------------
      const layers = gsap.utils.toArray<HTMLElement>("[data-par]", root.current!);
      const setters = layers.map((l) => ({
        x: gsap.quickTo(l, "x", { duration: 0.8, ease: "power3" }),
        y: gsap.quickTo(l, "y", { duration: 0.8, ease: "power3" }),
        p: parseFloat(l.dataset.par || "0"),
      }));
      const onMove = (e: PointerEvent) => {
        const r = root.current!.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.p * 120);
          s.y(ny * s.p * 120);
        });
      };
      root.current!.addEventListener("pointermove", onMove);

      // ---- Scroll reaction: content lifts as the hero leaves --------------
      gsap.to(q(".h-type"), {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.7 },
      });

      return () => root.current?.removeEventListener("pointermove", onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[100svh] w-full overflow-hidden">
      {/* Gia — large cinematic figure */}
      <div
        data-par="0.02"
        className="h-gia absolute bottom-0 right-0 z-[1] h-[96%] w-[52%]"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 22%)",
          maskImage: "linear-gradient(90deg, transparent, #000 22%)",
        }}
      >
        <video
          src="gia/gia-hero.mp4"
          poster="gia/gia-authority.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Gia Smart — Luxury Business Consultant"
          className="h-full w-full object-cover"
          style={{ objectPosition: "60% 12%", filter: "contrast(1.05) saturate(0.9) sepia(0.05)" }}
        />
      </div>

      {/* Oversized type */}
      <div
        data-par="-0.015"
        className="h-type absolute left-[clamp(20px,4vw,56px)] top-1/2 z-[3] -translate-y-1/2"
      >
        <p className="h-eye eyebrow mb-6">{hero.eyebrow}</p>
        <h1
          className="font-display font-semibold text-fg"
          style={{ lineHeight: 0.86, letterSpacing: "-0.04em", fontSize: "clamp(3.2rem, 12vw, 11rem)" }}
        >
          <span className="line-mask h-line">
            <span className="block">Lead</span>
          </span>
          <span className="line-mask h-line">
            <span className="block">
              the <span className="font-editorial italic font-normal text-accent">room</span>.
            </span>
          </span>
        </h1>
      </div>

      {/* Single CTA */}
      <button
        onClick={() => scrollToId(hero.ctaPrimary.id)}
        className="h-cta absolute bottom-11 left-[clamp(20px,4vw,56px)] z-[4] flex items-center gap-4"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-fg text-lg text-bg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          →
        </span>
        <span className="text-left">
          <span className="block text-[0.82rem] font-bold text-fg">Begin the recalibration</span>
          <span className="block text-[0.72rem] text-muted">Not another funnel.</span>
        </span>
      </button>

      {/* Side label + scroll cue */}
      <span
        className="h-side absolute right-6 top-1/2 z-[4] origin-right -translate-y-1/2 rotate-90 font-body text-[0.66rem] uppercase tracking-[0.28em] text-muted"
      >
        From chasing → leading
      </span>
      <div className="h-scroll absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-muted">Scroll</span>
        <span className="h-8 w-px bg-accent/60" />
      </div>
    </section>
  );
}
