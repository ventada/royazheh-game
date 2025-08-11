"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../components/TopBar";
import Link from "next/link";
import Image from "next/image";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../../../lib/blogData";

export default function BlogCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);

  const posts = useMemo(() => {
    return BLOG_POSTS.filter((p) => p.categories.includes(slug)).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [slug]);

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title={category?.name || "دسته‌بندی"} showLogo={false} />
      <section className="px-4 py-4 pb-20">
        {posts.length === 0 ? (
          <p className="text-[var(--text-subtle)]">مطلبی یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {posts.map((p) => (
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
                      <span className="text-[var(--text-subtle)] text-xs">
                        {new Date(p.date).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
