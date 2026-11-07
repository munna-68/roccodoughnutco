"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BRAND_DATA,
  DASHBOARD_METRICS,
  LOCATION_STATS,
  TOP_DOUGHNUTS,
  RECENT_ORDERS,
  COMMENT_TO_LINK_STATS,
  ORDER_CHANNEL_SPLIT,
  WEEKLY_CHART_DATA,
  LOCATIONS,
  MENU_CATEGORIES,
} from "@/data/mockData";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Users,
  Instagram,
  TrendingUp,
  DollarSign,
  Eye,
  MessageCircle,
  Smartphone,
  Globe,
  ArrowUpRight,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Percent,
} from "lucide-react";

// Self-contained smooth count-up component
function AnimatedCounter({
  value,
  duration = 900,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "orders" | "locations" | "audience">("overview");
  const [selectedOrderLocation, setSelectedOrderLocation] = useState<string>("all");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>("all");

  const sidebarNav = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "menu", label: "Menu Analytics", icon: UtensilsCrossed },
    { id: "orders", label: "Pickup Orders", icon: ShoppingBag },
    { id: "locations", label: "Store Locations", icon: MapPin },
    { id: "audience", label: "Audience & IG", icon: Users },
  ];

  // Filtered orders for the orders tab
  const filteredOrders = RECENT_ORDERS.filter((order) => {
    const matchesLoc =
      selectedOrderLocation === "all" ||
      order.location.toLowerCase() === selectedOrderLocation.toLowerCase();
    const matchesStatus =
      selectedOrderStatus === "all" || order.status === selectedOrderStatus;
    return matchesLoc && matchesStatus;
  });

  return (
    <div className="dash on-ink bg-ink text-neutral-100 min-h-screen">
      {/* Top Demo Disclaimer Ribbon */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-neutral-300 text-xs py-2 px-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            
            <span className="font-bold">
              Owner portal with realistic demo data for a ~99.4K-follower brand
            </span>
          </div>
          <span className="text-[11px] text-neutral-300 hidden sm:inline">
            Auburn, Worcester, Westborough, Millbury
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-rocco-red">
                  Owner Dashboard
                </span>
                <p className="cond-xl text-[2.75rem] text-white">Rocco&rsquo;s</p>
                <p className="text-xs text-neutral-400">
                  Four stores unified into one live data stream.
                </p>
              </div>

              {/* Desktop / Tablet Nav Links */}
              <nav className="space-y-1.5">
                {sidebarNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-paper text-ink font-semibold"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Instagram Fanbase</span>
                  <Instagram className="w-3.5 h-3.5 text-neutral-200" />
                </div>
                <div className="text-xl font-bold text-white font-display">
                  {BRAND_DATA.instagramFollowers}
                </div>
                <p className="text-[10px] text-neutral-500">
                  Bio traffic directed to roccodoughnutco.com
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition"
                >
                  <span>Back to the customer site</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* MAIN DASHBOARD CONTENT */}
          <main className="lg:col-span-9 space-y-8">
            {/* Header with Title and Period */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs font-bold text-rocco-red">
                  {activeTab === "overview" && "Unified Storefront Performance"}
                  {activeTab === "menu" && "Product Mix & Flavour Demand"}
                  {activeTab === "orders" && "Express Counter Operations"}
                  {activeTab === "locations" && "4 Bakery Storefronts"}
                  {activeTab === "audience" && "Social Conversion Funnel"}
                </span>
                <h1 className="cond-xl text-[2.75rem] sm:text-[4rem] text-white">
                  {activeTab === "overview" && "Monthly Operations Overview"}
                  {activeTab === "menu" && "Menu & Flavour Performance"}
                  {activeTab === "orders" && "Pickup Orders Queue"}
                  {activeTab === "locations" && "Store Locations & Revenue Split"}
                  {activeTab === "audience" && "Instagram & Audience Analytics"}
                </h1>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full border border-neutral-700">
                  Current Month (Nov 2026)
                </span>
                <span className="text-xs font-bold text-neutral-100 bg-emerald-950/80 px-2.5 py-1.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* 1. STAT CARDS (5 key metrics with smooth count-up) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {DASHBOARD_METRICS.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-3"
                    >
                      <span className="text-[11px] font-bold text-neutral-400">
                        {metric.label}
                      </span>
                      <div>
                        <div className="text-2xl font-bold text-white tracking-tight font-display">
                          <AnimatedCounter
                            value={metric.rawNumber}
                            prefix={metric.value.startsWith("$") ? "$" : ""}
                          />
                        </div>
                        <div className="text-[11px] font-bold text-neutral-100 flex items-center gap-1 mt-0.5">
                          <TrendingUp className="w-3 h-3" />
                          <span>{metric.change}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-neutral-500 border-t border-neutral-800/80 pt-2 leading-tight">
                        {metric.subtext}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 2. THE PITCH: COMMENT-TO-LINK PANEL */}
                <div className="rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 sm:p-8 border-2 border-rocco-red/30 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rocco-red/20 text-rocco-red flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-rocco-red">
                          Instagram Engagement Conversion
                        </span>
                        <h3 className="text-lg font-bold text-white font-display">
                          "Comment MENU" Direct-To-Checkout Funnel
                        </h3>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400 bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-700">
                      Trigger: "#{COMMENT_TO_LINK_STATS.triggerWord}"
                    </div>
                  </div>

                  {/* Conversion Steps */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400">
                        1. Comments Received
                      </span>
                      <div className="text-2xl font-bold text-white font-display">
                        <AnimatedCounter value={COMMENT_TO_LINK_STATS.totalComments} />
                      </div>
                      <span className="text-[10px] text-neutral-200 font-semibold">
                        On Monthly Drop Posts
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400">
                        2. Instant DMs Sent
                      </span>
                      <div className="text-2xl font-bold text-white font-display">
                        <AnimatedCounter value={COMMENT_TO_LINK_STATS.linksDMSent} />
                      </div>
                      <span className="text-[10px] text-neutral-100 font-semibold">
                        {COMMENT_TO_LINK_STATS.dmDeliveryRate} Delivery Rate
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400">
                        3. Domain Visits
                      </span>
                      <div className="text-2xl font-bold text-white font-display">
                        <AnimatedCounter value={COMMENT_TO_LINK_STATS.clicksToOwnDomain} />
                      </div>
                      <span className="text-[10px] text-neutral-100 font-semibold">
                        {COMMENT_TO_LINK_STATS.clickThroughRate} CTR
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400">
                        4. Same-Day Pickup Orders
                      </span>
                      <div className="text-2xl font-bold text-rocco-red font-display">
                        <AnimatedCounter value={COMMENT_TO_LINK_STATS.sameDayOrdersPlaced} />
                      </div>
                      <span className="text-[10px] text-neutral-100 font-bold">
                        $<AnimatedCounter value={COMMENT_TO_LINK_STATS.attributedRevenue} /> Revenue
                      </span>
                    </div>
                  </div>

                  {/* Pitch comparison banner */}
                  <div className="p-4 rounded-2xl bg-rocco-red/10 border border-rocco-red/30 flex items-start gap-3 text-xs">
                    <Sparkles className="w-5 h-5 text-rocco-red flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-neutral-300">
                      <strong className="text-white font-bold">Why ONE Unified Site Matters:</strong>
                      <p className="leading-relaxed">
                        Under the previous multi-step system (Instagram, then Linktree, then Square or DoorDash), an estimated{" "}
                        <strong className="text-neutral-200 font-bold">62% of high-intent buyers dropped off</strong>{" "}
                        navigating button links. With ONE direct web storefront, 76% click straight through to your menu and place pickup orders in under a minute.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. LOCATION SPLIT & ORDER CHANNEL BREAKDOWN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Orders & Revenue Split by Location */}
                  <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-rocco-red">
                          Bakery Storefronts
                        </span>
                        <h3 className="text-base font-bold text-white font-display">
                          Revenue by Location
                        </h3>
                      </div>
                      <span className="text-xs text-neutral-400">4 Active Shops</span>
                    </div>

                    <div className="space-y-4">
                      {LOCATION_STATS.map((loc) => (
                        <div key={loc.locationId} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-neutral-200">{loc.name}</span>
                            <div className="text-right">
                              <span className="text-white">${loc.revenue.toLocaleString()}</span>
                              <span className="text-neutral-400 text-[10px] ml-1.5">
                                ({loc.orders} orders)
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-rocco-red rounded-full transition-all duration-500"
                              style={{ width: `${loc.percentShare * 2.5}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-neutral-500">
                            <span>Share: {loc.percentShare}%</span>
                            <span>Avg Order: ${loc.avgOrderValue.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Web Orders vs App Orders Split */}
                  <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <div>
                          <span className="text-[10px] font-bold text-rocco-red">
                            Channel Share
                          </span>
                          <h3 className="text-base font-bold text-white font-display">
                            Web Orders vs App Orders
                          </h3>
                        </div>
                        <span className="text-xs text-neutral-400 font-bold">November Total</span>
                      </div>

                      <div className="pt-4 space-y-4">
                        {/* Direct Web */}
                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-neutral-100" />
                              <span className="text-xs font-bold text-white">
                                {ORDER_CHANNEL_SPLIT.directWeb.label}
                              </span>
                            </div>
                            <span className="text-base font-bold text-neutral-100 font-display">
                              {ORDER_CHANNEL_SPLIT.directWeb.percentage}%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-neutral-400 font-semibold">
                            <span>${ORDER_CHANNEL_SPLIT.directWeb.revenue.toLocaleString()}</span>
                            <span>{ORDER_CHANNEL_SPLIT.directWeb.orders} orders</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-neutral-200 rounded-full"
                              style={{ width: `${ORDER_CHANNEL_SPLIT.directWeb.percentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Native App */}
                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-4 h-4 text-sky-400" />
                              <span className="text-xs font-bold text-white">
                                {ORDER_CHANNEL_SPLIT.nativeApp.label}
                              </span>
                            </div>
                            <span className="text-base font-bold text-sky-400 font-display">
                              {ORDER_CHANNEL_SPLIT.nativeApp.percentage}%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-neutral-400 font-semibold">
                            <span>${ORDER_CHANNEL_SPLIT.nativeApp.revenue.toLocaleString()}</span>
                            <span>{ORDER_CHANNEL_SPLIT.nativeApp.orders} orders</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-sky-500 rounded-full"
                              style={{ width: `${ORDER_CHANNEL_SPLIT.nativeApp.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400 italic pt-2">
                      Key Insight: 64% of customers prefer ordering instantly on mobile web without downloading an app from the App Store.
                    </p>
                  </div>
                </div>

                {/* 4. WEEKLY DEMAND CHART (Weekend Peaks) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-rocco-red">
                        Weekly Rhythm
                      </span>
                      <h3 className="text-lg font-bold text-white font-display">
                        Daily Pickup Volume & Weekend Peaks
                      </h3>
                    </div>
                    <div className="text-xs font-semibold text-neutral-400">
                      Closed Mondays, Highest Peaks on Sat & Sun
                    </div>
                  </div>

                  {/* Bar Chart Visualization */}
                  <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-4 items-end h-56 border-b border-neutral-800 pb-4">
                    {WEEKLY_CHART_DATA.map((day) => {
                      const maxOrders = 1000;
                      const heightPercent = (day.orders / maxOrders) * 100;
                      const isPeak = day.day === "Sat" || day.day === "Sun";
                      return (
                        <div key={day.day} className="flex flex-col items-center gap-2 h-full justify-end">
                          <span className="text-[11px] font-bold text-neutral-400 hidden sm:block">
                            {day.orders}
                          </span>
                          <div className="w-full max-w-[48px] bg-neutral-800 rounded-t-xl overflow-hidden relative h-full flex items-end">
                            <div
                              className={`w-full rounded-t-xl transition-all duration-700 ${
                                isPeak
                                  ? "bg-paper"
                                  : "bg-rocco-tanDark"
                              }`}
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <div className="text-center">
                            <span className={`text-xs font-bold block font-display ${isPeak ? "text-rocco-red" : "text-white"}`}>
                              {day.day}
                            </span>
                            <span className="text-[9px] text-neutral-500 hidden sm:block">
                              ${(day.revenue / 1000).toFixed(1)}k
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. TOP DOUGHNUTS & RECENT ORDERS TABLE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Top Doughnuts List */}
                  <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-rocco-red">
                          Top Doughnuts
                        </span>
                        <h3 className="text-base font-bold text-white font-display">Best-Selling Flavours</h3>
                      </div>
                      <span className="text-xs text-neutral-400">By Volume</span>
                    </div>

                    <div className="space-y-3">
                      {TOP_DOUGHNUTS.map((d, idx) => (
                        <div
                          key={d.name}
                          className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-xs text-white">{d.name}</h4>
                              <span className="text-[10px] text-neutral-400">{d.category}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-white font-display">
                              {d.quantitySold.toLocaleString()} sold
                            </span>
                            <span className="block text-[10px] font-bold text-neutral-100">
                              {d.growth}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Orders Table */}
                  <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-rocco-red">
                          Live Order Stream
                        </span>
                        <h3 className="text-base font-bold text-white font-display">Recent Express Pickups</h3>
                      </div>
                      <span className="text-xs text-neutral-100 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 animate-pulse" />
                        Incoming
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-neutral-500 text-[10px] border-b border-neutral-800">
                            <th className="pb-2">Order</th>
                            <th className="pb-2">Customer</th>
                            <th className="pb-2">Location</th>
                            <th className="pb-2">Ready Time</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/60">
                          {RECENT_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-neutral-900/50 transition">
                              <td className="py-2.5 text-neutral-300 font-bold">
                                {order.id}
                              </td>
                              <td className="py-2.5 font-medium text-white">{order.customer}</td>
                              <td className="py-2.5 text-neutral-300">{order.location}</td>
                              <td className="py-2.5 text-neutral-400">{order.pickupTime}</td>
                              <td className="py-2.5">
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    order.status === "Ready for Pickup"
                                      ? "bg-emerald-950 text-neutral-100 border border-emerald-800/40"
                                      : order.status === "In the Fryer"
                                      ? "bg-amber-950 text-neutral-300 border border-amber-800/40"
                                      : "bg-neutral-800 text-neutral-300"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-right font-bold text-white font-display">
                                ${order.amount.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-[11px] text-neutral-500 border-t border-neutral-800">
                      <span>Showing latest live transactions across 4 bakery locations</span>
                      <span className="text-rocco-tan">All metrics demo simulation</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MENU ANALYTICS */}
            {activeTab === "menu" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">Active Menu Flavours</span>
                    <div className="text-2xl font-bold text-white font-display">20 Items</div>
                    <span className="text-[10px] text-neutral-100 font-semibold">6 Verified Categories</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">#1 Top Seller</span>
                    <div className="text-2xl font-bold text-rocco-red font-display">The Homer</div>
                    <span className="text-[10px] text-neutral-400 font-semibold">4,210 units ($15,787)</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">Fastest Growing</span>
                    <div className="text-2xl font-bold text-neutral-300 font-display">GS Choc Frosted</div>
                    <span className="text-[10px] text-neutral-100 font-semibold">+38% MoM Surge</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">November Drop Velocity</span>
                    <div className="text-2xl font-bold text-white font-display">Spiced Pecan Pie</div>
                    <span className="text-[10px] text-neutral-400 font-semibold">94% Daily Fryer Sellout</span>
                  </div>
                </div>

                {/* Full Doughnut Lineup Table */}
                <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">Doughnut Product Ranking & Margins</h3>
                    <span className="text-xs text-neutral-400">Ranked by Monthly Units</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-neutral-500 text-[10px] border-b border-neutral-800">
                          <th className="pb-2">Flavour Name</th>
                          <th className="pb-2">Category</th>
                          <th className="pb-2">Quantity Sold</th>
                          <th className="pb-2">Gross Revenue</th>
                          <th className="pb-2">Growth Rate</th>
                          <th className="pb-2 text-right">Production Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60">
                        {TOP_DOUGHNUTS.map((d) => (
                          <tr key={d.name} className="hover:bg-neutral-900/50 transition">
                            <td className="py-3 font-bold text-white">{d.name}</td>
                            <td className="py-3 text-neutral-400">{d.category}</td>
                            <td className="py-3 text-neutral-200">{d.quantitySold.toLocaleString()} boxes/units</td>
                            <td className="py-3 font-bold text-neutral-100 font-display">${d.revenue.toLocaleString()}</td>
                            <td className="py-3 font-bold text-neutral-100">{d.growth}</td>
                            <td className="py-3 text-right">
                              <span className="text-[10px] bg-emerald-950 text-neutral-100 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                                High Demand
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Gluten-Sensitive Spotlight Card */}
                <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-neutral-300 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-neutral-300" />
                    <span>Gluten-Sensitive Line Insights ("Skip The Pain")</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    The custom vanilla crème cake base has driven an extra $18,400 in incremental revenue this month from gluten-avoiding patrons. Zero cross-contact guarantee disclaimer prominently displayed on both menu and box builder pages to comply with FDA requirements.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: PICKUP ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Filter Controls */}
                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                      <Filter className="w-4 h-4 text-rocco-red" /> Filter Store:
                    </div>
                    {["all", "Auburn", "Worcester", "Westborough", "Millbury"].map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedOrderLocation(loc)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold transition ${
                          selectedOrderLocation.toLowerCase() === loc.toLowerCase()
                            ? "bg-paper text-ink"
                            : "bg-neutral-900 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {loc === "all" ? "All 4 Stores" : loc}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                    <span className="text-neutral-500 font-medium">Status:</span>
                    <select
                      value={selectedOrderStatus}
                      onChange={(e) => setSelectedOrderStatus(e.target.value)}
                      className="bg-neutral-900 border border-neutral-700 text-neutral-200 rounded-lg px-2.5 py-1 font-bold text-xs focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="In the Fryer">In the Fryer</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Orders Queue Table */}
                <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">
                      Express Pickup Dispatch Queue ({filteredOrders.length} matching)
                    </h3>
                    <span className="text-xs text-neutral-400">Live Sync</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-neutral-500 text-[10px] border-b border-neutral-800">
                          <th className="pb-2">Order ID</th>
                          <th className="pb-2">Customer</th>
                          <th className="pb-2">Location</th>
                          <th className="pb-2">Box Summary</th>
                          <th className="pb-2">Pickup Time</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-neutral-500">
                              No orders found for the selected store/status filter.
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-neutral-900/50 transition">
                              <td className="py-3 font-bold text-rocco-red">{order.id}</td>
                              <td className="py-3 font-bold text-white">{order.customer}</td>
                              <td className="py-3 text-neutral-300">{order.location}</td>
                              <td className="py-3 text-neutral-400 max-w-xs truncate">{order.itemsSummary}</td>
                              <td className="py-3 text-neutral-300 font-semibold">{order.pickupTime}</td>
                              <td className="py-3">
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    order.status === "Ready for Pickup"
                                      ? "bg-emerald-950 text-neutral-100 border border-emerald-800/40"
                                      : order.status === "In the Fryer"
                                      ? "bg-amber-950 text-neutral-300 border border-amber-800/40"
                                      : "bg-neutral-800 text-neutral-300"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 text-right font-bold text-white font-display">
                                ${order.amount.toFixed(2)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: STORE LOCATIONS */}
            {activeTab === "locations" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {LOCATION_STATS.map((loc) => {
                    const storeInfo = LOCATIONS.find((l) => l.id === loc.locationId);
                    return (
                      <div
                        key={loc.locationId}
                        className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-rocco-red bg-rocco-red/10 px-2.5 py-0.5 rounded-full">
                              {storeInfo?.town || loc.name}
                            </span>
                            <span className="text-xs font-bold text-neutral-100 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                              Tue–Sun Active
                            </span>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-white font-display">{loc.name}</h3>
                            <p className="text-xs text-neutral-400 mt-0.5">{storeInfo?.address}</p>
                            <p className="text-xs text-rocco-tan mt-0.5 font-semibold">
                              Hours: {storeInfo?.hoursTime} ({storeInfo?.hoursDays})
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-800/80 text-center">
                            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                              <span className="text-[9px] font-bold text-neutral-500 block">Revenue</span>
                              <span className="text-sm font-bold text-white font-display">
                                ${loc.revenue.toLocaleString()}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                              <span className="text-[9px] font-bold text-neutral-500 block">Orders</span>
                              <span className="text-sm font-bold text-white font-display">
                                {loc.orders.toLocaleString()}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                              <span className="text-[9px] font-bold text-neutral-500 block">Share</span>
                              <span className="text-sm font-bold text-neutral-100 font-display">
                                {loc.percentShare}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-neutral-800 text-xs">
                          <span className="text-neutral-500">Avg Ticket: ${loc.avgOrderValue.toFixed(2)}</span>
                          <Link
                            href={`/order?location=${loc.locationId}`}
                            className="text-rocco-red hover:underline font-bold flex items-center gap-1"
                          >
                            <span>Open Store Pickup</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 5: AUDIENCE & INSTAGRAM */}
            {activeTab === "audience" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">IG Total Following</span>
                    <div className="text-2xl font-bold text-neutral-200 font-display">
                      {BRAND_DATA.instagramFollowers}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-semibold">2,675+ Posts Slingin' Donuts</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">Monthly Profile Clicks</span>
                    <div className="text-2xl font-bold text-white font-display">42,850</div>
                    <span className="text-[10px] text-neutral-100 font-semibold">+18.4% After 1-Domain Switch</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">VIP Drop Signups</span>
                    <div className="text-2xl font-bold text-neutral-100 font-display">1,420</div>
                    <span className="text-[10px] text-neutral-400 font-semibold">First-Party SMS & Email</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400">Comment DM Conversion</span>
                    <div className="text-2xl font-bold text-rocco-red font-display">76.1%</div>
                    <span className="text-[10px] text-neutral-100 font-semibold">Click-Through from DM</span>
                  </div>
                </div>

                {/* Linktree Friction Comparison Pitch Card */}
                <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <h3 className="text-base font-bold text-white font-display">
                    Conversion Funnel: The Multi-Link Nightmare vs ONE Unified Domain
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                      <span className="text-[11px] font-bold text-neutral-200 block">
                        Old Way (Fragmented Linktree)
                      </span>
                      <ul className="space-y-1.5 text-neutral-300">
                        <li>• 14 Linktree buttons forcing town selection first.</li>
                        <li>• "In Store Pickup" directed to 24h pre-order Square site.</li>
                        <li>• Same-day customers redirected away again to DoorDash.</li>
                        <li>• Requires downloading ChowNow app for native ordering.</li>
                        <li className="text-neutral-200 font-bold pt-1">
                          Result: ~62% customer drop-off before reaching a menu.
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                      <span className="text-[11px] font-bold text-neutral-100 block">
                        New Way (This Unified Demo Site)
                      </span>
                      <ul className="space-y-1.5 text-neutral-300">
                        <li>• One front door on Rocco's own domain (`roccodoughnutco.com`).</li>
                        <li>• Live monthly lineup + gluten-sensitive collection in 1 click.</li>
                        <li>• Instant box builder (6-pack, dozen, custom) with zero app download.</li>
                        <li>• Clear pickup times and verified hours across all 4 MA stores.</li>
                        <li className="text-neutral-100 font-bold pt-1">
                          Result: 76.1% CTR, 840 same-day orders, $19,320 attributed revenue.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
