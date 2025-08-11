"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Cart, CartItem, Product } from "../types";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: { cart: Cart } };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        const total = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const itemCount = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return { items: updatedItems, total, itemCount };
      } else {
        const newItems = [...state.items, { product, quantity }];
        const total = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return { items: newItems, total, itemCount };
      }
    }

    case "REMOVE_FROM_CART": {
      const filteredItems = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      const total = filteredItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const itemCount = filteredItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return { items: filteredItems, total, itemCount };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, {
          type: "REMOVE_FROM_CART",
          payload: { productId },
        });
      }

      const updatedItems = state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return { items: updatedItems, total, itemCount };
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 };

    case "LOAD_CART":
      return action.payload.cart;

    default:
      return state;
  }
};

const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("royazheh-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: { cart: parsedCart } });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("royazheh-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemCount = () => cart.itemCount;
  const getTotal = () => cart.total;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
