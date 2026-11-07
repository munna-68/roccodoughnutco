"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { PHOTOS } from "@/data/photos";
import { Pill } from "@/components/ui/Pill";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Big rounded photo panel with the headline set in ink on the bright side of the photo. */
export function DailyPanel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const st = { trigger: root.current, start: "top 85%", end: "top 15%", scrub: true };
        gsap.fromTo(
          "[data-frame]",
          { clipPath: "inset(14% 10% 14% 10% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none", scrollTrigger: st },
        );
        gsap.fromTo("[data-frame-img]", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-2 sm:px-3">
      <div data-frame className="relative min-h-[640px] overflow-hidden rounded-[22px] bg-chalk sm:rounded-frame md:min-h-[min(88vh,820px)]">
        <div data-frame-img className="absolute inset-0">
          <Image
            src={PHOTOS.daily}
            alt="A stack of glazed and sprinkled doughnuts on a white counter"
            fill
            sizes="100vw"
            className="object-cover object-[80%_50%] md:object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-chalk via-chalk/80 to-transparent md:via-chalk/55" />

        <div className="relative flex min-h-[inherit] flex-col justify-center p-6 sm:p-10 lg:p-14">
          <h2 className="cond-xl text-[22vw] md:text-[11vw]">
            Giant,
            <br />
            and daily
          </h2>
          <p className="mt-6 max-w-[27rem] text-[15px] leading-relaxed text-graphite sm:text-base">
            Every ring is cut, fried and glazed by hand the morning you eat it. Signatures like The Homer and Boston
            Cream stay put; the specials case turns over on the 1st of every month.
          </p>
          <div className="mt-7">
            <Pill href="/menu" variant="ink">
              See this month&rsquo;s menu
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
