"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { GLUTEN_SENSITIVE_NOTICE, MENU_ITEMS } from "@/data/mockData";
import { PHOTOS } from "@/data/photos";
import { Pill } from "@/components/ui/Pill";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function GlutenPanel() {
  const root = useRef<HTMLElement>(null);
  const gs = MENU_ITEMS.filter((i) => i.category === "gluten-sensitive");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-2 sm:px-3" aria-labelledby="gs-title">
      <div className="on-ink grid overflow-hidden rounded-[22px] bg-ink text-paper sm:rounded-frame lg:grid-cols-2">
        <div className="flex flex-col p-6 sm:p-10 lg:p-14">
          <p className="text-sm text-paper/60">The gluten-sensitive collection</p>
          <h2 id="gs-title" className="cond-xl mt-4 text-[20vw] sm:text-[8rem] lg:text-[9.5rem]">
            Skip
            <br />
            the pain
          </h2>
          <p className="mt-6 max-w-[30rem] text-[15px] leading-relaxed text-paper/80 sm:text-base">
            {GLUTEN_SENSITIVE_NOTICE.story}
          </p>

          <ul className="mt-8 border-t border-paper/15">
            {gs.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-4 border-b border-paper/15 py-3">
                <span className="cond text-2xl">{item.name.replace(/^GS /, "")}</span>
                <span className="text-sm tabular-nums text-paper/60">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[34rem] text-[12px] leading-relaxed text-paper/50">
            {GLUTEN_SENSITIVE_NOTICE.allergenDisclaimer}
          </p>
          <div className="mt-8">
            <Pill href="/menu?category=gluten-sensitive" variant="paper">
              Browse the collection
            </Pill>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
          <div data-parallax className="absolute -inset-y-[10%] inset-x-0">
            <Image
              src={PHOTOS.gluten}
              alt="A sprinkled doughnut dropping into a basket of fresh doughnuts"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
