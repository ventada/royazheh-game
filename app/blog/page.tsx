"use client";

import React, { useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../lib/blogData";

export default function BlogHomePage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("");

  const featured = useMemo(
    () => BLOG_POSTS.filter((p) => p.isFeatured).slice(0, 3),
    []
  );
  const filtered = useMemo(() => {
    let arr = BLOG_POSTS.slice().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (activeCat) arr = arr.filter((p) => p.categories.includes(activeCat));
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return arr;
  }, [query, activeCat]);

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title="وبلاگ رؤیاژه" showLogo={false} />

      {/* Hero Banner */}
      <section className="px-4 pt-4 pb-2">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="/images/banner-slider/top-secret.png"
            alt="Royazheh Blog"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/30" />
          <div className="relative p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">وبلاگ رؤیاژه</h1>
            <p className="text-purple-100 mb-3 text-sm">
              اخبار، نقد و بررسی‌ها و پرونده‌های مرموز؛ همه در یک‌جا
            </p>
            <div className="max-w-sm mx-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی مطالب..."
                className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] px-4 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCat("")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !activeCat
                ? "bg-[var(--accent-gold)] text-black"
                : "bg-[var(--secondary-bg)] text-[var(--text-primary)] border border-gray-700 hover:border-[var(--accent-gold)]"
            }`}
          >
            همه
          </button>
          {BLOG_CATEGORIES.map((c) => (
            <Link key={c.id} href={`/blog/category/${c.slug}`}>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCat === c.slug
                    ? "bg-[var(--accent-gold)] text-black"
                    : "bg-[var(--secondary-bg)] text-[var(--text-primary)] border border-gray-700 hover:border-[var(--accent-gold)]"
                }`}
              >
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="px-4 pb-2">
          <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">
            مطالب ویژه
          </h2>
          <div className="overflow-x-auto snap-inline">
            <div
              className="flex gap-4 pb-2 snap-start-child"
              style={{ width: "max-content" }}
            >
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="w-72 flex-shrink-0"
                >
                  <article className="bg-[var(--secondary-bg)] rounded-xl overflow-hidden border border-gray-700 hover:border-[var(--accent-gold)] transition-colors">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[var(--text-heading)] font-semibold mb-1 line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-[var(--text-subtle)] text-sm line-clamp-2 mb-2">
                        {p.excerpt}
                      </p>
                      <span className="text-[var(--accent-gold)] text-xs">
                        {new Date(p.date).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="px-4 pb-20">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">
          تازه‌ترین مطالب
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`}>
              <article className="bg-[var(--secondary-bg)] rounded-xl overflow-hidden border border-gray-700 hover:border-[var(--accent-gold)] transition-colors">
                <div className="flex gap-3 p-3">
                  <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={p.thumbnail || p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="30vw"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[var(--text-heading)] font-semibold mb-1 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-[var(--text-subtle)] text-sm line-clamp-2">
                      {p.excerpt}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[var(--text-subtle)] text-xs">
                        {p.author || "تحریریه"} •{" "}
                        {new Date(p.date).toLocaleDateString("fa-IR")}
                      </span>
                      <span className="text-[var(--accent-gold)] text-xs">
                        ادامه مطلب
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
