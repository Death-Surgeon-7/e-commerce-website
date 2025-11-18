
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
    } finally {
      setLoading(false);
    }
  }, [user, firestore]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const removeFromCart = useCallback(async (cartItemId: string) => {
    if (!user || !firestore) return;
    const itemDocRef = doc(firestore, 'users', user.uid, 'cart', cartItemId);
    deleteDoc(itemDocRef)
      .then(() => {
        fetchCartItems(); // Refetch after modification
        toast({
          title: "Item removed",
          description: "The item has been removed from your cart."
        });
      })
      .catch(serverError => {
        const permissionError = new FirestorePermissionError({
          path: itemDocRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [user, firestore, toast, fetchCartItems]);

  const updateQuantity = useCallback(async (cartItemId: string, newQuantity: number) => {
    if (!user || !firestore) return;

    if (newQuantity <= 0) {
      await removeFromCart(cartItemId);
    } else {
      const itemDocRef = doc(firestore, 'users', user.uid, 'cart', cartItemId);
      const updatedData = { quantity: newQuantity };
      updateDoc(itemDocRef, updatedData)
        .then(() => {
          fetchCartItems(); // Refetch after modification
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: itemDocRef.path,
            operation: 'update',
            requestResourceData: updatedData
          });
          errorEmitter.emit('permission-error', permissionError);
        });
    }
  }, [user, firestore, fetchCartItems, removeFromCart]);

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

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      const itemDocRef = doc(cartCollectionRef, existingItem.id);
      const updatedData = { quantity: newQuantity };
      updateDoc(itemDocRef, updatedData)
      .then(() => {
        fetchCartItems();
        toast({
          title: "Cart updated",
          description: `${product.name} has been added to your cart.`
        });
      })
      .catch(serverError => {
        const permissionError = new FirestorePermissionError({
          path: itemDocRef.path,
          operation: 'update',
          requestResourceData: updatedData
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    } else {
      const newItemData = {
        productId: product.id,
        name: product.name,
        price: product.discount ?? product.price,
        image: product.image,
        quantity: quantity,
      };
      addDoc(cartCollectionRef, newItemData)
      .then(() => {
        fetchCartItems();
        toast({
          title: "Cart updated",
          description: `${product.name} has been added to your cart.`
        });
      })
      .catch(serverError => {
        const permissionError = new FirestorePermissionError({
          path: cartCollectionRef.path,
          operation: 'create',
          requestResourceData: newItemData
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    }
  }, [user, firestore, cartItems, toast, fetchCartItems]);

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
