"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { LOCATIONS, MENU_ITEMS, MenuItem } from "@/data/mockData";
import { DoughnutGraphic } from "@/components/DoughnutGraphic";
import { PageHeader } from "@/components/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

const PICKUP_TIMES = [
  { value: "Today, 8:00 AM", label: "Today, 8:00 AM (express batch)" },
  { value: "Today, 8:30 AM", label: "Today, 8:30 AM" },
  { value: "Today, 9:00 AM", label: "Today, 9:00 AM" },
  { value: "Today, 10:00 AM", label: "Today, 10:00 AM" },
  { value: "Today, 11:30 AM", label: "Today, 11:30 AM" },
  { value: "Tomorrow, 7:00 AM", label: "Tomorrow, 7:00 AM (pre-order)" },
];

const BOX_TYPES = [
  { type: "half-dozen" as const, label: "Half dozen", sub: "6" },
  { type: "dozen" as const, label: "Baker's dozen", sub: "12" },
  { type: "custom" as const, label: "Custom mix", sub: "Any" },
];

function Step({ n, title, aside, children }: { n: number; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`} className="border-t border-ink/15 pt-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id={`step-${n}`} className="cond-xl flex items-baseline gap-4 text-[11vw] sm:text-[4.75rem]">
          <span className="text-[0.5em] text-smoke tabular-nums">{n}</span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function OrderPickupContent() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location");

  const {
    items,
    addItem,
    removeOne,
    clearCart,
    totalCount,
    subtotal,
    selectedLocation,
    setSelectedLocation,
    pickupTime,
    setPickupTime,
    boxType,
    setBoxType,
    boxCapacity,
  } = useCart();

  useEffect(() => {
    if (locationParam) {
      const matched = LOCATIONS.find((l) => l.id === locationParam);
      if (matched) setSelectedLocation(matched);
    }
  }, [locationParam, setSelectedLocation]);

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setConfirmedOrderId(`RDC-${Math.floor(1000 + Math.random() * 9000)}`);
    setOrderConfirmed(true);
  };

  const resetAll = () => {
    setOrderConfirmed(false);
    clearCart();
  };

  const flattened: MenuItem[] = [];
  items.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) flattened.push(item.doughnut);
  });

  const totalSlots = boxCapacity === 999 ? Math.max(flattened.length, 6) : Math.max(boxCapacity, flattened.length);
  const slots = Array.from({ length: totalSlots });

  return (
    <>
      <PageHeader
        word="Pickup"
        title="Build a pickup box"
        sentence="Pick a bakery, fill a box with today's flavors and skip the line. No app, no account."
        fact="2 taps"
        factLabel="from flavor to confirmed order"
      />

      <div className="space-y-16 px-4 py-10 sm:space-y-20 sm:px-6 sm:py-14">
        {/* 1. Location */}
        <Step
          n={1}
          title="Choose a bakery"
          aside={<span className="text-[13px] text-graphite">Picking up at {selectedLocation.name}</span>}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LOCATIONS.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative flex flex-col rounded-[20px] p-5 text-left transition-colors",
                    isSelected ? "on-ink bg-ink text-paper" : "bg-chalk hover:bg-mist",
                  )}
                >
                  <span
                    className={cn(
                      "absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border",
                      isSelected ? "border-paper bg-paper text-ink" : "border-ink/25",
                    )}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  <span className="cond text-4xl leading-none">{loc.town.split(",")[0]}</span>
                  <span className={cn("mt-3 text-[13px]", isSelected ? "text-paper/70" : "text-graphite")}>{loc.address}</span>
                  <span className={cn("text-[13px]", isSelected ? "text-paper/70" : "text-graphite")}>
                    {loc.hoursTime}, {loc.hoursDays}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        {/* 2. Box */}
        <Step
          n={2}
          title="Pack your box"
          aside={
            <div className="flex rounded-full border border-ink/20 p-1" role="group" aria-label="Box size">
              {BOX_TYPES.map((b) => (
                <button
                  key={b.type}
                  onClick={() => setBoxType(b.type)}
                  aria-pressed={boxType === b.type}
                  className={cn(
                    "h-9 rounded-full px-3.5 text-[13px] font-medium transition-colors sm:px-4",
                    boxType === b.type ? "bg-ink text-paper" : "hover:bg-ink/5",
                  )}
                >
                  {b.label} <span className="opacity-60">{b.sub}</span>
                </button>
              ))}
            </div>
          }
        >
          <div className="rounded-[22px] bg-mist p-4 sm:p-8" style={{ ["--surface" as string]: "var(--chalk)" }}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm">
                <span className="font-semibold tabular-nums">{totalCount}</span>
                <span className="text-graphite"> of {boxCapacity === 999 ? "any number" : boxCapacity} filled</span>
              </p>
              {items.length > 0 && (
                <button onClick={clearCart} className="text-[13px] font-semibold underline-offset-4 hover:underline">
                  Empty the box
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
              {slots.map((_, idx) => {
                const doughnut = flattened[idx];
                const overflow = boxType !== "custom" && idx >= boxCapacity;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-center rounded-[16px] p-2 text-center",
                      doughnut ? "bg-chalk" : "border-[1.5px] border-dashed border-ink/25",
                      overflow && "ring-1 ring-ink",
                    )}
                  >
                    {overflow && doughnut && (
                      <span className="absolute left-2 top-2 rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-bold text-paper">Box 2</span>
                    )}
                    {doughnut ? (
                      <>
                        <button
                          onClick={() => removeOne(doughnut.id)}
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full hover:bg-ink hover:text-paper"
                          aria-label={`Remove one ${doughnut.name}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <DoughnutGraphic name={doughnut.name} category={doughnut.category} gradient={doughnut.gradient} size="sm" />
                        <span className="mt-1.5 w-full truncate px-1 text-[11px] font-semibold">{doughnut.name}</span>
                      </>
                    ) : (
                      <span className="text-[11px] text-smoke">{idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {boxType === "half-dozen" && totalCount >= 6 && (
              <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-[16px] bg-chalk p-4 sm:flex-row sm:items-center">
                <p className="text-sm">
                  <span className="font-semibold">Half dozen is full.</span>{" "}
                  <span className="text-graphite">
                    {totalCount > 6
                      ? `${totalCount - 6} more ${totalCount - 6 > 1 ? "are" : "is"} going into a second box. A baker's dozen fits 12 in one.`
                      : "Want six more? Switch to a baker's dozen."}
                  </span>
                </p>
                <Pill variant="ink" size="sm" onClick={() => setBoxType("dozen")}>
                  Switch to a baker&rsquo;s dozen
                </Pill>
              </div>
            )}
            {boxType === "dozen" && totalCount >= 12 && (
              <p className="mt-5 rounded-[16px] bg-chalk p-4 text-sm">
                <span className="font-semibold">Baker&rsquo;s dozen is full.</span>{" "}
                <span className="text-graphite">
                  {totalCount > 12 ? "Extras go into a second box. " : ""}Pick a pickup time below.
                </span>
              </p>
            )}
          </div>
        </Step>

        {/* 3. Flavors */}
        <Step n={3} title="Add flavors" aside={<span className="text-[13px] text-graphite">{MENU_ITEMS.length} on today</span>}>
          <ul className="grid grid-cols-1 gap-x-8 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3" style={{ ["--surface" as string]: "var(--paper)" }}>
            {MENU_ITEMS.map((item) => {
              const added = justAddedId === item.id;
              return (
                <li key={item.id} className="flex items-center gap-4 border-b border-ink/10 py-3">
                  <DoughnutGraphic name={item.name} category={item.category} gradient={item.gradient} size="sm" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="cond truncate text-2xl leading-tight">{item.name}</p>
                    <p className="text-[12px] text-graphite">
                      {item.categoryLabel}, <span className="tabular-nums">${item.price.toFixed(2)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      addItem(item, false);
                      setJustAddedId(item.id);
                      setTimeout(() => setJustAddedId(null), 1000);
                    }}
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors",
                      added ? "border-ink bg-ink text-paper" : "border-ink/25 hover:bg-ink hover:text-paper",
                    )}
                    aria-label={`Add ${item.name} to your box`}
                  >
                    {added ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Plus className="h-4 w-4" strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Step>

        {/* 4. Review */}
        <Step n={4} title="Pickup and review">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[20px] bg-chalk p-5">
              <p className="text-[13px] text-graphite">Pickup counter</p>
              <p className="cond mt-1 text-3xl">{selectedLocation.name}</p>
              <p className="mt-2 text-sm text-graphite">{selectedLocation.address}</p>
              <p className="text-sm text-graphite">
                {selectedLocation.phone}, open {selectedLocation.hoursTime}
              </p>
            </div>

            <label className="block rounded-[20px] bg-chalk p-5">
              <span className="text-[13px] text-graphite">Ready time</span>
              <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="field mt-1 text-base font-semibold">
                {PICKUP_TIMES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="mt-3 block text-[12px] text-smoke">Boxed fresh within 15 minutes of your time.</span>
            </label>

            <div className="on-ink flex flex-col justify-between gap-5 rounded-[20px] bg-ink p-5 text-paper">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-paper/60">Total, {totalCount} doughnuts</span>
                <span className="cond text-5xl tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div>
                <Pill variant="paper" className="w-full" onClick={handlePlaceOrder} disabled={items.length === 0}>
                  Confirm pickup order
                </Pill>
                <p className="mt-3 text-center text-[11px] text-paper/50">Demo only. No order is sent and nothing is charged.</p>
              </div>
            </div>
          </div>
        </Step>
      </div>

      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="w-full max-w-lg rounded-[24px] bg-paper p-6 sm:p-8">
            <p className="text-[13px] text-graphite">Order received</p>
            <h3 id="confirm-title" className="cond-xl mt-2 text-[4.5rem]">
              #{confirmedOrderId}
            </h3>
            <p className="mt-2 text-sm text-graphite">Sent to the counter at {selectedLocation.name}.</p>

            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-sm">
              {[
                ["Bakery", `${selectedLocation.town.split(",")[0]}, ${selectedLocation.address}`],
                ["Ready", pickupTime],
                ["Box", `${totalCount} doughnuts`],
                ["Total", `$${subtotal.toFixed(2)} (demo)`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-2.5">
                  <dt className="text-graphite">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[13px] leading-relaxed text-graphite">
              Instead of bouncing between Instagram, Linktree, DoorDash and an app download, this customer saw the menu,
              picked a store and booked a box in under 30 seconds.
            </p>

            <Pill variant="ink" className="mt-6 w-full" onClick={resetAll}>
              Done, start a new box
            </Pill>
          </div>
        </div>
      )}
    </>
  );
}

export default function OrderPickupPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading the box builder</div>}>
      <OrderPickupContent />
    </Suspense>
  );
}
