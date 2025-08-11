"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  showAddToCart = true,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);

    // Show toast notification (you can implement a toast system later)
    // For now, we'll just show a simple alert
    // TODO: Replace with proper toast notification
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  if (variant === "compact") {
    return (
      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-[var(--secondary-bg)] rounded-xl overflow-hidden hover:bg-gray-700 transition-colors animate-scale-in">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                جدید
              </div>
            )}
            {product.isPopular && !product.isNew && (
              <div className="absolute top-2 right-2 bg-[var(--accent-gold)] text-black text-xs px-2 py-1 rounded-full">
                محبوب
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-[var(--text-heading)] text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-gold)] font-bold text-sm">
                {formatPrice(product.price)} تومان
              </span>
              {showAddToCart && (
                <button
                  onClick={handleAddToCart}
                  className="p-1.5 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-yellow-400 transition-colors"
                  aria-label="افزودن به سبد خرید"
                >
                  <IconPlus size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-[var(--secondary-bg)] rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] animate-scale-in">
        <div className="relative aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              جدید
            </div>
          )}
          {product.isPopular && !product.isNew && (
            <div className="absolute top-3 right-3 bg-[var(--accent-gold)] text-black text-xs px-2 py-1 rounded-full font-medium">
              محبوب
            </div>
          )}
          {product.isFeatured && !product.isNew && !product.isPopular && (
            <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              ویژه
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-[var(--text-heading)] mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          <p className="text-[var(--text-subtle)] text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {product.players && (
            <div className="text-xs text-[var(--text-subtle)] mb-2">
              {product.players} • {product.playtime}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-[var(--accent-gold)] font-bold text-lg">
              {formatPrice(product.price)} تومان
            </div>

            {showAddToCart && (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-[var(--accent-gold)] text-black px-3 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium text-sm"
                aria-label="افزودن به سبد خرید"
              >
                <IconShoppingCart size={16} />
                افزودن
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
