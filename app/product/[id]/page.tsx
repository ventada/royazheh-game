"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import TopBar from "../../components/TopBar";
import ProductCard from "../../components/ProductCard";
import { MOCK_PRODUCTS } from "../../lib/mockData";
import { useCart } from "../../context/CartContext";
import {
  IconShoppingCart,
  IconHeart,
  IconShare,
  IconUsers,
  IconClock,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-[var(--text-heading)] text-xl font-bold mb-2">
            محصول یافت نشد
          </h2>
          <p className="text-[var(--text-subtle)] mb-4">
            متأسفانه محصول مورد نظر شما پیدا نشد.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-[var(--accent-gold)] text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // TODO: Show toast notification
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title={product.name} showLogo={false} />

      {/* Product Image Gallery */}
      <div className="relative">
        <div className="aspect-[4/3] relative">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <IconChevronRight size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <IconChevronLeft size={20} />
              </button>
            </>
          )}
        </div>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? "bg-[var(--accent-gold)]"
                    : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Product Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              جدید
            </span>
          )}
          {product.isPopular && (
            <span className="bg-[var(--accent-gold)] text-black text-xs px-2 py-1 rounded-full">
              محبوب
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              ویژه
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4 py-6">
        {/* Title and Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[var(--text-heading)] mb-2">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-[var(--accent-gold)]">
              {formatPrice(product.price)} تومان
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-3 bg-[var(--secondary-bg)] rounded-lg hover:bg-gray-700 transition-colors">
              <IconHeart size={20} className="text-[var(--text-primary)]" />
            </button>
            <button className="p-3 bg-[var(--secondary-bg)] rounded-lg hover:bg-gray-700 transition-colors">
              <IconShare size={20} className="text-[var(--text-primary)]" />
            </button>
          </div>
        </div>

        {/* Game Info */}
        {(product.players || product.playtime || product.ageRating) && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {product.players && (
              <div className="text-center">
                <IconUsers
                  size={24}
                  className="text-[var(--accent-gold)] mx-auto mb-1"
                />
                <p className="text-[var(--text-subtle)] text-xs">بازیکن</p>
                <p className="text-[var(--text-primary)] text-sm font-medium">
                  {product.players}
                </p>
              </div>
            )}
            {product.playtime && (
              <div className="text-center">
                <IconClock
                  size={24}
                  className="text-[var(--accent-gold)] mx-auto mb-1"
                />
                <p className="text-[var(--text-subtle)] text-xs">مدت زمان</p>
                <p className="text-[var(--text-primary)] text-sm font-medium">
                  {product.playtime}
                </p>
              </div>
            )}
            {product.ageRating && (
              <div className="text-center">
                <IconCalendar
                  size={24}
                  className="text-[var(--accent-gold)] mx-auto mb-1"
                />
                <p className="text-[var(--text-subtle)] text-xs">سن مناسب</p>
                <p className="text-[var(--text-primary)] text-sm font-medium">
                  {product.ageRating}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-heading)] mb-3">
            توضیحات
          </h2>
          <p
            className={`text-[var(--text-primary)] leading-relaxed ${
              !showFullDescription && product.description.length > 150
                ? "line-clamp-3"
                : ""
            }`}
          >
            {product.description}
          </p>
          {product.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-[var(--accent-gold)] hover:text-yellow-400 transition-colors text-sm mt-2"
            >
              {showFullDescription ? "نمایش کمتر" : "نمایش بیشتر"}
            </button>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-primary)]">موجودی:</span>
            <span
              className={`font-medium ${
                product.stock > 10
                  ? "text-green-400"
                  : product.stock > 0
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {product.stock > 0 ? `${product.stock} عدد موجود` : "ناموجود"}
            </span>
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        {product.stock > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[var(--text-primary)]">تعداد:</span>
              <div className="flex items-center bg-[var(--secondary-bg)] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-700 rounded-r-lg transition-colors"
                  disabled={quantity <= 1}
                >
                  <IconMinus size={16} className="text-[var(--text-primary)]" />
                </button>
                <span className="px-4 py-2 text-[var(--text-primary)] min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="p-2 hover:bg-gray-700 rounded-l-lg transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <IconPlus size={16} className="text-[var(--text-primary)]" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[var(--accent-gold)] text-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
            >
              <IconShoppingCart size={24} />
              افزودن به سبد خرید
            </button>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-heading)] mb-4">
              محصولات مشابه
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
