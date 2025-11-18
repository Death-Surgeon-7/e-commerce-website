'use client';

import { products as staticProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading
    setLoading(true);
    // In a real app, you might fetch this, but for now we use static data
    // to avoid the Firestore listener issue.
    // The static products don't have a firestore ID, so we map it from the product id.
    const productsWithId = staticProducts.map(p => ({ ...p, id: p.id }));
    setProducts(productsWithId);
    setLoading(false);
  }, []);

  return { products, loading };
}
