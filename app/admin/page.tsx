"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IconDashboard,
  IconBox,
  IconShoppingCart,
  IconUsers,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconSearch,
  IconFilter,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_USERS } from "../lib/mockData";
import { Product, Order, User } from "../types";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [extraProducts, setExtraProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_extra_products");
      if (raw) {
        setExtraProducts(JSON.parse(raw));
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "admin_extra_products") {
        try {
          setExtraProducts(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const allProducts = useMemo(
    () => [...MOCK_PRODUCTS, ...extraProducts],
    [extraProducts]
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
        return "bg-yellow-500/20 text-yellow-400";
      case "shipped":
        return "bg-blue-500/20 text-blue-400";
      case "delivered":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
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

  const stats = {
    totalProducts: allProducts.length,
    totalOrders: MOCK_ORDERS.length,
    totalUsers: MOCK_USERS.length,
    totalRevenue: MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0),
    lowStockProducts: allProducts.filter((p) => p.stock < 5).length,
    pendingOrders: MOCK_ORDERS.filter((o) => o.status === "processing").length,
  };

  const renderDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">داشبورد مدیریت</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">کل محصولات</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalProducts}
              </p>
            </div>
            <IconBox size={32} className="text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">کل سفارشات</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalOrders}
              </p>
            </div>
            <IconShoppingCart size={32} className="text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">کل کاربران</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalUsers}
              </p>
            </div>
            <IconUsers size={32} className="text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">کل درآمد</p>
              <p className="text-2xl font-bold text-white">
                {formatPrice(stats.totalRevenue)} تومان
              </p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">موجودی کم</p>
              <p className="text-2xl font-bold text-yellow-400">
                {stats.lowStockProducts}
              </p>
            </div>
            <div className="text-2xl">⚠️</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">سفارشات در انتظار</p>
              <p className="text-2xl font-bold text-orange-400">
                {stats.pendingOrders}
              </p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">آخرین سفارشات</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-right py-3 px-4 text-gray-400">
                  شماره سفارش
                </th>
                <th className="text-right py-3 px-4 text-gray-400">مشتری</th>
                <th className="text-right py-3 px-4 text-gray-400">تاریخ</th>
                <th className="text-right py-3 px-4 text-gray-400">مبلغ</th>
                <th className="text-right py-3 px-4 text-gray-400">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-3 px-4 text-white">{order.id}</td>
                  <td className="py-3 px-4 text-white">{order.customerName}</td>
                  <td className="py-3 px-4 text-gray-400">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {formatPrice(order.total)} تومان
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">مدیریت محصولات</h2>
        <Link
          href="/admin/products/new"
          className="bg-[#FFC700] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center gap-2"
        >
          <IconPlus size={20} />
          محصول جدید
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجوی محصول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 pr-12 rounded-lg border border-gray-700 focus:border-[#FFC700] focus:outline-none"
          />
          <IconSearch
            size={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-right py-4 px-4 text-gray-300">
                  نام محصول
                </th>
                <th className="text-right py-4 px-4 text-gray-300">
                  دسته‌بندی
                </th>
                <th className="text-right py-4 px-4 text-gray-300">قیمت</th>
                <th className="text-right py-4 px-4 text-gray-300">موجودی</th>
                <th className="text-center py-4 px-4 text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {allProducts
                .filter((p) =>
                  p.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {product.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">{product.category}</td>
                    <td className="py-4 px-4 text-white">
                      {formatPrice(product.price)} تومان
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`${
                          product.stock < 5 ? "text-red-400" : "text-white"
                        }`}
                      >
                        {product.stock} عدد
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors">
                          <IconEye size={16} />
                        </button>
                        <button className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors">
                          <IconEdit size={16} />
                        </button>
                        <button className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors">
                          <IconTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">مدیریت سفارشات</h2>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-right py-4 px-4 text-gray-300">
                  شماره سفارش
                </th>
                <th className="text-right py-4 px-4 text-gray-300">مشتری</th>
                <th className="text-right py-4 px-4 text-gray-300">تاریخ</th>
                <th className="text-right py-4 px-4 text-gray-300">مبلغ کل</th>
                <th className="text-right py-4 px-4 text-gray-300">وضعیت</th>
                <th className="text-center py-4 px-4 text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-4 px-4 text-white font-medium">
                    {order.id}
                  </td>
                  <td className="py-4 px-4 text-white">{order.customerName}</td>
                  <td className="py-4 px-4 text-gray-400">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-4 px-4 text-white">
                    {formatPrice(order.total)} تومان
                  </td>
                  <td className="py-4 px-4">
                    <select
                      className={`px-3 py-1 rounded-full text-xs border-none outline-none ${getStatusColor(
                        order.status
                      )}`}
                      defaultValue={order.status}
                    >
                      <option value="processing">در حال پردازش</option>
                      <option value="shipped">ارسال شده</option>
                      <option value="delivered">تحویل داده شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors">
                        <IconEye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">مدیریت کاربران</h2>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-right py-4 px-4 text-gray-300">
                  نام کاربری
                </th>
                <th className="text-right py-4 px-4 text-gray-300">ایمیل</th>
                <th className="text-right py-4 px-4 text-gray-300">
                  تاریخ عضویت
                </th>
                <th className="text-right py-4 px-4 text-gray-300">وضعیت</th>
                <th className="text-center py-4 px-4 text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-4 px-4 text-white font-medium">
                    {user.username}
                  </td>
                  <td className="py-4 px-4 text-white">{user.email}</td>
                  <td className="py-4 px-4 text-gray-400">
                    {formatDate(user.registrationDate)}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors">
                        <IconEye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-[#1e1e1e]/95 backdrop-blur border-b border-gray-800/70 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC700]/40"
          aria-label="باز کردن منو"
        >
          <IconMenu2 size={22} className="text-white" />
        </button>
        <h1 className="text-base font-bold text-[#FFC700]">
          پنل مدیریت رؤیاژه
        </h1>
        <div className="w-9" />
      </div>

      <div className="md:flex">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-gray-900 min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-[#FFC700]">
              پنل مدیریت رؤیاژه
            </h1>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "dashboard"
                  ? "bg-[#FFC700] text-black"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <IconDashboard size={20} />
              داشبورد
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "products"
                  ? "bg-[#FFC700] text-black"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <IconBox size={20} />
              محصولات
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "orders"
                  ? "bg-[#FFC700] text-black"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <IconShoppingCart size={20} />
              سفارشات
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-[#FFC700] text-black"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <IconUsers size={20} />
              کاربران
            </button>
          </nav>
        </div>

        {/* Sidebar Drawer - Mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsSidebarOpen(false);
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
              className="absolute right-0 top-0 h-full w-72 bg-gray-900 shadow-2xl p-6 animate-slide-in-right"
              style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#FFC700]">منو</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC700]/40"
                  aria-label="بستن منو"
                >
                  <IconX size={20} className="text-white" />
                </button>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab("dashboard");
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-[#FFC700] text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <IconDashboard size={20} />
                  داشبورد
                </button>

                <button
                  onClick={() => {
                    setActiveTab("products");
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "products"
                      ? "bg-[#FFC700] text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <IconBox size={20} />
                  محصولات
                </button>

                <button
                  onClick={() => {
                    setActiveTab("orders");
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "orders"
                      ? "bg-[#FFC700] text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <IconShoppingCart size={20} />
                  سفارشات
                </button>

                <button
                  onClick={() => {
                    setActiveTab("users");
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "users"
                      ? "bg-[#FFC700] text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <IconUsers size={20} />
                  کاربران
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 pb-24">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "orders" && renderOrders()}
          {activeTab === "users" && renderUsers()}
        </div>
      </div>
    </div>
  );
}
