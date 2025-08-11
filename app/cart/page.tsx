"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "../components/TopBar";
import { useCart } from "../context/CartContext";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconShoppingCart,
} from "@tabler/icons-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const shippingCost = 50000; // Fixed shipping cost
  const totalWithShipping =
    getTotal() + (cart.items.length > 0 ? shippingCost : 0);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)]">
        <TopBar title="سبد خرید" showLogo={false} />

        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">
            سبد خرید شما خالی است
          </h2>
          <p className="text-[var(--text-subtle)] mb-8 max-w-sm">
            هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید. برای شروع خرید،
            محصولات را مرور کنید.
          </p>
          <Link
            href="/explore"
            className="bg-[var(--accent-gold)] text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2"
          >
            <IconShoppingCart size={20} />
            شروع خرید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title="سبد خرید" showLogo={false} />

      <div className="px-4 py-6">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              className="bg-[var(--secondary-bg)] rounded-lg p-4 border border-gray-700"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="80px"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.id}`} className="block">
                    <h3 className="font-semibold text-[var(--text-heading)] mb-1 line-clamp-2 hover:text-[var(--accent-gold)] transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>

                  <div className="text-[var(--accent-gold)] font-bold text-lg mb-3">
                    {formatPrice(item.product.price)} تومان
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-gray-700 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-600 rounded-r-lg transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <IconMinus
                          size={14}
                          className="text-[var(--text-primary)]"
                        />
                      </button>
                      <span className="px-3 py-2 text-[var(--text-primary)] min-w-[2.5rem] text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-600 rounded-l-lg transition-colors"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <IconPlus
                          size={14}
                          className="text-[var(--text-primary)]"
                        />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="حذف از سبد خرید"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item Total */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-600">
                <span className="text-[var(--text-subtle)] text-sm">
                  جمع این محصول:
                </span>
                <span className="font-bold text-[var(--text-heading)]">
                  {formatPrice(item.product.price * item.quantity)} تومان
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-[var(--secondary-bg)] rounded-lg p-6 border border-gray-700 mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-heading)] mb-4">
            خلاصه سفارش
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-primary)]">جمع محصولات:</span>
              <span className="text-[var(--text-primary)]">
                {formatPrice(getTotal())} تومان
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[var(--text-primary)]">هزینه ارسال:</span>
              <span className="text-[var(--text-primary)]">
                {formatPrice(shippingCost)} تومان
              </span>
            </div>

            <div className="border-t border-gray-600 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[var(--text-heading)]">
                  مجموع کل:
                </span>
                <span className="text-xl font-bold text-[var(--accent-gold)]">
                  {formatPrice(totalWithShipping)} تومان
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-[var(--accent-gold)] text-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors mb-4">
          تکمیل خرید و پرداخت
        </button>

        {/* Continue Shopping */}
        <Link
          href="/explore"
          className="block w-full text-center bg-[var(--secondary-bg)] text-[var(--text-primary)] py-3 rounded-lg border border-gray-700 hover:border-[var(--accent-gold)] transition-colors"
        >
          ادامه خرید
        </Link>
      </div>
    </div>
  );
}
