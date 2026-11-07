import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_HUBS } from "@/data/mockData";

/** Replaces the 14-button Linktree: every official channel as one big row. */
export function Channels() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24" aria-labelledby="channels-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="channels-title" className="cond-xl text-[15vw] sm:text-[6rem]">
            Elsewhere
          </h2>
          <p className="mt-4 max-w-[22rem] text-[15px] leading-relaxed text-graphite">
            Glaze pours on TikTok, flavor polls on Facebook, and yes, the bakery has an EP. Placeholder links for the
            demo.
          </p>
        </div>
        <ul className="border-t border-ink/15 lg:col-span-8">
          {SOCIAL_HUBS.map((hub) => (
            <li key={hub.id} className="border-b border-ink/15">
              <a
                href={hub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <span className="cond text-[2.6rem] leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-[3.4rem]">
                  {hub.platform}
                </span>
                <span className="order-3 col-span-2 text-sm text-graphite sm:order-none sm:col-span-1">{hub.subtitle}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
