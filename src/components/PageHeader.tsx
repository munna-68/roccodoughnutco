"use client";

import React, { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, MOTION_REDUCED } from "@/lib/gsap";

/**
 * Shared opening for inner pages: the nav's ink band continues into one giant
 * word, with a sentence on the left and a single fact on the right.
 */
export function PageHeader({
  word,
  title,
  sentence,
  fact,
  factLabel,
}: {
  word: string;
  /** full accessible page title, if the giant word alone isn't enough */
  title?: string;
  sentence: React.ReactNode;
  fact: React.ReactNode;
  factLabel: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_REDUCED, () => gsap.set("[data-reveal]", { visibility: "visible" }));
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-word]", { type: "chars", mask: "chars" });
        gsap.set("[data-reveal]", { visibility: "visible" });
        const tl = gsap.timeline();
        tl.from(split.chars, { yPercent: 108, duration: 1.1, ease: "expo.out", stagger: 0.045 })
          .from("[data-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.1, ease: "expo.out" }, 0.15)
          .from("[data-fade]", { autoAlpha: 0, y: 16, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.35);
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="on-ink bg-ink px-4 pb-10 pt-4 text-paper sm:px-6 sm:pb-14">
      <h1 data-reveal className="cond-xl -ml-[0.03em] text-[30vw] leading-[0.82] md:text-[17vw]">
        {title && <span className="sr-only">{title}: </span>}
        <span data-word className="block">
          {word}
        </span>
      </h1>
      <div className="relative mt-6 grid items-end gap-6 pt-5 md:grid-cols-12">
        <div data-rule className="absolute inset-x-0 top-0 h-px bg-paper/20" />
        <p data-fade data-reveal className="max-w-[34rem] text-[15px] leading-relaxed text-paper/80 sm:text-base md:col-span-7">
          {sentence}
        </p>
        <div data-fade data-reveal className="flex items-baseline gap-3 md:col-span-5 md:justify-end">
          <span className="cond text-5xl leading-none sm:text-6xl">{fact}</span>
          <span className="max-w-[10rem] text-[13px] leading-snug text-paper/60">{factLabel}</span>
        </div>
      </div>
    </section>
  );
}
