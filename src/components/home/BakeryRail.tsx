"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { LOCATIONS } from "@/data/mockData";
import { PHOTOS } from "@/data/photos";
import { ScrollRail } from "@/components/ScrollRail";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

/** The four bakeries as alternating ink / mist cards, like the reference's recipe rail. */
export function BakeryRail() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="bakeries-title">
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
        <h2 id="bakeries-title" className="cond-xl text-[15vw] sm:text-[7.5rem]">
          Four bakeries
        </h2>
        <Pill href="/locations" variant="ghost" className="mb-2">
          Hours and maps
        </Pill>
      </div>

      <ScrollRail label="Bakery locations" className="mt-8 sm:mt-10">
        {LOCATIONS.map((loc, i) => {
          const dark = i % 2 === 0;
          return (
            <Link
              key={loc.id}
              href={`/order?location=${loc.id}`}
              className={cn(
                "group flex w-[82vw] shrink-0 snap-start flex-col rounded-[22px] p-3 sm:w-[400px]",
                dark ? "on-ink bg-ink text-paper" : "bg-mist text-ink",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
                <Image
                  src={PHOTOS.bakeries[loc.id]}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 400px, 82vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                />
              </div>
              <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                <h3 className="text-[2.6rem] leading-[0.9]">{loc.town.split(",")[0]}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-paper/70" : "text-graphite")}>
                  {loc.notes}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5 text-[12px]">
                  {[
                    { icon: <MapPin className="h-3.5 w-3.5" />, text: loc.address },
                    { icon: <Clock className="h-3.5 w-3.5" />, text: loc.hoursTime },
                  ].map((chip) => (
                    <span
                      key={chip.text}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
                        dark ? "bg-paper text-ink" : "bg-ink text-paper",
                      )}
                    >
                      {chip.icon}
                      {chip.text}
                    </span>
                  ))}
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-1",
                      dark ? "border-paper/30" : "border-ink/25",
                    )}
                  >
                    {loc.mondayStatus}
                  </span>
                </div>
                <span className={cn("mt-5 text-sm font-semibold underline-offset-4 group-hover:underline")}>
                  Order pickup in {loc.town.split(",")[0]}
                </span>
              </div>
            </Link>
          );
        })}
      </ScrollRail>
    </section>
  );
}
