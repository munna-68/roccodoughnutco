"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Order pickup", href: "/order" },
  { label: "Bakeries", href: "/locations" },
  { label: "Owner dashboard", href: "/dashboard" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalCount, openDrawer } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="on-ink sticky top-0 z-40 bg-ink text-paper">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="cond text-[2rem] leading-none tracking-tight" aria-label="Rocco's Doughnut Co. home">
          Rocco&rsquo;s
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative text-[13px] font-medium text-paper/75 transition-colors hover:text-paper",
                  active && "text-paper",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-paper transition-transform duration-500",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openDrawer}
            className="flex h-9 items-center gap-2 rounded-full border border-paper/30 pl-3.5 pr-1.5 text-[13px] font-medium transition-colors hover:border-paper"
            aria-label={`Open your box, ${totalCount} doughnuts`}
          >
            Box
            <span
              className={cn(
                "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums transition-colors",
                totalCount > 0 ? "bg-paper text-ink" : "bg-paper/15 text-paper",
              )}
            >
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between bg-ink px-4 pb-8 pt-6 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[{ label: "Home", href: "/" }, ...navLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "cond border-b border-paper/15 py-3 text-[3.25rem] leading-none",
                  pathname === link.href ? "text-paper" : "text-paper/55",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-paper/60">
            Auburn, Worcester, Westborough and Millbury. Open Tuesday to Sunday from 6:30 AM.
          </p>
        </div>
      )}
    </header>
  );
};
