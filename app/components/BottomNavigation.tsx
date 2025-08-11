"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconSearch,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { useCart } from "../context/CartContext";

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      href: "/",
      icon: IconHome,
      label: "خانه",
      isActive: isActive("/") && pathname === "/",
    },
    {
      href: "/explore",
      icon: IconSearch,
      label: "جستجو",
      isActive: isActive("/explore"),
    },
    {
      href: "/cart",
      icon: IconShoppingCart,
      label: "سبد خرید",
      isActive: isActive("/cart"),
      badge: cartItemCount > 0 ? cartItemCount : null,
    },
    {
      href: "/profile",
      icon: IconUser,
      label: "پروفایل",
      isActive: isActive("/profile") || isActive("/auth"),
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[var(--secondary-bg)]/95 backdrop-blur border-t border-gray-800/70 z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 relative transition-colors ${
                item.isActive
                  ? "text-[var(--accent-gold)]"
                  : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
              }`}
            >
              <div className="relative transition-transform duration-150 will-change-transform hover:scale-110">
                <Icon size={24} />
                {item.badge && (
                  <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
