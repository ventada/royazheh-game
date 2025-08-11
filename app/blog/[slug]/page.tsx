"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../components/TopBar";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../../lib/blogData";
import { IconShare, IconChevronRight } from "@tabler/icons-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const related = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS.filter(
      (p) =>
        p.id !== post.id &&
        p.categories.some((c) => post.categories.includes(c))
    ).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <TopBar title="مطلب یافت نشد" showLogo={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title={post.title} showLogo={false} />

      {/* Back to blog */}
      <section className="px-4 pt-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:text-yellow-400 transition-colors text-sm"
          aria-label="بازگشت به وبلاگ"
        >
          <IconChevronRight size={16} />
          <span>بازگشت به وبلاگ</span>
        </Link>
      </section>

      <article>
        {/* Cover */}
        <div className="relative aspect-[4/3]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Meta */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[var(--text-subtle)] text-xs">
              {post.author || "تحریریه"} •{" "}
              {new Date(post.date).toLocaleDateString("fa-IR")}
            </div>
            <button className="p-2 bg-[var(--secondary-bg)] rounded-lg hover:bg-gray-700 transition-colors">
              <IconShare size={18} className="text-[var(--text-primary)]" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((slug) => {
              const cat = BLOG_CATEGORIES.find((c) => c.slug === slug);
              return (
                <Link
                  key={slug}
                  href={`/blog/category/${slug}`}
                  className="px-3 py-1 rounded-full text-xs bg-[var(--secondary-bg)] border border-gray-700 text-[var(--text-primary)]"
                >
                  {cat?.name || slug}
                </Link>
              );
            })}
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none prose-p:leading-8 prose-headings:text-[var(--text-heading)] prose-p:text-[var(--text-primary)]"
            dir="rtl"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-4 pb-20">
          <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">
            مطالب مرتبط
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {related.map((p) => (
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
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
