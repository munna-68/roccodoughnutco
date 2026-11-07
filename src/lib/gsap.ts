"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";
export const PRELOADER_DONE = "rdc:preloader-done";

/** true when the home preloader is going to run on this page load */
export function preloaderWillPlay() {
  if (typeof document === "undefined") return false;
  return !document.documentElement.classList.contains("preloaded");
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
