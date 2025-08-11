import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import BottomNavigation from "./components/BottomNavigation";

export const metadata: Metadata = {
  title: "رؤیاژه - فروشگاه بازی‌های رومیزی",
  description: "فروشگاه تخصصی بازی‌های رومیزی و پرونده‌های جنایی حل نشده",
  keywords: "بازی رومیزی, پازل, استراتژی, پرونده جنایی, رؤیاژه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <CartProvider>
          <div className="min-h-screen pb-16 app-surface">{children}</div>
          <BottomNavigation />
        </CartProvider>
      </body>
    </html>
  );
}
