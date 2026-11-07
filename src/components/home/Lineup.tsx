"use client";

import React, { useRef } from "react";
import { MENU_ITEMS } from "@/data/mockData";
import { DoughnutCard } from "@/components/DoughnutCard";
import { Pill } from "@/components/ui/Pill";
import { ScrollRail } from "@/components/ScrollRail";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function Lineup() {
  const root = useRef<HTMLElement>(null);
  const featured = MENU_ITEMS.filter((i) => i.featured);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-card]", {
          xPercent: 35,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-14 sm:py-20" aria-labelledby="lineup-title">
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
        <h2 id="lineup-title" className="cond-xl text-[15vw] sm:text-[7.5rem]">
          On the counter
        </h2>
        <div className="flex items-center gap-5 pb-2">
          <p className="hidden max-w-[17rem] text-sm text-graphite lg:block">
            The November lineup. Signatures stay, specials rotate on the 1st.
          </p>
          <Pill href="/menu" variant="ghost">
            Full menu
          </Pill>
        </div>
      </div>

      <ScrollRail label="This month's featured doughnuts" className="mt-8 sm:mt-10">
        {featured.map((item) => (
          <div key={item.id} data-card className="w-[80vw] shrink-0 snap-start sm:w-[360px] lg:w-[380px]">
            <DoughnutCard item={item} className="h-full" />
          </div>
        ))}
      </ScrollRail>
    </section>
  );
}
