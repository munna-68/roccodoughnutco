"use client";

import React, { useId, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Circular text badge that turns as the page scrolls. */
export function Stamp({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  const r = 38;
  const circumference = 2 * Math.PI * r;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to("[data-spin]", {
          rotation: 360,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <g data-spin style={{ transformOrigin: "50px 50px" }}>
          <defs>
            <path id={id} d={`M50,50 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
          </defs>
          <text fill="currentColor" style={{ fontSize: 9.2, fontWeight: 700, fontVariationSettings: "'wdth' 100" }}>
            <textPath href={`#${id}`} textLength={circumference - 2} lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </g>
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="7" />
      </svg>
    </div>
  );
}
