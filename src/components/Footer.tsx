"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { LOCATIONS, SOCIAL_HUBS, BRAND_DATA } from "@/data/mockData";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export const Footer: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-wordmark]",
          { yPercent: 60 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const col = "space-y-2 text-[13px]";
  const head = "mb-3 text-[13px] text-paper/45";
  const link = "text-paper/85 transition-colors hover:text-paper hover:underline underline-offset-4";

  return (
    <footer ref={root} className="on-ink overflow-hidden bg-ink text-paper">
      <div className="grid gap-10 px-4 pt-14 sm:px-6 xl:grid-cols-12 xl:pt-16">
        <div className="min-w-0 overflow-hidden xl:col-span-6">
          <div data-wordmark className="cond-xl text-[34vw] leading-[0.8] xl:text-[17vw]" aria-hidden="true">
            Rocco&rsquo;s
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 xl:col-span-6 xl:pt-3">
          <div>
            <p className={head}>Pages</p>
            <ul className={col}>
              <li><Link className={link} href="/menu">Menu</Link></li>
              <li><Link className={link} href="/order">Order pickup</Link></li>
              <li><Link className={link} href="/locations">Bakeries</Link></li>
              <li><Link className={link} href="/dashboard">Owner dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className={head}>Channels</p>
            <ul className={col}>
              {SOCIAL_HUBS.map((hub) => (
                <li key={hub.id}>
                  <a className={link} href={hub.url} target="_blank" rel="noopener noreferrer">
                    {hub.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <p className={head}>Bakeries, Tuesday to Sunday</p>
            <ul className="grid grid-cols-1 gap-3 text-[13px] sm:grid-cols-2">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <span className="block font-semibold">{loc.town.split(",")[0]}</span>
                  <span className="block text-paper/60">{loc.address}</span>
                  <span className="block text-paper/60">{loc.hoursTime}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-paper/15 px-4 py-6 text-[12px] text-paper/50 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p>
          &copy; {BRAND_DATA.foundedYear}&ndash;2026 {BRAND_DATA.legalName}. Sales concept demo: menu names, hours and
          addresses are real; prices and orders are simulated.
        </p>
        <p>
          Photos from{" "}
          <a className="underline underline-offset-4 hover:text-paper" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
          , standing in for the bakery&rsquo;s own.
        </p>
      </div>
    </footer>
  );
};
