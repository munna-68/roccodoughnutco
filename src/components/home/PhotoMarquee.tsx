import React from "react";
import { PHOTOS } from "@/data/photos";

/** Endless strip of rounded photos (CSS only; stops under reduced motion). */
export function PhotoMarquee() {
  const strip = [...PHOTOS.strip, ...PHOTOS.strip];
  return (
    <section className="overflow-hidden py-16 sm:py-24" aria-label="Doughnuts from the fryer">
      <div className="flex w-max animate-marquee gap-3 sm:gap-4">
        {strip.map((src, i) => (
          <div
            key={i}
            className={`shrink-0 overflow-hidden rounded-[18px] ${i % 3 === 1 ? "h-56 w-44 sm:h-80 sm:w-60" : "h-56 w-72 sm:h-80 sm:w-[26rem]"}`}
            aria-hidden={i >= PHOTOS.strip.length}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${src}?w=720&q=60&auto=format&fit=crop`} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
