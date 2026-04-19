import { useState } from 'react';

export interface CartItem {
  projectId: number;
  quantity: number;
  cost: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (projectId: number, quantity: number, price: number) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.projectId === projectId);
      if (existing) {
        return prev.map(i => i.projectId === projectId 
            ? { ...i, quantity: i.quantity + quantity, cost: i.cost + (quantity * price) } 
            : i);
      }
      return [...prev, { projectId, quantity, cost: quantity * price }];
    });
  };

  const getTotalCredits = () => cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const getTotalCost = () => cartItems.reduce((acc, curr) => acc + curr.cost, 0);

  return { cartItems, addToCart, getTotalCredits, getTotalCost };
}
