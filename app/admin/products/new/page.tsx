"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import { CATEGORIES, Product } from "@/app/types";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    image: "/images/product-placeholder.svg",
    description: "",
    category: CATEGORIES[0]?.slug ?? "mystery",
    stock: 0,
    players: "",
    playtime: "",
    ageRating: "",
    isNew: false,
    isPopular: false,
    isFeatured: false,
  });

  const isValid = useMemo(() => {
    return (
      (form.name?.trim().length ?? 0) > 1 &&
      (form.price ?? 0) > 0 &&
      (form.image?.trim().length ?? 0) > 0 &&
      (form.category?.trim().length ?? 0) > 0
    );
  }, [form]);

  const handleChange = (field: keyof Product, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const newProduct: Product = {
      id: `N-${Date.now()}`,
      name: form.name!.trim(),
      price: Number(form.price),
      image: form.image!,
      images: form.images && form.images.length ? form.images : [form.image!],
      description: form.description?.trim() || "",
      category: form.category!,
      stock: Number(form.stock ?? 0),
      players: form.players?.trim() || undefined,
      playtime: form.playtime?.trim() || undefined,
      ageRating: form.ageRating?.trim() || undefined,
      isNew: !!form.isNew,
      isPopular: !!form.isPopular,
      isFeatured: !!form.isFeatured,
    };

    try {
      const raw = localStorage.getItem("admin_extra_products");
      const arr: Product[] = raw ? JSON.parse(raw) : [];
      arr.push(newProduct);
      localStorage.setItem("admin_extra_products", JSON.stringify(arr));
      router.push("/admin?tab=products");
    } catch {
      router.push("/admin");
    }
  };

  useEffect(() => {
    // Pre-fill an example image if empty
    if (!form.image) {
      setForm((f) => ({ ...f, image: "/images/product-placeholder.svg" }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <div className="sticky top-0 z-40 bg-[var(--secondary-bg)]/95 backdrop-blur border-b border-gray-800/70 px-4 py-3 flex items-center justify-between">
        <Link
          href="/admin?tab=products"
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="بازگشت"
        >
          <IconChevronLeft size={20} className="text-[var(--text-primary)]" />
        </Link>
        <h1 className="text-base font-bold text-[var(--accent-gold)]">
          افزودن محصول جدید
        </h1>
        <div className="w-9" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">
              نام محصول
            </label>
            <input
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">
              قیمت (تومان)
            </label>
            <input
              type="number"
              min={0}
              value={form.price || 0}
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">
              دسته‌بندی
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">موجودی</label>
            <input
              type="number"
              min={0}
              value={form.stock || 0}
              onChange={(e) => handleChange("stock", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-subtle)]">
            آدرس تصویر اصلی
          </label>
          <input
            value={form.image || ""}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="/images/product-placeholder.svg"
            className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-subtle)]">
            گالری تصاویر (هر لینک در یک خط)
          </label>
          <textarea
            value={(form.images || []).join("\n")}
            onChange={(e) =>
              handleChange(
                "images",
                e.target.value.split(/\n+/).filter(Boolean)
              )
            }
            rows={4}
            className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-[var(--text-subtle)]">توضیحات</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={5}
            className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">
              تعداد بازیکن
            </label>
            <input
              value={form.players || ""}
              onChange={(e) => handleChange("players", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">
              مدت زمان بازی
            </label>
            <input
              value={form.playtime || ""}
              onChange={(e) => handleChange("playtime", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-[var(--text-subtle)]">رده سنی</label>
            <input
              value={form.ageRating || ""}
              onChange={(e) => handleChange("ageRating", e.target.value)}
              className="w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-3 py-2.5 rounded-lg border border-gray-700 focus:border-[var(--accent-gold)] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 text-[var(--text-primary)] bg-[var(--secondary-bg)] px-3 py-2.5 rounded-lg border border-gray-700">
            <input
              type="checkbox"
              checked={!!form.isNew}
              onChange={(e) => handleChange("isNew", e.target.checked)}
            />
            جدید
          </label>
          <label className="flex items-center gap-2 text-[var(--text-primary)] bg-[var(--secondary-bg)] px-3 py-2.5 rounded-lg border border-gray-700">
            <input
              type="checkbox"
              checked={!!form.isPopular}
              onChange={(e) => handleChange("isPopular", e.target.checked)}
            />
            محبوب
          </label>
          <label className="flex items-center gap-2 text-[var(--text-primary)] bg-[var(--secondary-bg)] px-3 py-2.5 rounded-lg border border-gray-700">
            <input
              type="checkbox"
              checked={!!form.isFeatured}
              onChange={(e) => handleChange("isFeatured", e.target.checked)}
            />
            ویژه
          </label>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin?tab=products"
            className="px-4 py-2 rounded-lg border border-gray-700 text-[var(--text-primary)] hover:bg-gray-800 transition-colors"
          >
            انصراف
          </Link>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-[var(--accent-gold)] text-black px-5 py-2.5 rounded-lg font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <IconPlus size={18} />
            افزودن محصول
          </button>
        </div>
      </form>
    </div>
  );
}
