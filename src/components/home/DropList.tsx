"use client";

import React, { useState } from "react";
import { Pill } from "@/components/ui/Pill";

/** The reference's request form: giant ink words left, underlined fields right. */
export function DropList() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [town, setTown] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="px-2 pb-2 sm:px-3 sm:pb-3" aria-labelledby="drop-title">
      <div className="grid gap-10 rounded-[22px] bg-mist p-6 sm:rounded-frame sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
        <div className="lg:col-span-5">
          <h2 id="drop-title" className="cond-xl text-[22vw] sm:text-[8.5rem] lg:text-[9.5rem]">
            Never miss
            <br />a drop
          </h2>
          <p className="mt-5 max-w-[24rem] text-sm leading-relaxed text-graphite">
            The new menu lands on the 1st and the specials sell out by noon. Get it the night before. Demo sign-up,
            nothing is sent.
          </p>
        </div>

        <div className="flex flex-col justify-end lg:col-span-7">
          {done ? (
            <div className="border-t-[1.5px] border-ink py-8" role="status">
              <p className="cond text-5xl">You&rsquo;re on the list{name ? `, ${name.split(" ")[0]}` : ""}.</p>
              <p className="mt-2 text-sm text-graphite">
                Next drop: December 1st. We&rsquo;ll send the lineup the evening before.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (contact.trim()) setDone(true);
              }}
              className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
            >
              <label className="sm:col-span-2">
                <span className="cond text-xl">Your name</span>
                <input className="field text-base" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label>
                <span className="cond text-xl">Email or mobile</span>
                <input
                  className="field text-base"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>
              <label>
                <span className="cond text-xl">Closest bakery</span>
                <select className="field appearance-none text-base" value={town} onChange={(e) => setTown(e.target.value)}>
                  <option value="">Any of the four</option>
                  <option>Auburn</option>
                  <option>Worcester</option>
                  <option>Westborough</option>
                  <option>Millbury</option>
                </select>
              </label>
              <div className="flex justify-end sm:col-span-2">
                <Pill type="submit" variant="ink" size="lg" className="w-full sm:w-auto sm:min-w-[12rem]">
                  Join the drop list
                </Pill>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
