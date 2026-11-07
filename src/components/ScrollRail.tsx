"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Horizontal card rail that bleeds off both edges, with the reference's thin
 * progress scrubber underneath and arrow buttons for mouse users.
 */
export function ScrollRail({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const el = track.current;
    const t = thumb.current;
    if (!el || !t) return;
    const max = el.scrollWidth - el.clientWidth;
    const visible = el.clientWidth / el.scrollWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    t.style.width = `${Math.max(visible, 0.12) * 100}%`;
    t.style.transform = `translateX(${p * (1 / Math.max(visible, 0.12) - 1) * 100}%)`;
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-1 sm:scroll-px-6 sm:px-6"
      >
        {children}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>
      <div className="mt-8 flex items-center gap-6 px-4 sm:px-6">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10 sm:mx-auto sm:max-w-md">
          <div ref={thumb} className="absolute inset-y-0 left-0 rounded-full bg-ink transition-transform duration-150" />
        </div>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => step(dir)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper",
              )}
              aria-label={dir === 1 ? "Next" : "Previous"}
            >
              {dir === 1 ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
