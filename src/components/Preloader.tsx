"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, PRELOADER_DONE } from "@/lib/gsap";

const WORD = "ROCCO’S";
const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-archivo), 'Arial Narrow', sans-serif",
  fontVariationSettings: "'wdth' 62",
  fontWeight: 850,
};

/**
 * First-visit preloader that turns into the hero.
 * An ink cover with the word cut out of it (an SVG mask): the hero photo sits
 * behind, so the letters fill with the photo bottom-up while the counter runs,
 * then the mask dives into the stem of the R until the photo *is* the page.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;
      const announce = () => window.dispatchEvent(new Event(PRELOADER_DONE));
      const finish = () => {
        try {
          sessionStorage.setItem("rdc-preloaded", "1");
        } catch {}
        html.classList.add("preloaded");
        document.body.style.overflow = "";
      };

      if (html.classList.contains("preloaded")) {
        announce();
        return;
      }

      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);

      const svg = el.querySelector("svg") as SVGSVGElement;
      const text = el.querySelector("#pl-text") as SVGTextElement;
      const outline = el.querySelector("#pl-outline") as SVGTextElement;
      const group = el.querySelector("#pl-group") as SVGGElement;
      const cover = el.querySelector("#pl-cover") as SVGRectElement;
      const stops = el.querySelectorAll("#pl-fill stop");
      const counter = el.querySelector("[data-counter]") as HTMLElement;
      const labels = el.querySelectorAll("[data-label]");

      let cancelled = false;
      let tl: gsap.core.Timeline | null = null;

      const run = async () => {
        try {
          await document.fonts.ready;
        } catch {}
        if (cancelled) return;

        const w = window.innerWidth;
        const h = window.innerHeight;
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

        // size the word to ~86% of the viewport width (capped by height)
        [text, outline].forEach((t) => t.setAttribute("font-size", "100"));
        const len100 = text.getComputedTextLength() || 300;
        let fs = (100 * w * 0.86) / len100;
        fs = Math.min(fs, (h * 0.58) / 0.72);
        const baseline = h / 2 + fs * 0.36;
        [text, outline].forEach((t) => {
          t.setAttribute("font-size", fs.toFixed(1));
          t.setAttribute("x", String(w / 2));
          t.setAttribute("y", baseline.toFixed(1));
        });

        // measure one frame after the font-size change
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        if (cancelled) return;

        let sx = w / 2 - (len100 * fs) / 200 + fs * 0.11;
        let sy = baseline - fs * 0.3;
        try {
          const ext = text.getExtentOfChar(0);
          sx = ext.x + fs * 0.11; // centre of the R's vertical stem
          sy = ext.y + ext.height * 0.62;
        } catch {}

        let dash = 2400;
        try {
          dash = Math.ceil(outline.getComputedTextLength() * 6);
        } catch {}
        gsap.set(outline, { strokeDasharray: dash, strokeDashoffset: dash, opacity: 1 });

        const state = { v: 0 };
        const fillDur = 1.7;
        const diveAt = fillDur + 0.15;
        const diveDur = 0.95;

        tl = gsap.timeline({
          onComplete: () => {
            gsap.set(el, { display: "none" });
            finish();
          },
        });
        tl.to(
          state,
          {
            v: 100,
            duration: fillDur,
            ease: "power2.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(state.v)).padStart(3, "0");
            },
          },
          0,
        )
          .to(stops, { attr: { offset: 1 }, duration: fillDur, ease: "power2.inOut" }, 0)
          .to(outline, { strokeDashoffset: 0, duration: fillDur - 0.2, ease: "power1.inOut" }, 0)
          .to([outline, ...Array.from(labels)], { autoAlpha: 0, duration: 0.3 }, fillDur)
          .to(group, { scale: 72, svgOrigin: `${sx} ${sy}`, duration: diveDur, ease: "expo.in" }, diveAt)
          .to(cover, { opacity: 0, duration: 0.4, ease: "power1.in" }, diveAt + diveDur - 0.4)
          .call(announce, [], diveAt + diveDur - 0.6);
      };

      run().catch(() => {
        gsap.set(el, { display: "none" });
        finish();
        announce();
      });

      return () => {
        cancelled = true;
        tl?.kill();
        document.body.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] text-paper" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pl-fill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0" stopColor="#fff" />
          </linearGradient>
          <mask id="pl-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <g id="pl-group">
              <text id="pl-text" textAnchor="middle" fill="url(#pl-fill)" style={textStyle}>
                {WORD}
              </text>
            </g>
          </mask>
        </defs>
        <rect id="pl-cover" width="100%" height="100%" fill="#161616" mask="url(#pl-mask)" />
        <text
          id="pl-outline"
          textAnchor="middle"
          fill="none"
          stroke="rgba(236,236,234,0.55)"
          strokeWidth="1"
          opacity="0"
          style={textStyle}
        >
          {WORD}
        </text>
      </svg>

      <div data-label className="absolute left-4 top-5 text-[13px] font-medium sm:left-6">
        Rocco&rsquo;s Doughnut Co.
      </div>
      <div data-label className="absolute right-4 top-5 text-[13px] font-medium sm:right-6">
        Slingin&rsquo; since 2018
      </div>
      <div data-label className="absolute bottom-6 left-4 max-w-[14rem] text-[13px] text-paper/70 sm:left-6 sm:max-w-none">
        Auburn, Worcester, Westborough, Millbury
      </div>
      <div
        data-label
        data-counter
        className="cond absolute bottom-3 right-4 text-[3.5rem] leading-none tabular-nums sm:right-6 sm:text-[5rem]"
      >
        000
      </div>
    </div>
  );
}
