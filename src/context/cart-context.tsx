'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  cartTotal: number;
  cartCount: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();
  const user = useUser();
  const { toast } = useToast();

  const fetchCartItems = useCallback(async () => {
    if (!user || !firestore) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const cartCollectionRef = collection(firestore, 'users', user.uid, 'cart');
      const snapshot = await getDocs(cartCollectionRef);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch cart items."
      });
    } finally {
      setLoading(false);
    }
  }, [user, firestore, toast]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const removeFromCart = useCallback(async (cartItemId: string) => {
    if (!user || !firestore) return;
    try {
      const cartCollectionRef = collection(firestore, 'users', user.uid, 'cart');
      const itemDoc = doc(cartCollectionRef, cartItemId);
      await deleteDoc(itemDoc);
      await fetchCartItems(); // Refetch after modification
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart."
      });
    } catch (error) {
      console.error("Error removing from cart: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not remove item from cart."
      });
    }
  }, [user, firestore, toast, fetchCartItems]);

  const addToCart = useCallback(async (product: Product, quantity = 1) => {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "Please log in to add items to your cart.",
      });
      return;
    }

    const cartCollectionRef = collection(firestore, 'users', user.uid, 'cart');
    const existingItem = cartItems.find(item => item.productId === product.id);

    try {
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const itemDoc = doc(cartCollectionRef, existingItem.id);
        await updateDoc(itemDoc, { quantity: newQuantity });
      } else {
        await addDoc(cartCollectionRef, {
          productId: product.id,
          name: product.name,
          price: product.discount ?? product.price,
          image: product.image,
          quantity: quantity,
        });
      }
      await fetchCartItems(); // Refetch after modification
      toast({
        title: "Cart updated",
        description: `${product.name} has been added to your cart.`
      });
    } catch (error) {
      console.error("Error adding to cart: ", error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add item to cart.",
      });
    }
  }, [user, firestore, cartItems, toast, fetchCartItems]);

  const updateQuantity = useCallback(async (cartItemId: string, newQuantity: number) => {
    if (!user || !firestore) return;

    if (newQuantity <= 0) {
      await removeFromCart(cartItemId);
    } else {
      try {
        const itemDoc = doc(firestore, 'users', user.uid, 'cart', cartItemId);
        await updateDoc(itemDoc, { quantity: newQuantity });
        await fetchCartItems(); // Refetch after modification
      } catch (error) {
        console.error("Error updating quantity: ", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not update item quantity."
        });
      }
    }
  }, [user, firestore, toast, fetchCartItems, removeFromCart]);

  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, cartTotal, cartCount, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
