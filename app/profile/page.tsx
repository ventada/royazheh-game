"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "../components/TopBar";
import { MOCK_ORDERS } from "../lib/mockData";
import {
  IconUser,
  IconShoppingBag,
  IconHeart,
  IconSettings,
  IconLogout,
  IconChevronLeft,
  IconCalendar,
  IconCreditCard,
} from "@tabler/icons-react";

// Mock user data - replace with actual auth state
const mockUser = {
  id: "1",
  username: "علی_محمدی",
  email: "ali@example.com",
  fullName: "علی محمدی",
  joinDate: "2024-01-15",
};

export default function ProfilePage() {
  const [isLoggedIn] = useState(true); // Replace with actual auth state
  const [activeTab, setActiveTab] = useState("orders");

  const userOrders = MOCK_ORDERS.filter(
    (order) => order.userId === mockUser.id
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR").format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "text-yellow-400";
      case "shipped":
        return "text-blue-400";
      case "delivered":
        return "text-green-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-[var(--text-subtle)]";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "در حال پردازش";
      case "shipped":
        return "ارسال شده";
      case "delivered":
        return "تحویل داده شده";
      case "cancelled":
        return "لغو شده";
      default:
        return status;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)]">
        <TopBar title="پروفایل" showLogo={false} />

        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
          <div className="text-8xl mb-6">👤</div>
          <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">
            وارد حساب کاربری خود شوید
          </h2>
          <p className="text-[var(--text-subtle)] mb-8 max-w-sm">
            برای مشاهده پروفایل و سفارشات خود، لطفاً وارد حساب کاربری‌تان شوید.
          </p>
          <Link
            href="/auth/login"
            className="bg-[var(--accent-gold)] text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2"
          >
            <IconUser size={20} />
            ورود / ثبت نام
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title="پروفایل" showLogo={false} />

      {/* User Header */}
      <div className="px-4 py-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
            <IconUser size={32} className="text-black" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[var(--text-heading)]">
              سلام {mockUser.fullName}
            </h1>
            <p className="text-[var(--text-subtle)] text-sm">
              عضو از {formatDate(mockUser.joinDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-6 grid grid-cols-2 gap-4">
        <div className="bg-[var(--secondary-bg)] rounded-lg p-4 text-center border border-gray-700">
          <IconShoppingBag
            size={24}
            className="text-[var(--accent-gold)] mx-auto mb-2"
          />
          <div className="text-2xl font-bold text-[var(--text-heading)]">
            {userOrders.length}
          </div>
          <div className="text-[var(--text-subtle)] text-sm">سفارش</div>
        </div>
        <div className="bg-[var(--secondary-bg)] rounded-lg p-4 text-center border border-gray-700">
          <IconHeart
            size={24}
            className="text-[var(--accent-gold)] mx-auto mb-2"
          />
          <div className="text-2xl font-bold text-[var(--text-heading)]">0</div>
          <div className="text-[var(--text-subtle)] text-sm">علاقه‌مندی</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 pb-6">
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
              activeTab === "orders"
                ? "bg-[var(--accent-gold)] text-black"
                : "bg-[var(--secondary-bg)] text-[var(--text-primary)] hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <IconShoppingBag size={20} />
              <span className="font-medium">سفارش‌های من</span>
            </div>
            <IconChevronLeft size={16} />
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
              activeTab === "favorites"
                ? "bg-[var(--accent-gold)] text-black"
                : "bg-[var(--secondary-bg)] text-[var(--text-primary)] hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <IconHeart size={20} />
              <span className="font-medium">علاقه‌مندی‌ها</span>
            </div>
            <IconChevronLeft size={16} />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-[var(--secondary-bg)] text-[var(--text-primary)] hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <IconSettings size={20} />
              <span className="font-medium">تنظیمات حساب</span>
            </div>
            <IconChevronLeft size={16} />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-[var(--secondary-bg)] text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <IconLogout size={20} />
              <span className="font-medium">خروج از حساب</span>
            </div>
            <IconChevronLeft size={16} />
          </button>
        </div>
      </div>

      {/* Content Based on Active Tab */}
      <div className="px-4 pb-6">
        {activeTab === "orders" && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-heading)] mb-4">
              سفارش‌های من
            </h2>

            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[var(--secondary-bg)] rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-[var(--text-heading)] mb-1">
                          سفارش #{order.id}
                        </h3>
                        <div className="flex items-center gap-2 text-[var(--text-subtle)] text-sm">
                          <IconCalendar size={16} />
                          {formatDate(order.date)}
                        </div>
                      </div>
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-[var(--text-primary)]">
                            {item.product.name} × {item.quantity}
                          </span>
                          <span className="text-[var(--text-subtle)]">
                            {formatPrice(item.product.price * item.quantity)}{" "}
                            تومان
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                      <div className="flex items-center gap-2 text-[var(--accent-gold)]">
                        <IconCreditCard size={16} />
                        <span className="font-bold">
                          {formatPrice(order.total)} تومان
                        </span>
                      </div>
                      <button className="text-[var(--accent-gold)] hover:text-yellow-400 transition-colors text-sm">
                        مشاهده جزئیات
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-[var(--text-heading)] font-semibold mb-2">
                  هنوز سفارشی ندارید
                </h3>
                <p className="text-[var(--text-subtle)] mb-4">
                  اولین سفارش خود را ثبت کنید
                </p>
                <Link
                  href="/explore"
                  className="inline-block bg-[var(--accent-gold)] text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  شروع خرید
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-heading)] mb-4">
              علاقه‌مندی‌ها
            </h2>
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-[var(--text-heading)] font-semibold mb-2">
                لیست علاقه‌مندی‌ها خالی است
              </h3>
              <p className="text-[var(--text-subtle)] mb-4">
                محصولات مورد علاقه خود را اضافه کنید
              </p>
              <Link
                href="/explore"
                className="inline-block bg-[var(--accent-gold)] text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                کاوش محصولات
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
