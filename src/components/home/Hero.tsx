"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { PHOTOS } from "@/data/photos";
import { Pill } from "@/components/ui/Pill";
import { Stamp } from "@/components/Stamp";
import { gsap, SplitText, useGSAP, MOTION_OK, MOTION_REDUCED, PRELOADER_DONE, preloaderWillPlay } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_REDUCED, () => {
        gsap.set("[data-reveal]", { visibility: "visible" });
      });

      mm.add(MOTION_OK, () => {
        const willPreload = preloaderWillPlay();
        const media = root.current!.querySelector("[data-media]");
        const split = SplitText.create("[data-title] [data-line]", { type: "chars", mask: "chars" });

        gsap.set("[data-reveal]", { visibility: "visible" });
        gsap.set(split.chars, { yPercent: 108 });
        gsap.set("[data-fade]", { autoAlpha: 0, y: 18 });
        gsap.set("[data-stamp]", { autoAlpha: 0, scale: 0.6, rotation: -40 });

        // photo settles from a push-in while the preloader runs
        if (willPreload) gsap.fromTo(media, { scale: 1.35 }, { scale: 1, duration: 3.1, ease: "power3.out" });

        const enter = () => {
          const tl = gsap.timeline();
          tl.to(split.chars, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.04 })
            .to("[data-fade]", { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.35)
            .to("[data-stamp]", { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.1, ease: "back.out(1.6)" }, 0.5);
        };

        let started = false;
        const onDone = () => {
          if (started) return;
          started = true;
          enter();
        };
        if (willPreload) window.addEventListener(PRELOADER_DONE, onDone, { once: true });
        else onDone();

        // scroll: photo pushes in, title lifts away, small copy fades
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(media, { scale: 1.14, ease: "none", scrollTrigger: st });
        gsap.to("[data-title]", { yPercent: -45, ease: "none", scrollTrigger: st });
        gsap.to("[data-sub]", { autoAlpha: 0, ease: "none", scrollTrigger: { ...st, end: "40% top" } });

        return () => {
          window.removeEventListener(PRELOADER_DONE, onDone);
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="on-ink bg-ink px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative h-[calc(100svh-4.5rem)] min-h-[600px] overflow-hidden rounded-[22px] sm:rounded-frame">
        <div data-media className="absolute inset-0 will-change-transform">
          <Image
            src={PHOTOS.hero}
            alt="Three frosted doughnuts falling through a cloud of sprinkles"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
        {/* ink field fading into the photo so type stays readable */}
        <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/60 to-transparent" />

        <div data-stamp data-reveal className="absolute right-5 top-5 h-24 w-24 text-paper sm:right-8 sm:top-8 sm:h-32 sm:w-32">
          <Stamp text="Fresh every morning — Central Mass — since 2018 — " className="h-full w-full" />
        </div>

        <div className="absolute inset-x-0 bottom-0 grid items-end gap-8 p-5 text-paper sm:p-8 md:grid-cols-12 lg:p-10">
          <div className="min-w-0 md:col-span-8">
            <h1 data-title data-reveal className="cond-xl text-[21vw] md:text-[10.4vw]">
              <span className="sr-only">Rocco&rsquo;s Doughnut Co.: </span>
              <span data-line className="block">Slingin&rsquo;</span>
              <span data-line className="block">since 2018</span>
            </h1>
            <div data-sub>
              <p data-fade data-reveal className="mt-5 max-w-[30rem] text-[15px] leading-relaxed text-paper/80 sm:text-base">
                Giant handcrafted doughnuts from four Central Mass bakeries. New flavors drop on the 1st of every
                month, and pickup takes two taps. No app.
              </p>
              <div data-fade data-reveal className="mt-6 flex flex-wrap gap-2.5">
                <Pill href="/order" variant="paper">
                  Build a pickup box
                </Pill>
                <Pill href="/menu" variant="ghost-light">
                  See the menu
                </Pill>
              </div>
            </div>
          </div>
          <div data-sub className="hidden text-sm text-paper/75 md:col-span-4 md:block md:text-right">
            <p data-fade data-reveal>
              Auburn, Worcester,
              <br />
              Westborough, Millbury
            </p>
            <p data-fade data-reveal className="mt-3 text-paper">
              Tuesday to Sunday, from 6:30 AM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
