// Type definitions for Royazheh

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  stock: number;
  players?: string;
  playtime?: string;
  ageRating?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  registrationDate: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  shippingCost: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { id: "1", name: "استراتژی", slug: "strategy" },
  { id: "2", name: "پرونده جنایی", slug: "mystery" },
  { id: "3", name: "دورهمی", slug: "party" },
  { id: "4", name: "خانوادگی", slug: "family" },
  { id: "5", name: "کارتی", slug: "card" },
];
