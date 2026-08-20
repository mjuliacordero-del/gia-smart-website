import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 72;
const framePath = (i: number) => `/thread/frame_${String(i).padStart(4, "0")}.png`;

/**
 * The Golden Thread — a Blender-rendered frame sequence scrubbed to whole-page
 * scroll. It is a fixed background layer: the thread morphs
 *   coiled (chasing) → aligned → five woven knots → doorway of light
 * as the visitor travels the enrollment journey. Prominent in the hero and at
 * the enrollment doorway; a quiet throughline in between.
 */
export function ThreadSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Preload every frame; reveal as soon as the first is decodable.
    let loaded = 0;
    images.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loaded += 1;
        if (i === 0) setReady(true);
      };
      return img;
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let shown = 0; // eased frame actually drawn
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    // Prominence of the thread across the journey: strong in the hero, a quiet
    // throughline in the middle, blooming again at the enrollment doorway.
    const opacityFor = (p: number) => {
      if (p < 0.1) return 0.9 - p * 0.6; // hero: bold
      if (p < 0.8) return 0.16; // middle: whisper
      return 0.16 + (p - 0.8) * (0.85 / 0.2); // doorway: bloom
    };

    const draw = () => {
      const p = progress();
      const target = p * (FRAME_COUNT - 1);
      shown += (target - shown) * (reduce ? 1 : 0.12);
      const idx = Math.round(shown);
      const img = images.current[idx];
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      if (img && img.complete && img.naturalWidth) {
        const size = Math.min(w * 0.82, h * 0.96);
        const x = (w - size) / 2 + w * 0.16; // nudged right of centre
        const y = (h - size) / 2;
        const alpha = opacityFor(p);

        // Soft bloom
        ctx.save();
        ctx.globalAlpha = alpha * 0.55;
        ctx.filter = "blur(7px)";
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();

        // Crisp thread
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease" }}
    />
  );
}
