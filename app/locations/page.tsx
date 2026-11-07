"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { LOCATIONS, Location } from "@/data/mockData";
import { PHOTOS } from "@/data/photos";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

// rough positions on the stylised Central Mass map (600 x 400 viewBox)
const PINS: Record<string, { x: number; y: number; label: string }> = {
  worcester: { x: 290, y: 110, label: "Worcester" },
  westborough: { x: 460, y: 175, label: "Westborough" },
  auburn: { x: 230, y: 230, label: "Auburn" },
  millbury: { x: 340, y: 262, label: "Millbury" },
};

export default function LocationsPage() {
  const [selected, setSelected] = useState<Location>(LOCATIONS[0]);

  return (
    <>
      <PageHeader
        word="Bakeries"
        title="Rocco's bakery locations and hours"
        sentence="Four bakehouses in Central Massachusetts, open Tuesday through Sunday. Every address and hour here is checked against the bakery's own order pages."
        fact="6:30"
        factLabel="first batch out of the fryer, Tuesday to Sunday"
      />

      <div className="space-y-16 px-2 py-10 sm:space-y-24 sm:px-3 sm:py-14">
        <div className="grid gap-3 md:grid-cols-2">
          {LOCATIONS.map((loc, i) => {
            const isSelected = selected.id === loc.id;
            const dark = i === 0 || i === 3;
            return (
              <article
                key={loc.id}
                className={cn(
                  "flex flex-col rounded-[22px] p-3 transition-shadow sm:flex-row",
                  dark ? "on-ink bg-ink text-paper" : "bg-mist",
                  isSelected && (dark ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : "ring-2 ring-ink"),
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] sm:aspect-auto sm:w-[44%]">
                  <Image src={PHOTOS.bakeries[loc.id]} alt="" fill sizes="(min-width: 768px) 22vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-6 sm:py-4">
                  <p className={cn("text-[13px]", dark ? "text-paper/60" : "text-graphite")}>{loc.cityStateZip}</p>
                  <h2 className="mt-1 text-[3.4rem] leading-[0.88]">{loc.town.split(",")[0]}</h2>

                  <dl className="mt-5 space-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="sr-only">Address</dt>
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <dd>{loc.address}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="sr-only">Hours</dt>
                      <Clock className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <dd>
                        {loc.hoursTime}, {loc.hoursDays}
                        <span className={cn("block", dark ? "text-paper/60" : "text-graphite")}>{loc.mondayStatus}</span>
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="sr-only">Phone</dt>
                      <Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <dd>{loc.phone}</dd>
                    </div>
                  </dl>

                  <p className={cn("mt-4 text-[13px] leading-relaxed", dark ? "text-paper/60" : "text-graphite")}>{loc.notes}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <Pill href={`/order?location=${loc.id}`} variant={dark ? "paper" : "ink"} size="sm">
                      Order pickup here
                    </Pill>
                    <Pill
                      variant={dark ? "ghost-light" : "ghost"}
                      size="sm"
                      onClick={() => setSelected(loc)}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? "Shown on map" : "Show on map"}
                    </Pill>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Stylised Central Mass map */}
        <section className="on-ink overflow-hidden rounded-[22px] bg-ink text-paper sm:rounded-frame" aria-labelledby="map-title">
          <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="map-title" className="cond-xl text-[16vw] sm:text-[6rem]">
                The corridor
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/70">
                All four bakeries sit along I-290, Route 9, Route 12 and Route 146. Tap a pin to switch stores.
              </p>
              <div className="mt-8 border-t border-paper/15 pt-5">
                <p className="text-[13px] text-paper/55">Selected</p>
                <p className="cond mt-1 text-4xl">{selected.name}</p>
                <p className="mt-1 text-sm text-paper/70">
                  {selected.address}, {selected.phone}
                </p>
                <p className="text-sm text-paper/70">
                  {selected.hoursDays}: {selected.hoursTime}
                </p>
                <Pill href={`/order?location=${selected.id}`} variant="paper" className="mt-6">
                  {`Start an order in ${selected.town.split(",")[0]}`}
                </Pill>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[16px] border border-paper/10 lg:col-span-8">
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{ backgroundImage: "radial-gradient(#ececea 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              />
              <svg className="relative h-full w-full" viewBox="0 0 600 400" role="group" aria-label="Map of the four bakeries">
                <path d="M 30 252 Q 300 240 570 228" stroke="#5a5a58" strokeWidth="3" fill="none" strokeDasharray="7 5" />
                <path d="M 80 150 Q 350 172 570 160" stroke="#5a5a58" strokeWidth="2.5" fill="none" />
                <path d="M 280 40 L 322 370" stroke="#5a5a58" strokeWidth="2.5" fill="none" />
                <text x="34" y="272" fill="#8a8a87" fontSize="11">I-90 (Mass Pike)</text>
                <text x="500" y="150" fill="#8a8a87" fontSize="11">Route 9</text>
                <text x="330" y="56" fill="#8a8a87" fontSize="11">I-290 / Rt 146</text>

                {LOCATIONS.map((loc) => {
                  const pin = PINS[loc.id];
                  const active = selected.id === loc.id;
                  return (
                    <g
                      key={loc.id}
                      transform={`translate(${pin.x}, ${pin.y})`}
                      className="cursor-pointer focus:outline-none"
                      onClick={() => setSelected(loc)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(loc)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${loc.name}`}
                      aria-pressed={active}
                    >
                      {active && <circle r="22" fill="none" stroke="#ececea" strokeOpacity="0.35" strokeWidth="1.5" />}
                      <circle r={active ? 11 : 8} fill={active ? "#ececea" : "#161616"} stroke="#ececea" strokeWidth="2" />
                      <text
                        x="18"
                        y="5"
                        fill="#ececea"
                        fontSize={active ? 17 : 14}
                        fontWeight={active ? 800 : 500}
                        style={{ fontVariationSettings: active ? "'wdth' 62" : "'wdth' 100" }}
                      >
                        {pin.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>

        <p className="px-2 text-[13px] leading-relaxed text-graphite sm:px-3">
          Fixed in this demo: the old Square store&rsquo;s locations page still showed template text (&ldquo;Square Inc,
          Market Street, San Francisco&rdquo;). Here every bakery has its real address, hours and a direct pickup link.
        </p>
      </div>
    </>
  );
}
