import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/gsap";

const FRAMES = 72;
const framePath = (i: number) => `/ribbon/frame_${String(i).padStart(4, "0")}.png`;

/**
 * The golden ribbon as a page-wide throughline — a Blender-rendered sequence of
 * the ribbon *flowing* (undulating + twisting in 3D) scrubbed to whole-page
 * scroll. Fixed behind the (semi-transparent) content: absent in the hero
 * (which has its own ribbon), a quiet flow through the middle, blooming at the
 * enrollment finale. Driven by ScrollTrigger (synced to Lenis) so it tracks
 * scroll exactly, drawn on scroll events (no rAF dependency).
 */
export function RibbonThroughline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    imgs.current = Array.from({ length: FRAMES }, (_, i) => {
      const img = new Image();
      if (i === 0) img.onload = () => setReady(true);
      img.src = framePath(i);
      if (i === 0 && img.complete) setReady(true); // already cached
      return img;
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const opacityFor = (p: number) =>
      p < 0.12
        ? 0
        : p < 0.17
        ? ((p - 0.12) / 0.05) * 0.68
        : p < 0.85
        ? 0.68
        : 0.68 + ((p - 0.85) / 0.15) * 0.24;

    let lastP = 0;
    const draw = (p: number) => {
      lastP = p;
      canvas.style.opacity = opacityFor(p).toFixed(3);
      const idx = Math.min(FRAMES - 1, Math.max(0, Math.round(p * (FRAMES - 1))));
      const img = imgs.current[idx];
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      if (!img || !img.complete || !img.naturalWidth) return;
      const s = h * 0.96;
      const x = (w - s) / 2 + w * 0.05;
      const y = (h - s) / 2;
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.filter = "blur(7px)";
      ctx.drawImage(img, x, y, s, s);
      ctx.restore();
      ctx.save();
      ctx.filter = "none";
      ctx.drawImage(img, x, y, s, s);
      ctx.restore();
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => draw(self.progress),
      onRefresh: (self) => draw(self.progress),
    });
    draw(0);
    const onResize = () => {
      size();
      draw(lastP);
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
    />
  );
}
