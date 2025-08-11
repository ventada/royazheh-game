"use client";

import React from "react";
import TopBar from "./components/TopBar";
import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import ProductCard from "./components/ProductCard";
import { MOCK_PRODUCTS } from "./lib/mockData";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  // Filter products for different sections
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured);
  const newProducts = MOCK_PRODUCTS.filter((p) => p.isNew);
  const popularProducts = MOCK_PRODUCTS.filter((p) => p.isPopular);
  const mysteryProducts = MOCK_PRODUCTS.filter((p) => p.category === "mystery");

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar />

      {/* Hero Section */}
      <section className="px-4 py-6">
        <HeroSlider />
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-heading)]">
              ویژه امروز
            </h2>
            <Link
              href="/explore"
              className="flex items-center text-[var(--accent-gold)] hover:text-yellow-400 transition-colors"
            >
              <span className="text-sm ml-1">مشاهده همه</span>
              <IconChevronLeft size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto snap-inline">
            <div
              className="flex gap-4 pb-2 snap-start-child"
              style={{ width: "max-content" }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-72 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-heading)]">
              تازه واردها
            </h2>
            <Link
              href="/explore?sort=newest"
              className="flex items-center text-[var(--accent-gold)] hover:text-yellow-400 transition-colors"
            >
              <span className="text-sm ml-1">مشاهده همه</span>
              <IconChevronLeft size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto snap-inline">
            <div
              className="flex gap-4 pb-2 snap-start-child"
              style={{ width: "max-content" }}
            >
              {newProducts.map((product) => (
                <div key={product.id} className="w-64 flex-shrink-0">
                  <ProductCard product={product} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Most Popular */}
      {popularProducts.length > 0 && (
        <section className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-heading)]">
              محبوب‌ترین‌ها
            </h2>
            <Link
              href="/explore?sort=popular"
              className="flex items-center text-[var(--accent-gold)] hover:text-yellow-400 transition-colors"
            >
              <span className="text-sm ml-1">مشاهده همه</span>
              <IconChevronLeft size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto snap-inline">
            <div
              className="flex gap-4 pb-2 snap-start-child"
              style={{ width: "max-content" }}
            >
              {popularProducts.map((product) => (
                <div key={product.id} className="w-64 flex-shrink-0">
                  <ProductCard product={product} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mystery Cases Section */}
      {mysteryProducts.length > 0 && (
        <section className="px-4 py-6">
          <div className="bg-[var(--secondary-bg)] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-heading)] mb-2">
                  پرونده‌های جنایی حل نشده
                </h2>
                <p className="text-[var(--text-subtle)] text-sm">
                  آیا می‌توانید این پرونده‌های پیچیده را حل کنید؟
                </p>
              </div>
              <Link
                href="/explore?category=mystery"
                className="flex items-center text-[var(--accent-gold)] hover:text-yellow-400 transition-colors"
              >
                <span className="text-sm ml-1">همه پرونده‌ها</span>
                <IconChevronLeft size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {mysteryProducts.slice(0, 2).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Spacing */}
      <div className="h-6"></div>
    </div>
  );
}
