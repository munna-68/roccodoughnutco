"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS, MENU_CATEGORIES, GLUTEN_SENSITIVE_NOTICE, MenuItem } from "@/data/mockData";
import { PageHeader } from "@/components/PageHeader";
import { DoughnutCard } from "@/components/DoughnutCard";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const { openDrawer, totalCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && MENU_CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const categoryGroups = useMemo(() => {
    const groups: { category: string; label: string; items: MenuItem[] }[] = [];
    MENU_CATEGORIES.forEach((cat) => {
      if (cat.id === "all") return;
      const itemsInCat = filteredItems.filter((i) => i.category === cat.id);
      if (itemsInCat.length > 0) groups.push({ category: cat.id, label: cat.label, items: itemsInCat });
    });
    return groups;
  }, [filteredItems]);

  return (
    <>
      <PageHeader
        word="Menu"
        title="This month's doughnut menu"
        sentence="Fried fresh every morning from 6:30 in Auburn, Worcester, Westborough and Millbury. Signatures stay; specials rotate on the 1st of every month."
        fact={MENU_ITEMS.length}
        factLabel="flavors on the November menu"
      />

      <div className="px-4 py-10 sm:px-6 sm:py-14">
        {/* Filters — not sticky, so they never fight the nav */}
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] font-medium transition-colors",
                    isSelected ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-end gap-6">
            <label className="relative w-full lg:w-72">
              <span className="sr-only">Search flavors</span>
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Homer, Oreo, apple..."
                className="field pl-7 text-[15px]"
              />
            </label>
            <button onClick={openDrawer} className="shrink-0 pb-2.5 text-[13px] font-semibold underline-offset-4 hover:underline">
              Your box ({totalCount})
            </button>
          </div>
        </div>

        <p className="mt-4 text-[13px] text-smoke" aria-live="polite">
          Showing {filteredItems.length} {filteredItems.length === 1 ? "flavor" : "flavors"}
        </p>

        {filteredItems.length === 0 ? (
          <div className="mt-10 rounded-[22px] bg-chalk px-6 py-20 text-center">
            <h2 className="text-5xl">Nothing matches &ldquo;{searchQuery}&rdquo;</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-graphite">
              Try a flavor word like chocolate or maple, or show the full lineup.
            </p>
            <Pill
              variant="ink"
              className="mt-6"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Show the full lineup
            </Pill>
          </div>
        ) : (
          <div className="mt-8 space-y-16">
            {categoryGroups.map((group) => (
              <section key={group.category} aria-labelledby={`cat-${group.category}`}>
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <h2 id={`cat-${group.category}`} className="cond-xl text-[13vw] sm:text-[5.5rem]">
                    {group.label}
                  </h2>
                  <span className="text-[13px] text-smoke">{group.items.length} flavors</span>
                </div>

                {group.category === "gluten-sensitive" && (
                  <div className="mb-6 grid gap-4 rounded-[22px] bg-mist p-6 sm:p-8 md:grid-cols-2">
                    <p className="text-[15px] leading-relaxed">{GLUTEN_SENSITIVE_NOTICE.story}</p>
                    <p className="text-[12px] leading-relaxed text-graphite">{GLUTEN_SENSITIVE_NOTICE.allergenDisclaimer}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {group.items.map((item) => (
                    <DoughnutCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <p className="mt-16 border-t border-ink/15 pt-6 text-[12px] text-smoke">
          Doughnut names, flavor descriptions, allergen statements and categories come from Rocco&rsquo;s own channels.
          Prices and ordering are simulated for this demo.
        </p>
      </div>
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading the menu</div>}>
      <MenuContent />
    </Suspense>
  );
}
