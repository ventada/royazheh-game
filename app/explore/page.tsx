"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TopBar from "../components/TopBar";
import ProductCard from "../components/ProductCard";
import { MOCK_PRODUCTS } from "../lib/mockData";
import { CATEGORIES } from "../types";
import { IconSearch, IconFilter, IconX } from "@tabler/icons-react";

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--primary-bg)]">
          <div className="px-4 py-4">
            <div className="h-10 w-1/2 bg-[var(--secondary-bg)] rounded mb-4" />
            <div className="grid grid-cols-1 gap-4">
              <div className="h-40 bg-[var(--secondary-bg)] rounded" />
              <div className="h-40 bg-[var(--secondary-bg)] rounded" />
            </div>
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered = filtered.sort(
          (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
        break;
      case "popular":
        filtered = filtered.sort(
          (a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
        );
        break;
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title="جستجو و کاوش" showLogo={false} />

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجوی بازی..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] px-4 py-3 pr-12 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)]"
          />
          <IconSearch
            size={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-subtle)]"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[var(--secondary-bg)] px-4 py-2 rounded-lg border border-gray-700 hover:border-[var(--accent-gold)] transition-colors"
          >
            <IconFilter size={18} className="text-[var(--text-primary)]" />
            <span className="text-[var(--text-primary)]">فیلتر</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-[var(--accent-gold)] hover:text-yellow-400 transition-colors"
            >
              <IconX size={16} />
              <span className="text-sm">پاک کردن فیلترها</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedCategory
                ? "bg-[var(--accent-gold)] text-black"
                : "bg-[var(--secondary-bg)] text-[var(--text-primary)] border border-gray-700 hover:border-[var(--accent-gold)]"
            }`}
          >
            همه
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.slug
                  ? "bg-[var(--accent-gold)] text-black"
                  : "bg-[var(--secondary-bg)] text-[var(--text-primary)] border border-gray-700 hover:border-[var(--accent-gold)]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      {showFilters && (
        <div className="px-4 pb-4">
          <div className="bg-[var(--secondary-bg)] rounded-lg p-4 border border-gray-700">
            <h3 className="text-[var(--text-heading)] font-semibold mb-3">
              مرتب‌سازی براساس
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "newest", label: "جدیدترین" },
                { value: "popular", label: "محبوب‌ترین" },
                { value: "price-low", label: "قیمت: کم به زیاد" },
                { value: "price-high", label: "قیمت: زیاد به کم" },
                { value: "name", label: "نام (الفبایی)" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    sortBy === option.value
                      ? "bg-[var(--accent-gold)] text-black"
                      : "bg-gray-700 text-[var(--text-primary)] hover:bg-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-[var(--text-subtle)] text-sm">
            {filteredProducts.length} بازی یافت شد
          </p>
          {hasActiveFilters && (
            <div className="flex gap-2">
              {searchQuery && (
                <span className="bg-[var(--accent-gold)] text-black px-2 py-1 rounded text-xs">
                  جستجو: {searchQuery}
                </span>
              )}
              {selectedCategory && (
                <span className="bg-[var(--accent-gold)] text-black px-2 py-1 rounded text-xs">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-[var(--text-heading)] text-lg font-semibold mb-2">
              نتیجه‌ای یافت نشد
            </h3>
            <p className="text-[var(--text-subtle)] mb-4">
              متأسفانه بازی مورد نظر شما پیدا نشد. لطفاً کلمات کلیدی دیگری
              امتحان کنید.
            </p>
            <button
              onClick={clearFilters}
              className="bg-[var(--accent-gold)] text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              مشاهده همه بازی‌ها
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
