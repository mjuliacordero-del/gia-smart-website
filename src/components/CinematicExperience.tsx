import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { masteries, type Mastery } from "../content";

/**
 * <CinematicExperience />
 * Desktop: the section pins and the Five Masteries scroll horizontally,
 * scrubbed to vertical wheel input (Awwwards-style continuous horizontal).
 * Mobile: the same panels flow as a continuous vertical sequence.
 * Behavior switches cleanly via gsap.matchMedia.
 */
export function CinematicExperience() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // -------- Desktop: pinned horizontal scroll --------------------------
      mm.add("(min-width: 1024px)", () => {
        const trackEl = track.current!;
        const getDistance = () => trackEl.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(trackEl, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + getDistance(),
            pin: pin.current,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Per-panel content reveals, driven by the horizontal container motion.
        const panels = gsap.utils.toArray<HTMLElement>(".cine-panel");
        panels.forEach((panel) => {
          const items = panel.querySelectorAll<HTMLElement>("[data-reveal]");
          gsap.from(items, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 78%",
              toggleActions: "play none none reverse",
            },
          });
          // Ghost numeral drifts as the panel crosses the viewport.
          const ghost = panel.querySelector<HTMLElement>(".cine-ghost");
          if (ghost) {
            gsap.fromTo(
              ghost,
              { xPercent: 12 },
              {
                xPercent: -12,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }
        });

        return () => {
          gsap.set(trackEl, { x: 0 });
        };
      });

      // -------- Mobile: vertical reveals -----------------------------------
      mm.add("(max-width: 1023px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".cine-panel [data-reveal]");
        items.forEach((el) => {
          gsap.from(el, {
            y: 34,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          });
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="masteries" className="relative text-bg" style={{ background: "#3a3320" }}>
      <div ref={pin} className="relative lg:h-[100svh] lg:overflow-hidden">
        {/* progress bar (desktop) */}
        <div className="absolute inset-x-0 top-0 z-20 hidden h-[3px] bg-bg/10 lg:block">
          <div
            ref={bar}
            className="h-full w-full origin-left bg-accent-light"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div
          ref={track}
          className="flex w-full flex-col lg:h-full lg:w-max lg:flex-row lg:flex-nowrap"
        >
          {/* Intro panel */}
          <IntroPanel />
          {masteries.map((m, i) => (
            <MasteryPanel key={m.n} m={m} index={i} />
          ))}
          <OutroPanel />
        </div>
      </div>
    </section>
  );
}

function IntroPanel() {
  return (
    <article className="cine-panel relative flex shrink-0 flex-col justify-center px-6 py-24 sm:px-10 lg:h-full lg:w-[46vw] lg:py-0 lg:pl-[7vw] lg:pr-[4vw]">
      <p data-reveal className="eyebrow mb-6" style={{ color: "var(--accent-light)" }}>
        The framework · Five Masteries
      </p>
      <h2
        data-reveal
        className="font-display font-semibold leading-[1.02] tracking-[-0.02em] text-bg"
        style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)" }}
      >
        The Five Masteries of{" "}
        <span className="font-editorial font-normal italic text-accent-light">Premium Enrollment</span>.
      </h2>
      <p data-reveal className="mt-7 max-w-[44ch] text-[1.05rem] leading-relaxed text-bg/70">
        Not a script. A recalibration — of identity, presence, language, invitation, and the ask —
        so the right client recognizes alignment and moves toward a true yes.
      </p>
      <div data-reveal className="mt-10 flex items-center gap-4 text-bg/60">
        <span className="hidden font-body text-[0.7rem] uppercase tracking-[0.24em] lg:inline">
          Drag through
        </span>
        <span className="hidden h-px w-16 bg-bg/30 lg:block" />
        <span className="font-editorial text-lg italic text-accent-light lg:hidden">Scroll ↓</span>
        <span className="hidden font-editorial text-lg italic text-accent-light lg:inline">→</span>
      </div>
    </article>
  );
}

function MasteryPanel({ m, index }: { m: Mastery; index: number }) {
  // One dramatic contrast panel keeps the sequence from repeating a single card.
  const isFeature = m.n === "03";
  return (
    <article
      className="cine-panel relative flex shrink-0 flex-col justify-center overflow-hidden border-t border-bg/10 px-6 py-24 sm:px-10 lg:h-full lg:w-[42vw] lg:border-l lg:border-t-0 lg:py-0 lg:pl-[5vw] lg:pr-[4vw]"
      style={
        isFeature
          ? { background: "var(--accent-light)", color: "var(--fg)" }
          : index % 2 === 1
          ? { background: "#2c2614" }
          : undefined
      }
    >
      {/* ghost numeral */}
      <span
        className="cine-ghost pointer-events-none absolute -right-2 bottom-2 select-none font-display font-semibold leading-none lg:-right-4 lg:top-1/2 lg:-translate-y-1/2"
        style={{
          fontSize: "clamp(9rem, 22vw, 22rem)",
          color: isFeature ? "rgba(50,43,25,0.10)" : "rgba(245,245,241,0.06)",
        }}
        aria-hidden
      >
        {m.n}
      </span>

      <div className="relative z-10 max-w-[40ch]">
        <div data-reveal className="mb-5 flex items-center gap-3">
          <span
            className="font-body text-[0.72rem] font-bold uppercase tracking-[0.24em]"
            style={{ color: isFeature ? "var(--deep-olive)" : "var(--accent-light)" }}
          >
            {m.n} — Pillar
          </span>
          <span
            className="h-px w-10"
            style={{ background: isFeature ? "rgba(50,43,25,0.3)" : "rgba(245,245,241,0.25)" }}
          />
        </div>

        <h3
          data-reveal
          className="font-display font-semibold leading-[1.02] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(2.2rem, 4.6vw, 3.9rem)",
            color: isFeature ? "var(--fg)" : "var(--bg)",
          }}
        >
          {m.name}
        </h3>
        <p
          data-reveal
          className="mt-2 font-editorial text-xl italic"
          style={{ color: isFeature ? "rgba(50,43,25,0.7)" : "var(--accent-light)" }}
        >
          {m.subtitle}
        </p>

        <p
          data-reveal
          className="mt-6 text-[1.02rem] leading-relaxed"
          style={{ color: isFeature ? "rgba(50,43,25,0.82)" : "rgba(245,245,241,0.72)" }}
        >
          {m.essence}
        </p>

        <blockquote
          data-reveal
          className="mt-8 border-l-2 pl-5 font-editorial text-[1.35rem] italic leading-snug"
          style={{
            borderColor: isFeature ? "var(--fg)" : "var(--accent-light)",
            color: isFeature ? "var(--fg)" : "var(--bg)",
          }}
        >
          “{m.line}”
        </blockquote>

        <p
          data-reveal
          className="mt-7 font-body text-[0.72rem] uppercase tracking-[0.24em]"
          style={{ color: isFeature ? "rgba(50,43,25,0.55)" : "rgba(245,245,241,0.5)" }}
        >
          {m.motif}
        </p>
      </div>
    </article>
  );
}

function OutroPanel() {
  return (
    <article className="cine-panel relative flex shrink-0 flex-col justify-center border-t border-bg/10 px-6 py-24 sm:px-10 lg:h-full lg:w-[40vw] lg:border-l lg:border-t-0 lg:py-0 lg:pl-[5vw] lg:pr-[7vw]">
      <p data-reveal className="eyebrow mb-6" style={{ color: "var(--accent-light)" }}>
        The result
      </p>
      <p
        data-reveal
        className="font-editorial text-3xl italic leading-snug text-bg sm:text-4xl"
      >
        “Premium Enrollment Mastery creates the conditions for a dignified, congruent, love-led{" "}
        <span className="text-accent-light">yes</span>.”
      </p>
      <p data-reveal className="mt-6 font-body text-sm uppercase tracking-[0.24em] text-bg/50">
        — Gia Smart
      </p>
    </article>
  );
}
