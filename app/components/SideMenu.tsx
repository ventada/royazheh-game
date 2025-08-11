"use client";

import React from "react";
import Link from "next/link";
import {
  IconX,
  IconHome,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconInfoCircle,
  IconPhone,
  IconLogin,
  IconLogout,
  IconChevronLeft,
} from "@tabler/icons-react";
import { CATEGORIES } from "../types";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  // TODO: Replace with actual auth state
  const isLoggedIn = false;
  const username = "علی محمدی";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      >
        {/* Menu */}
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-[var(--secondary-bg)]/98 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } animate-slide-in-right`}
          style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/70">
            <h2 className="text-lg font-bold text-[var(--text-heading)]">
              منو
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/40"
              aria-label="بستن منو"
            >
              <IconX size={20} className="text-[var(--text-primary)]" />
            </button>
          </div>

          {/* User Section */}
          {isLoggedIn && (
            <div className="p-4 border-b border-gray-700/70">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                  <IconUser size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-heading)]">
                    {username}
                  </p>
                  <p className="text-sm text-[var(--text-subtle)]">خوش آمدید</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-3">
              {/* Main Navigation */}
              <div className="space-y-1.5 mb-4">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <IconHome size={20} className="ml-3" />
                  خانه
                </Link>

                <Link
                  href="/explore"
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <IconSearch size={20} className="ml-3" />
                  جستجو و کاوش
                </Link>

                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <IconShoppingCart size={20} className="ml-3" />
                  سبد خرید
                </Link>

                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <IconUser size={20} className="ml-3" />
                  پروفایل
                </Link>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <h3 className="px-3 py-2 text-xs font-medium text-[var(--text-subtle)] uppercase tracking-wider">
                  دسته‌بندی‌ها
                </h3>
                <div className="space-y-1.5">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/explore?category=${category.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2.5 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                    >
                      <span>{category.name}</span>
                      <IconChevronLeft
                        size={16}
                        className="text-[var(--text-subtle)]"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="space-y-1.5 border-t border-gray-700/70 pt-4">
                <Link
                  href="/about"
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <IconInfoCircle size={20} className="ml-3" />
                  درباره ما
                </Link>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-[var(--text-primary)] hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <IconPhone size={20} className="ml-3" />
                  تماس با ما
                </Link>

                {/* Auth Links */}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      // TODO: Implement logout
                      onClose();
                    }}
                    className="flex items-center px-3 py-3 text-red-400 hover:bg-gray-700 rounded-xl transition-colors w-full text-right"
                  >
                    <IconLogout size={20} className="ml-3" />
                    خروج
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="flex items-center px-3 py-3 text-[var(--accent-gold)] hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <IconLogin size={20} className="ml-3" />
                    ورود / ثبت نام
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
