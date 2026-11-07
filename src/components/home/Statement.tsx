"use client";

import React, { useRef } from "react";
import { PHOTOS } from "@/data/photos";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

function PhotoPill({ src }: { src: string }) {
  return (
    <span data-pill className="mx-[0.12em] inline-block h-[0.78em] w-[1.55em] overflow-hidden rounded-full align-[-0.06em]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${src}?w=240&q=60&auto=format&fit=crop`} alt="" className="h-full w-full object-cover" loading="lazy" />
    </span>
  );
}

/** One long sentence that inks in word by word as it scrolls past, with small photos set into the line. */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-words]", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-words]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from("[data-pill]", {
          scale: 0,
          duration: 0.7,
          ease: "back.out(2)",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-words]", start: "top 70%", once: true },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-4 py-16 sm:px-6 sm:py-28">
      <p
        data-words
        className="max-w-[22ch] text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[3.6rem] lg:text-[4.6rem]"
      >
        Four bakeries across Central Mass <PhotoPill src={PHOTOS.strip[2]} /> frying from 6:30 every morning.
        A new menu on the 1st of the month <PhotoPill src={PHOTOS.strip[3]} /> a gluten-sensitive line on vanilla
        crème cake, and pickup <PhotoPill src={PHOTOS.strip[7]} /> without an app.
      </p>
    </section>
  );
}
