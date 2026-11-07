"use client";

import React, { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { MenuItem } from "@/data/mockData";
import { DoughnutGraphic } from "@/components/DoughnutGraphic";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

/** Product card in the reference's language: pale card, floating cut-out, sticker, condensed name. */
export function DoughnutCard({ item, className }: { item: MenuItem; className?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const sticker = item.seasonal ? "New!" : item.category === "gluten-sensitive" ? "Gluten sensitive" : null;

  return (
    <article
      className={cn("group relative flex flex-col rounded-[22px] bg-chalk p-6 sm:p-7", className)}
      style={{ ["--surface" as string]: "var(--chalk)" }}
    >
      <div className="flex items-start justify-between text-[13px] text-smoke">
        <span>{item.categoryLabel}</span>
        <span className="font-semibold tabular-nums text-ink">${item.price.toFixed(2)}</span>
      </div>

      <div className="flex flex-1 items-center justify-center py-8">
        <DoughnutGraphic name={item.name} category={item.category} gradient={item.gradient} image={item.image} size="lg" />
      </div>

      <div>
        {sticker && <span className="sticker mb-2">{sticker}</span>}
        <h3 className="text-[2.1rem] leading-[0.92]">{item.name}</h3>
        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-graphite">{item.description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="truncate rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] text-graphite">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            addItem(item, false);
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          className={cn(
            "flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-colors",
            added ? "bg-paper text-ink ring-1 ring-ink" : "bg-ink text-paper hover:bg-graphite",
          )}
          aria-label={`Add ${item.name} to your box`}
        >
          {added ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />}
          {added ? "In your box" : "Add"}
        </button>
      </div>
    </article>
  );
}
