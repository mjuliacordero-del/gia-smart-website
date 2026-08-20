import { useEffect, useState } from "react";

/**
 * Editorial portrait with a resilient source chain:
 *   src  →  fallbackSrc (a photo we know exists)  →  branded placeholder.
 *
 * Vite's dev server answers missing /public files with the SPA index.html
 * (status 200, text/html), so a missing portrait still fails to decode as an
 * image and triggers onError — which advances the chain. Drop the real files
 * into /public/gia and each slot upgrades to its own shot automatically.
 */
export function Portrait({
  src,
  alt,
  className = "",
  label,
  objectPosition = "center 20%",
  fallbackSrc = "gia/gia-denim.jpg",
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  objectPosition?: string;
  fallbackSrc?: string;
}) {
  // Build the chain, skipping a fallback identical to src.
  const chain = fallbackSrc && fallbackSrc !== src ? [src, fallbackSrc] : [src];
  const [idx, setIdx] = useState(0);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    setIdx(0);
    setDead(false);
  }, [src]);

  const current = chain[idx];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!dead ? (
        <img
          key={current}
          src={current}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={() => {
            if (idx < chain.length - 1) setIdx(idx + 1);
            else setDead(true);
          }}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center text-center"
          style={{ background: "linear-gradient(155deg,#e7e3d6 0%,#d8d3c0 48%,#cdd4d3 100%)" }}
          aria-label={alt}
        >
          <span className="font-editorial text-3xl italic text-fg/45">Gia Smart</span>
          {label && (
            <span className="mt-2 max-w-[22ch] px-4 font-body text-[0.62rem] uppercase tracking-[0.22em] text-fg/40">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
