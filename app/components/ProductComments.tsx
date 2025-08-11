"use client";

import React, { useEffect, useMemo, useState } from "react";

type ProductComment = {
  id: string;
  author: string;
  text: string;
  createdAt: string; // ISO
};

interface ProductCommentsProps {
  productId: string;
}

const STORAGE_PREFIX = "comments:";

const ProductComments: React.FC<ProductCommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(2);
  const [author, setAuthor] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + productId);
      if (raw) setComments(JSON.parse(raw));
    } catch {}
  }, [productId]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_PREFIX + productId,
        JSON.stringify(comments)
      );
    } catch {}
  }, [comments, productId]);

  const ordered = useMemo(() => {
    return [...comments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [comments]);

  const visible = ordered.slice(0, visibleCount);
  const hasMore = ordered.length > visible.length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!author.trim() || !text.trim()) {
      setError("لطفاً نام و نظر را وارد کنید");
      return;
    }
    const newComment: ProductComment = {
      id: `${Date.now()}`,
      author: author.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setAuthor("");
    setText("");
    if (visibleCount < 2) setVisibleCount(2);
  };

  return (
    <section className="px-4 pb-6">
      <div className="bg-[var(--secondary-bg)] rounded-xl p-4 border border-gray-700">
        <h3 className="text-[var(--text-heading)] font-semibold mb-3">
          نظرات کاربران
        </h3>

        {/* Add Comment */}
        <form onSubmit={handleAdd} className="mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="نام شما"
              className="bg-[var(--primary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
            />
            <div className="md:col-span-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="نظر خود را بنویسید..."
                className="w-full bg-[var(--primary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-400 text-sm" role="alert">
              {error}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[var(--accent-gold)] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              ثبت نظر
            </button>
          </div>
        </form>

        {/* Comments List */}
        {ordered.length === 0 ? (
          <p className="text-[var(--text-subtle)] text-sm">
            هنوز نظری ثبت نشده است.
          </p>
        ) : (
          <div className="space-y-3">
            {visible.map((c) => (
              <div
                key={c.id}
                className="bg-[var(--primary-bg)] rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[var(--text-heading)] font-medium">
                    {c.author}
                  </span>
                  <time className="text-[var(--text-subtle)] text-xs">
                    {new Date(c.createdAt).toLocaleDateString("fa-IR")}
                  </time>
                </div>
                <p className="text-[var(--text-primary)] text-sm leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}

            {hasMore && (
              <div className="pt-1">
                <button
                  onClick={() => setVisibleCount((n) => n + 3)}
                  className="w-full bg-transparent text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-4 py-2 rounded-lg hover:bg-[var(--accent-gold)] hover:text-black transition-colors"
                >
                  نمایش نظرات بیشتر
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductComments;
