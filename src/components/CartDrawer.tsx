"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { LOCATIONS } from "@/data/mockData";
import { DoughnutGraphic } from "@/components/DoughnutGraphic";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

const PICKUP_TIMES = [
  ["Today, 8:00 AM", "Today, 8:00 AM (express batch)"],
  ["Today, 8:30 AM", "Today, 8:30 AM"],
  ["Today, 9:00 AM", "Today, 9:00 AM"],
  ["Today, 10:00 AM", "Today, 10:00 AM"],
  ["Today, 11:30 AM", "Today, 11:30 AM"],
  ["Tomorrow, 7:00 AM", "Tomorrow, 7:00 AM (pre-order)"],
];

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    clearCart,
    selectedLocation,
    setSelectedLocation,
    pickupTime,
    setPickupTime,
    boxType,
    setBoxType,
    boxCapacity,
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const handleCheckout = () => {
    setOrderId(`RDC-${Math.floor(1000 + Math.random() * 9000)}`);
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    clearCart();
    closeDrawer();
  };

  const fill = boxType === "custom" ? 1 : Math.min(1, totalCount / boxCapacity);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" onClick={closeDrawer} />

      <div className="absolute inset-y-2 right-2 flex w-[calc(100%-1rem)] max-w-md flex-col overflow-hidden rounded-[22px] bg-paper">
        <div className="on-ink flex items-start justify-between bg-ink px-6 pb-6 pt-5 text-paper">
          <div>
            <h2 id="drawer-title" className="cond-xl text-[3.75rem]">
              Your box
            </h2>
            <p className="mt-1 text-[13px] text-paper/60">Pickup at {selectedLocation.name}</p>
          </div>
          <button
            onClick={closeDrawer}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 hover:bg-paper hover:text-ink"
            aria-label="Close your box"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-ink/10 px-6 py-4">
          <div className="flex gap-1.5" role="group" aria-label="Box size">
            {[
              { type: "half-dozen", label: "Half dozen" },
              { type: "dozen", label: "Dozen" },
              { type: "custom", label: "Any amount" },
            ].map((b) => (
              <button
                key={b.type}
                onClick={() => setBoxType(b.type as "half-dozen" | "dozen" | "custom")}
                aria-pressed={boxType === b.type}
                className={cn(
                  "h-8 rounded-full border px-3 text-[12px] font-medium transition-colors",
                  boxType === b.type ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
          {boxType !== "custom" && (
            <div className="mt-4">
              <div className="flex justify-between text-[12px]">
                <span>
                  {totalCount} of {boxCapacity}
                </span>
                <span className="text-graphite">
                  {totalCount >= boxCapacity ? "Box full" : `${boxCapacity - totalCount} to go`}
                </span>
              </div>
              <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full origin-left bg-ink transition-transform duration-500"
                  style={{ transform: `scaleX(${fill})`, transitionTimingFunction: "var(--ease-out)" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ ["--surface" as string]: "var(--paper)" }}>
          {items.length === 0 ? (
            <div className="py-14 text-center">
              <p className="cond text-4xl">Nothing in here yet</p>
              <p className="mx-auto mt-2 max-w-xs text-sm text-graphite">
                Add a few flavors from this month&rsquo;s menu and they&rsquo;ll show up here.
              </p>
              <Pill href="/menu" variant="ink" className="mt-6" onClick={closeDrawer}>
                Browse the menu
              </Pill>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map(({ doughnut, quantity }) => (
                <li key={doughnut.id} className="flex items-center gap-3 py-3">
                  <DoughnutGraphic
                    name={doughnut.name}
                    category={doughnut.category}
                    gradient={doughnut.gradient}
                    size="sm"
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="cond truncate text-2xl leading-tight">{doughnut.name}</p>
                    <p className="text-[12px] text-graphite">${doughnut.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-ink/20 p-0.5">
                    <button
                      onClick={() => updateQuantity(doughnut.id, quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-ink hover:text-paper"
                      aria-label={`One fewer ${doughnut.name}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-[13px] font-semibold tabular-nums">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(doughnut.id, quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-ink hover:text-paper"
                      aria-label={`One more ${doughnut.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-ink/10 bg-chalk px-6 py-5">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[12px] text-graphite">Bakery</span>
                <select
                  value={selectedLocation.id}
                  onChange={(e) => {
                    const loc = LOCATIONS.find((l) => l.id === e.target.value);
                    if (loc) setSelectedLocation(loc);
                  }}
                  className="field py-1.5 text-sm font-semibold"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.town.split(",")[0]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[12px] text-graphite">Ready time</span>
                <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="field py-1.5 text-sm font-semibold">
                  {PICKUP_TIMES.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-graphite">Subtotal, {totalCount} doughnuts</span>
              <span className="cond text-4xl tabular-nums">${subtotal.toFixed(2)}</span>
            </div>

            <Pill variant="ink" className="w-full" onClick={handleCheckout}>
              Place pickup order
            </Pill>
            <p className="text-center text-[11px] text-smoke">Demo only. No payment, no bakery is contacted.</p>
          </div>
        )}
      </div>

      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] bg-paper p-6 sm:p-8">
            <p className="text-[13px] text-graphite">Pickup order confirmed</p>
            <h3 className="cond-xl mt-2 text-[4rem]">#{orderId}</h3>
            <p className="mt-2 text-sm text-graphite">Sent to the fryer queue at {selectedLocation.name}.</p>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-sm">
              {[
                ["Bakery", selectedLocation.address],
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
              Two taps from a phone, no app download and no choosing between 14 Linktree links.
            </p>
            <Pill variant="ink" className="mt-6 w-full" onClick={handleFinish}>
              Close
            </Pill>
          </div>
        </div>
      )}
    </div>
  );
};
