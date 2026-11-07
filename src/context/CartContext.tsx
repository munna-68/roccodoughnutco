"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, LOCATIONS, Location } from "@/data/mockData";

export interface CartItem {
  doughnut: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, openDrawer?: boolean) => void;
  removeOne: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  selectedLocation: Location;
  setSelectedLocation: (loc: Location) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  boxType: "custom" | "half-dozen" | "dozen";
  setBoxType: (type: "custom" | "half-dozen" | "dozen") => void;
  boxCapacity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>(LOCATIONS[0]);
  const [pickupTime, setPickupTime] = useState("Today, 8:30 AM");
  const [boxType, setBoxType] = useState<"custom" | "half-dozen" | "dozen">("half-dozen");

  const boxCapacity = boxType === "half-dozen" ? 6 : boxType === "dozen" ? 12 : 999;

  const addItem = (doughnut: MenuItem, openDrawer = false) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.doughnut.id === doughnut.id);
      if (existing) {
        return prev.map((i) =>
          i.doughnut.id === doughnut.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { doughnut, quantity: 1 }];
    });
    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const removeOne = (itemId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.doughnut.id === itemId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((i) => i.doughnut.id !== itemId);
      }
      return prev.map((i) =>
        i.doughnut.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.doughnut.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.doughnut.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.doughnut.price * i.quantity, 0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeOne,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        selectedLocation,
        setSelectedLocation,
        pickupTime,
        setPickupTime,
        boxType,
        setBoxType,
        boxCapacity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
