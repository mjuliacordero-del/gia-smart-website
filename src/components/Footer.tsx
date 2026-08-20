import { footer, nav } from "../content";
import { scrollToId } from "../lib/useSmoothScroll";
import { Wordmark } from "./primitives";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[34ch] font-editorial text-xl italic text-fg/70">
              A clean, love-led enrollment system for high-level women leaders.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="font-body text-sm font-medium text-fg/70 transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="font-bold text-fg">
              {footer.wordmark}
              {footer.tm}
            </strong>{" "}
            · {footer.line}
          </p>
          <p className="font-body text-[0.72rem] uppercase tracking-[0.2em] text-accent-secondary">
            {footer.authority}
          </p>
        </div>
      </div>
    </footer>
  );
}
